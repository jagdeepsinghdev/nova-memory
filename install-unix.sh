#!/bin/bash
echo "============================================="
echo "Nova Memory v1.0.0-beta.1 - Unix Installer"
echo "============================================="
echo ""

# Detect platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="macos"
    ARCH="$(uname -m)"
    if [[ "$ARCH" == "arm64" ]]; then
        BINARY_SUFFIX="macos-arm64"
    else
        BINARY_SUFFIX="macos-x64"
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux"
    BINARY_SUFFIX="linux-x64"
else
    echo "Unsupported platform: $OSTYPE"
    exit 1
fi

echo "Detected platform: $PLATFORM ($BINARY_SUFFIX)"
echo ""

# Create installation directory
INSTALL_DIR="$HOME/nova-memory"
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

echo "Downloading binaries..."
curl -L "https://github.com/jagdeepsinghdev/nova-memory/releases/download/v1.0.0-beta.1/nova-memory-$BINARY_SUFFIX" -o nova-memory
curl -L "https://github.com/jagdeepsinghdev/nova-memory/releases/download/v1.0.0-beta.1/nova-memory-mcp-$BINARY_SUFFIX" -o nova-memory-mcp

chmod +x nova-memory nova-memory-mcp

echo ""
echo "Installation complete!"
echo ""
echo "Location: $INSTALL_DIR"
echo ""
echo "Usage:"
echo "  ./nova-memory store 'Your memory here'"
echo "  ./nova-memory-mcp    [for Claude Desktop]"
echo ""
echo "Add to PATH for global access:"
echo "  echo 'export PATH=\"\$PATH:$INSTALL_DIR\"' >> ~/.bashrc"
echo "  source ~/.bashrc"
echo ""