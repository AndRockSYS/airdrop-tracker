'use client';

import dynamic from 'next/dynamic';

const WalletButton = dynamic(() => import('@/components/WalletButton'), { ssr: false });

import './nav.css';

export default function Nav() {
    const showAirdropForm = () => {
        const form = document.querySelector('section.add-airdrop') as HTMLElement;
        form.style.display = 'block';
    };

    return (
        <nav>
            <h2>Airdrop Tracker</h2>
            <button id='button' className='add-airdrop' onClick={showAirdropForm}>
                Add Airdrop
            </button>
            <WalletButton />
        </nav>
    );
}
