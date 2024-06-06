'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const WalletButton = dynamic(() => import('@/components/WalletButton'), { ssr: false });

import './nav.css';

export default function Nav() {
    return (
        <nav>
            <h2>Airdrop Tracker</h2>
            <div>
                <Image src={'/telegram.png'} alt='telegram' width={25} height={25}></Image>
                <Image src={'/x.png'} alt='x' width={25} height={25}></Image>
            </div>
            <WalletButton />
        </nav>
    );
}
