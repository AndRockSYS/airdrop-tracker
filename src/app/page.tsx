'use client';

import { useEffect, useMemo, useState } from 'react';

import useOwner from '@/hooks/useOwner';
import useGlacier from '@/hooks/useGlacier';

import AirdropRow from '@/components/AirdropRow';
import AirdropForm from '@/components/AirdropForm';

import { Airdrop } from 'types';

import './home.css';
import useTags from '@/hooks/useTags';

export default function Home() {
    const { isOwner } = useOwner();
    const { glacier } = useGlacier();
    const { allTags } = useTags();

    const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
    const [ownersColums, setOwnersColumn] = useState(<></>);

    useEffect(() => {
        if (glacier)
            glacier.getAirdrops().then((items) => {
                setAirdrops(items);
            });

        setOwnersColumn(isOwner ? <th>Interact</th> : <></>);
    }, [glacier, isOwner]);

    const airdropList = useMemo(
        () => airdrops.map((airdrop) => AirdropRow(airdrop, isOwner, glacier, allTags)),
        [airdrops, isOwner, allTags]
    );

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
                            {ownersColums}
                        </tr>
                    </thead>
                    <tbody>{airdropList}</tbody>
                </table>
            </main>
            <AirdropForm />
        </>
    );
}
