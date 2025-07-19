# Nova Memory Installation Guide

## 🚀 Quick Install

### NPM (Recommended)
```bash
npm install -g @nova-ai/memory
```

### From Source
```bash
git clone https://github.com/Shubhamsaboo/nova-memory.git
cd nova-memory
npm install
npm link
```

## 🖥️ Platform-Specific Setup

### Windows
1. Install Node.js 18+ from [nodejs.org](https://nodejs.org)
2. Run installation in Administrator PowerShell:
   ```powershell
   npm install -g @nova-ai/memory
   ```

### macOS
1. Install Node.js via Homebrew:
   ```bash
   brew install node
   ```
2. Install Nova Memory:
   ```bash
   npm install -g @nova-ai/memory
   ```

### Linux
1. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
2. Install Nova Memory:
   ```bash
   sudo npm install -g @nova-ai/memory
   ```

## 🏃 Running Nova Memory

### As MCP Server (for AI integration)
```bash
nova-memory-mcp
```

### As CLI Tool
```bash
nova-memory
```

## 🔧 Configuration

### Claude Desktop Integration
Add to your Claude Desktop config (~/AppData/Roaming/Claude/claude_desktop_config.json on Windows):

```json
{
  "mcpServers": {
    "nova-memory": {
      "command": "nova-memory-mcp",
      "args": []
    }
  }
}
```

### Environment Variables
- `NOVA_MEMORY_PATH`: Custom data directory (default: ~/.nova-memory)
- `NOVA_MEMORY_DEBUG`: Enable debug logging

## 🧪 Testing Your Installation

1. Test MCP server:
   ```bash
   nova-memory-mcp
   ```
   You should see: "Nova Memory MCP Server running on stdio"

2. Test CLI:
   ```bash
   nova-memory store "Test memory"
   nova-memory query "test"
   ```

## 🛠️ Troubleshooting

### Windows Issues
- If commands not found: Restart terminal after installation
- Permission errors: Run as Administrator

### macOS Issues
- If commands not found: Add npm global bin to PATH:
  ```bash
  echo 'export PATH="$PATH:$(npm bin -g)"' >> ~/.zshrc
  source ~/.zshrc
  ```

### Common Issues
1. **SQLite errors**: Install build tools
   - Windows: `npm install -g windows-build-tools`
   - macOS: `xcode-select --install`
   - Linux: `sudo apt-get install build-essential`

2. **Permission errors**: Use sudo on Unix systems or Administrator on Windows

## 📚 Next Steps

1. Read the [User Guide](README.md)
2. Explore the 9 meta-tools
3. Integrate with your AI workflow

## 🤝 Support

- Issues: https://github.com/Shubhamsaboo/nova-memory/issues
- Discord: [Join our community](https://discord.gg/nova-memory)
