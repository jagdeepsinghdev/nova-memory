# NPM Installation - Nova Memory v1.0.0-beta.1

## Quick Install

```bash
npm install -g @nova-mem/memory@1.0.0-beta.1
```

## Verify Installation

```bash
nova-memory --version
nova-memory-mcp
```

## Claude Desktop Integration

1. **Find config file location:**
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. **Add Nova Memory:**
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

3. **Restart Claude Desktop**

## Available Packages

- **@nova-mem/memory** - Main package (free personal use)
- **@nova-mem/memory-pro** - Production version

## Support

- Email: jagdeep.singh@blockb.ca
- Issues: https://github.com/jagdeepsinghdev/nova-memory/issues