# Nova Memory Configuration Guide

This guide explains how to configure Nova Memory v0.3.0 with the new **AI Schema System** and **Smart Versioning**.

## Quick Start

Create a `nova-memory.config.js` file in your project root:

```javascript
module.exports = {
  project: {
    projectPath: __dirname,  // Use __dirname for MCP compatibility
    projectName: "MyProject"
  },
  memory: {
    versioning: {
      enabled: true,           // Enable version tracking
      maxVersionsPerEntity: 10
    }
  }
};
```

## Configuration File Locations

Nova Memory searches for config files in this order:

1. **Project configs** (highest priority):
   - `./nova-memory.config.js`
   - `./.config/nova/config.js`
   - `./.nova/nova-memory.config.js`

2. **User global configs**:
   - `~/.nova/nova-memory.config.js`
   - `~/.config/nova/config.js`

3. **System default** (fallback)

## Complete Configuration Reference

### Project Configuration

```javascript
module.exports = {
  // Project Configuration
  project: {
    // Project path - use __dirname for MCP compatibility
    projectPath: __dirname,
    
    // Project name (optional - auto-detected from directory)
    projectName: "MyAwesomeProject",
    
    // Future features (v1.0)
    enableWorkspaceScanning: false,
    workspaceRoot: null,
    maxScanDepth: 3
  },

  // Memory Storage Configuration
  memory: {
    // Database location (relative to project root or absolute)
    databasePath: '.nova/memory.db',
    
    // Maximum memories (0 = unlimited)
    maxMemories: 0,
    
    // Global memory limit (NEW in v0.3.0)
    globalMaxMemories: 1000000,
    
    // Memory retention in days (0 = keep forever)
    retentionDays: 0,
    
    // Auto-cleanup interval in hours
    cleanupInterval: 24,
    
    // Default confidence score
    defaultConfidence: 0.8,
    
    // Type-specific retention policies (NEW)
    typeRetention: {
      error: { 
        protect: true,      // Never delete
        maxAgeDays: 0,      // Keep forever
        maxCount: 0         // No limit
      },
      context: {
        protect: true,      // Never delete
        maxAgeDays: 0,      // Keep forever
        versioning: true    // Track versions
      },
      observation: {
        maxAgeDays: 90,     // Delete after 90 days
        maxCount: 100000,   // Max 100k observations
        consolidate: true   // Consolidate similar
      },
      action: {
        maxAgeDays: 30,     // Delete after 30 days
        maxCount: 50000     // Max 50k actions
      },
      result: {
        maxAgeDays: 60,     // Delete after 60 days
        maxCount: 50000,    // Max 50k results
        consolidate: true   // Consolidate similar
      },
      general: {
        maxAgeDays: 30,     // Delete after 30 days
        maxCount: 100000,   // Max 100k general
        consolidate: true   // Consolidate similar
      }
    },
    
    // Version tracking settings (NEW)
    versioning: {
      enabled: true,               // Enable smart versioning
      trackEntities: true,         // Track entity versions
      maxVersionsPerEntity: 10     // Keep last 10 versions
    },
    
    // Memory consolidation (NEW)
    consolidation: {
      enabled: true,      // Enable consolidation
      onStore: true,      // Consolidate during storage
      threshold: 5        // Consolidate when >5 similar
    },
    
    // Automatic cleanup (NEW)
    cleanup: {
      enabled: true,      // Enable auto-cleanup
      interval: 24,       // Run every 24 hours
      batchSize: 1000     // Process 1000 at a time
    },
    
    // Export settings (NEW)
    export: {
      warningThreshold: 900000,  // Warn at 900k memories
      autoExport: true,          // Auto-export when near limit
      format: 'json',            // Export format
      location: '.nova/exports'  // Export directory
    }
  },

  // Search Configuration
  search: {
    // Default search mode: 'smart', 'precise', 'fast', 'balanced'
    defaultMode: 'smart',
    
    // Maximum search results
    maxResults: 20,
    
    // Minimum confidence score
    minConfidence: 0.5,
    
    // Enable semantic search
    enableSemantic: true,
    
    // Cache search results
    cacheResults: true,
    
    // Cache TTL in seconds
    cacheTTL: 300
  },

  // AI Features (NEW in v0.3.0)
  ai: {
    // Enable proactive search triggers
    proactive_search: true,
    
    // Enable automatic entity detection
    entity_detection: true,
    
    // Enable silent operations for AI
    silent_operations: true
  },

  // Entity Extraction
  entities: {
    // Enable automatic extraction
    autoExtract: true,
    
    // Minimum confidence
    minConfidence: 0.7,
    
    // Maximum entities per memory
    maxPerMemory: 10,
    
    // Entity types to extract
    types: ['person', 'company', 'location', 'concept', 'event', 'product'],
    
    // Custom patterns (regex)
    customPatterns: {
      // Example: email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
    }
  },

  // Relationship Management
  relationships: {
    // Enable automatic extraction
    autoExtract: true,
    
    // Maximum traversal depth
    maxTraversalDepth: 5,
    
    // Confidence threshold
    minConfidence: 0.6,
    
    // Relationship types to track
    types: ['uses', 'implements', 'extends', 'imports', 'calls', 'references']
  },

  // File Watching
  fileWatching: {
    // Enable file watching
    enabled: true,
    
    // Directories to watch
    directories: ['src', 'lib', 'app'],
    
    // File extensions
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go'],
    
    // Ignore patterns
    ignore: ['node_modules', '.git', 'dist', 'build', '*.test.*'],
    
    // Debounce delay in ms
    debounceDelay: 1000
  },

  // Database Configuration
  database: {
    // Database path (relative or absolute)
    path: ".nova/memory.db",
    
    // Backup retention in days
    backup_retention: 30,
    
    // Enable auto-cleanup
    auto_cleanup: true
  },

  // Logging Configuration
  logging: {
    // Log level: ERROR, WARN, INFO, DEBUG, TRACE
    level: process.env.LOG_LEVEL || 'INFO',
    
    // Enable file logging
    fileLogging: process.env.LOG_TO_FILE === 'true',
    
    // Log directory
    logDir: process.env.LOG_DIR || '.nova/logs',
    
    // Maximum log file size in MB
    maxFileSize: 10,
    
    // Maximum log files to keep
    maxFiles: 7
  },

  // Performance Configuration
  performance: {
    // Maximum concurrent operations
    maxConcurrency: 10,
    
    // Connection pool size
    connectionPoolSize: 5,
    
    // Query timeout in milliseconds
    queryTimeout: 5000,
    
    // Enable performance monitoring
    monitoring: true,
    
    // Metrics retention in days
    metricsRetention: 7
  },

  // MCP Server Configuration
  mcp: {
    // Server name
    serverName: 'nova-memory',
    
    // Enable MCP server
    enabled: true,
    
    // Exposed tools
    exposedTools: [
      'store_memory',
      'query_memory', 
      'search_memory',
      'get_memory_stats',
      'advanced_search',
      'traverse_graph',
      'generate_memory_map',
      'analyze_memory'
    ],
    
    // Response size limit in KB
    maxResponseSize: 900,
    
    // Enable analytics
    analytics: false
  },

  // Security Configuration
  security: {
    // Enable encryption at rest
    encryptionEnabled: false,
    
    // Encryption key (use env var in production)
    encryptionKey: process.env.NOVA_ENCRYPTION_KEY,
    
    // Sanitize inputs
    sanitizeInputs: true,
    
    // Maximum input length
    maxInputLength: 10000,
    
    // Blocked patterns (regex)
    blockedPatterns: []
  },

  // Advanced Configuration
  advanced: {
    // Enable debug mode
    debug: process.env.NODE_ENV === 'development',
    
    // Custom plugins directory
    pluginsDir: '.nova/plugins',
    
    // Experimental features
    experimental: {
      graphVisualization: true,
      mlAnalysis: false,
      autoTagging: true
    }
  }
};
```

