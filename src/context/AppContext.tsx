'use client';

import { useState, createContext } from 'react';
import { Airdrop, Context, FormState, Tag } from 'types';

const empty: Airdrop = {
    name: '',
    tier: '',
    priority: '',
    createdAt: 0,
    editedAt: 0,
};

export const DataContext = createContext<Context>({
    currentAirdrop: empty,
    setCurrentAirdrop: () => {},
    tags: {},
    setTags: () => {},
    formState: FormState.Add,
    setFormState: () => {},
});

export function AppContext({ children }: { children: React.ReactNode }) {
    const [tags, setTags] = useState<{ [key: string]: Tag }>({});
    const [formState, setFormState] = useState<FormState>(FormState.Add);
    const [currentAirdrop, setCurrentAirdrop] = useState<Airdrop>(empty);

    return (
        <DataContext.Provider
            value={{ currentAirdrop, setCurrentAirdrop, tags, setTags, formState, setFormState }}
        >
            {children}
        </DataContext.Provider>
    );
}
