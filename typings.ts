export type Airdrop = {
    name: string;
    tier: Tier;

    createdAt: number;
    editedAt: number;
};

export type Tag = {
    name: string;
};

export type Tier = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
