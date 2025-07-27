export const walletKnowledge = {
  "wagmi-setup": {
    title: "Wagmi Setup for Mini Apps",
    content: `
# Wagmi Setup for Farcaster Mini Apps

Wagmi provides the best wallet integration experience for Mini Apps.

## Installation:
\`\`\`bash
npm install wagmi @farcaster/miniapp-sdk
\`\`\`

## Basic Configuration:
\`\`\`javascript
import { createConfig, http } from 'wagmi';
import { miniapp } from '@farcaster/miniapp-sdk/connectors';
import { mainnet, base, optimism } from 'wagmi/chains';

const config = createConfig({
  chains: [mainnet, base, optimism],
  connectors: [miniapp()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
});
\`\`\`

## React Setup:
\`\`\`jsx
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <YourMiniApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
\`\`\`

## Connection Component:
\`\`\`jsx
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function WalletConnection() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </button>
  );
}
\`\`\`

## Chain Configuration:
\`\`\`javascript
const supportedChains = [
  mainnet, // Ethereum mainnet
  base,    // Base (recommended for Farcaster)
  optimism, // Optimism
  polygon   // Polygon
];
\`\`\`
    `,
    category: "wallet-integration",
    tags: ["wagmi", "setup", "configuration"]
  },

  "transaction-handling": {
    title: "Transaction Handling",
    content: `
# Transaction Handling in Mini Apps

Handle single and batch transactions with proper error handling.

## Single Transaction:
\`\`\`javascript
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

function SendTransaction() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSend = async () => {
    try {
      await writeContract({
        address: '0x...',
        abi: contractABI,
        functionName: 'transfer',
        args: [recipientAddress, amount],
      });
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Transaction'}
      </button>
      {hash && <div>Hash: {hash}</div>}
      {isConfirming && <div>Confirming...</div>}
      {isSuccess && <div>Transaction confirmed!</div>}
    </div>
  );
}
\`\`\`

## Batch Transactions (EIP-5792):
\`\`\`javascript
import { useSendCalls } from 'wagmi/experimental';

function BatchTransactions() {
  const { sendCalls, data: id, isPending } = useSendCalls();

  const handleBatch = async () => {
    try {
      await sendCalls({
        calls: [
          {
            to: '0x...',
            data: '0x...',
            value: parseEther('0.1'),
          },
          {
            to: '0x...',
            data: '0x...',
          },
        ],
      });
    } catch (error) {
      console.error('Batch transaction failed:', error);
    }
  };

  return (
    <button onClick={handleBatch} disabled={isPending}>
      {isPending ? 'Processing...' : 'Send Batch'}
    </button>
  );
}
\`\`\`

## Gas Estimation:
\`\`\`javascript
import { useEstimateGas } from 'wagmi';

function GasEstimator({ to, data, value }) {
  const { data: gasEstimate, isLoading } = useEstimateGas({
    to,
    data,
    value,
  });

  if (isLoading) return <div>Estimating gas...</div>;
  
  return (
    <div>
      Estimated gas: {gasEstimate?.toString()} units
    </div>
  );
}
\`\`\`

## Transaction Status Monitoring:
\`\`\`javascript
function TransactionStatus({ hash }) {
  const { data: receipt, status } = useWaitForTransactionReceipt({
    hash,
    pollingInterval: 1000,
  });

  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return '⏳ Pending...';
      case 'success':
        return '✅ Confirmed';
      case 'error':
        return '❌ Failed';
      default:
        return '📡 Broadcasting...';
    }
  };

  return (
    <div className="transaction-status">
      {getStatusDisplay()}
      {receipt && (
        <div>
          Block: {receipt.blockNumber}
          Gas used: {receipt.gasUsed.toString()}
        </div>
      )}
    </div>
  );
}
\`\`\`
    `,
    category: "wallet-integration", 
    tags: ["transactions", "gas", "batch"]
  },

  "wallet-events": {
    title: "Wallet Event Handling",
    content: `
# Wallet Event Handling

Respond to wallet connection changes and errors properly.

## Account Changes:
\`\`\`javascript
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

function WalletMonitor() {
  const { address, isConnected, isReconnecting } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      console.log('Wallet connected:', address);
      // Update app state
      onWalletConnected(address);
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (!isConnected) {
      console.log('Wallet disconnected');
      // Clear user state
      onWalletDisconnected();
    }
  }, [isConnected]);

  if (isReconnecting) {
    return <div>Reconnecting to wallet...</div>;
  }

  return null;
}
\`\`\`

## Chain Changes:
\`\`\`javascript
import { useChainId, useSwitchChain } from 'wagmi';

function ChainMonitor() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const supportedChains = [1, 8453, 10]; // mainnet, base, optimism

  useEffect(() => {
    if (!supportedChains.includes(chainId)) {
      // Prompt user to switch to supported chain
      promptChainSwitch();
    }
  }, [chainId]);

  const promptChainSwitch = () => {
    const userChoice = confirm(
      'Please switch to a supported network (Ethereum, Base, or Optimism)'
    );
    
    if (userChoice) {
      switchChain({ chainId: 8453 }); // Switch to Base
    }
  };

  return (
    <div>
      Current chain: {chainId}
      {!supportedChains.includes(chainId) && (
        <button onClick={() => switchChain({ chainId: 8453 })}>
          Switch to Base
        </button>
      )}
    </div>
  );
}
\`\`\`

## Connection Errors:
\`\`\`javascript
import { useConnect } from 'wagmi';

function ConnectionHandler() {
  const { connect, connectors, error, isPending } = useConnect();

  const handleConnect = async (connector) => {
    try {
      await connect({ connector });
    } catch (err) {
      console.error('Connection failed:', err);
      handleConnectionError(err);
    }
  };

  const handleConnectionError = (error) => {
    if (error.message.includes('User rejected')) {
      showNotification('Connection cancelled by user');
    } else if (error.message.includes('No wallet')) {
      showNotification('No wallet detected');
    } else {
      showNotification('Failed to connect wallet');
    }
  };

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => handleConnect(connector)}
          disabled={isPending}
        >
          {connector.name}
        </button>
      ))}
      {error && (
        <div className="error">
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
\`\`\`

## Best Practices:
- Always handle connection errors gracefully
- Monitor chain changes and guide users
- Provide clear feedback for all wallet states
- Implement automatic reconnection logic
- Cache connection state appropriately
    `,
    category: "wallet-integration",
    tags: ["events", "errors", "monitoring"]
  }
};

export const getWalletKnowledgeByKey = (key: string) => walletKnowledge[key as keyof typeof walletKnowledge];
export const getAllWalletKnowledge = () => Object.values(walletKnowledge);
export const getWalletKnowledgeByTag = (tag: string) => 
  Object.values(walletKnowledge).filter(knowledge => knowledge.tags.includes(tag));