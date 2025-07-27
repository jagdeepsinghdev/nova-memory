# 🧠 MCP Nova - AI Memory System for Claude & Cursor

**Local AI memory with proactive behavior. Save 26-87% on tokens.**

[![npm version](https://img.shields.io/npm/v/@nova-mcp/mcp-nova.svg)](https://www.npmjs.com/package/@nova-mcp/mcp-nova)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

AI memory system using Model Context Protocol (MCP). Compatible with Claude Desktop, Claude Code, Cursor, and MCP-enabled applications. 100% local storage.

## 🎉 100% FREE & Open Source
**MCP Nova is completely FREE for everyone - personal, commercial, or enterprise use. MIT licensed. No hidden costs, no premium tiers, no restrictions.**

## 🚀 What's New in v0.3.0

### 🤖 AI Schema System - Game Changing!
- **⚡ Proactive Behavior**: AI automatically searches memory before responding
- **🔇 Silent Operations**: Background AI operations with `silent: true`  
- **🎯 Entity Detection**: Auto-detects "UserService", "PaymentManager" → searches instantly
- **📋 Command Recognition**: "implement auth" → auto-searches patterns + creates tasks
- **🔗 AI Mode Access**: `help({ ai_mode: true })` reveals complete AI capabilities

### 📁 Project Isolation & Smart Config
- **Isolated Memory**: Each project gets its own database context
- **Configuration Files**: `nova-memory.config.js` for project-specific settings
- **Instant Switching**: Seamlessly move between project contexts
- **Smart Versioning**: Entity evolution tracking with duplicate prevention
- **4 Search Modes**: Smart, Precise, Fast, Balanced for optimal performance

### 🔄 Version Tracking & Evolution
- **Entity Versioning**: Track how your code entities evolve over time
- **Duplicate Prevention**: Smart detection prevents redundant storage
- **Version History**: `memory({ action: "versions", entity_name: "X" })` shows evolution
- **Relationship Evolution**: See how connections between entities change

## 🎯 Why MCP Nova?

| Without Nova | With Nova v0.3.0 |
|-------------|------------------|
| ❌ Repeat context every session | ✅ AI automatically maintains context |
| ❌ Manual searches & copy-paste | ✅ Proactive search triggers |
| ❌ Lost project details | ✅ Project-isolated memory |
| ❌ No memory across tools | ✅ Seamless workflow integration |

**Validated Token Savings: 26-87%** depending on usage pattern

## 🚀 Quick Start (2 minutes)

### 1. Install
```bash
# Standard installation
npm install -g @nova-mcp/mcp-nova

# Silent installation (recommended)
npm install -g @nova-mcp/mcp-nova --silent

# Minimal output installation  
npm install -g @nova-mcp/mcp-nova --no-progress --no-audit
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
# Windows (recommended)
claude mcp add mcp-nova node "%APPDATA%\npm\node_modules\@nova-mcp\mcp-nova\nova-memory-mcp.mjs"

# macOS (recommended)
claude mcp add mcp-nova node "/usr/local/lib/node_modules/@nova-mcp/mcp-nova/nova-memory-mcp.mjs"

# Linux
claude mcp add mcp-nova mcp-nova

# Alternative: Find your npm global path
# npm config get prefix
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

### 3. Project Configuration (Optional)
Create `nova-memory.config.js` in your project root:
```javascript
module.exports = {
  project: {
    projectPath: __dirname,
    projectName: "My Project"
  },
  ai: {
    proactive_search: true,
    entity_detection: true,
    silent_operations: true,
    search_mode: "smart" // smart, precise, fast, balanced
  },
  database: {
    path: ".nova/project-memory.db"
  }
};
```

### 4. Restart & Enjoy!
Restart your application to load MCP Nova.

## 🤖 AI Schema System - The Magic Behind v0.3.0

### Proactive Behavior in Action
```
You: "I need to implement user authentication"
AI: *Automatically searches memory*
"Found 3 auth patterns. Your UserService uses JWT with 30-min TTL..."

You: "Fix the database timeout error"  
AI: *Auto-searches error solutions*
"Found previous fix: increased timeout to 30s, also connection pooling..."
```

### Silent Operations
All 9 tools work invisibly in the background:
```javascript
// AI can operate without showing output to user
memory({ action: "store", content: "...", silent: true })
board({ action: "create", title: "...", silent: true })
quick({ action: "save", content: "...", silent: true })
```

### Entity Detection & Auto-Search
```
You: "The PaymentService needs refactoring"
AI: *Detects 'PaymentService' → searches automatically*
"PaymentService found - uses Stripe API v2, here's the refactor plan..."

You: "Update AuthenticationService security"
AI: *Searches AuthenticationService history*  
"Critical: Found security alert - migrate from BCrypt to Argon2..."
```

### AI Mode Access
```javascript
help({ ai_mode: true })
// Returns complete schemas with:
// - All proactive triggers
// - Entity detection patterns
// - Silent operation examples  
// - Command recognition rules
```

## 🛠️ 9 Integrated Tools

| Tool | Purpose | AI Features |
|------|---------|-------------|
| **memory** | Smart storage + versioning | Silent storage, auto-deduplication, entity evolution |
| **board** | Task management | Background task sync, AI-aware priorities |
| **workflow** | Development phases | Silent task creation, auto-phase detection |
| **quick** | Speed shortcuts | One-command AI operations, background saves |
| **relationships** | Knowledge graph | Silent relationship mapping, dependency detection |
| **analysis** | Pattern insights | Background analysis, conflict detection |
| **project** | Multi-project support | Auto project switching, isolated contexts |
| **settings** | Preferences | AI-optimized defaults, silent config updates |
| **help** | Interactive guide | AI mode access, complete schema exploration |

## 💡 Smart Versioning Examples

### Entity Evolution Tracking
```
You: "UserService uses JWT tokens with 30min TTL"
AI: "Saved! Version 1 of UserService tracked"

You: "UserService now uses refresh tokens with 7-day TTL"  
AI: "Version 2 created! UserService authentication evolved"

You: "Show UserService evolution"
AI: "UserService versions:
- v2: Uses refresh tokens with 7-day TTL (current)  
- v1: Uses JWT tokens with 30min TTL (previous)"

// Query version history
memory({ action: "versions", entity_name: "UserService" })
```

### Duplicate Prevention
```
You: "CacheService uses Redis"
AI: "Saved!"

You: "CacheService uses Redis"  // Exact same info
AI: "Duplicate detected - no new version needed"
```

## 🔥 Use Cases

### 🧑‍💻 For Developers
- **Code Context**: AI remembers function implementations, API designs
- **Bug Solutions**: Track issues and their proven solutions  
- **Project Memory**: Each project maintains isolated context
- **Architecture Evolution**: See how services change over time

### 🎨 For Creators  
- **Content Ideas**: Store and organize creative concepts
- **Research Notes**: Build a personal knowledge base
- **Asset Management**: Remember design decisions

### 🚀 For Teams
- **Knowledge Sharing**: Build team memory across projects
- **Onboarding**: Persistent documentation and context
- **Decision Tracking**: Document architectural choices

## 📊 Performance & Technical Specs

### Architecture
- **Response Time**: < 10ms average
- **Storage**: SQLite database with FTS5 indexing  
- **Search**: Full-text and semantic search
- **Platform**: Windows, macOS, Linux
- **100% Local**: No cloud dependencies

### v0.3.0 Enhancements
- **AI Schema System** with proactive behavior triggers
- **Project Isolation** with ConfigLoader system
- **Silent Operations** across all 9 tools
- **Smart Versioning** with entity evolution tracking
- **Enhanced Response Formatting** with AI metadata

## 🔒 Privacy & Security
- ✅ **Zero Cloud**: Everything stays on your machine
- ✅ **No Telemetry**: We don't track anything
- ✅ **No External APIs**: Completely offline
- ✅ **Open Core**: Verify our security claims

## 🐛 Troubleshooting

### MCP Nova not appearing?
1. Verify installation: `mcp-nova --version`
2. Check config file JSON syntax
3. Restart your application completely

### Database Reset (if needed)
```bash
# Interactive reset with backup
nova-memory-reset

# Skip confirmation  
nova-memory-reset --yes
```

### Need Help?
- 📧 Email: jagdeep.singh@blockb.ca
- 🐛 Issues: [GitHub Issues](https://github.com/jagdeepsinghdev/nova-memory/issues)

## 🔧 Contributing & Development

**Current Release (v0.3.0):**
- ✅ **Bundled distribution** with all features working
- ✅ **AI Schema System** with proactive behavior  
- ✅ **Project isolation** and configuration support
- ✅ **Enterprise-grade reliability** and performance

**🤝 Contributing:**
We welcome contributions! Please open an issue to discuss proposed changes or improvements.

**Coming in v1.0:**
- Extended developer documentation
- Contributing guidelines for community development
- Modular plugin architecture

## 📄 License

MIT License - 100% FREE for everyone!
- ✅ **FREE**: Personal, commercial, enterprise - no restrictions
- ✅ **Open Source**: Full source coming in v1.0
- ✅ **No Hidden Costs**: No premium tiers, no paid features

---

**Made with ❤️ by [Jagdeep Singh](https://github.com/jagdeepsinghdev)**

⭐ [Star us on GitHub](https://github.com/jagdeepsinghdev/nova-memory) if MCP Nova saves you time and tokens!