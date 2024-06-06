'use client';

import dynamic from 'next/dynamic';

const WalletButton = dynamic(() => import('@/components/WalletButton'), { ssr: false });

import './nav.css';

export default function Nav() {
    return (
        <nav>
            <h2>Airdrop Tracker</h2>
            <WalletButton />
        </nav>
    );
}
