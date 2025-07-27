#!/usr/bin/env node

/**
 * Nova Memory Database Reset Tool - Standalone Version
 * This version includes all necessary code for distribution
 */

const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

// Embedded DatabaseReset class
class DatabaseReset {
  constructor(configPath) {
    this.config = this.loadConfig(configPath);
    this.dbPath = this.config.storage?.path || path.join(process.env.HOME || process.env.USERPROFILE, '.nova-memory', 'memory.db');
  }

  loadConfig(configPath) {
    if (configPath && fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    
    // Default config
    return {
      storage: {
        path: path.join(process.env.HOME || process.env.USERPROFILE, '.nova-memory', 'memory.db')
      }
    };
  }

  async databaseExists() {
    return await fs.pathExists(this.dbPath);
  }

  async backupDatabase() {
    if (!await this.databaseExists()) {
      return null;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${this.dbPath}.backup-${timestamp}`;
    
    await fs.copy(this.dbPath, backupPath);
    
    // Also backup WAL and SHM files if they exist
    const walPath = `${this.dbPath}-wal`;
    const shmPath = `${this.dbPath}-shm`;
    
    if (await fs.pathExists(walPath)) {
      await fs.copy(walPath, `${walPath}.backup-${timestamp}`);
    }
    
    if (await fs.pathExists(shmPath)) {
      await fs.copy(shmPath, `${shmPath}.backup-${timestamp}`);
    }
    
    return backupPath;
  }

  async deleteDatabase() {
    const files = [
      this.dbPath,
      `${this.dbPath}-wal`,
      `${this.dbPath}-shm`,
      `${this.dbPath}-journal`
    ];
    
    for (const file of files) {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
      }
    }
  }

  async resetDatabase(options = {}) {
    const { createBackup = true, interactive = true } = options;
    
    try {
      // Check if database exists
      const dbExists = await this.databaseExists();
      
      if (!dbExists) {
        console.log('📂 No existing database found.');
        // Ensure directory exists for future use
        await fs.ensureDir(path.dirname(this.dbPath));
        return true;
      }
      
      // Create backup if requested
      if (createBackup) {
        console.log('📦 Creating backup...');
        const backupPath = await this.backupDatabase();
        console.log(`✅ Backup created: ${path.basename(backupPath)}`);
      }
      
      // Delete the database
      console.log('🗑️  Deleting database files...');
      await this.deleteDatabase();
      console.log('✅ Database deleted successfully');
      
      // Ensure directory still exists for new database
      await fs.ensureDir(path.dirname(this.dbPath));
      
      return true;
    } catch (error) {
      console.error(`❌ Reset failed: ${error.message}`);
      return false;
    }
  }

  async listBackups() {
    const dbDir = path.dirname(this.dbPath);
    const dbName = path.basename(this.dbPath, '.db');
    
    if (!await fs.pathExists(dbDir)) {
      console.log('❌ No database directory found');
      return [];
    }
    
    const files = await fs.readdir(dbDir);
    const backups = files.filter(f => f.startsWith(`${dbName}.db.backup-`));
    
    if (backups.length === 0) {
      console.log('❌ No backups found');
      return [];
    }
    
    console.log('\n📦 Available backups:');
    backups.forEach((backup, index) => {
      const timestamp = backup.match(/backup-(.+)$/)[1];
      console.log(`  ${index + 1}. ${backup} (${timestamp})`);
    });
    
    return backups;
  }

  async restoreFromBackup(backupName) {
    const dbDir = path.dirname(this.dbPath);
    const backupPath = path.join(dbDir, backupName);
    
    if (!await fs.pathExists(backupPath)) {
      throw new Error(`Backup not found: ${backupName}`);
    }
    
    // Delete current database
    await this.deleteDatabase();
    
    // Restore from backup
    await fs.copy(backupPath, this.dbPath);
    
    // Restore WAL and SHM if they exist
    const timestamp = backupName.match(/backup-(.+)$/)[1];
    const dbName = path.basename(this.dbPath, '.db');
    const walBackup = path.join(dbDir, `${dbName}.db-wal.backup-${timestamp}`);
    const shmBackup = path.join(dbDir, `${dbName}.db-shm.backup-${timestamp}`);
    
    if (await fs.pathExists(walBackup)) {
      await fs.copy(walBackup, `${this.dbPath}-wal`);
    }
    
    if (await fs.pathExists(shmBackup)) {
      await fs.copy(shmBackup, `${this.dbPath}-shm`);
    }
    
    console.log(`✅ Database restored from ${backupName}`);
    return true;
  }
}

// Parse version from embedded package info
const VERSION = '0.2.0';

program
  .name('nova-memory-reset')
  .description('Reset Nova Memory database to resolve issues')
  .version(VERSION)
  .option('--no-backup', 'Skip creating backup before reset')
  .option('--yes', 'Skip confirmation prompt')
  .option('--list-backups', 'List available backups')
  .option('--restore <backup>', 'Restore from specific backup')
  .option('--config <path>', 'Path to configuration file')
  .helpOption('-h, --help', 'Display help information');

program.parse(process.argv);

const options = program.opts();

async function main() {
  try {
    console.log(`
╔═══════════════════════════════════════════╗
║     Nova Memory Database Reset Tool       ║
║           Version ${VERSION}                  ║
╚═══════════════════════════════════════════╝
`);

    const dbReset = new DatabaseReset(options.config);

    // List backups if requested
    if (options.listBackups) {
      await dbReset.listBackups();
      return;
    }

    // Restore from backup if requested
    if (options.restore) {
      await dbReset.restoreFromBackup(options.restore);
      return;
    }

    // Perform database reset
    if (!options.yes) {
      console.log(`
⚠️  WARNING: This will delete your entire Nova Memory database!
   All memories, tasks, and relationships will be permanently removed.
   ${options.backup !== false ? 'A backup will be created before deletion.' : 'NO BACKUP will be created!'}

   Database location: ${dbReset.dbPath}
`);

      // Simple confirmation without inquirer
      console.log('Type "yes" to continue, or press Ctrl+C to cancel:');
      
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise(resolve => {
        rl.question('> ', resolve);
      });
      rl.close();
      
      if (answer.toLowerCase() !== 'yes') {
        console.log('❌ Reset cancelled');
        return;
      }
    }

    const success = await dbReset.resetDatabase({
      createBackup: options.backup !== false,
      interactive: false
    });

    if (success) {
      console.log(`
✅ Database reset complete!
   
   Your Nova Memory database has been reset.
   A fresh database will be created when you next use Nova Memory.
   
   To start using Nova Memory again:
   - Claude Desktop: Restart Claude
   - Claude Code: Run 'claude'
   - Cursor: Restart Cursor
`);
    }
  } catch (error) {
    console.error(`
❌ Error: ${error.message}

If you continue to experience issues, please contact support:
📧 jagdeep.singh@blockb.ca
🐛 https://github.com/jagdeepsinghdev/nova-memory/issues
`);
    process.exit(1);
  }
}

main();