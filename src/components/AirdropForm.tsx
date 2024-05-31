'use client';

import './form.css';

import { Priority, Progress, Stage, Status, Tier } from '../../arrayTypings';

export default function AirdropForm() {
    const createdAt = Date.now();

    const closeForm = () => {
        const form = document.querySelector('section.add-airdrop') as HTMLElement;
        form.style.display = 'none';
    };

    const collectData = () => {
        const inputs = document.querySelectorAll(
            'section.add-airdrop > form > input'
        ) as NodeListOf<HTMLInputElement>;

        inputs.forEach((item) => {
            console.log(item.value);
        });
    };

    const getDatalist = (id: string, array: string[]): JSX.Element => {
        return (
            <datalist id={id}>
                {array.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </datalist>
        );
    };

    return (
        <section className='add-airdrop'>
            <form className='add-airdrop'>
                <button type='button' id='button' onClick={closeForm}>
                    Close
                </button>

                <input type='text' placeholder='Name *' />
                <input type='text' list='progresses' placeholder='Progress' />
                {getDatalist('progresses', Progress)}

                <input type='text' placeholder='Tags' />
                <input type='text' placeholder='Cost To Farm' />
                <input type='text' placeholder='Chain / Tech' />
                <input type='text' list='stages' placeholder='Stage' />
                {getDatalist('stages', Stage)}

                <input type='text' list='tiers' placeholder='Tier *' />
                {getDatalist('tiers', Tier)}

                <input type='text' list='priorities' placeholder='Priority' />
                {getDatalist('priorities', Priority)}

                <input type='text' list='statuses' placeholder='Status' />
                {getDatalist('statuses', Status)}

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

                <button type='button' id='button' onClick={collectData}>
                    Add
                </button>
            </form>
        </section>
    );
}
