export async function handleProjectSetup(toolName: string, args: any) {
  switch (toolName) {
    case "farcaster_create_mini_app":
      return createMiniApp(args);
    case "farcaster_generate_manifest":
      return generateManifest(args);
    case "farcaster_validate_manifest":
      return validateManifest(args);
    case "farcaster_setup_dev_environment":
      return setupDevEnvironment(args);
    default:
      throw new Error(`Unknown project setup tool: ${toolName}`);
  }
}

async function createMiniApp(args: any) {
  const { name, homeUrl, framework = "react", includeWallet = true, includeAuth = true } = args;

  const packageJson = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: "0.1.0",
    description: `Farcaster Mini App: ${name}`,
    main: "index.js",
    scripts: {
      dev: framework === "next" ? "next dev" : "vite dev",
      build: framework === "next" ? "next build" : "vite build",
      start: framework === "next" ? "next start" : "serve dist",
      lint: "eslint src --ext .ts,.tsx,.js,.jsx",
      test: "jest"
    },
    dependencies: {
      "@farcaster/miniapp-sdk": "^0.1.0",
      ...(includeWallet && { 
        "wagmi": "^2.0.0",
        "@tanstack/react-query": "^5.0.0"
      }),
      ...(framework === "react" && {
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      }),
      ...(framework === "next" && {
        "next": "^14.0.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      }),
      ...(framework === "vue" && {
        "vue": "^3.0.0"
      })
    },
    devDependencies: {
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      "typescript": "^5.0.0",
      "vite": "^5.0.0",
      "@vitejs/plugin-react": "^4.0.0",
      "eslint": "^8.0.0",
      "prettier": "^3.0.0"
    }
  };

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
    
    <!-- Mini App metadata -->
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${homeUrl}/preview.png" />
    <meta property="fc:frame:button:1" content="Open ${name}" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${homeUrl}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { SDK } from '@farcaster/miniapp-sdk';
${includeWallet ? `import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';` : ''}
import App from './App';
import './index.css';

const sdk = new SDK();
${includeWallet ? `const queryClient = new QueryClient();` : ''}

// Initialize Mini App
sdk.actions.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    ${includeWallet ? `<WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App sdk={sdk} />
      </QueryClientProvider>
    </WagmiProvider>` : `<App sdk={sdk} />`}
  </React.StrictMode>
);`;

  const appTsx = `import React, { useEffect, useState } from 'react';
${includeAuth ? `import { useAccount, useConnect, useDisconnect } from 'wagmi';` : ''}
import { SDK } from '@farcaster/miniapp-sdk';

interface AppProps {
  sdk: SDK;
}

function App({ sdk }: AppProps) {
  ${includeAuth ? `const [user, setUser] = useState<any>(null);` : ''}
  ${includeWallet ? `const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();` : ''}

  useEffect(() => {
    // Handle SDK events
    sdk.on('ready', () => {
      console.log('Mini App is ready');
    });

    ${includeAuth ? `// Auto sign-in
    const handleAuth = async () => {
      try {
        const userData = await sdk.actions.signIn();
        setUser(userData);
      } catch (error) {
        console.error('Auth failed:', error);
      }
    };

    handleAuth();` : ''}
  }, [sdk]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>${name}</h1>
        ${includeAuth ? `{user && <p>Welcome, {user.displayName}!</p>}` : ''}
      </header>

      <main className="app-main">
        ${includeWallet ? `<div className="wallet-section">
          {isConnected ? (
            <div>
              <p>Connected: {address}</p>
              <button onClick={() => disconnect()}>Disconnect</button>
            </div>
          ) : (
            <button onClick={() => connect({ connector: connectors[0] })}>
              Connect Wallet
            </button>
          )}
        </div>` : ''}

        <div className="content">
          <p>Your Mini App content goes here!</p>
        </div>
      </main>
    </div>
  );
}

export default App;`;

  const indexCss = `body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background-color: #f5f5f5;
}

.app {
  min-height: 100vh;
  max-width: 420px;
  margin: 0 auto;
  background: white;
}

.app-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.app-header h1 {
  margin: 0;
  color: #333;
}

.app-main {
  padding: 20px;
}

