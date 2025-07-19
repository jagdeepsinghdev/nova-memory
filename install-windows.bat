@echo off
echo =============================================
echo Nova Memory v1.0.0-beta.1 - Windows Installer
echo =============================================
echo.
echo Downloading latest binary...
echo.

REM Create installation directory
if not exist "%USERPROFILE%\nova-memory" mkdir "%USERPROFILE%\nova-memory"
cd /d "%USERPROFILE%\nova-memory"

REM Download binary
echo Downloading nova-memory.exe...
curl -L https://github.com/jagdeepsinghdev/nova-memory/releases/download/v1.0.0-beta.1/nova-memory-win-x64.exe -o nova-memory.exe
curl -L https://github.com/jagdeepsinghdev/nova-memory/releases/download/v1.0.0-beta.1/nova-memory-mcp-win-x64.exe -o nova-memory-mcp.exe

echo.
echo Installation complete!
echo.
echo Location: %USERPROFILE%\nova-memory\
echo.
echo Usage:
echo   nova-memory.exe store "Your memory here"
echo   nova-memory-mcp.exe    [for Claude Desktop]
echo.
echo Add to PATH for global access:
echo   setx PATH "%PATH%;%USERPROFILE%\nova-memory"
echo.
pause