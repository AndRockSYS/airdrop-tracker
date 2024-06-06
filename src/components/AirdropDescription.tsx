import Image from 'next/image';

import { convertTimestampToDate } from '@/utils/utils';

import { Airdrop } from 'types';

import './description.css';

interface Props {
    airdrop: Airdrop;
    tagsToObjects: (tagsInput?: string) => JSX.Element[];
}

export default function AirdropPage({ airdrop, tagsToObjects }: Props) {
    const closePage = () => {
        const page = document.querySelector('section.airdrop-page') as HTMLElement;

        page.style.display = 'none';
    };

    return (
        <section className='airdrop-page'>
            <div>
                <Image
                    src={airdrop.image ? airdrop.image : '/blank.svg'}
                    alt={airdrop.name}
                    width={25}
                    height={25}
                ></Image>
                <h2>{airdrop.name}</h2>
            </div>
            <div>
                <h3>My Progress</h3>
                <div>{tagsToObjects(airdrop.progress)}</div>
                <h3>Tags</h3>
                <div>{tagsToObjects(airdrop.tags)}</div>

                <h3>Cost to Farm</h3>
                <div>{tagsToObjects(airdrop.costToFarm)}</div>
                <h3>Chain / Tech</h3>
                <div>{tagsToObjects(airdrop.chainTech)}</div>
                <h3>Stage</h3>
                <div>{tagsToObjects(airdrop.stage)}</div>

                <h3>Tier</h3>
                <div>{tagsToObjects(airdrop.tier)}</div>
                <h3>Priority</h3>
                <div>{tagsToObjects(airdrop.priority)}</div>
                <h3>Status</h3>
                <div>{tagsToObjects(airdrop.status)}</div>
                <h3>Funding (M)</h3>
                <h3>{airdrop.funding ? `$${airdrop.funding}` : ''}</h3>
                <h3>Val</h3>
                <h3>{airdrop.val ? `$${airdrop.val}` : ''}</h3>

                <h3>Bridge Date</h3>
                <h3>{convertTimestampToDate(airdrop.bridgeDateAt)}</h3>
                <h3>First Tx</h3>
                <h3>{convertTimestampToDate(airdrop.firstTxAt)}</h3>

                <h3>Completion</h3>
                <h3>{airdrop.completion ? `${airdrop.completion}%` : ''}</h3>
                <h3>Snapshot</h3>
                <h3>{airdrop.snapshot ? 'Yes' : 'No'}</h3>

                <h3>Referral URL</h3>
                <h3>{airdrop.referralURL}</h3>

                <h3>Created</h3>
                <h3>{convertTimestampToDate(airdrop.createdAt)}</h3>
                <h3>Last Editer Tx</h3>
                <h3>{convertTimestampToDate(airdrop.editedAt)}</h3>
            </div>

            <div>
                <h2>About The Project</h2>
                <h3>{airdrop.description}</h3>
            </div>

            <div>
                <h2>Project Tasks</h2>
                <h3>{airdrop.tasks}</h3>
            </div>

            <button id='button' onClick={closePage}>
                Close
            </button>
        </section>
    );
}
