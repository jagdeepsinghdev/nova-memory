# 🧠 MCP Nova - AI Memory System for Claude & Cursor

**Stop losing context. Start saving tokens.**

[![npm version](https://badge.fury.io/js/%40nova-mcp%2Fmcp-nova.svg)](https://www.npmjs.com/package/@nova-mcp/mcp-nova)
[![License](https://img.shields.io/badge/License-Commercial-blue.svg)](LICENSE)

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

**macOS/Linux:**
```bash
claude mcp add mcp-nova mcp-nova
```

**Windows:**
Due to PATH resolution issues in Claude Code on Windows, use the full path:
```bash
# Replace YOUR_USERNAME with your actual Windows username
claude mcp add mcp-nova node "C:\Users\YOUR_USERNAME\AppData\Roaming\npm\node_modules\@nova-mcp\mcp-nova\bin\nova-memory-mcp.mjs"
```

#### 🚀 Cursor IDE
Create `.cursor/mcp.json` in your project:
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
Restart your application to load MCP Nova.

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

### 9 Integrated Tools

| Tool | Description | Example Command |
|------|-------------|-----------------|
| **memory** | Store/retrieve information | "Remember this configuration" |
| **workflow** | Track development phases | "Create enhancement: Add dark mode" |
| **board** | Kanban task management | "Move task-001 to completed" |
| **relationships** | Entity knowledge graph | "Link UserService to Database" |
| **analysis** | Memory insights & patterns | "Analyze my Flutter memories" |
| **project** | Multi-project support | "Switch to my React project" |
| **settings** | Configure preferences | "Set search algorithm to hybrid" |
| **quick** | Fast actions & shortcuts | "Quick note: Check auth flow" |
| **help** | Interactive documentation | "How do I use memory search?" |

## 🔥 Use Cases

### 🧑‍💻 For Developers
- **Code Context**: Remember function implementations, API designs
- **Bug Tracking**: Track issues and their solutions
- **Learning Path**: Document what you've learned
- **Project Switching**: Seamlessly move between projects

### 🎨 For Creators
- **Content Ideas**: Store and organize creative concepts
- **Research Notes**: Build a personal knowledge base
- **Writing Assistant**: Track characters, plots, themes
- **Asset Management**: Remember design decisions

### 🚀 For Teams
- **Onboarding**: Create persistent documentation
- **Knowledge Sharing**: Build team memory
- **Decision Tracking**: Document architectural choices
- **Meeting Notes**: Never lose important discussions

## 📊 Performance

- ⚡ **Response Time**: < 50ms average
- 💾 **Memory Capacity**: 10,000+ items
- 🔍 **Search Speed**: Sub-second for large datasets
- 📦 **Storage**: Efficient SQLite backend
- 🔒 **100% Local**: No cloud dependencies

## 🔒 Privacy & Security

Your data is YOUR data:
- ✅ **Zero Cloud**: Everything stays on your machine
- ✅ **No Telemetry**: We don't track anything
- ✅ **No External APIs**: Completely offline
- ✅ **Open Core**: Verify our security claims

## 🐛 Troubleshooting

### MCP Nova not appearing?
1. Verify installation: `mcp-nova --version`
2. Check config file JSON syntax
3. Restart your application completely
4. For Windows users, ensure npm global bin is in PATH

### Need Help?
- 📧 Email: jagdeep.singh@blockb.ca
- 🐛 Issues: [GitHub Issues](https://github.com/nova-mcp/mcp-nova/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/nova-mcp/mcp-nova/discussions)

## 📄 License

Commercial license with free personal use.
- ✅ **Free**: Personal projects, learning, open source
- 💼 **Commercial**: Contact for licensing

---

**Made with ❤️ by [Jagdeep Singh](https://github.com/jagdeepsinghdev)**

⭐ Star us on GitHub if MCP Nova saves you time and tokens!