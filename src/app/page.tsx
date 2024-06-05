'use client';

import { useEffect, useState } from 'react';

import useOwner from '@/hooks/useOwner';
import useGlacier from '@/hooks/useGlacier';
import useTags from '@/hooks/useTags';
import useForm from '@/hooks/useForm';

import AirdropRow from '@/components/AirdropRow';
import AirdropForm from '@/components/AirdropForm';

import './home.css';

export default function Home() {
    const { isOwner } = useOwner();
    const { glacier } = useGlacier();
    const { tags, tagsToObjects } = useTags();
    const { openForm } = useForm();

    const [list, setList] = useState<JSX.Element[]>([]);

    const [ownerColumn, setOwnerColumn] = useState<JSX.Element>(<></>);

    useEffect(() => {
        setOwnerColumn(isOwner ? <th>Interact</th> : <></>);
    }, [isOwner]);

    useEffect(() => {
        if (glacier) {
            glacier.getAirdrops().then((aidrops) => {
                setList(
                    aidrops.map((airdrop) => (
                        <AirdropRow
                            key={airdrop.name}
                            airdrop={airdrop}
                            isOwner={isOwner}
                            glacier={glacier}
                            tagsToObjects={tagsToObjects}
                            openForm={openForm}
                        />
                    ))
                );
            });
        }
    }, [glacier, isOwner, tags]);

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
                            {ownerColumn}
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
            </main>
            <AirdropForm />
        </>
    );
}
