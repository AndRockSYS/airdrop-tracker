'use client';

import { useDisconnect, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useMemo } from 'react';

export default function WalletButton() {
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect();
    const { address } = useWeb3ModalAccount();

    const message = useMemo(
        () => (address ? address.slice(0, 5) + '...' + address.slice(38, 42) : 'Connect Wallet'),
        [address]
    );

    return (
        <button id='button' onClick={() => (message == 'Connect Wallet' ? open() : disconnect())}>
            {message}
        </button>
    );
}
