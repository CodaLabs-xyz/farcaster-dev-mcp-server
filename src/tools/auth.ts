import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const implementSIWFTool: Tool = {
  name: "farcaster_implement_siwf",
  description: "Generate Sign In With Farcaster (SIWF) implementation code",
  inputSchema: {
    type: "object",
    properties: {
      framework: {
        type: "string",
        enum: ["react", "vanilla", "vue", "next"],
        description: "Frontend framework to generate code for"
      },
      backend: {
        type: "string",
        enum: ["express", "nextjs-api", "fastify", "none"],
        description: "Backend framework for auth handling",
        default: "none"
      },
      useQuickAuth: {
        type: "boolean",
        description: "Use Farcaster Quick Auth service instead of custom SIWF",
        default: true
      }
    },
    required: ["framework"]
  }
};

export const generateAuthFlowTool: Tool = {
  name: "farcaster_generate_auth_flow",
  description: "Generate complete authentication flow with user session management",
  inputSchema: {
    type: "object",
    properties: {
      sessionStorage: {
        type: "string",
        enum: ["localStorage", "sessionStorage", "cookies", "memory"],
        description: "Where to store user session data",
        default: "localStorage"
      },
      includeProfile: {
        type: "boolean",
        description: "Include user profile data fetching",
        default: true
      },
      autoSignIn: {
        type: "boolean",
        description: "Automatically attempt sign-in on app load",
        default: true
      }
    }
  }
};

export const validateUserTool: Tool = {
  name: "farcaster_validate_user",
  description: "Validate Farcaster user authentication and permissions",
  inputSchema: {
    type: "object",
    properties: {
      fid: {
        type: "number",
        description: "Farcaster ID to validate"
      },
      signature: {
        type: "string",
        description: "User signature to verify"
      },
      message: {
        type: "string",
        description: "Original message that was signed"
      },
      requireVerification: {
        type: "boolean",
        description: "Require verified Ethereum address",
        default: false
      }
    },
    required: ["fid"]
  }
};

export const getUserProfileTool: Tool = {
  name: "farcaster_get_user_profile",
  description: "Fetch detailed user profile information from Farcaster",
  inputSchema: {
    type: "object",
    properties: {
      fid: {
        type: "number",
        description: "Farcaster ID of the user"
      },
      includeFollowing: {
        type: "boolean",
        description: "Include following count and list",
        default: false
      },
      includeVerifications: {
        type: "boolean",
        description: "Include verified addresses",
        default: true
      }
    },
    required: ["fid"]
  }
};