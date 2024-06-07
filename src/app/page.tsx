'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import useOwner from '@/hooks/useOwner';
import useGlacier from '@/hooks/useGlacier';
import useTags from '@/hooks/useTags';
import useForm from '@/hooks/useForm';
import usePinned from '@/hooks/usePinned';

import AirdropRow from '@/components/AirdropRow';
import AirdropForm from '@/components/AirdropForm';
import AirdropDescription from '@/components/AirdropDescription';

import { sortBy } from '@/utils/airdrop-utils';

import './home.css';
import './footer.css';
import { FormState } from 'types';

enum Page {
    Main,
    Pinned,
}

export default function Home() {
    const { isOwner } = useOwner();
    const { glacier } = useGlacier();
    const { tags, tagsToObjects } = useTags();
    const { openForm, currentAirdrop, setCurrentAirdrop } = useForm();

    const [list, setList] = useState<JSX.Element[]>([]);
    const { pinned, addPinned, removePinned } = usePinned();
    const [page, setPage] = useState<Page>(Page.Main);

    const [ownerColumn, setOwnerColumn] = useState<JSX.Element>(<></>);

    const [sortProperty, setSortProperty] = useState('name');

    const [call, setCall] = useState(false);

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
            item.style.color = 'var(--text-color)';
        });

        heads[dictionary[sortProperty]].style.color = 'var(--accent-color)';
    }, [sortProperty]);

    useEffect(() => {
        const btns = document.querySelectorAll('.pages > h3') as NodeListOf<HTMLElement>;

        console.log(btns.length);

        btns.forEach((btn) => {
            btn.style.color = 'var(--text-color)';
        });

        btns[page == Page.Main ? 0 : 1].style.color = 'var(--accent-color)';
    }, [page]);

    useEffect(() => {
        setOwnerColumn(isOwner ? <th>Interact</th> : <></>);
    }, [isOwner]);

    useEffect(() => {
        if (page == Page.Main) {
            if (glacier) {
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
                                addPinned={addPinned}
                                page={page}
                                removePinned={removePinned}
                            />
                        ))
                    );
                });
            }
        } else {
            setList(
                sortBy(pinned, sortProperty).map((airdrop) => (
                    <AirdropRow
                        key={airdrop.name}
                        airdrop={airdrop}
                        isOwner={isOwner}
                        glacier={glacier}
                        tagsToObjects={tagsToObjects}
                        openForm={openForm}
                        setCurrentAirdrop={setCurrentAirdrop}
                        addPinned={addPinned}
                        page={page}
                        removePinned={removePinned}
                    />
                ))
            );
        }

        document.addEventListener('airdrops', () => setCall(!call));

        return () => document.removeEventListener('airdrops', () => setCall(!call));
    }, [glacier, isOwner, tags, sortProperty, sortBy, call, setCall, page, pinned]);

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
        <>
            <main>
                <div className='pages'>
                    <h3 onClick={() => setPage(Page.Main)}>Active Airdrop</h3>
                    <h3 onClick={() => setPage(Page.Pinned)}>Pinned</h3>
                </div>
                <table>
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
                {addButton}
            </main>
            <AirdropForm />
            {useMemo(
                () => (
                    <AirdropDescription airdrop={currentAirdrop} tagsToObjects={tagsToObjects} />
                ),
                [currentAirdrop, tags]
            )}
            <footer>
                Powered By Glacier{' '}
                <Image src={'/glacier.png'} alt='glacier' width={25} height={25}></Image>
            </footer>
        </>
    );
}
