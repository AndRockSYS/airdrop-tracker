'use client';

import { useEffect, useMemo, useState } from 'react';

import useOwner from '@/hooks/useOwner';
import useGlacier from '@/hooks/useGlacier';
import useTags from '@/hooks/useTags';
import useForm from '@/hooks/useForm';

import AirdropRow from '@/components/AirdropRow';
import AirdropForm from '@/components/AirdropForm';
import AirdropDescription from '@/components/AirdropDescription';

import { sortBy } from '@/utils/airdrop-utils';

import './home.css';

export default function Home() {
    const { isOwner } = useOwner();
    const { glacier } = useGlacier();
    const { tags, tagsToObjects } = useTags();
    const { openForm, currentAirdrop, setCurrentAirdrop } = useForm();

    const [list, setList] = useState<JSX.Element[]>([]);

    const [ownerColumn, setOwnerColumn] = useState<JSX.Element>(<></>);

    const [sortProperty, setSortProperty] = useState('');

    useEffect(() => {
        const heads = document.querySelectorAll(
            'table > thead > tr > th'
        ) as NodeListOf<HTMLElement>;

        const dictionary: { [key: string]: number } = {
            name: 0,
            tier: 1,
            costToFarm: 2,
            status: 3,
            progress: 4,
            funding: 5,
            val: 6,
            stage: 7,
            tags: 8,
            chainTech: 9,
            createdAt: 10,
            editedAt: 11,
        };

        heads.forEach((item) => {
            item.style.fontWeight = '400';
        });

        heads[dictionary[sortProperty]].style.fontWeight = '600';
    }, [sortProperty]);

    useEffect(() => {
        setOwnerColumn(isOwner ? <th>Interact</th> : <></>);
    }, [isOwner]);

    useEffect(() => {
        if (glacier && tags) {
            glacier.getAirdrops().then((aidrops) => {
                setList(
                    sortBy(aidrops, sortProperty).map((airdrop) => (
                        <AirdropRow
                            key={airdrop.name}
                            airdrop={airdrop}
                            isOwner={isOwner}
                            glacier={glacier}
                            tagsToObjects={tagsToObjects}
                            openForm={openForm}
                            setCurrentAirdrop={setCurrentAirdrop}
                        />
                    ))
                );
            });
        }
    }, [glacier, isOwner, tags, sortProperty, sortBy]);

    return (
        <>
            <main>
                <table className='airdrops'>
                    <thead>
                        <tr>
                            <th onClick={() => setSortProperty('name')}>Name</th>
                            <th onClick={() => setSortProperty('tier')}>Tier</th>
                            <th onClick={() => setSortProperty('costToFarm')}>Cost to Farm</th>
                            <th onClick={() => setSortProperty('status')}>Status</th>
                            <th onClick={() => setSortProperty('progress')}>Progress</th>
                            <th onClick={() => setSortProperty('funding')}>Funding (M)</th>
                            <th onClick={() => setSortProperty('val')}>Val (M)</th>
                            <th onClick={() => setSortProperty('stage')}>Stage</th>
                            <th onClick={() => setSortProperty('tags')}>Tags</th>
                            <th onClick={() => setSortProperty('chainTech')}>Chain / Tech</th>
                            <th onClick={() => setSortProperty('createdAt')}>Created</th>
                            <th onClick={() => setSortProperty('editedAt')}>Last Edited</th>
                            {ownerColumn}
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
            </main>
            <AirdropForm />
            {useMemo(
                () => (
                    <AirdropDescription airdrop={currentAirdrop} tagsToObjects={tagsToObjects} />
                ),
                [currentAirdrop, tags]
            )}
        </>
    );
}
