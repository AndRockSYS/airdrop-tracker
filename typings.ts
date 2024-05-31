export type Airdrop = {
    name: string;
    progress: Progress;
    tags: string; //!many

    costToFarm: string; //!many
    chainTech: string; //!many
    stage: string;

    tier: string;
    priority: string;
    status: string;
    funding?: number;
    val?: number;

    bridgeDateAt?: number;
    firstTxAt?: number;

    completion: string;

    referralURL?: string;

    //relatedProjects

    createdAt: number;
    editedAt: number;
};

export type Progress =
    | 'Not Started'
    | 'Planning'
    | 'Unconfirmed'
    | 'In Progress'
    | 'Farming'
    | 'Waiting for Announcement'
    | 'Announced'
    | 'Canceled'
    | 'Ended'
    | 'Claimed'
    | 'Archieve'
    | 'Snapshot Taken';

export type Tier = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export type Tag = {
    name: string;
};
