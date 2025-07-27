# Farcaster Dev MCP Server

A comprehensive Model Context Protocol (MCP) server designed to accelerate Farcaster Mini App development. This server provides developers with essential tools, code generation capabilities, and extensive knowledge base for building successful Mini Apps on the Farcaster protocol.

## 🚀 Features

### 🛠️ Development Tools (30+ Tools)
- **Project Setup**: Create new Mini Apps, generate manifests, setup development environment
- **Authentication**: Implement Sign In With Farcaster (SIWF), manage user sessions
- **Wallet Integration**: Configure Wagmi, handle transactions, manage wallet events
- **SDK Integration**: Initialize Farcaster SDK, handle events, implement notifications
- **Development**: Start dev servers, generate tests, debug applications
- **Publishing**: Deploy apps, setup analytics, create share links

### 📚 Knowledge Base
- **Core Concepts**: Mini Apps architecture, manifest specifications, SDK overview
- **Authentication**: SIWF implementation patterns, session management strategies
- **Wallet Integration**: Transaction handling, chain configuration, error management
- **Best Practices**: Mobile optimization, security guidelines, performance tips

## 📦 Installation

```bash
# Clone or create the project
git clone <repository-url>
cd farcaster-dev-mcp-server

# Install dependencies
npm install

# Build the server
npm run build

# Start development mode
npm run dev
```

## 🔧 Configuration

### MCP Client Setup

Add the server to your MCP client configuration:

```json
{
  "mcpServers": {
    "farcaster-dev": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "./farcaster-dev-mcp-server"
    }
  }
}
```

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
LOG_LEVEL=info
```

## 🛠️ Available Tools

### Project Setup Tools
- `farcaster_create_mini_app` - Create a new Farcaster Mini App project
- `farcaster_generate_manifest` - Generate manifest file for Mini App
- `farcaster_validate_manifest` - Validate manifest file compliance
- `farcaster_setup_dev_environment` - Setup development environment

### Authentication Tools
- `farcaster_implement_siwf` - Generate SIWF implementation code
- `farcaster_generate_auth_flow` - Create complete authentication flow
- `farcaster_validate_user` - Validate user authentication
- `farcaster_get_user_profile` - Fetch user profile information

### Wallet Integration Tools
- `farcaster_setup_wallet_integration` - Setup Wagmi wallet integration
- `farcaster_generate_transaction` - Generate transaction handling code
- `farcaster_configure_chains` - Configure blockchain networks
- `farcaster_handle_wallet_events` - Handle wallet connection events

### SDK Integration Tools
- `farcaster_initialize_sdk` - Initialize Farcaster Mini App SDK
- `farcaster_handle_sdk_events` - Handle SDK lifecycle events
- `farcaster_implement_notifications` - Setup notification system
- `farcaster_generate_navigation` - Create navigation patterns
- `farcaster_implement_sharing` - Implement social sharing

### Development Tools
- `farcaster_start_dev_server` - Start local development server
- `farcaster_generate_test_suite` - Generate comprehensive tests
- `farcaster_debug_mini_app` - Generate debugging utilities
- `farcaster_optimize_performance` - Performance optimization tools
- `farcaster_generate_error_boundary` - Create error boundaries

### Publishing Tools
- `farcaster_publish_mini_app` - Publish Mini App with manifest hosting
- `farcaster_generate_share_link` - Generate shareable links
- `farcaster_setup_analytics` - Setup analytics and monitoring
- `farcaster_generate_deployment_script` - Generate deployment scripts
- `farcaster_validate_deployment` - Validate deployment setup

### Knowledge Base Tools
- `farcaster_get_knowledge` - Access categorized knowledge topics
- `farcaster_search_knowledge` - Search through knowledge base
- `farcaster_list_topics` - List all available topics

## 📚 Knowledge Categories

### Core Concepts
- Mini Apps overview and architecture
- Manifest file specification
- SDK overview and capabilities

### Authentication
- Sign In With Farcaster (SIWF) implementation
- User session management
- Profile integration patterns

### Wallet Integration
- Wagmi setup and configuration
- Transaction handling (single & batch)
- Wallet event management

### Best Practices
- Mobile-first design principles
- Comprehensive error handling
- Security guidelines and validation

## 🎯 Quick Start Example

```typescript
// Create a new Mini App
{
  "tool": "farcaster_create_mini_app",
  "arguments": {
    "name": "My Awesome Mini App",
    "homeUrl": "https://myapp.com",
    "framework": "react",
    "includeWallet": true,
    "includeAuth": true
  }
}

