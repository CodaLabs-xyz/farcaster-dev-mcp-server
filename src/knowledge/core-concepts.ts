export const coreConcepts = {
  "mini-apps-overview": {
    title: "Farcaster Mini Apps Overview",
    content: `
# Farcaster Mini Apps

Mini apps are web applications built with HTML, CSS, and JavaScript that can be discovered and used within Farcaster clients. They provide access to native Farcaster features through the SDK.

## Key Features:
- **Native Integration**: Access to Farcaster authentication, notifications, and social features
- **Wallet Integration**: Built-in wallet connectivity with EIP-1193 support
- **Social Distribution**: Discoverable through Farcaster feeds and casts
- **Mobile Optimized**: Designed for vertical mobile modal experience

## Architecture:
- **Host**: The Farcaster client (app or web)
- **Mini App**: Your web application running in an iframe/webview
- **SDK**: JavaScript bridge between Mini App and Host
- **Manifest**: Configuration file defining app metadata and permissions

## Requirements:
- Node.js 22.11.0+ for development
- HTTPS hosting for production
- Valid manifest file at /.well-known/farcaster.json
    `,
    category: "core-concepts",
    tags: ["overview", "architecture", "requirements"]
  },

  "manifest-specification": {
    title: "Manifest File Specification",
    content: `
# Manifest File (/.well-known/farcaster.json)

The manifest file defines your Mini App's metadata and configuration.

## Required Fields:

### Account Association
Proves domain ownership through cryptographic signature.

### Frame Object
- **name**: Display name of your app
- **iconUrl**: App icon (recommended 200x200px)
- **homeUrl**: Entry point URL of your app
- **imageUrl**: Preview image (optional)
- **buttonTitle**: Custom button text (optional)

## Example Structure:
\`\`\`json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...", 
    "signature": "..."
  },
  "frame": {
    "name": "My Mini App",
    "iconUrl": "https://example.com/icon.png",
    "homeUrl": "https://example.com",
    "imageUrl": "https://example.com/preview.png",
    "buttonTitle": "Open App"
  }
}
\`\`\`

## Hosting Options:
1. Self-hosted on your domain
2. Farcaster-hosted via Developer Tools
3. CDN/static hosting services
    `,
    category: "core-concepts",
    tags: ["manifest", "configuration", "hosting"]
  },

  "sdk-overview": {
    title: "Mini App SDK Overview",
    content: `
# Farcaster Mini App SDK

The SDK provides communication between your Mini App and the Farcaster client.

## Installation:
\`\`\`bash
npm install @farcaster/miniapp-sdk
\`\`\`

## Basic Setup:
\`\`\`javascript
import { SDK } from '@farcaster/miniapp-sdk';

const sdk = new SDK();

// Signal app is ready to display
sdk.actions.ready();
\`\`\`

## Core Capabilities:

### Actions
- \`ready()\`: Signal app is loaded and ready
- \`close()\`: Close the Mini App
- \`openUrl(url)\`: Open external URL

### Authentication
- \`signIn()\`: Authenticate user with Farcaster
- \`getUserData()\`: Get current user information

### Wallet Integration
- Access to EIP-1193 provider
- Transaction signing and submission
- Chain detection and switching

### Events
- \`sdk.on('ready', callback)\`: App initialization
- \`sdk.on('auth', callback)\`: Authentication state changes
- \`sdk.on('close', callback)\`: App closing

## Best Practices:
- Always call \`ready()\` after app initialization
- Handle authentication state properly
- Implement proper error boundaries
- Test in mobile viewport
    `,
    category: "core-concepts", 
    tags: ["sdk", "api", "integration"]
  }
};

export const getCoreConceptByKey = (key: string) => coreConcepts[key as keyof typeof coreConcepts];
export const getAllCoreConcepts = () => Object.values(coreConcepts);
export const getCoreConceptsByTag = (tag: string) => 
  Object.values(coreConcepts).filter(concept => concept.tags.includes(tag));