#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const MCP_SERVER_PATH = path.join(__dirname, '..', 'dist-binary', 'nova-memory-distribution', 'nova-memory-mcp.mjs');
const LOG_FILE = path.join(__dirname, '..', 'nova-mcp.log');
const PID_FILE = path.join(__dirname, '..', 'nova-mcp.pid');

// Check if server is already running
function isServerRunning() {
  if (fs.existsSync(PID_FILE)) {
    try {
      const pid = fs.readFileSync(PID_FILE, 'utf8').trim();
      // On Windows, use tasklist to check if process is running
      if (process.platform === 'win32') {
        try {
          const result = require('child_process').execSync(`tasklist /FI "PID eq ${pid}" /NH`, { encoding: 'utf8' });
          return result.includes('node.exe');
        } catch (e) {
          fs.unlinkSync(PID_FILE);
          return false;
        }
      } else {
        // Unix-like systems
        try {
          process.kill(parseInt(pid), 0);
          return true;
        } catch (e) {
          fs.unlinkSync(PID_FILE);
          return false;
        }
      }
    } catch (e) {
      // Error reading PID file
      if (fs.existsSync(PID_FILE)) {
        fs.unlinkSync(PID_FILE);
      }
      return false;
    }
  }
  return false;
}

// Start the MCP server
function startServer() {
  if (isServerRunning()) {
    console.log('✅ Nova Memory MCP server is already running');
    return;
  }

  console.log('🚀 Starting Nova Memory MCP server...');
  
  // Create log file
  const logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });
  
  // Spawn the server
  const serverProcess = spawn('node', [MCP_SERVER_PATH], {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NOVA_MCP_MODE: 'true' }
  });

  // Save PID
  fs.writeFileSync(PID_FILE, serverProcess.pid.toString());
  
  // Log output
  serverProcess.stdout.pipe(logStream);
  serverProcess.stderr.pipe(logStream);
  
  // Detach from parent
  serverProcess.unref();
  
  console.log(`✅ Nova Memory MCP server started (PID: ${serverProcess.pid})`);
  console.log(`📝 Logs: ${LOG_FILE}`);
  console.log(`🔧 To stop: node scripts/auto-start-mcp.js stop`);
}

// Stop the MCP server
function stopServer() {
  if (!isServerRunning()) {
    console.log('⚠️ Nova Memory MCP server is not running');
    return;
  }
  
  try {
    const pid = fs.readFileSync(PID_FILE, 'utf8').trim();
    
    if (process.platform === 'win32') {
      // Windows: use taskkill
      try {
        require('child_process').execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      } catch (e) {
        // Process might already be gone
      }
    } else {
      // Unix-like systems
      process.kill(parseInt(pid));
    }
    
    if (fs.existsSync(PID_FILE)) {
      fs.unlinkSync(PID_FILE);
    }
    console.log('✅ Nova Memory MCP server stopped');
  } catch (e) {
    console.error('❌ Error stopping server:', e.message);
  }
}

// Check server status
function checkStatus() {
  if (isServerRunning()) {
    const pid = fs.readFileSync(PID_FILE, 'utf8').trim();
    console.log(`✅ Nova Memory MCP server is running (PID: ${pid})`);
  } else {
    console.log('❌ Nova Memory MCP server is not running');
  }
}

// Main
const command = process.argv[2];

switch (command) {
  case 'stop':
    stopServer();
    break;
  case 'status':
    checkStatus();
    break;
  case 'restart':
    stopServer();
    setTimeout(startServer, 1000);
    break;
  default:
    startServer();
}