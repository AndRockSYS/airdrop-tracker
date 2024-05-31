'use client';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

const projectId = '38c9ba5d9854cfbd32c3a45ea3c5a227';

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
};

const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/'],
};

const ethersConfig = defaultConfig({
    metadata,
    defaultChainId: 1,
});

createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
    return children;
}