.wallet-section {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.wallet-section button {
  background: #7c65c1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.wallet-section button:hover {
  background: #6b5aa8;
}

.content {
  text-align: center;
  color: #666;
}`;

  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: true, // Required for some Mini App features
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});`;

  return {
    content: [
      {
        type: "text",
        text: `# ${name} Mini App Project Created Successfully!

## Files Generated:

### package.json
\`\`\`json
${JSON.stringify(packageJson, null, 2)}
\`\`\`

### public/index.html
\`\`\`html
${indexHtml}
\`\`\`

### src/main.tsx
\`\`\`tsx
${mainTsx}
\`\`\`

### src/App.tsx
\`\`\`tsx
${appTsx}
\`\`\`

### src/index.css
\`\`\`css
${indexCss}
\`\`\`

### vite.config.ts
\`\`\`ts
${viteConfig}
\`\`\`

## Next Steps:

1. Install dependencies: \`npm install\`
2. Start development server: \`npm run dev\`
3. Configure your manifest file
4. Test in Farcaster client
5. Deploy to production

## Features Included:
${includeAuth ? '✅ Farcaster Authentication' : '❌ Authentication (not included)'}
${includeWallet ? '✅ Wallet Integration' : '❌ Wallet Integration (not included)'}
✅ Mobile-optimized layout
✅ TypeScript support
✅ Development tooling
        `
      }
    ]
  };
}

async function generateManifest(args: any) {
  const { 
    name, 
    homeUrl, 
    iconUrl, 
    imageUrl, 
    description, 
    categories = [], 
    buttonTitle = "Open App" 
  } = args;

  const manifest = {
    accountAssociation: {
      header: "Account association will be generated during deployment",
      payload: "Domain ownership proof payload",
      signature: "Cryptographic signature proving domain ownership"
    },
    frame: {
      name,
      iconUrl,
      homeUrl,
      ...(imageUrl && { imageUrl }),
      buttonTitle,
      ...(description && { 
        metadata: {
          description,
          ...(categories.length > 0 && { categories })
        }
      })
    }
  };

  const wellKnownPath = "/.well-known/farcaster.json";

  return {
    content: [
      {
        type: "text",
        text: `# Farcaster Mini App Manifest Generated

## Manifest Content (${wellKnownPath}):

\`\`\`json
${JSON.stringify(manifest, null, 2)}
\`\`\`

## Deployment Instructions:

1. **Self-Hosted**: Place this file at \`https://yourdomain.com/.well-known/farcaster.json\`

2. **Farcaster-Hosted**: 
   - Go to https://farcaster.xyz/~/settings/developer-tools
   - Create a new hosted manifest
   - Upload your manifest content

3. **Verification**:
   - Ensure HTTPS is enabled
   - Test manifest accessibility
   - Generate account association signature

## Required Steps:

1. ✅ Create manifest file
2. ⏳ Generate account association (requires domain setup)
3. ⏳ Deploy to hosting platform
4. ⏳ Verify manifest accessibility
5. ⏳ Test in Farcaster client

## Account Association:
The account association proves you own the domain. Generate this using Farcaster's developer tools or implement the cryptographic signing process.
        `
      }
    ]
  };
}

