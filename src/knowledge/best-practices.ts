export const bestPracticesKnowledge = {
  "mobile-optimization": {
    title: "Mobile-First Design for Mini Apps",
    content: `
# Mobile-First Design for Mini Apps

Mini Apps render in vertical mobile modals - optimize for this experience.

## Viewport Considerations:
- **Width**: Typically 375px (iPhone) to 414px (iPhone Plus)
- **Height**: Variable based on content and device
- **Orientation**: Always portrait
- **Safe Areas**: Account for notches and home indicators

## CSS Best Practices:
\`\`\`css
/* Base mobile styles */
.mini-app {
  max-width: 100vw;
  min-height: 100vh;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) 
           env(safe-area-inset-bottom) env(safe-area-inset-left);
  box-sizing: border-box;
}

/* Touch-friendly interactive elements */
.button {
  min-height: 44px; /* iOS minimum touch target */
  min-width: 44px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px; /* Prevent zoom on iOS */
}

/* Scrollable content */
.content {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: calc(100vh - 100px); /* Account for header/footer */
}
\`\`\`

## Layout Patterns:
\`\`\`jsx
// Stack layout (recommended)
function StackLayout({ children }) {
  return (
    <div className="stack">
      {children}
    </div>
  );
}

// Card-based UI
function CardLayout({ title, children }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
\`\`\`

## Performance Optimization:
- Use \`transform\` instead of changing \`left/top\` for animations
- Minimize reflows and repaints
- Lazy load images and components
- Use \`will-change\` property sparingly
- Optimize for 60fps scrolling

## Accessibility:
- Ensure minimum 16px font size
- Provide sufficient color contrast
- Use semantic HTML elements
- Add proper ARIA labels
- Support screen readers
    `,
    category: "best-practices",
    tags: ["mobile", "responsive", "performance"]
  },

  "error-handling": {
    title: "Comprehensive Error Handling",
    content: `
# Comprehensive Error Handling

Implement robust error handling for a smooth user experience.

## Error Boundary (React):
\`\`\`jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Report to analytics/monitoring service
    reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>We're sorry for the inconvenience.</p>
          <button onClick={() => window.location.reload()}>
            Refresh App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
\`\`\`

## API Error Handling:
\`\`\`javascript
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new APIError(
        response.status,
        response.statusText,
        await response.json()
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    throw new APIError(0, 'Network Error', {
      message: 'Unable to connect to server'
    });
  }
}

class APIError extends Error {
  constructor(status, statusText, data) {
    super(\`API Error \${status}: \${statusText}\`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}
\`\`\`

## SDK Error Handling:
\`\`\`javascript
import { SDK } from '@farcaster/miniapp-sdk';

const sdk = new SDK();

// Wrap SDK calls with error handling
async function safeSDKCall(action, ...args) {
  try {
    return await sdk.actions[action](...args);
  } catch (error) {
    console.error(\`SDK \${action} failed:\`, error);
    
    // Provide user-friendly feedback
    switch (error.code) {
      case 'USER_REJECTED':
        showNotification('Action cancelled by user');
        break;
      case 'NETWORK_ERROR':
        showNotification('Network connection issue');
        break;
      default:
        showNotification('Something went wrong');
    }
    
    throw error;
  }
}
\`\`\`

## Transaction Error Handling:
\`\`\`javascript
async function handleTransaction(transactionFn) {
  try {
    const hash = await transactionFn();
    
    // Show pending state
    showNotification('Transaction submitted', 'pending');
    
    // Wait for confirmation
    const receipt = await waitForTransactionReceipt({ hash });
    
    if (receipt.status === 'success') {
      showNotification('Transaction confirmed!', 'success');
    } else {
      throw new Error('Transaction failed');
    }
    
    return receipt;
  } catch (error) {
    if (error.code === 'USER_REJECTED_REQUEST') {
      showNotification('Transaction cancelled');
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      showNotification('Insufficient funds');
    } else {
      showNotification('Transaction failed');
    }
    
    console.error('Transaction error:', error);
    throw error;
  }
}
\`\`\`

## Global Error Handler:
\`\`\`javascript
// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Prevent default browser behavior
  event.preventDefault();
  
  // Report error
  reportError(event.reason);
});

// Catch global errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  reportError(event.error);
});
\`\`\`
    `,
    category: "best-practices",
    tags: ["errors", "debugging", "resilience"]
  },

  "security-guidelines": {
    title: "Security Best Practices",
    content: `
# Security Best Practices

Protect your Mini App and users with proper security measures.

## Input Validation:
\`\`\`javascript
import { z } from 'zod';

// Validate user inputs
const AddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const AmountSchema = z.string().regex(/^\\d+(\\.\\d+)?$/);

function validateTransferInputs(to, amount) {
  try {
    AddressSchema.parse(to);
    AmountSchema.parse(amount);
    return true;
  } catch (error) {
    console.error('Invalid input:', error);
    return false;
  }
}
\`\`\`

## Content Security Policy:
\`\`\`html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.farcaster.xyz;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https: wss:;">
\`\`\`

## Secure Data Storage:
\`\`\`javascript
// Never store sensitive data in localStorage
const SAFE_STORAGE_KEYS = [
  'user_preferences',
  'app_settings',
  'ui_state'
];

function secureStore(key, value) {
  if (!SAFE_STORAGE_KEYS.includes(key)) {
    console.warn('Attempting to store potentially sensitive data');
    return false;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Storage failed:', error);
    return false;
  }
}

// Don't store:
// - Private keys
// - Wallet seeds  
// - Sensitive user data
// - API secrets
\`\`\`

## Transaction Security:
\`\`\`javascript
function validateTransaction(transaction) {
  // Check transaction parameters
  if (!transaction.to || !isValidAddress(transaction.to)) {
    throw new Error('Invalid recipient address');
  }
  
  if (parseFloat(transaction.value) > MAX_TRANSACTION_VALUE) {
    throw new Error('Transaction value exceeds limit');
  }
  
  // Verify with user before signing
  const confirmed = confirm(
    \`Send \${transaction.value} ETH to \${transaction.to}?\`
  );
  
  if (!confirmed) {
    throw new Error('Transaction cancelled by user');
  }
  
  return transaction;
}
\`\`\`

## Environment Variables:
\`\`\`javascript
// Use environment variables for configuration
const CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  CHAIN_ID: parseInt(process.env.REACT_APP_CHAIN_ID) || 1,
  DEBUG: process.env.NODE_ENV === 'development'
};

// Never expose sensitive keys in frontend
// ❌ DON'T DO THIS
// const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

// ✅ Use backend APIs instead
async function signTransaction(transactionData) {
  return await fetch('/api/sign-transaction', {
    method: 'POST',
    body: JSON.stringify(transactionData)
  });
}
\`\`\`

## HTTPS Requirements:
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use secure cookies
- Implement HSTS headers

## Security Checklist:
- [ ] Input validation on all user data
- [ ] Proper error handling without information leakage
- [ ] HTTPS enforcement
- [ ] Content Security Policy
- [ ] No sensitive data in localStorage
- [ ] Transaction confirmation flows
- [ ] Rate limiting on API calls
- [ ] Regular security audits
    `,
    category: "best-practices",
    tags: ["security", "validation", "privacy"]
  }
};

export const getBestPracticesKnowledgeByKey = (key: string) => bestPracticesKnowledge[key as keyof typeof bestPracticesKnowledge];
export const getAllBestPracticesKnowledge = () => Object.values(bestPracticesKnowledge);
export const getBestPracticesKnowledgeByTag = (tag: string) => 
  Object.values(bestPracticesKnowledge).filter(knowledge => knowledge.tags.includes(tag));