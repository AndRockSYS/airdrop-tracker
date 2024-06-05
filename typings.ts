import { Dispatch, SetStateAction } from 'react';

export interface Airdrop {
    name: string;
    progress?: string; //!t
    tags?: string; //!many t

    costToFarm?: string; //!many t
    chainTech?: string; //!many t
    stage?: string; //!t

    tier: string; //!t
    priority: string; //!t
    status?: string; //!t
    funding?: number;
    val?: number;

    bridgeDateAt?: number;
    firstTxAt?: number;

    completion?: string;

    referralURL?: string;

    createdAt: number;
    editedAt: number;
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

export interface Context {
    currentAirdrop: Airdrop;
    setCurrentAirdrop: Dispatch<SetStateAction<Airdrop>>;
    tags: { [key: string]: Tag };
    setTags: Dispatch<SetStateAction<{ [key: string]: Tag }>>;
    formState: FormState;
    setFormState: Dispatch<SetStateAction<FormState>>;
}