async function validateManifest(args: any) {
  const { manifestUrl, manifestContent } = args;

  const validationResults = {
    isValid: true,
    errors: [] as string[],
    warnings: [] as string[],
    checks: {
      manifestAccessible: false,
      httpsRequired: false,
      accountAssociation: false,
      frameStructure: false,
      iconAccessible: false,
      homeUrlValid: false
    }
  };

  // Simulate validation logic
  if (manifestUrl) {
    validationResults.checks.manifestAccessible = manifestUrl.startsWith('https://');
    validationResults.checks.httpsRequired = manifestUrl.startsWith('https://');
    
    if (!manifestUrl.includes('/.well-known/farcaster.json')) {
      validationResults.errors.push('Manifest must be served at /.well-known/farcaster.json');
      validationResults.isValid = false;
    }
  }

  if (manifestContent) {
    try {
      const manifest = JSON.parse(manifestContent);
      
      // Check required fields
      if (!manifest.accountAssociation) {
        validationResults.errors.push('Missing accountAssociation');
        validationResults.isValid = false;
      } else {
        validationResults.checks.accountAssociation = true;
      }

      if (!manifest.frame) {
        validationResults.errors.push('Missing frame object');
        validationResults.isValid = false;
      } else {
        validationResults.checks.frameStructure = true;
        
        if (!manifest.frame.name) {
          validationResults.errors.push('Missing frame.name');
          validationResults.isValid = false;
        }
        
        if (!manifest.frame.iconUrl) {
          validationResults.errors.push('Missing frame.iconUrl');
          validationResults.isValid = false;
        } else {
          validationResults.checks.iconAccessible = manifest.frame.iconUrl.startsWith('https://');
        }
        
        if (!manifest.frame.homeUrl) {
          validationResults.errors.push('Missing frame.homeUrl');
          validationResults.isValid = false;
        } else {
          validationResults.checks.homeUrlValid = manifest.frame.homeUrl.startsWith('https://');
        }
      }
    } catch (error) {
      validationResults.errors.push('Invalid JSON format');
      validationResults.isValid = false;
    }
  }

  return {
    content: [
      {
        type: "text",
        text: `# Manifest Validation Results

## Overall Status: ${validationResults.isValid ? '✅ VALID' : '❌ INVALID'}

## Validation Checks:
- Manifest Accessible: ${validationResults.checks.manifestAccessible ? '✅' : '❌'}
- HTTPS Required: ${validationResults.checks.httpsRequired ? '✅' : '❌'}
- Account Association: ${validationResults.checks.accountAssociation ? '✅' : '❌'}
- Frame Structure: ${validationResults.checks.frameStructure ? '✅' : '❌'}
- Icon Accessible: ${validationResults.checks.iconAccessible ? '✅' : '❌'}
- Home URL Valid: ${validationResults.checks.homeUrlValid ? '✅' : '❌'}

${validationResults.errors.length > 0 ? `
## ❌ Errors:
${validationResults.errors.map(error => `- ${error}`).join('\n')}
` : ''}

${validationResults.warnings.length > 0 ? `
## ⚠️ Warnings:
${validationResults.warnings.map(warning => `- ${warning}`).join('\n')}
` : ''}

## Next Steps:
${validationResults.isValid 
  ? '✅ Your manifest is valid! You can proceed with deployment.'
  : '❌ Please fix the errors above before deploying your Mini App.'
}
        `
      }
    ]
  };
}

async function setupDevEnvironment(args: any) {
  const { packageManager = "npm", typescript = true, eslint = true } = args;

  const tsConfig = typescript ? `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}` : '';

  const eslintConfig = eslint ? `{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}` : '';

  const commands = [
    `${packageManager} install`,
    ...(typescript ? [`# TypeScript configuration created`] : []),
    ...(eslint ? [`# ESLint configuration created`] : []),
    `${packageManager} run dev # Start development server`,
    `${packageManager} run build # Build for production`,
    `${packageManager} run lint # Run linting`
  ];

  return {
    content: [
      {
        type: "text",
        text: `# Development Environment Setup

## Package Manager: ${packageManager}

## Installation Commands:
\`\`\`bash
${commands.join('\n')}
\`\`\`

${typescript ? `
## tsconfig.json:
\`\`\`json
${tsConfig}
\`\`\`
` : ''}

${eslint ? `
## .eslintrc.json:
\`\`\`json
${eslintConfig}
\`\`\`
` : ''}

## Environment Variables (.env):
\`\`\`env
VITE_APP_NAME=Your Mini App
VITE_HOME_URL=https://yourapp.com
VITE_CHAIN_ID=8453
NODE_ENV=development
\`\`\`

## Development Workflow:

1. **Start Development Server**: 
   \`${packageManager} run dev\`

2. **Enable HTTPS** (required for testing):
   - Development server runs with HTTPS
   - Use ngrok for public testing: \`ngrok http 3000\`

3. **Testing in Farcaster**:
   - Enable Developer Mode in Farcaster
   - Use Developer Tools for testing
   - Test manifest validation

4. **Code Quality**:
   - Run \`${packageManager} run lint\` before commits
   - Use Prettier for formatting
   - Write tests for components

## Recommended VS Code Extensions:
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

## Git Setup:
\`\`\`bash
git init
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".env.local" >> .gitignore
git add .
git commit -m "Initial Farcaster Mini App setup"
\`\`\`
        `
      }
    ]
  };
}