'use client';

import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';

export default function WalletButton() {
    const { open } = useWeb3Modal();
    const { address } = useWeb3ModalAccount();

    return (
        <button id='button' onClick={() => open()}>
            {address ? address.slice(0, 5) + '...' + address.slice(38, 42) : 'Connect Wallet'}
        </button>
    );
}
