export const authenticationKnowledge = {
  "siwf-implementation": {
    title: "Sign In With Farcaster (SIWF) Implementation",
    content: `
# Sign In With Farcaster (SIWF)

SIWF enables secure authentication using Farcaster identity without passwords.

## Quick Auth (Recommended)
The easiest way to implement authentication using Farcaster's hosted service.

\`\`\`javascript
import { SDK } from '@farcaster/miniapp-sdk';

const sdk = new SDK();

// Authenticate user
const authData = await sdk.actions.signIn();
console.log('User FID:', authData.fid);
console.log('Username:', authData.username);
\`\`\`

## Custom SIWF Implementation

### 1. Generate Sign-In Message
\`\`\`javascript
const message = {
  domain: 'myapp.com',
  address: userAddress,
  statement: 'Sign in to My Mini App',
  uri: 'https://myapp.com',
  version: '1',
  chainId: 1,
  nonce: generateNonce(),
  issuedAt: new Date().toISOString()
};
\`\`\`

### 2. User Signs Message
\`\`\`javascript
const signature = await wallet.signMessage(formatMessage(message));
\`\`\`

### 3. Verify Signature
\`\`\`javascript
const isValid = verifySignature(message, signature, userAddress);
\`\`\`

## Authentication Flow:
1. User clicks "Sign In"
2. Generate authentication challenge
3. User signs with wallet
4. Verify signature and Farcaster association
5. Create user session
6. Store authentication state

## Best Practices:
- Use Quick Auth for simpler implementation
- Validate user's Farcaster profile exists
- Handle authentication errors gracefully
- Implement session management
- Store minimal user data locally
    `,
    category: "authentication",
    tags: ["siwf", "quickauth", "security"]
  },

  "user-session-management": {
    title: "User Session Management",
    content: `
# User Session Management

Proper session handling ensures good user experience and security.

## Session Storage Options:

### localStorage (Recommended)
\`\`\`javascript
// Store user session
const userSession = {
  fid: userData.fid,
  username: userData.username,
  displayName: userData.displayName,
  pfpUrl: userData.pfpUrl,
  accessToken: authData.token,
  expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
};

localStorage.setItem('farcaster_session', JSON.stringify(userSession));

// Retrieve session
const session = JSON.parse(localStorage.getItem('farcaster_session') || '{}');
\`\`\`

### Session Validation
\`\`\`javascript
function isSessionValid(session) {
  if (!session.fid || !session.accessToken) return false;
  if (session.expiresAt < Date.now()) return false;
  return true;
}

function getValidSession() {
  const session = JSON.parse(localStorage.getItem('farcaster_session') || '{}');
  return isSessionValid(session) ? session : null;
}
\`\`\`

## Auto Sign-In Implementation:
\`\`\`javascript
async function initializeAuth() {
  const existingSession = getValidSession();
  
  if (existingSession) {
    // User already authenticated
    setUser(existingSession);
    return existingSession;
  }
  
  // No valid session, require sign-in
  return null;
}
\`\`\`

## Session Cleanup:
\`\`\`javascript
function signOut() {
  localStorage.removeItem('farcaster_session');
  setUser(null);
  // Optionally redirect to sign-in
}

// Auto cleanup on expiry
setInterval(() => {
  const session = getValidSession();
  if (!session && getCurrentUser()) {
    signOut();
  }
}, 60000); // Check every minute
\`\`\`

## Security Considerations:
- Set reasonable session expiry times
- Clear sessions on sign-out
- Validate sessions on app startup
- Don't store sensitive data in localStorage
- Implement token refresh if needed
    `,
    category: "authentication",
    tags: ["session", "storage", "security"]
  },

  "user-profile-integration": {
    title: "User Profile Integration", 
    content: `
# User Profile Integration

Access and display Farcaster user profile data in your Mini App.

## Basic Profile Data:
\`\`\`javascript
const userProfile = {
  fid: 123,
  username: 'alice',
  displayName: 'Alice Smith',
  pfpUrl: 'https://...',
  bio: 'Builder at Farcaster',
  followerCount: 1250,
  followingCount: 500,
  verifications: ['0x1234...'] // Verified Ethereum addresses
};
\`\`\`

## Profile Display Component (React):
\`\`\`jsx
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <img 
        src={user.pfpUrl} 
        alt={user.displayName}
        className="profile-image"
      />
      <div className="profile-info">
        <h3>{user.displayName}</h3>
        <p>@{user.username}</p>
        {user.bio && <p className="bio">{user.bio}</p>}
        <div className="stats">
          <span>{user.followerCount} followers</span>
          <span>{user.followingCount} following</span>
        </div>
      </div>
    </div>
  );
}
\`\`\`

## Fetching Additional Profile Data:
\`\`\`javascript
async function fetchUserProfile(fid) {
  try {
    // Using Farcaster API or third-party service
    const response = await fetch(\`https://api.farcaster.xyz/v1/users/\${fid}\`);
    const userData = await response.json();
    
    return {
      fid: userData.fid,
      username: userData.username,
      displayName: userData.display_name,
      pfpUrl: userData.pfp_url,
      bio: userData.profile?.bio?.text,
      followerCount: userData.follower_count,
      followingCount: userData.following_count,
      verifications: userData.verifications
    };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
}
\`\`\`

## Profile Verification Status:
\`\`\`javascript
function isVerifiedUser(user) {
  return user.verifications && user.verifications.length > 0;
}

function getVerificationBadge(user) {
  if (isVerifiedUser(user)) {
    return <span className="verified-badge">✓</span>;
  }
  return null;
}
\`\`\`

## Privacy Considerations:
- Only request necessary profile data
- Respect user privacy settings
- Cache profile data appropriately
- Handle profile data changes
- Implement proper loading states
    `,
    category: "authentication",
    tags: ["profile", "user-data", "display"]
  }
};

export const getAuthKnowledgeByKey = (key: string) => authenticationKnowledge[key as keyof typeof authenticationKnowledge];
export const getAllAuthKnowledge = () => Object.values(authenticationKnowledge);
export const getAuthKnowledgeByTag = (tag: string) => 
  Object.values(authenticationKnowledge).filter(knowledge => knowledge.tags.includes(tag));