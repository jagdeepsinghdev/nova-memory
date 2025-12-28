# Nova Memory

Local-first persistent memory for AI assistants. Store context across sessions with SQLite.

[![npm version](https://img.shields.io/npm/v/@nova-mcp/mcp-nova.svg)](https://www.npmjs.com/package/@nova-mcp/mcp-nova)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## What is Nova Memory?

Nova Memory is an MCP (Model Context Protocol) server that gives AI assistants persistent memory. It stores your project context, decisions, and knowledge locally in SQLite - no cloud, no telemetry. Your data stays on your machine.

## Features

- 22 MCP tools for memory, search, analysis, and task management
- Store and search memories with BM25 full-text search
- Knowledge graph with relationship traversal
- Task management with phases and progress tracking
- Multi-project support with cross-project queries
- Enable/disable individual tools via configuration
- Complete TypeScript implementation with Zod validation

## Installation

```bash
npm install -g @nova-mcp/mcp-nova
```

## Setup

### Claude Desktop

Add to your config file:
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "nova-memory": {
      "command": "npx",
      "args": ["@nova-mcp/mcp-nova"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add nova-memory -- npx @nova-mcp/mcp-nova
```

## Available Tools

### Memory Tools (8)

| Tool | Description |
|------|-------------|
| store_memory | Store content with type, tags, and path tracking |
| memory_search | Full-text search with BM25 ranking |
| memory_query | Filter by type, tags, project, or path |
| memory_stats | Storage statistics and memory counts |
| memory_delete | Remove memories by ID |
| memory_tags | List all tags with usage counts |
| memory_export | Export memories as JSON or markdown |
| memory_import | Bulk import memories from JSON |

### Search Tools (4)

| Tool | Description |
|------|-------------|
| search_semantic | Semantic similarity search |
| search_patterns | Find recurring patterns in memories |
| search_temporal | Time-based memory analysis |
| search_relationships | Explore memory connections |

### Analysis Tools (4)

| Tool | Description |
|------|-------------|
| analysis_conflicts | Detect contradictions between memories |
| analysis_memory_map | Generate memory visualization |
| analysis_anomalies | Find unusual patterns |
| analysis_forecast | Predict memory patterns |

### Task Tools (3)

| Tool | Description |
|------|-------------|
| task_management | Create tasks, phases, track progress |
| task_board | Visual overview of pending/active/completed |
| task_insights | AI-powered task analytics |

### Advanced Tools (2)

| Tool | Description |
|------|-------------|
| knowledge_graph | Build and query relationship graphs |
| project_profile | Store project architecture and stack info |

### Maintenance Tools (1)

| Tool | Description |
|------|-------------|
| memory_compact | Optimize and compact storage |

## Configuration

Create `.nova/config.json` in your project root:

```json
{
  "storage": {
    "mode": "project"
  },
  "features": {
    "taskManagement": true,
    "knowledgeGraph": true
  },
  "tools": {
    "search_patterns": true,
    "analysis_conflicts": true,
    "project_profile": true
  }
}
```

### Storage Modes

| Mode | Description |
|------|-------------|
| project | Store in `.nova/memory.db` (default) |
| global | Store in `~/.nova-memory/memory.db` |
| multi | Query across multiple project databases |

### Multi-Project Configuration

```json
{
  "storage": {
    "mode": "multi",
    "multiProject": {
      "enabled": true,
      "includePaths": ["~/projects/api", "~/projects/web"]
    }
  }
}
```

## Storage Location

All data stored locally in SQLite:
- Project mode: `.nova/memory.db` in project root
- Global mode: `~/.nova-memory/memory.db` in home directory

No cloud services. No external API calls. No telemetry.

## Troubleshooting

- **Tools not showing:** Restart Claude Desktop/Code after installation
- **Command not found:** Run `npm install -g @nova-mcp/mcp-nova` or check PATH
- **NVM users:** Use full path to node in MCP config
- **Permission errors:** Ensure write access to `.nova` or home directory
- **Version check:** Run `mcp-nova --version` to verify installation

## Links

- [npm package](https://www.npmjs.com/package/@nova-mcp/mcp-nova)
- [GitHub repository](https://github.com/jagdeepsinghdev/nova-memory)
- [Report issues](https://github.com/jagdeepsinghdev/nova-memory/issues)

## License

MIT
