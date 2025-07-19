# Nova Memory - AI Memory System

Local AI memory system with MCP integration for Claude Desktop and other AI agents.

[![npm version](https://badge.fury.io/js/%40nova-mem%2Fai-memory.svg)](https://www.npmjs.com/package/@nova-mem/ai-memory)
[![License: Commercial](https://img.shields.io/badge/License-Commercial-blue.svg)](LICENSE)

## 📦 Installation

### NPM (Recommended)
```bash
npm install -g @nova-mem/ai-memory
```

### Direct Download
- [Windows](https://github.com/jagdeepsinghdev/nova-memory/releases)
- [macOS](https://github.com/jagdeepsinghdev/nova-memory/releases)
- [Linux](https://github.com/jagdeepsinghdev/nova-memory/releases)

## 🔧 Claude Desktop Setup

1. **Install the package:**
   ```bash
   npm install -g @nova-mem/ai-memory
   ```

2. **Find Claude Desktop config:**
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

3. **Add to config:**
   ```json
   {
     "mcpServers": {
       "nova-memory": {
         "command": "nova-memory-mcp"
       }
     }
   }
   ```

4. **Restart Claude Desktop**

## 🛠️ Available Tools

| Tool | Description |
|------|-------------|
| `memory` | Store, query, and search memories |
| `workflow` | Track development phases |
| `board` | Task management |
| `relationships` | Entity relationship mapping |
| `analysis` | Memory analytics |
| `project` | Multi-project support |
| `settings` | Configuration management |
| `quick` | Rapid actions |
| `help` | Interactive help |

## 💻 CLI Usage

```bash
# Store memory
nova-memory store "Working on user authentication system"

# Search memories  
nova-memory search "authentication"

# Quick actions
nova-memory quick save "Fixed login bug"
```

## 🛡️ Privacy & Security

- **100% Local**: All data stays on your machine
- **No Cloud**: No external dependencies
- **No Telemetry**: Completely private
- **Zero Config**: Works immediately after installation

## 📞 Support

- **Email**: jagdeep.singh@blockb.ca
- **Issues**: [GitHub Issues](https://github.com/jagdeepsinghdev/nova-memory/issues)
- **Repository**: [GitHub](https://github.com/jagdeepsinghdev/nova-memory)

## 📄 License

**Free for personal use** | **Commercial license available**

Contact: jagdeep.singh@blockb.ca

---

**Made by [Jagdeep Singh](https://github.com/jagdeepsinghdev)**