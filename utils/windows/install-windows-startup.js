#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Get Windows startup folder
const startupFolder = path.join(os.homedir(), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');

// Create a VBS script for silent startup
const vbsContent = `
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run """${process.execPath}"" ""${path.join(__dirname, 'auto-start-mcp.js')}""", 0
Set WshShell = Nothing
`;

const vbsPath = path.join(startupFolder, 'nova-memory-mcp.vbs');

console.log('📁 Windows Startup folder:', startupFolder);

// Check if already installed
if (fs.existsSync(vbsPath)) {
  console.log('✅ Nova Memory MCP is already set to auto-start');
  console.log('   To remove: delete', vbsPath);
} else {
  // Install to startup
  try {
    fs.writeFileSync(vbsPath, vbsContent);
    console.log('✅ Nova Memory MCP installed to Windows startup!');
    console.log('   The MCP server will start automatically on Windows login');
    console.log('   To remove auto-start: delete', vbsPath);
    
    // Start it now
    console.log('\n🚀 Starting Nova Memory MCP server now...');
    execSync('node "' + path.join(__dirname, 'auto-start-mcp.js') + '"', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Error installing to startup:', error.message);
    console.log('\n💡 You can manually copy this file to your startup folder:');
    console.log('   ', path.join(__dirname, '..', 'nova-mcp-startup.bat'));
    console.log('   Startup folder:', startupFolder);
  }
}