// Get knowledge about authentication
{
  "tool": "farcaster_get_knowledge",
  "arguments": {
    "category": "authentication",
    "topic": "siwf-implementation"
  }
}

// Setup wallet integration
{
  "tool": "farcaster_setup_wallet_integration",
  "arguments": {
    "framework": "react",
    "chains": ["ethereum", "base", "optimism"],
    "includeConnectors": ["miniapp", "injected"]
  }
}
```

## 🏗️ Project Structure

```
src/
├── tools/              # MCP tools organized by category
│   ├── project-setup.ts
│   ├── auth.ts
│   ├── wallet.ts
│   ├── sdk-integration.ts
│   ├── development.ts
│   └── publishing.ts
├── knowledge/          # Knowledge base with categorized topics
│   ├── core-concepts.ts
│   ├── authentication.ts
│   ├── wallet-integration.ts
│   ├── best-practices.ts
│   └── index.ts
├── handlers/           # Tool implementation handlers
├── types/             # TypeScript type definitions
└── index.ts           # Main MCP server
```

## 🔍 Usage Examples

### Creating a New Mini App

```bash
# Use the MCP client to call:
farcaster_create_mini_app {
  "name": "Weather Mini App",
  "homeUrl": "https://weather.myapp.com",
  "framework": "react",
  "includeWallet": true,
  "includeAuth": true
}
```

This generates a complete React project with:
- Farcaster SDK integration
- Wallet connectivity with Wagmi
- Authentication flow
- Mobile-optimized layout
- TypeScript configuration
- Development tooling

### Getting Help with Authentication

```bash
# Search for authentication knowledge
farcaster_search_knowledge {
  "query": "sign in with farcaster",
  "categories": ["authentication"]
}

# Get specific implementation guidance
farcaster_get_knowledge {
  "category": "authentication",
  "topic": "siwf-implementation"
}
```

### Setting Up Wallet Integration

```bash
# Generate Wagmi configuration
farcaster_setup_wallet_integration {
  "framework": "react",
  "chains": ["ethereum", "base"],
  "includeConnectors": ["miniapp", "injected"]
}

# Generate transaction handling code
farcaster_generate_transaction {
  "transactionType": "erc20-transfer",
  "includeGasEstimation": true,
  "includeTxPreview": true
}
```

## 🛡️ Security Best Practices

The server includes comprehensive security guidance:

- Input validation patterns
- Secure session management
- Transaction security measures
- Content Security Policy setup
- Environment variable handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Roadmap

- [ ] Enhanced testing tools and patterns
- [ ] Advanced debugging utilities
- [ ] Performance monitoring integration
- [ ] Additional framework support (Vue, Svelte)
- [ ] Extended publishing platform integrations
- [ ] Advanced analytics implementations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Farcaster](https://farcaster.xyz) for the amazing protocol
- [Model Context Protocol](https://modelcontextprotocol.io) for the framework
- The Farcaster developer community for inspiration and feedback

## 📞 Support

- **Documentation**: [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz/docs)
- **Community**: [Farcaster Discord](https://discord.gg/farcaster)
- **Issues**: [GitHub Issues](https://github.com/yourusername/farcaster-dev-mcp-server/issues)

---

**Built with ❤️ for the Farcaster developer community**

