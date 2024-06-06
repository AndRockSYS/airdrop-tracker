import { Dispatch, SetStateAction, useMemo } from 'react';
import Image from 'next/image';

import Glacier from '@/service/Glacier';

import { convertTimestampToDate } from '@/utils/utils';

import { Airdrop, FormState } from 'types';

interface Props {
    airdrop: Airdrop;
    isOwner: boolean;
    glacier: Glacier | undefined;
    tagsToObjects: (tagsInput?: string) => JSX.Element[];
    openForm: (formState: FormState, airdrop?: Airdrop) => void;
    setCurrentAirdrop: Dispatch<SetStateAction<Airdrop>>;
    addPinned: (airdrop: Airdrop) => void;
    page: Page;
    removePinned: (airdrop: Airdrop) => void;
}

enum Page {
    Main,
    Pinned,
}

export default function AirdropRow({
    airdrop,
    isOwner,
    glacier,
    tagsToObjects,
    openForm,
    setCurrentAirdrop,
    addPinned,
    removePinned,
    page,
}: Props) {
    const openDescription = () => {
        const page = document.querySelector('section.airdrop-page') as HTMLElement;

        page.style.display = 'flex';
    };

    return (
        <>
            <tr key={airdrop.name}>
                <td>
                    <Image
                        src={airdrop.image ? airdrop.image : '/blank.svg'}
                        alt={airdrop.name}
                        width={25}
                        height={25}
                        onClick={() => {
                            setCurrentAirdrop(airdrop);
                            openDescription();
                        }}
                    ></Image>
                    <h3
                        onClick={() => {
                            setCurrentAirdrop(airdrop);
                            openDescription();
                        }}
                    >
                        {airdrop.name}
                    </h3>
                    <Image
                        onClick={() =>
                            page == Page.Main ? addPinned(airdrop) : removePinned(airdrop)
                        }
                        src={'/pin.png'}
                        alt='pin'
                        width={25}
                        height={25}
                    ></Image>
                </td>
                <td>{tagsToObjects(airdrop.tier)}</td>

                <td>{tagsToObjects(airdrop.costToFarm)}</td>

                <td>{tagsToObjects(airdrop.status)}</td>
                <td>{tagsToObjects(airdrop.progress)}</td>

                <td>{airdrop.funding ? `$${airdrop.funding}` : ''}</td>
                <td>{airdrop.val ? `$${airdrop.val}` : ''}</td>

                <td>{airdrop.stage}</td>

                <td>{tagsToObjects(airdrop.tags)}</td>
                <td>{tagsToObjects(airdrop.chainTech)}</td>

                <td>{convertTimestampToDate(airdrop.createdAt)}</td>
                <td>{convertTimestampToDate(airdrop.editedAt)}</td>

                {useMemo(
                    () =>
                        isOwner ? (
                            <td>
                                <button
                                    id='button'
                                    onClick={() => openForm(FormState.Edit, airdrop)}
                                >
                                    Edit
                                </button>

                                <button
                                    id='button'
                                    onClick={() => {
                                        if (glacier) glacier.deleteAirdrop(airdrop.name);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        ) : (
                            <></>
                        ),
                    [isOwner]
                )}
            </tr>
        </>
    );
}
