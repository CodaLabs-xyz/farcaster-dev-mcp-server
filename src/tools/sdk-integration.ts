import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const initializeSDKTool: Tool = {
  name: "farcaster_initialize_sdk",
  description: "Generate Farcaster Mini App SDK initialization code",
  inputSchema: {
    type: "object",
    properties: {
      framework: {
        type: "string",
        enum: ["react", "vanilla", "vue", "next"],
        description: "Frontend framework"
      },
      features: {
        type: "array",
        items: {
          type: "string",
          enum: ["auth", "wallet", "notifications", "navigation", "sharing"]
        },
        description: "SDK features to enable",
        default: ["auth", "wallet"]
      },
      autoReady: {
        type: "boolean",
        description: "Automatically call sdk.actions.ready() when app loads",
        default: true
      }
    },
    required: ["framework"]
  }
};

export const handleSDKEventsTool: Tool = {
  name: "farcaster_handle_sdk_events",
  description: "Generate SDK event handling code for Mini App lifecycle",
  inputSchema: {
    type: "object",
    properties: {
      events: {
        type: "array",
        items: {
          type: "string",
          enum: ["ready", "close", "back", "share", "notification"]
        },
        description: "SDK events to handle",
        default: ["ready", "close", "back"]
      },
      includeErrorHandling: {
        type: "boolean",
        description: "Include error handling for failed SDK calls",
        default: true
      }
    }
  }
};

export const implementNotificationsTool: Tool = {
  name: "farcaster_implement_notifications",
  description: "Implement notification system for Mini Apps",
  inputSchema: {
    type: "object",
    properties: {
      notificationTypes: {
        type: "array",
        items: {
          type: "string",
          enum: ["system", "user-action", "reminder", "update"]
        },
        description: "Types of notifications to support",
        default: ["user-action", "reminder"]
      },
      rateLimiting: {
        type: "boolean",
        description: "Include rate limiting logic (1 per 30s, 100 per day)",
        default: true
      },
      tokenManagement: {
        type: "boolean",
        description: "Include notification token management",
        default: true
      }
    }
  }
};

export const generateNavigationTool: Tool = {
  name: "farcaster_generate_navigation",
  description: "Generate navigation patterns for Mini Apps within modal constraints",
  inputSchema: {
    type: "object",
    properties: {
      navigationType: {
        type: "string",
        enum: ["stack", "tabs", "drawer", "simple"],
        description: "Navigation pattern to implement"
      },
      includeBackButton: {
        type: "boolean",
        description: "Include back button handling",
        default: true
      },
      mobileOptimized: {
        type: "boolean",
        description: "Optimize for mobile viewport",
        default: true
      }
    },
    required: ["navigationType"]
  }
};

export const implementSharingTool: Tool = {
  name: "farcaster_implement_sharing",
  description: "Implement social sharing functionality for Farcaster feeds",
  inputSchema: {
    type: "object",
    properties: {
      shareTypes: {
        type: "array",
        items: {
          type: "string",
          enum: ["cast", "frame", "direct-link", "embed"]
        },
        description: "Types of sharing to support",
        default: ["cast", "direct-link"]
      },
      includeMetadata: {
        type: "boolean",
        description: "Include OpenGraph metadata generation",
        default: true
      },
      customizeShareText: {
        type: "boolean",
        description: "Allow customization of share text",
        default: true
      }
    }
  }
};