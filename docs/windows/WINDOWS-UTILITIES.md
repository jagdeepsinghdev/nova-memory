# Windows Utilities for Nova Memory

This directory contains Windows-specific utilities to enhance your Nova Memory experience on Windows systems.

## Available Utilities

### 1. add-to-claude.js
**Purpose**: Automatically adds Nova Memory MCP server to your Claude Desktop configuration.

**Usage**:
```bash
node utils/windows/add-to-claude.js
```

**What it does**:
- Locates your Claude Desktop configuration file
- Adds the Nova Memory MCP server configuration
- Backs up your existing configuration
- Provides instructions for manual configuration if needed

### 2. auto-start-mcp.js
**Purpose**: Configures Nova Memory to start automatically with Windows.

**Usage**:
```bash
node utils/windows/auto-start-mcp.js
```

**Features**:
- Creates Windows startup entries
- Configures auto-launch on system boot
- Provides options for user-specific or system-wide installation

### 3. create-service.ps1
**Purpose**: Creates a Windows Service for Nova Memory MCP server.

**Usage** (Run as Administrator):
```powershell
powershell -ExecutionPolicy Bypass -File utils/windows/create-service.ps1
```

**Benefits**:
- Runs Nova Memory as a background service
- Automatic restart on failure
- No console window
- Starts before user login

### 4. install-windows-startup.js
**Purpose**: Installs Nova Memory startup shortcuts and batch files.

**Usage**:
```bash
node utils/windows/install-windows-startup.js
```

**Creates**:
- Start menu shortcuts
- Desktop shortcuts (optional)
- Startup folder entries
- Quick launch batch files

## Installation Priority

For most users, we recommend this order:
1. Run `add-to-claude.js` to configure Claude Desktop
2. Run `install-windows-startup.js` for easy access
3. Optionally run `auto-start-mcp.js` for automatic startup
4. Advanced users can use `create-service.ps1` for service installation

## Troubleshooting

### Permission Issues
- Some utilities require administrator privileges
- Right-click and select "Run as Administrator" when needed

### Path Issues
- Ensure Nova Memory is installed globally: `npm install -g @nova-mem/memory`
- Check installation with: `where nova-memory-mcp`

### Service Issues
- Check Windows Event Viewer for service errors
- Ensure Node.js is in system PATH
- Verify service status: `Get-Service "NovaMCP"`

## Security Notes

- These utilities only modify Nova Memory-related configurations
- Backup files are created before any modifications
- No sensitive data is transmitted or stored
- All operations are local to your machine