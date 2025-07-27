# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development Workflow
- `npm run dev` - Start development server with hot reload using tsx
- `npm run build` - Compile TypeScript to JavaScript in dist/ folder
- `npm start` - Run production server from compiled dist/index.js
- `npm run lint` - TypeScript compilation serves as linting (no separate ESLint setup)
- `npm run format` - Format code with Prettier

### Testing
- `node test-server.cjs` - Test MCP server functionality (CommonJS test script)
- `npm test` - Run Jest tests (configured but not implemented)

### MCP Server Installation
```bash
# Add to Claude MCP CLI locally
claude mcp add farcaster-dev-mcp-server node /full/path/to/dist/index.js

# Add globally
claude mcp add farcaster-dev-mcp-server -s user node /full/path/to/dist/index.js
```

## Architecture Overview

This is a **Model Context Protocol (MCP) server** for Farcaster Mini App development with a three-layer architecture:

### 1. Tool Layer (`src/tools/`)
- **Tool Definitions**: Each file exports MCP tool objects with schemas
- **Categories**: project-setup, auth, wallet, sdk-integration, development, publishing
- **Structure**: Tools define name, description, and JSON Schema for input validation

### 2. Handler Layer (`src/handlers/`)
- **Implementation Logic**: Actual tool execution happens here
- **Pattern**: Each handler maps tool names to implementation functions
- **Return Format**: All handlers return `{ content: [{ type: "text", text: "..." }] }`

### 3. Knowledge Base (`src/knowledge/`)
- **Searchable Documentation**: Categorized Farcaster development knowledge
- **Categories**: core-concepts, authentication, wallet-integration, best-practices
- **Structure**: Each category exports objects with title, content, tags, and category
- **Access**: Via knowledge tools (get, search, list) with filtering capabilities

### Core Server (`src/index.ts`)
- **MCP Protocol**: Uses @modelcontextprotocol/sdk for standard MCP communication
- **Tool Registration**: Imports and registers all 30+ tools in ListToolsRequestSchema handler
- **Request Routing**: CallToolRequestSchema handler routes to appropriate category handlers
- **Knowledge Integration**: Direct integration with knowledge base for search/retrieval

### Key Architectural Patterns

**Tool Naming Convention**: All tools prefixed with `farcaster_` + category + action
- Example: `farcaster_create_mini_app`, `farcaster_setup_wallet_integration`

**Handler Pattern**: Each category has its own handler that switches on tool name
```typescript
export async function handleProjectSetup(toolName: string, args: any) {
  switch (toolName) {
    case "farcaster_create_mini_app":
      return createMiniApp(args);
    // ...
  }
}
```

**Knowledge Structure**: Hierarchical with categories → topics → content
- Categories have getters by key, tag, and "all" functions
- Search functionality spans multiple categories with filtering
- Content includes title, body text, category classification, and tags

**Type Safety**: Uses Zod for runtime validation and TypeScript for compile-time safety
- Tool schemas defined in tools/ files
- Type definitions in src/types/index.ts
- ESM modules throughout (package.json has "type": "module")

## Development Notes

- **Build Output**: All compiled files go to `dist/` (gitignored)
- **Node Version**: Requires Node.js >=18.0.0
- **Module System**: ESM only - all imports use .js extensions even for .ts files
- **MCP Communication**: Server communicates via stdio, not HTTP
- **Tool Generation**: Most tools generate code snippets, configurations, or documentation rather than executing actions

When adding new tools:
1. Define tool schema in appropriate `src/tools/` file
2. Add implementation function to corresponding `src/handlers/` file  
3. Update handler switch statement to include new tool
4. Register tool in main server tool list (`src/index.ts`)
5. Consider adding related knowledge base content if applicable