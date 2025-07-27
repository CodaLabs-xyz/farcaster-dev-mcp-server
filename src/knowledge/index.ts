import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { coreConcepts, getCoreConceptByKey, getAllCoreConcepts, getCoreConceptsByTag } from "./core-concepts.js";
import { authenticationKnowledge, getAuthKnowledgeByKey, getAllAuthKnowledge, getAuthKnowledgeByTag } from "./authentication.js";
import { walletKnowledge, getWalletKnowledgeByKey, getAllWalletKnowledge, getWalletKnowledgeByTag } from "./wallet-integration.js";
import { bestPracticesKnowledge, getBestPracticesKnowledgeByKey, getAllBestPracticesKnowledge, getBestPracticesKnowledgeByTag } from "./best-practices.js";

export const getKnowledgeTool: Tool = {
  name: "farcaster_get_knowledge",
  description: "Get comprehensive knowledge about Farcaster Mini App development topics",
  inputSchema: {
    type: "object",
    properties: {
      category: {
        type: "string",
        enum: ["core-concepts", "authentication", "wallet-integration", "best-practices", "all"],
        description: "Knowledge category to retrieve"
      },
      topic: {
        type: "string",
        description: "Specific topic key to retrieve (optional)"
      },
      tag: {
        type: "string",
        description: "Filter by tag (optional)"
      }
    },
    required: ["category"]
  }
};

export const searchKnowledgeTool: Tool = {
  name: "farcaster_search_knowledge",
  description: "Search through Farcaster Mini App knowledge base",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query to find relevant knowledge"
      },
      categories: {
        type: "array",
        items: {
          type: "string",
          enum: ["core-concepts", "authentication", "wallet-integration", "best-practices"]
        },
        description: "Categories to search in (optional)"
      }
    },
    required: ["query"]
  }
};

export const listTopicsTool: Tool = {
  name: "farcaster_list_topics",
  description: "List all available knowledge topics and categories",
  inputSchema: {
    type: "object",
    properties: {
      format: {
        type: "string",
        enum: ["simple", "detailed"],
        description: "Output format",
        default: "simple"
      }
    }
  }
};

// Knowledge retrieval functions
export function getKnowledgeByCategory(category: string, topic?: string, tag?: string) {
  switch (category) {
    case "core-concepts":
      if (topic) return getCoreConceptByKey(topic);
      if (tag) return getCoreConceptsByTag(tag);
      return getAllCoreConcepts();
      
    case "authentication":
      if (topic) return getAuthKnowledgeByKey(topic);
      if (tag) return getAuthKnowledgeByTag(tag);
      return getAllAuthKnowledge();
      
    case "wallet-integration":
      if (topic) return getWalletKnowledgeByKey(topic);
      if (tag) return getWalletKnowledgeByTag(tag);
      return getAllWalletKnowledge();
      
    case "best-practices":
      if (topic) return getBestPracticesKnowledgeByKey(topic);
      if (tag) return getBestPracticesKnowledgeByTag(tag);
      return getAllBestPracticesKnowledge();
      
    case "all":
      return [
        ...getAllCoreConcepts(),
        ...getAllAuthKnowledge(),
        ...getAllWalletKnowledge(),
        ...getAllBestPracticesKnowledge()
      ];
      
    default:
      return null;
  }
}

export function searchKnowledge(query: string, categories?: string[]) {
  const searchTerm = query.toLowerCase();
  const allKnowledge = categories 
    ? categories.flatMap(cat => getKnowledgeByCategory(cat) || [])
    : getKnowledgeByCategory("all") || [];

  return (allKnowledge as any[]).filter((item: any) => {
    if (Array.isArray(item)) return false;
    
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm) ||
      item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
    );
  });
}

export function listAllTopics() {
  return {
    "core-concepts": Object.keys(coreConcepts),
    "authentication": Object.keys(authenticationKnowledge),
    "wallet-integration": Object.keys(walletKnowledge),
    "best-practices": Object.keys(bestPracticesKnowledge)
  };
}

export { coreConcepts, authenticationKnowledge, walletKnowledge, bestPracticesKnowledge };