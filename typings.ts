export type Airdrop = {
    name: string;
    progress?: Progress;
    tags?: string; //!many t

    costToFarm?: string; //!many t
    chainTech?: string; //!many t
    stage?: Stage;

    tier: Tier;
    priority: Priority;
    status?: Status;
    funding?: number;
    val?: number;

    bridgeDateAt?: number;
    firstTxAt?: number;

    completion?: string;

    referralURL?: string;

    createdAt: number;
    editedAt: number;
};

export type Stage = 'Alpha' | 'Testnet' | 'Mainnet';

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

export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';

export type Priority = 'Low' | 'Medium' | 'High';

export type Status = 'Confirmed' | 'Points System' | 'Tokenless' | 'Lock Drop';

export type Tag = {
    name: string;
};
