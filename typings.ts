import { Dispatch, SetStateAction } from 'react';

export interface Airdrop {
    name: string;
    progress?: string;
    tags?: string;

    costToFarm?: string;
    chainTech?: string;
    stage?: string;

    tier: string;
    priority: string;
    status?: string;
    funding?: number;
    val?: number;

    bridgeDateAt?: number;
    firstTxAt?: number;

    completion?: string;

    referralURL?: string;

    createdAt: number;
    editedAt: number;

    snapshot: boolean;
    image?: string;

    description?: string;
    tasks?: string;
}

export type Tag = {
    name: string;
    color: string;
    prop: TagProp;
};

export type TagProp =
    | 'progress'
    | 'tags'
    | 'costToFarm'
    | 'chainTech'
    | 'stage'
    | 'tier'
    | 'priority'
    | 'status';

export enum FormState {
    Add,
    Edit,
}

export enum Theme {
    Light,
    Dark,
}

export interface Context {
    currentAirdrop: Airdrop;
    setCurrentAirdrop: Dispatch<SetStateAction<Airdrop>>;
    tags: { [key: string]: Tag };
    setTags: Dispatch<SetStateAction<{ [key: string]: Tag }>>;
    formState: FormState;
    setFormState: Dispatch<SetStateAction<FormState>>;
}
