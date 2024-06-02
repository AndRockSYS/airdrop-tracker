export type Airdrop = {
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
};

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
