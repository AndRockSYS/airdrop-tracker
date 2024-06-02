'use client';

import useTags from '@/hooks/useTags';
import useGlacier from '@/hooks/useGlacier';
import useTagsLists from '@/hooks/useTagsLists';

import './form.css';

export default function AirdropForm() {
    const { glacier } = useGlacier();
    const tags = useTags();
    const tagsList = useTagsLists();

    const closeForm = () => {
        const form = document.querySelector('section.airdrop-form') as HTMLElement;
        form.style.display = 'none';
    };

    const addAirdrop = () => {
        const inputs = document.querySelectorAll(
            'section.airdrop-form > form > input'
        ) as NodeListOf<HTMLInputElement>;

        if (glacier)
            glacier.addAirdrop({
                name: inputs[0].value,
                progress: inputs[1].value,
                tags: inputs[2].value,
                costToFarm: inputs[3].value,
                chainTech: inputs[4].value,
                stage: inputs[5].value,
                tier: inputs[6].value,
                priority: inputs[7].value,
                status: inputs[8].value,
                funding: Number(inputs[9].value),
                val: Number(inputs[10].value),

                bridgeDateAt: Number(inputs[11].value),
                firstTxAt: Number(inputs[12].value),

                completion: inputs[13].value,

                referralURL: inputs[14].value,

                createdAt: Date.now(),
                editedAt: Date.now(),
            });
    };

    return (
        <section className='airdrop-form'>
            <form className='airdrop-form'>
                <button type='button' id='button' onClick={closeForm}>
                    Close
                </button>

                <input type='text' placeholder='Name' />
                <input
                    type='text'
                    list='progress'
                    placeholder='Progress'
                    onChange={(event) => {
                        tags.addTag(event, 'progress');
                    }}
                />
                {tagsList.progress}

                <input
                    type='text'
                    list='tags'
                    placeholder='Tags'
                    onChange={(event) => {
                        tags.addTag(event, 'tags');
                    }}
                />
                {tagsList.tags}
                <input
                    type='text'
                    list='costToFarm'
                    placeholder='Cost To Farm'
                    onChange={(event) => {
                        tags.addTag(event, 'costToFarm');
                    }}
                />
                {tagsList.costToFarm}
                <input
                    type='text'
                    list='chainTech'
                    placeholder='Chain / Tech'
                    onChange={(event) => {
                        tags.addTag(event, 'chainTech');
                    }}
                />
                {tagsList.chainTech}
                <input
                    type='text'
                    list='stage'
                    placeholder='Stage'
                    onChange={(event) => {
                        tags.addTag(event, 'stage');
                    }}
                />
                {tagsList.stage}

                <input
                    type='text'
                    list='tier'
                    placeholder='Tier'
                    onChange={(event) => {
                        tags.addTag(event, 'tier');
                    }}
                />
                {tagsList.tier}

                <input
                    type='text'
                    list='priority'
                    placeholder='Priority'
                    onChange={(event) => {
                        tags.addTag(event, 'priority');
                    }}
                />
                {tagsList.prority}

                <input
                    type='text'
                    list='status'
                    placeholder='Status'
                    onChange={(event) => {
                        tags.addTag(event, 'status');
                    }}
                />
                {tagsList.status}

                <input type='text' placeholder='Funding' />
                <input type='text' placeholder='Val' />

                <input
                    type='text'
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                    placeholder='Bridge Date'
                />
                <input
                    type='text'
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = 'text')}
                    placeholder='First Tx'
                />

                <input type='number' placeholder='Completion' />

                <input type='text' placeholder='Referral' />

                <button type='button' id='button' onClick={addAirdrop}>
                    Add
                </button>
            </form>
        </section>
    );
}
