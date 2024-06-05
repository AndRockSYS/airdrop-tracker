'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import useOwner from '@/hooks/useOwner';
import useForm from '@/hooks/useForm';

const WalletButton = dynamic(() => import('@/components/WalletButton'), { ssr: false });

import { FormState } from 'types';

import './nav.css';

export default function Nav() {
    const { isOwner } = useOwner();
    const { openForm } = useForm();

    const [addButton, setAddButton] = useState(<></>);

    useEffect(() => {
        if (isOwner)
            setAddButton(
                <button id='button' className='add-airdrop' onClick={() => openForm(FormState.Add)}>
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
