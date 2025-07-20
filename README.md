# 🧠 MCP Nova - AI Memory System for Claude & Cursor

**Stop losing context. Start saving tokens.**

[![npm version](https://badge.fury.io/js/%40nova-mcp%2Fmcp-nova.svg)](https://www.npmjs.com/package/@nova-mcp/mcp-nova)
[![License](https://img.shields.io/badge/License-Commercial-blue.svg)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://modelcontextprotocol.com)

> Give Claude Desktop, Claude Code, and Cursor permanent memory. Save 80% on tokens. 100% local.

## 🎯 Why MCP Nova?

### The Problem:
- ❌ **Repeat context** in every conversation = wasted tokens
- ❌ **Lose project details** between sessions = wasted time  
- ❌ **Copy-paste previous chats** = frustration
- ❌ **No memory across tools** = fragmented workflow

### The Solution:
- ✅ **Persistent memory** across all sessions
- ✅ **80% token savings** by reusing context
- ✅ **Seamless integration** with Claude & Cursor
- ✅ **100% local** - your data never leaves your machine

## 🚀 Quick Start (2 minutes)

### 1. Install
```bash
npm install -g @nova-mcp/mcp-nova
```

### 2. Configure Your AI Assistant

#### 🖥️ Claude Desktop
Add to config file:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-nova": {
      "command": "mcp-nova"
    }
  }
}
```

#### 💻 Claude Code
```bash
claude mcp add mcp-nova mcp-nova
```

#### 🚀 Cursor IDE
Create `.cursor/mcp.json` in your project root:
```json
{
  "mcpServers": {
    "mcp-nova": {
      "command": "mcp-nova"
    }
  }
}
```

### 3. Restart & Enjoy!
Restart your application to load MCP Nova. Your AI now has permanent memory!

## 💡 Real-World Examples

### Save & Recall Context
```
You: "Remember this API endpoint configuration: https://api.myapp.com/v2"
Assistant: "Saved to memory!"

// Next session...
You: "What was that API endpoint?"
Assistant: "The API endpoint is https://api.myapp.com/v2"
```

### Track Development Tasks
```
You: "Create a task: Implement user authentication"
Assistant: "Task created with ID: task-001"

You: "Show my tasks"
Assistant: "You have 3 tasks:
1. [In Progress] Implement user authentication
2. [Pending] Add error handling
3. [Completed] Setup database connection"
```

### Build Knowledge Graphs
```
You: "UserAuth component depends on TokenService"
Assistant: "Relationship stored! Now tracking:
UserAuth → depends on → TokenService"

You: "Show all TokenService dependencies"
Assistant: "Components depending on TokenService:
- UserAuth
- APIClient  
- SessionManager"
```

## 💰 Token Savings Calculator

**Without MCP Nova:**
- Context setup per conversation: ~2,000 tokens
- Daily conversations: 10
- Daily token usage: 20,000 tokens
- Monthly cost: ~$50-200

**With MCP Nova:**
- Initial context: 2,000 tokens
- Reused context: ~200 tokens per conversation
- Daily token usage: 3,800 tokens (81% savings!)
- Monthly cost: ~$10-40

**You save 80% on API costs!**

## 🛠️ Powerful Features

### 9 Integrated Meta-Tools

| Tool | Description | Example Commands |
|------|-------------|------------------|
| **🧠 memory** | Store/retrieve any information | "Remember this", "Search memories about X" |
| **📋 workflow** | Track development phases | "Create enhancement: Dark mode", "Show current phase" |
| **📊 board** | Visual task management | "Create task", "Move to completed", "Show board" |
| **🔗 relationships** | Knowledge graph builder | "Link X to Y", "Show connections" |
| **📈 analysis** | Memory insights & patterns | "Analyze React patterns", "Find conflicts" |
| **📁 project** | Multi-project support | "Switch to backend project", "List projects" |
| **⚙️ settings** | Preferences & optimization | "Set algorithm to hybrid", "Show settings" |
| **⚡ quick** | Fast actions & shortcuts | "Quick note: Bug in auth", "Quick task" |
| **❓ help** | Interactive documentation | "How to search?", "Show examples" |

### Advanced Capabilities

- **Smart Search**: TF-IDF, BM25, and hybrid algorithms
- **Auto-Extraction**: Automatically identifies important information
- **Conflict Detection**: Finds contradictions in stored knowledge
- **Memory Visualization**: ASCII graphs and relationship maps
- **Cross-Reference Validation**: Ensures data consistency
- **Temporal Analysis**: Track how knowledge evolves

## 🔥 Use Cases

### 🧑‍💻 For Developers
- **Code Context**: Remember implementations, APIs, configurations
- **Bug Solutions**: Track issues and their fixes permanently
- **Learning Journal**: Document your learning path
- **Project Switching**: Instant context switches between projects
- **Code Reviews**: Remember feedback and decisions
- **Architecture Decisions**: Document and recall design choices

### 🎨 For Creators
- **Content Planning**: Organize ideas and outlines
- **Research Database**: Build your knowledge base
- **Character Development**: Track story elements
- **Asset Organization**: Remember design decisions
- **Inspiration Vault**: Store creative sparks
- **Project Bible**: Maintain consistency across work

### 🚀 For Teams
- **Onboarding Memory**: Persistent team knowledge
- **Decision Log**: Track why choices were made
- **Meeting Intelligence**: Never lose discussions
- **Knowledge Transfer**: Share context efficiently
- **Documentation Assistant**: Auto-organize information
- **Collective Intelligence**: Build team memory

## 📊 Performance & Architecture

- ⚡ **Response Time**: < 50ms average query time
- 💾 **Capacity**: 10,000+ memories with instant access
- 🔍 **Search**: Sub-second full-text search
- 📦 **Storage**: SQLite with optimized indexes
- 🔒 **Privacy**: 100% local, zero cloud dependencies
- 🏗️ **Architecture**: Event-driven, modular design

## 🔒 Privacy & Security

**Your data is YOUR data:**
- ✅ **Zero Cloud**: Everything stays on your machine
- ✅ **No Telemetry**: We don't collect any usage data
- ✅ **No Network**: Works completely offline
- ✅ **Open Core**: Audit our security claims
- ✅ **Local Database**: SQLite file you control
- ✅ **No Dependencies**: Minimal external packages

## 🗺️ Roadmap

- [ ] **v0.2**: Visual memory browser UI
- [ ] **v0.3**: Export/import functionality
- [ ] **v0.4**: Team collaboration features
- [ ] **v0.5**: Plugin system for extensions
- [ ] **v1.0**: Stable release with GUI

## 🤝 Contributing

We welcome contributions! Areas we'd love help with:
- Additional storage backends (PostgreSQL, Redis)
- Visualization improvements
- Language-specific extractors
- Integration examples
- Documentation translations

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📚 Documentation

- [Installation Guide](docs/installation.md)
- [Configuration Options](docs/configuration.md)
- [API Reference](docs/api.md)
- [Examples](docs/examples.md)
- [Troubleshooting](docs/troubleshooting.md)

## 🐛 Support

- **Issues**: [GitHub Issues](https://github.com/nova-mcp/mcp-nova/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nova-mcp/mcp-nova/discussions)
- **Email**: jagdeep.singh@blockb.ca
- **Wiki**: [GitHub Wiki](https://github.com/nova-mcp/mcp-nova/wiki)

## 📊 Stats & Social Proof

- 🌟 **Active Users**: Growing community
- 💬 **Success Stories**: 80%+ token reduction reported
- 🔧 **Battle Tested**: In production use
- 🌍 **Global**: Users across all timezones

## 📄 License

Commercial license with free personal use.
- ✅ **Free**: Personal projects, learning, open source
- 💼 **Commercial**: Contact jagdeep.singh@blockb.ca for licensing
- 📜 **Terms**: See [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

Built with:
- [Model Context Protocol](https://modelcontextprotocol.com) by Anthropic
- SQLite for reliable local storage
- The amazing Claude and Cursor communities

---

**Made with ❤️ by [Jagdeep Singh](https://github.com/jagdeepsinghdev)**

⭐ **Star this repo** if MCP Nova saves you time and tokens!

🐦 **Share your success** stories with #MCPNova

🚀 **Join our community** to shape the future of AI memory!