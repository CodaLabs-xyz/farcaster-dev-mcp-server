#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Import tools
import { 
  createMiniAppTool, 
  generateManifestTool, 
  validateManifestTool, 
  setupDevEnvironmentTool 
} from "./tools/project-setup.js";
import { 
  implementSIWFTool, 
  generateAuthFlowTool, 
  validateUserTool, 
  getUserProfileTool 
} from "./tools/auth.js";
import { 
  setupWalletIntegrationTool, 
  generateTransactionTool, 
  configureChainsTest, 
  handleWalletEventsTool 
} from "./tools/wallet.js";
import { 
  initializeSDKTool, 
  handleSDKEventsTool, 
  implementNotificationsTool, 
  generateNavigationTool, 
  implementSharingTool 
} from "./tools/sdk-integration.js";
import { 
  startDevServerTool, 
  generateTestSuiteTool, 
  debugMiniAppTool, 
  optimizePerformanceTool, 
  generateErrorBoundaryTool 
} from "./tools/development.js";
import { 
  publishMiniAppTool, 
  generateShareLinkTool, 
  setupAnalyticsTool, 
  generateDeploymentScriptTool, 
  validateDeploymentTool 
} from "./tools/publishing.js";

// Import knowledge base
import { 
  getKnowledgeTool, 
  searchKnowledgeTool, 
  listTopicsTool,
  getKnowledgeByCategory,
  searchKnowledge,
  listAllTopics
} from "./knowledge/index.js";

// Import handlers
import { handleProjectSetup } from "./handlers/project-setup.js";
import { handleAuth } from "./handlers/auth.js";
import { handleWallet } from "./handlers/wallet.js";
import { handleSDK } from "./handlers/sdk.js";
import { handleDevelopment } from "./handlers/development.js";
import { handlePublishing } from "./handlers/publishing.js";

const server = new Server({
  name: "farcaster-dev-mcp-server",
  version: "1.0.0",
  capabilities: {
    tools: {},
  },
});

// List all available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Project Setup Tools
      createMiniAppTool,
      generateManifestTool,
      validateManifestTool,
      setupDevEnvironmentTool,
      
      // Authentication Tools
      implementSIWFTool,
      generateAuthFlowTool,
      validateUserTool,
      getUserProfileTool,
      
      // Wallet Integration Tools
      setupWalletIntegrationTool,
      generateTransactionTool,
      configureChainsTest,
      handleWalletEventsTool,
      
      // SDK Integration Tools
      initializeSDKTool,
      handleSDKEventsTool,
      implementNotificationsTool,
      generateNavigationTool,
      implementSharingTool,
      
      // Development Tools
      startDevServerTool,
      generateTestSuiteTool,
      debugMiniAppTool,
      optimizePerformanceTool,
      generateErrorBoundaryTool,
      
      // Publishing Tools
      publishMiniAppTool,
      generateShareLinkTool,
      setupAnalyticsTool,
      generateDeploymentScriptTool,
      validateDeploymentTool,
      
      // Knowledge Base Tools
      getKnowledgeTool,
      searchKnowledgeTool,
      listTopicsTool,
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Project Setup Tools
    if (name.startsWith("farcaster_create_mini_app") || 
        name.startsWith("farcaster_generate_manifest") ||
        name.startsWith("farcaster_validate_manifest") ||
        name.startsWith("farcaster_setup_dev_environment")) {
      return await handleProjectSetup(name, args);
    }

    // Authentication Tools
    if (name.startsWith("farcaster_implement_siwf") ||
        name.startsWith("farcaster_generate_auth_flow") ||
        name.startsWith("farcaster_validate_user") ||
        name.startsWith("farcaster_get_user_profile")) {
      return await handleAuth(name, args);
    }

    // Wallet Tools
    if (name.startsWith("farcaster_setup_wallet") ||
        name.startsWith("farcaster_generate_transaction") ||
        name.startsWith("farcaster_configure_chains") ||
        name.startsWith("farcaster_handle_wallet_events")) {
      return await handleWallet(name, args);
    }

    // SDK Tools
    if (name.startsWith("farcaster_initialize_sdk") ||
        name.startsWith("farcaster_handle_sdk_events") ||
        name.startsWith("farcaster_implement_notifications") ||
        name.startsWith("farcaster_generate_navigation") ||
        name.startsWith("farcaster_implement_sharing")) {
      return await handleSDK(name, args);
    }

    // Development Tools
    if (name.startsWith("farcaster_start_dev_server") ||
        name.startsWith("farcaster_generate_test_suite") ||
        name.startsWith("farcaster_debug_mini_app") ||
        name.startsWith("farcaster_optimize_performance") ||
        name.startsWith("farcaster_generate_error_boundary")) {
      return await handleDevelopment(name, args);
    }

    // Publishing Tools
    if (name.startsWith("farcaster_publish_mini_app") ||
        name.startsWith("farcaster_generate_share_link") ||
        name.startsWith("farcaster_setup_analytics") ||
        name.startsWith("farcaster_generate_deployment_script") ||
        name.startsWith("farcaster_validate_deployment")) {
      return await handlePublishing(name, args);
    }

    // Knowledge Base Tools
    if (name === "farcaster_get_knowledge") {
      const { category, topic, tag } = args as any;
      const knowledge = getKnowledgeByCategory(category, topic, tag);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(knowledge, null, 2)
          }
        ]
      };
    }

    if (name === "farcaster_search_knowledge") {
      const { query, categories } = args as any;
      const results = searchKnowledge(query, categories);
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2)
          }
        ]
      };
    }

    if (name === "farcaster_list_topics") {
      const topics = listAllTopics();
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(topics, null, 2)
          }
        ]
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Farcaster Dev MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});