#!/usr/bin/env node

// Set MCP mode to silence all console output
process.env.NOVA_MCP_MODE = 'true';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { createRequire } from 'module';

// Silence ALL console output for MCP compatibility
const originalLog = console.log;
const originalWarn = console.warn;
const originalInfo = console.info;
const originalError = console.error;

// Redirect everything to complete silence
console.log = () => {}; // Complete silence
console.warn = () => {}; // Complete silence
console.info = () => {}; // Complete silence
console.error = () => {}; // Complete silence - even errors should be silent for MCP

const require = createRequire(import.meta.url);
const bundle = require('./nova-memory-bundle.js');

const server = new Server(
  { name: 'nova-memory', version: '0.1.15' },
  { capabilities: { tools: {} } }
);

// Extract all necessary classes from bundle
const { 
  EnhancedMemorySystem, 
  EnhancedMCPTools,
  ConflictDetectionEngine,
  VisualMemoryMapper,
  CrossReferenceValidator,
  BoardStatusTool,
  WorkflowTools,
  MetaTools,
  ConfigLoader
} = bundle;

// Lazy initialization to prevent startup issues
let memorySystem;
let enhancedTools;
let boardTool;
let workflowTool;
let conflictEngine;
let visualMapper;
let crossValidator;
let metaTools;

// Project switching state
let currentProjectPath = null;
let configLoader = null;

async function reinitializeForProject(newProjectPath) {
  if (currentProjectPath === newProjectPath && memorySystem) {
    return; // Already initialized for this project
  }

  // Cleanup existing system
  if (memorySystem) {
    try {
      await memorySystem.cleanup();
    } catch (error) {
      console.error(`Cleanup error: ${error.message}`);
    }
    memorySystem = null;
    enhancedTools = null;
    conflictEngine = null;
    visualMapper = null;
    crossValidator = null;
    metaTools = null;
    boardTool = null;
    workflowTool = null;
  }

  // Update project context
  currentProjectPath = newProjectPath;
  if (!configLoader) {
    configLoader = new ConfigLoader(newProjectPath);
  } else {
    configLoader.switchProject(newProjectPath);
  }

  // Initialize with new project config
  await ensureInitialized();
}

async function ensureInitialized() {
  if (!memorySystem) {
    // Initialize configLoader if not exists
    if (!configLoader) {
      // Detect if we're running from a bundled distribution
      const path = require('path');
      const fs = require('fs');
      
      let scriptPath = process.argv[1];
      // Follow symlinks to get the real path (handles npm link)
      try {
        scriptPath = fs.realpathSync(scriptPath);
      } catch (error) {
        // If realpath fails, use original path
      }
      
      const scriptDir = path.dirname(scriptPath);
      const parentDir = path.dirname(scriptDir);
      
      // Check if nova-memory.config.js exists in the parent directory (nova-public)
      const distConfigPath = path.join(parentDir, 'nova-memory.config.js');
      let projectPath = process.cwd();
      
      if (fs.existsSync(distConfigPath)) {
        // We're running from a distribution, use the distribution directory
        projectPath = parentDir;
      }
      
      configLoader = new ConfigLoader(projectPath);
      currentProjectPath = projectPath;
    }
    
    const projectConfig = configLoader.getProjectConfig();
    const memoryConfig = configLoader.getMemoryConfig();
    
    memorySystem = new EnhancedMemorySystem({
      projectPath: projectConfig.projectPath,
      databasePath: projectConfig.databasePath,
      projectName: projectConfig.projectName,
      memoryConfig: memoryConfig
    });
    
    // Initialize memory management system
    await memorySystem.initializeMemoryManagement();
    
    enhancedTools = new EnhancedMCPTools(memorySystem, {
      projectPath: projectConfig.projectPath
    });
    
    // Initialize conflict detection engine
    conflictEngine = new ConflictDetectionEngine(memorySystem, enhancedTools.relationshipEngine);
    
    // Initialize visual memory mapper
    visualMapper = new VisualMemoryMapper(memorySystem, enhancedTools.relationshipEngine);
    
    // Initialize cross-reference validator
    crossValidator = new CrossReferenceValidator(memorySystem, enhancedTools.relationshipEngine, conflictEngine);
    
    // Initialize board status tool
    boardTool = new BoardStatusTool(memorySystem);
    
    // Initialize workflow tools
    workflowTool = new WorkflowTools(memorySystem);
    
    // Initialize meta-tools
    metaTools = new MetaTools(memorySystem, enhancedTools, boardTool, workflowTool, conflictEngine, visualMapper, crossValidator);
  }
}

// Get tool schemas from MetaTools
const META_TOOLS = MetaTools.getToolSchemas();

server.setRequestHandler(ListToolsRequestSchema, async () => {
  await ensureInitialized();
  return {
    tools: META_TOOLS
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  // SMART PROJECT DETECTION: Check for config files to detect project switching
  let detectedProjectPath = null;
  
  // 1. Check for explicit project_path in args
  if (args?.project_path) {
    detectedProjectPath = args.project_path;
  }
  // 2. Check environment variables that Claude Desktop might set
  else if (process.env.CLAUDE_WORKING_DIR) {
    detectedProjectPath = process.env.CLAUDE_WORKING_DIR;
  }
  // 3. Check for config files in possible directories
  else {
    const fs = require('fs');
    const path = require('path');
    
    const possiblePaths = [
      process.cwd(),
      process.env.PWD || process.cwd()
    ];
    
    for (const testPath of possiblePaths) {
      if (testPath && fs.existsSync(path.join(testPath, 'nova-memory.config.js'))) {
        detectedProjectPath = testPath;
        break;
      }
    }
  }
  
  // Switch project if detected path differs from current
  if (detectedProjectPath && detectedProjectPath !== currentProjectPath) {
    await reinitializeForProject(detectedProjectPath);
  } else {
    await ensureInitialized();
  }
  
  try {
    // Execute through meta tools methods
    const methodName = name; // Tool name maps directly to method name
    if (typeof metaTools[methodName] === 'function') {
      const result = await metaTools[methodName](args);
      return {
        content: [{
          type: "text",
          text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
        }]
      };
    }
    
    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `❌ Error: ${error.message}`
      }]
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
