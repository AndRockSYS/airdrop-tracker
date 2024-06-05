import { Airdrop } from 'types';

export const sortBy = (airdrops: Airdrop[], property?: string): Airdrop[] => {
    if (!property) return airdrops.sort((a, b) => a.editedAt - b.editedAt);

    const prop = property as keyof Airdrop;

    return airdrops.sort((a, b) =>
        (a[prop] ? a[prop] : '').toString().localeCompare((b[prop] ? b[prop] : '').toString())
    );
};
