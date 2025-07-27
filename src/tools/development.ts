import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const startDevServerTool: Tool = {
  name: "farcaster_start_dev_server",
  description: "Start local development server with Farcaster Mini App optimizations",
  inputSchema: {
    type: "object",
    properties: {
      port: {
        type: "number",
        description: "Port to run development server on",
        default: 3000
      },
      https: {
        type: "boolean",
        description: "Use HTTPS for development (required for some features)",
        default: true
      },
      tunnel: {
        type: "boolean",
        description: "Create public tunnel for testing (ngrok-like)",
        default: false
      },
      hotReload: {
        type: "boolean",
        description: "Enable hot reloading",
        default: true
      }
    }
  }
};

export const generateTestSuiteTool: Tool = {
  name: "farcaster_generate_test_suite",
  description: "Generate comprehensive test suite for Mini App functionality",
  inputSchema: {
    type: "object",
    properties: {
      testFramework: {
        type: "string",
        enum: ["jest", "vitest", "playwright", "cypress"],
        description: "Testing framework to use"
      },
      testTypes: {
        type: "array",
        items: {
          type: "string",
          enum: ["unit", "integration", "e2e", "sdk"]
        },
        description: "Types of tests to generate",
        default: ["unit", "integration"]
      },
      mockSDK: {
        type: "boolean",
        description: "Include SDK mocking utilities",
        default: true
      },
      testAuth: {
        type: "boolean",
        description: "Include authentication flow tests",
        default: true
      }
    },
    required: ["testFramework"]
  }
};

export const debugMiniAppTool: Tool = {
  name: "farcaster_debug_mini_app",
  description: "Generate debugging utilities and error handling for Mini Apps",
  inputSchema: {
    type: "object",
    properties: {
      debugLevel: {
        type: "string",
        enum: ["basic", "verbose", "production"],
        description: "Level of debug information to include"
      },
      includeSDKDebug: {
        type: "boolean",
        description: "Include SDK-specific debugging",
        default: true
      },
      errorReporting: {
        type: "boolean",
        description: "Include error reporting mechanism",
        default: true
      },
      performanceMonitoring: {
        type: "boolean",
        description: "Include performance monitoring",
        default: false
      }
    },
    required: ["debugLevel"]
  }
};

export const optimizePerformanceTool: Tool = {
  name: "farcaster_optimize_performance",
  description: "Generate performance optimization code for Mini Apps",
  inputSchema: {
    type: "object",
    properties: {
      optimizations: {
        type: "array",
        items: {
          type: "string",
          enum: ["lazy-loading", "code-splitting", "image-optimization", "caching", "bundle-analysis"]
        },
        description: "Performance optimizations to implement",
        default: ["lazy-loading", "image-optimization"]
      },
      targetMetrics: {
        type: "object",
        properties: {
          loadTime: { type: "number", description: "Target load time in ms" },
          bundleSize: { type: "number", description: "Target bundle size in KB" }
        },
        description: "Performance targets"
      }
    }
  }
};

export const generateErrorBoundaryTool: Tool = {
  name: "farcaster_generate_error_boundary",
  description: "Generate error boundary components for graceful error handling",
  inputSchema: {
    type: "object",
    properties: {
      framework: {
        type: "string",
        enum: ["react", "vue", "vanilla"],
        description: "Frontend framework"
      },
      includeReporting: {
        type: "boolean",
        description: "Include error reporting to external service",
        default: true
      },
      fallbackUI: {
        type: "string",
        enum: ["simple", "detailed", "retry", "custom"],
        description: "Type of fallback UI to show on errors",
        default: "retry"
      }
    },
    required: ["framework"]
  }
};