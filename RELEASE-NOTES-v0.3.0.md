# Nova MCP v0.3.0 - AI Schema System Release 🎉

## 🚀 What's New

### 🤖 AI Schema System - Game Changing!
- **Proactive Behavior**: AI automatically searches memory before responding
- **Silent Operations**: Background AI operations with `silent: true` parameter
- **Entity Detection**: Auto-detects entities like "UserService" and searches instantly
- **Command Recognition**: "implement auth" triggers pattern search + task creation
- **Complete AI Schemas**: `help({ ai_mode: true })` reveals full AI capabilities

### 📁 Project Isolation & Smart Configuration
- **Isolated Memory**: Each project gets its own database context
- **Configuration Files**: `nova-memory.config.js` for project-specific settings
- **Instant Switching**: Seamlessly move between project contexts
- **4 Search Modes**: Smart, Precise, Fast, Balanced for optimal performance

### 🔄 Version Tracking & Evolution
- **Entity Versioning**: Track how your code entities evolve over time
- **Duplicate Prevention**: Smart detection prevents redundant storage
- **Version History**: View complete evolution of any entity
- **Relationship Evolution**: See how connections change over time

### 📦 Dependency Optimization
- **40% Reduction**: From 357 to 215 packages
- **Silent Installation**: `npm install -g @nova-mcp/mcp-nova --silent`
- **Clean Messaging**: Minimal output during installation
- **Optimized Versions**: Latest compatible versions of all dependencies

## 📊 Performance Metrics
- **Response Time**: 2.7s average (Grade A)
- **Search Performance**: Sub-second for most queries
- **Token Savings**: 26-87% validated reduction
- **9 Meta-tools**: Complete memory management suite

## 🛠️ Installation

```bash
# Standard installation
npm install -g @nova-mcp/mcp-nova

# Silent installation (recommended)
npm install -g @nova-mcp/mcp-nova --silent
```

### Claude Code Setup
```bash
# Windows
claude mcp add mcp-nova node "%APPDATA%\npm\node_modules\@nova-mcp\mcp-nova\nova-memory-mcp.mjs"

# macOS
claude mcp add mcp-nova node "/usr/local/lib/node_modules/@nova-mcp/mcp-nova/nova-memory-mcp.mjs"

# Linux
claude mcp add mcp-nova mcp-nova
```

## 🔧 Breaking Changes
None - v0.3.0 is backward compatible with v0.2.x

## 🐛 Bug Fixes
- Fixed silent mode for all 9 tools
- Resolved version tracking initialization issues
- Fixed Windows/macOS/Linux installation paths
- Corrected project path detection for MCP compatibility

## 📚 Documentation
- Updated README with v0.3.0 features
- Added CONFIG-README.md for configuration guide
- Enhanced USER-GUIDE.md with silent installation tips
- Fixed all pipeline documentation references

## 🙏 Acknowledgments
Special thanks to the MCP community and early adopters who provided valuable feedback!

---

**Full Changelog**: https://github.com/jagdeepsinghdev/nova-memory/compare/v0.2.3...v0.3.0