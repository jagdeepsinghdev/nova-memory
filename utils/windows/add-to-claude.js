#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Get Claude Desktop config path based on OS
function getClaudeConfigPath() {
  const platform = os.platform();
  
  if (platform === 'win32') {
    return path.join(os.homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json');
  } else if (platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else {
    return path.join(os.homedir(), '.config', 'claude', 'claude_desktop_config.json');
  }
}

// Get the MCP server path
const mcpServerPath = path.join(__dirname, 'dist-binary', 'nova-memory-distribution', 'nova-memory-mcp.mjs');

// Check if the built MCP server exists
if (!fs.existsSync(mcpServerPath)) {
  console.error('❌ MCP server not found at:', mcpServerPath);
  console.error('Please run "npm run build:binary" first to build the MCP server.');
  process.exit(1);
}

const configPath = getClaudeConfigPath();

console.log('📋 Claude Desktop config path:', configPath);
console.log('🚀 Nova MCP server path:', mcpServerPath);

// Read existing config or create new one
let config = { mcpServers: {} };
if (fs.existsSync(configPath)) {
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configContent);
    console.log('✅ Found existing Claude Desktop config');
  } catch (error) {
    console.error('⚠️ Error reading config, will create new one:', error.message);
  }
} else {
  console.log('📝 Creating new Claude Desktop config');
  // Ensure directory exists
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
}

// Ensure mcpServers exists
if (!config.mcpServers) {
  config.mcpServers = {};
}

// Add or update nova-memory configuration
config.mcpServers['nova-memory'] = {
  command: 'node',
  args: [mcpServerPath.replace(/\\/g, '/')], // Use forward slashes for cross-platform compatibility
  env: {
    NOVA_MCP_MODE: 'true'
  }
};

// Write updated config
try {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('✅ Successfully added Nova Memory to Claude Desktop!');
  console.log('\n📌 Configuration added:');
  console.log(JSON.stringify(config.mcpServers['nova-memory'], null, 2));
  console.log('\n🎉 Please restart Claude Desktop to use Nova Memory MCP server');
} catch (error) {
  console.error('❌ Error writing config:', error.message);
  console.error('\n💡 You can manually add this to your claude_desktop_config.json:');
  console.log(JSON.stringify({
    mcpServers: {
      'nova-memory': config.mcpServers['nova-memory']
    }
  }, null, 2));
}