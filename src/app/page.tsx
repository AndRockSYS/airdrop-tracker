'use client';

import { useEffect, useMemo, useState } from 'react';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';

import Glacier from '@/service/Glacier';

import AirdropRow from '@/components/AirdropRow';
import AirdropForm from '@/components/AirdropForm';

import { Airdrop } from 'types';

import './home.css';

export default function Home() {
    const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
    const { walletProvider } = useWeb3ModalProvider();

    useEffect(() => {
        if (walletProvider) {
            const glacier = new Glacier(walletProvider);

            glacier.getAirdrops().then((items) => {
                setAirdrops(items);
            });
        }
    }, [walletProvider]);

    const airdropList = useMemo(() => airdrops.map((airdrop) => AirdropRow(airdrop)), [airdrops]);

    return (
        <>
            <main>
                <table className='airdrops'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Tier</th>
                            <th>Cost to Farm</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Funding (M)</th>
                            <th>Val (M)</th>
                            <th>Stage</th>
                            <th>Tags</th>
                            <th>Chain / Tech</th>
                            <th>Created</th>
                            <th>Last Edited</th>
                        </tr>
                    </thead>
                    <tbody>{airdropList}</tbody>
                </table>
            </main>
            <AirdropForm />
        </>
    );
}
