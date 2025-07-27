import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

export const createMiniAppTool: Tool = {
  name: "farcaster_create_mini_app",
  description: "Create a new Farcaster Mini App project with proper structure and configuration",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the Mini App project"
      },
      homeUrl: {
        type: "string",
        description: "Home URL where the app will be hosted"
      },
      framework: {
        type: "string",
        enum: ["react", "vanilla", "vue", "next"],
        description: "Frontend framework to use"
      },
      includeWallet: {
        type: "boolean",
        description: "Include wallet integration setup",
        default: true
      },
      includeAuth: {
        type: "boolean", 
        description: "Include authentication setup",
        default: true
      }
    },
    required: ["name", "homeUrl"]
  }
};

export const generateManifestTool: Tool = {
  name: "farcaster_generate_manifest",
  description: "Generate a valid Farcaster Mini App manifest file (/.well-known/farcaster.json)",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Display name of the Mini App"
      },
      homeUrl: {
        type: "string",
        description: "Home URL of the Mini App"
      },
      iconUrl: {
        type: "string",
        description: "URL to the app icon (recommended 200x200px)"
      },
      imageUrl: {
        type: "string",
        description: "URL to preview image (optional)"
      },
      description: {
        type: "string",
        description: "Brief description of the app"
      },
      categories: {
        type: "array",
        items: { type: "string" },
        description: "Categories for app discovery"
      },
      buttonTitle: {
        type: "string",
        description: "Custom button title for the app"
      }
    },
    required: ["name", "homeUrl", "iconUrl"]
  }
};

export const validateManifestTool: Tool = {
  name: "farcaster_validate_manifest",
  description: "Validate a Farcaster Mini App manifest file for compliance",
  inputSchema: {
    type: "object",
    properties: {
      manifestUrl: {
        type: "string",
        description: "URL to the manifest file to validate"
      },
      manifestContent: {
        type: "string",
        description: "Raw JSON content of manifest (alternative to URL)"
      }
    }
  }
};

export const setupDevEnvironmentTool: Tool = {
  name: "farcaster_setup_dev_environment",
  description: "Setup development environment for Farcaster Mini Apps with required dependencies",
  inputSchema: {
    type: "object",
    properties: {
      packageManager: {
        type: "string",
        enum: ["npm", "yarn", "pnpm"],
        description: "Package manager to use",
        default: "npm"
      },
      typescript: {
        type: "boolean",
        description: "Setup TypeScript configuration",
        default: true
      },
      eslint: {
        type: "boolean",
        description: "Setup ESLint configuration",
        default: true
      }
    }
  }
};