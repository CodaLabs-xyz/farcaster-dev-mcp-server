import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const publishMiniAppTool: Tool = {
  name: "farcaster_publish_mini_app",
  description: "Publish Mini App with proper manifest hosting and verification",
  inputSchema: {
    type: "object",
    properties: {
      hostingMethod: {
        type: "string",
        enum: ["self-hosted", "farcaster-hosted", "vercel", "netlify"],
        description: "How to host the manifest file"
      },
      domain: {
        type: "string",
        description: "Domain where the app will be hosted"
      },
      deploymentTarget: {
        type: "string",
        enum: ["production", "staging", "preview"],
        description: "Deployment environment",
        default: "production"
      },
      verifyDomain: {
        type: "boolean",
        description: "Verify domain ownership for account association",
        default: true
      }
    },
    required: ["hostingMethod", "domain"]
  }
};

export const generateShareLinkTool: Tool = {
  name: "farcaster_generate_share_link",
  description: "Generate shareable links for Mini App distribution",
  inputSchema: {
    type: "object",
    properties: {
      appUrl: {
        type: "string",
        description: "URL of the Mini App"
      },
      shareContext: {
        type: "string",
        enum: ["direct", "cast", "frame", "embed"],
        description: "Context where the link will be shared"
      },
      customText: {
        type: "string",
        description: "Custom share text"
      },
      includePreview: {
        type: "boolean",
        description: "Include preview metadata",
        default: true
      }
    },
    required: ["appUrl", "shareContext"]
  }
};

export const setupAnalyticsTool: Tool = {
  name: "farcaster_setup_analytics",
  description: "Setup analytics and monitoring for Mini App usage",
  inputSchema: {
    type: "object",
    properties: {
      analyticsProvider: {
        type: "string",
        enum: ["farcaster-native", "google-analytics", "mixpanel", "posthog", "custom"],
        description: "Analytics provider to use"
      },
      trackingEvents: {
        type: "array",
        items: {
          type: "string",
          enum: ["app-open", "user-auth", "wallet-connect", "transaction", "share", "error"]
        },
        description: "Events to track",
        default: ["app-open", "user-auth", "wallet-connect"]
      },
      privacyCompliant: {
        type: "boolean",
        description: "Ensure privacy compliance",
        default: true
      }
    },
    required: ["analyticsProvider"]
  }
};

export const generateDeploymentScriptTool: Tool = {
  name: "farcaster_generate_deployment_script",
  description: "Generate deployment scripts for various hosting platforms",
  inputSchema: {
    type: "object",
    properties: {
      platform: {
        type: "string",
        enum: ["vercel", "netlify", "aws", "gcp", "azure", "custom"],
        description: "Deployment platform"
      },
      buildCommand: {
        type: "string",
        description: "Build command for the app",
        default: "npm run build"
      },
      environmentVariables: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            required: { type: "boolean" }
          }
        },
        description: "Required environment variables"
      },
      includeCI: {
        type: "boolean",
        description: "Include CI/CD pipeline configuration",
        default: false
      }
    },
    required: ["platform"]
  }
};

export const validateDeploymentTool: Tool = {
  name: "farcaster_validate_deployment",
  description: "Validate Mini App deployment and manifest accessibility",
  inputSchema: {
    type: "object",
    properties: {
      appUrl: {
        type: "string",
        description: "URL of the deployed Mini App"
      },
      manifestUrl: {
        type: "string",
        description: "URL of the manifest file"
      },
      checks: {
        type: "array",
        items: {
          type: "string",
          enum: ["manifest-valid", "https-required", "domain-verified", "icons-accessible", "performance"]
        },
        description: "Validation checks to perform",
        default: ["manifest-valid", "https-required", "icons-accessible"]
      }
    },
    required: ["appUrl"]
  }
};