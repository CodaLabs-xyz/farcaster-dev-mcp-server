import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const setupWalletIntegrationTool: Tool = {
  name: "farcaster_setup_wallet_integration",
  description: "Setup wallet integration using EIP-1193 provider and Wagmi",
  inputSchema: {
    type: "object",
    properties: {
      framework: {
        type: "string",
        enum: ["react", "vue", "vanilla"],
        description: "Frontend framework"
      },
      chains: {
        type: "array",
        items: { type: "string" },
        description: "Blockchain networks to support",
        default: ["ethereum", "base", "optimism"]
      },
      includeConnectors: {
        type: "array",
        items: { type: "string" },
        description: "Wallet connectors to include",
        default: ["miniapp", "injected", "walletconnect"]
      }
    },
    required: ["framework"]
  }
};

export const generateTransactionTool: Tool = {
  name: "farcaster_generate_transaction",
  description: "Generate transaction code for single or batch operations",
  inputSchema: {
    type: "object",
    properties: {
      transactionType: {
        type: "string",
        enum: ["single", "batch", "erc20-transfer", "nft-mint", "contract-call"],
        description: "Type of transaction to generate"
      },
      contractAddress: {
        type: "string",
        description: "Contract address (if applicable)"
      },
      abi: {
        type: "string",
        description: "Contract ABI JSON (if applicable)"
      },
      includeGasEstimation: {
        type: "boolean",
        description: "Include gas estimation logic",
        default: true
      },
      includeTxPreview: {
        type: "boolean",
        description: "Include transaction preview UI",
        default: true
      }
    },
    required: ["transactionType"]
  }
};

export const configureChainsTest: Tool = {
  name: "farcaster_configure_chains",
  description: "Configure blockchain networks for wallet integration",
  inputSchema: {
    type: "object",
    properties: {
      mainnet: {
        type: "boolean",
        description: "Include Ethereum mainnet",
        default: true
      },
      base: {
        type: "boolean",
        description: "Include Base network",
        default: true
      },
      optimism: {
        type: "boolean",
        description: "Include Optimism",
        default: false
      },
      polygon: {
        type: "boolean",
        description: "Include Polygon",
        default: false
      },
      customRpcs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            chainId: { type: "number" },
            name: { type: "string" },
            rpcUrl: { type: "string" },
            explorerUrl: { type: "string" }
          }
        },
        description: "Custom RPC configurations"
      }
    }
  }
};

export const handleWalletEventsTool: Tool = {
  name: "farcaster_handle_wallet_events",
  description: "Generate wallet event handling code (connection, disconnection, chain changes)",
  inputSchema: {
    type: "object",
    properties: {
      events: {
        type: "array",
        items: {
          type: "string",
          enum: ["connect", "disconnect", "accountsChanged", "chainChanged"]
        },
        description: "Wallet events to handle",
        default: ["connect", "disconnect", "chainChanged"]
      },
      includeErrorHandling: {
        type: "boolean",
        description: "Include comprehensive error handling",
        default: true
      },
      includeLogging: {
        type: "boolean",
        description: "Include event logging for debugging",
        default: true
      }
    }
  }
};