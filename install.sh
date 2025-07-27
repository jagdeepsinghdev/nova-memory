#!/bin/bash
echo "🚀 Installing Nova Memory MCP Server..."
echo ""

# Check Node.js version
NODE_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2)
if [ $? -ne 0 ]; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: v$NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎉 Installation complete!"
echo ""
echo "📖 Usage:"
echo "   node nova-memory-mcp.mjs    # Start MCP server"
echo ""
echo "🔧 Claude Desktop Integration:"
echo "Add this to your claude_desktop_config.json:"
echo '{'
echo '  "mcpServers": {'
echo '    "nova-memory": {'
echo '      "command": "node",'
echo '      "args": ["'$(pwd)'/nova-memory-mcp.mjs"]'
echo '    }'
echo '  }'
echo '}'
echo ""
