'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import useOwner from '@/hooks/useOwner';
const WalletButton = dynamic(() => import('@/components/WalletButton'), { ssr: false });

import './nav.css';

export default function Nav() {
    const { isOwner } = useOwner();
    const [addButton, setAddButton] = useState(<></>);

    const showAirdropForm = () => {
        const form = document.querySelector('section.airdrop-form') as HTMLElement;
        form.style.display = 'block';
    };

    useEffect(() => {
        if (isOwner)
            setAddButton(
                <button id='button' className='add-airdrop' onClick={showAirdropForm}>
                    Add Airdrop
                </button>
            );
        else setAddButton(<></>);
    }, [isOwner]);

    return (
        <nav>
            <h2>Airdrop Tracker</h2>
            {addButton}
            <WalletButton />
        </nav>
    );
}
