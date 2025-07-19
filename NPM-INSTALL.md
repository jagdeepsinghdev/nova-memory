# NPM Installation - Nova Memory

## Quick Install

```bash
npm install -g @nova-mem/ai-memory
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

## Support

- Email: jagdeep.singh@blockb.ca
- Issues: https://github.com/jagdeepsinghdev/nova-memory/issues