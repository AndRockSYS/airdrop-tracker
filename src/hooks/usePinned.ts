import { useState } from 'react';

import { Airdrop } from 'types';

const usePinned = () => {
    const [pinned, setPinned] = useState<Airdrop[]>([]);

    const addPinned = (airdrop: Airdrop) => {
        const copy = [...pinned];
        copy.push(airdrop);
        setPinned(copy);
    };

    const removePinned = (airdrop: Airdrop) => {
        const copy = [...pinned];
        const index = copy.indexOf(airdrop);

        if (index != -1) {
            copy.splice(index, 1);
        }

        setPinned(copy);
    };

    return { pinned, addPinned, removePinned };
};

export default usePinned;
