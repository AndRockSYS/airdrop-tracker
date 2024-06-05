import { Airdrop } from 'types';

export const sortBy = (airdrops: Airdrop[], property: string): Airdrop[] => {
    return airdrops.sort((a, b) => {
        const aProp = a[property as keyof Airdrop];
        const bProp = b[property as keyof Airdrop];

        return (aProp ? aProp : '').toString().localeCompare((bProp ? bProp : '').toString());
    });
};