## Key Features in v0.3.0

### 🧠 AI Schema System
- **Proactive Search**: AI automatically searches memories before actions
- **Entity Detection**: Smart entity extraction and version tracking
- **Silent Operations**: Background AI operations with `_ai_only` responses

### 📝 Smart Versioning
- **Entity Evolution**: Track how entities change over time
- **Duplicate Prevention**: Automatically prevents duplicate memories
- **Version History**: Access previous versions with `versions` action

### 🚀 Performance Optimizations
- **Global Memory Limits**: Set maximum memory counts
- **Type-Specific Retention**: Different policies per memory type
- **Auto-Cleanup**: Scheduled cleanup with configurable policies

## Configuration Best Practices

### 1. Project Path Configuration
```javascript
// ✅ CORRECT - for MCP compatibility
project: {
  projectPath: __dirname
}

// ❌ INCORRECT - causes issues in MCP
project: {
  projectPath: process.cwd()
}
```

### 2. Version Tracking Setup
```javascript
memory: {
  versioning: {
    enabled: true,           // Enable version tracking
    trackEntities: true,     // Track entity changes
    maxVersionsPerEntity: 10 // Keep last 10 versions
  }
}
```

### 3. Memory Management
```javascript
memory: {
  globalMaxMemories: 1000000,  // Set global limit
  typeRetention: {
    error: { protect: true },   // Never delete errors
    context: { protect: true }, // Never delete context
    observation: { maxAgeDays: 90 } // Auto-cleanup observations
  }
}
```

## Environment Variables

- `LOG_LEVEL`: Set logging level (ERROR, WARN, INFO, DEBUG, TRACE)
- `LOG_TO_FILE`: Enable file logging (true/false)
- `LOG_DIR`: Custom log directory
- `NOVA_ENCRYPTION_KEY`: Encryption key for data at rest
- `NODE_ENV`: Environment (development enables debug mode)
- `NOVA_MCP_MODE`: Internal flag for MCP operation

## Migration from v0.2.x

If upgrading from v0.2.x, update your config:

```javascript
// OLD v0.2.x format
module.exports = {
  storage: { path: ".nova/memory.db" },
  limits: { maxMemories: 10000 }
};

// NEW v0.3.0 format
module.exports = {
  project: { projectPath: __dirname },
  memory: { 
    databasePath: ".nova/memory.db",
    globalMaxMemories: 10000,
    versioning: { enabled: true }
  }
};
```

## Troubleshooting

### Version Tracking Not Working
1. Ensure `memory.versioning.enabled: true`
2. Use `__dirname` for `project.projectPath`
3. Restart MCP server after config changes
4. Check memories have structured data with entities

### Performance Issues
1. Enable `memory.cleanup.enabled: true`
2. Set appropriate `typeRetention` policies
3. Consider lowering `globalMaxMemories`
4. Enable `search.cacheResults: true`

### Configuration Not Loading
1. Check file is named `nova-memory.config.js`
2. Ensure valid JavaScript syntax
3. Use absolute paths or `__dirname`
4. Check console for loading messages

## Examples

See the `examples/` directory for complete configuration examples:
- `basic-config.js` - Minimal setup
- `advanced-config.js` - Full features enabled
- `team-config.js` - Multi-user setup
- `production-config.js` - Production-ready config