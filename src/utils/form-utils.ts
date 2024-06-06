import { Airdrop } from 'types';

import { convertDateToTimestamp, convertTimestampToInputDate } from './utils';

const inputsToAirdrop = (airdrop: Airdrop): Airdrop => {
    const inputs = document.querySelectorAll(
        'section.airdrop-form > form input, section.airdrop-form > form > textarea'
    ) as NodeListOf<HTMLInputElement>;

    console.log(inputs.length);

    return {
        name: inputs[0].value,
        progress: inputs[1].value,
        tags: airdrop.tags ? airdrop.tags : '',
        costToFarm: airdrop.costToFarm ? airdrop.costToFarm : '',
        chainTech: airdrop.chainTech ? airdrop.chainTech : '',
        stage: inputs[5].value,
        tier: inputs[6].value,
        priority: inputs[7].value,
        status: inputs[8].value,
        funding: Number(inputs[9].value),
        val: Number(inputs[10].value),

        bridgeDateAt: convertDateToTimestamp(inputs[11].value),
        firstTxAt: convertDateToTimestamp(inputs[12].value),

        completion: inputs[13].value,

        referralURL: inputs[14].value,

        createdAt: airdrop.createdAt > 0 ? airdrop.createdAt : Date.now(),
        editedAt: Date.now(),

        snapshot: inputs[15].checked,
        image: inputs[16].value,

        description: inputs[17].value,
        tasks: inputs[18].value,
    };
};

const airdropToInputs = (airdrop: Airdrop) => {
    const inputs = document.querySelectorAll(
        'section.airdrop-form > form input, section.airdrop-form > form > textarea'
    ) as NodeListOf<HTMLInputElement>;

    inputs[0].value = airdrop.name;
    inputs[1].value = airdrop.progress ? airdrop.progress : '';

    inputs[5].value = airdrop.stage ? airdrop.stage : '';
    inputs[6].value = airdrop.tier ? airdrop.tier : '';
    inputs[7].value = airdrop.priority ? airdrop.priority : '';
    inputs[8].value = airdrop.status ? airdrop.status : '';

    inputs[9].value = airdrop.funding ? airdrop.funding.toString() : '';
    inputs[10].value = airdrop.val ? airdrop.val.toString() : '';

    inputs[11].value = convertTimestampToInputDate(airdrop.bridgeDateAt);
    inputs[12].value = convertTimestampToInputDate(airdrop.firstTxAt);

    inputs[13].value = airdrop.completion ? airdrop.completion : '';

    inputs[14].value = airdrop.referralURL ? airdrop.referralURL : '';

    inputs[15].checked = airdrop.snapshot;
    inputs[16].value = airdrop.image ? airdrop.image : '';

    inputs[17].value = airdrop.description ? airdrop.description : '';
    inputs[18].value = airdrop.tasks ? airdrop.tasks : '';
};

export { inputsToAirdrop, airdropToInputs };
