import Glacier from '@/service/Glacier';

import { Dispatch, SetStateAction } from 'react';

import { convertTimestampToDate } from '@/utils/utils';

import { Airdrop, FormState } from 'types';

interface Props {
    airdrop: Airdrop;
    isOwner: boolean;
    glacier: Glacier | undefined;
    tagsToObjects: (tagsInput?: string) => JSX.Element[];
    openForm: (formState: FormState, airdrop?: Airdrop) => void;
    setCurrentAirdrop: Dispatch<SetStateAction<Airdrop>>;
}

export default function AirdropRow({
    airdrop,
    isOwner,
    glacier,
    tagsToObjects,
    openForm,
    setCurrentAirdrop,
}: Props) {
    const openDescription = () => {
        const page = document.querySelector('section.airdrop-page') as HTMLElement;

        page.style.display = 'grid';
    };

    return (
        <tr key={airdrop.name}>
            <td
                onClick={() => {
                    setCurrentAirdrop(airdrop);
                    openDescription();
                }}
            >
                {airdrop.name}
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

            {isOwner ? (
                <td>
                    <button id='button' onClick={() => openForm(FormState.Edit, airdrop)}>
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
            )}
        </tr>
    );
}
