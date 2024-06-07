'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const WalletButton = dynamic(() => import('@/components/WalletButton'), { ssr: false });

import './nav.css';
import Link from 'next/link';

export default function Nav() {
    return (
        <nav>
            <h2>Airdrop Tracker</h2>
            <div>
                <Link href={'https://telegram.org'}>
                    <Image
                        id='images'
                        src={'/telegram.png'}
                        alt='telegram'
                        width={25}
                        height={25}
                    ></Image>
                </Link>

                <Image id='images' src={'/x.png'} alt='x' width={25} height={25}></Image>
                <WalletButton />
            </div>
        </nav>
    );
}
