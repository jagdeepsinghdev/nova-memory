/**
 * Nova Memory Configuration File
 * 
 * NOTE: In v0.3.0, project configuration is now supported!
 * You can customize project paths and database locations.
 */

module.exports = {
  // Project Configuration - NOW SUPPORTED IN v0.3.0!
  project: {
    // Project path (defaults to current working directory)
    // You can set this to any absolute or relative path
    projectPath: __dirname,
    
    // Project name (optional - defaults to directory name)
    projectName: null,
    
    // Future features (coming in v1.0)
    enableWorkspaceScanning: false,
    workspaceRoot: null,
    maxScanDepth: 3
  },

  // Memory Storage Configuration
  memory: {
    // Database location (relative to project root or absolute path)
    // You can now customize where the database is stored!
    databasePath: '.nova/memory.db',
    
    // Maximum number of memories to store (0 = unlimited)
    maxMemories: 0,
    
    // Memory retention period in days (0 = keep forever)
    retentionDays: 0,
    
    // Auto-cleanup interval in hours (0 = disabled)
    cleanupInterval: 24,
    
    // Default confidence score for new memories
    defaultConfidence: 0.8,
    
    // NEW: Global maximum memories allowed (1 million)
    globalMaxMemories: 1000000,
    
    // NEW: Type-specific retention policies
    typeRetention: {
      error: { 
        protect: true,      // Never delete errors
        maxAgeDays: 0,      // Keep forever
        maxCount: 0         // No limit
      },
      context: {
        protect: true,      // Never delete context
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
    
    // NEW: Version tracking settings
    versioning: {
      enabled: true,               // Enable versioning
      trackEntities: true,         // Track entity versions
      maxVersionsPerEntity: 10     // Keep last 10 versions
    },
    
    // NEW: Consolidation settings
    consolidation: {
      enabled: true,      // Enable consolidation
      onStore: true,      // Consolidate during storage
      threshold: 5        // Consolidate when >5 similar
    },
    
    // NEW: Cleanup settings
    cleanup: {
      enabled: true,      // Enable auto-cleanup
      interval: 24,       // Run every 24 hours
      batchSize: 1000     // Process 1000 at a time
    },
    
    // NEW: Export settings
    export: {
      warningThreshold: 900000,  // Warn at 900k memories
      autoExport: true,          // Auto-export when near limit
      format: 'json',            // Export format
      location: '.nova/exports'  // Export directory
    }
  },

  // AI Features Configuration - NEW in v0.3.0!
  ai: {
    // Enable proactive search triggers
    proactive_search: true,
    
    // Enable automatic entity detection
    entity_detection: true,
    
    // Enable silent operations for AI
    silent_operations: true
  },

  // Database Configuration
  database: {
    // Database path (can also be set in memory.databasePath)
    path: ".nova/memory.db",
    
    // Backup retention in days
    backup_retention: 30,
    
    // Enable auto-cleanup
    auto_cleanup: true
  },

  // Search Configuration
  search: {
    // Default search mode: 'smart', 'precise', 'fast', or 'balanced'
    defaultMode: 'smart',
    
    // Maximum search results to return
    maxResults: 20,
    
    // Minimum confidence score for results
    minConfidence: 0.5,
    
    // Enable semantic search (requires more memory)
    enableSemantic: true,
    
    // Cache search results for performance
    cacheResults: true,
    
    // Cache TTL in seconds
    cacheTTL: 300
  },

  // Entity Extraction Configuration
  entities: {
    // Enable automatic entity extraction
    autoExtract: true,
    
    // Minimum entity confidence
    minConfidence: 0.7,
    
    // Maximum entities per memory
    maxPerMemory: 10,
    
    // Entity types to extract
    types: ['person', 'company', 'location', 'concept', 'event', 'product'],
    
    // Custom entity patterns (regex)
    customPatterns: {
      // Example: email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
    }
  },

  // Relationship Configuration
  relationships: {
    // Enable automatic relationship extraction
    autoExtract: true,
    
    // Maximum relationship depth for traversal
    maxTraversalDepth: 5,
    
    // Relationship confidence threshold
    minConfidence: 0.6,
    
    // Relationship types to track
    types: ['uses', 'implements', 'extends', 'imports', 'calls', 'references']
  },

  // File Watching Configuration
  fileWatching: {
    // Enable file watching
    enabled: true,
    
    // Directories to watch (relative to project root)
    directories: ['src', 'lib', 'app'],
    
    // File extensions to watch
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go'],
    
    // Ignore patterns
    ignore: ['node_modules', '.git', 'dist', 'build', '*.test.*'],
    
    // Debounce delay in milliseconds
    debounceDelay: 1000
  },

  // Logging Configuration
  logging: {
    // Log level: 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'
    level: process.env.LOG_LEVEL || 'INFO',
    
    // Enable file logging
    fileLogging: process.env.LOG_TO_FILE === 'true',
    
    // Log directory
    logDir: process.env.LOG_DIR || '.nova/logs',
    
    // Maximum log file size in MB
    maxFileSize: 10,
    
    // Maximum number of log files to keep
    maxFiles: 7
  },

  // Performance Configuration
  performance: {
    // Maximum concurrent operations
    maxConcurrency: 10,
    
    // Database connection pool size
    connectionPoolSize: 5,
    
    // Query timeout in milliseconds
    queryTimeout: 5000,
    
    // Enable performance monitoring
    monitoring: true,
    
    // Performance data retention in days
    metricsRetention: 7
  },

  // MCP Server Configuration
  mcp: {
    // Server name for MCP
    serverName: 'nova-memory',
    
    // Enable MCP server
    enabled: true,
    
    // Tool visibility (which tools to expose)
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
    
    // Enable tool usage analytics
    analytics: false
  },

  // Export Configuration
  export: {
    // Default export format: 'json', 'csv', 'markdown'
    defaultFormat: 'json',
    
    // Export directory
    exportDir: '.nova/exports',
    
    // Include metadata in exports
    includeMetadata: true,
    
    // Compress large exports
    compress: true
  },

  // Security Configuration
  security: {
    // Enable encryption at rest
    encryptionEnabled: false,
    
    // Encryption key (use environment variable in production)
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
    
    // Enable experimental features
    experimental: {
      graphVisualization: true,
      mlAnalysis: false,
      autoTagging: true
    }
  }
};