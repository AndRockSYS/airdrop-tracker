import { GlacierClient } from '@glacier-network/client';
import Namespace from '@glacier-network/client/dist/cjs/libs/Namespace';
import { Eip1193Provider } from 'ethers';

import { Airdrop, Tag } from '../../typings';
import Collection from '@glacier-network/client/dist/cjs/libs/Collection';

const endpoint = 'https://web3storage.onebitdev.com/glacier-gateway';

export default class Glacier {
    client: GlacierClient;
    namespace: Namespace;

    airdropCollection: Collection<Airdrop>;
    tagsCollection: Collection<Tag>;

    constructor(provider: Eip1193Provider) {
        this.client = new GlacierClient(endpoint, { provider });
        this.namespace = this.client.namespace('airdropsTracker');

        this.airdropCollection = this.namespace.dataset('airdrops').collection('airdrop');
        this.tagsCollection = this.namespace.dataset('tags').collection('tag');
    }

    async getAirdrops(): Promise<Airdrop[]> {
        const dataset = await this.namespace.queryDataset('airdrops');
        return dataset.collections as any as Airdrop[];
    }

    async getAirdropId(name: string): Promise<string> {
        const currectAirdrop = await this.airdropCollection.find({ name }).toArray();
        return currectAirdrop[0]._id;
    }

    async addAirdrop(newAirdrop: Airdrop) {
        await this.airdropCollection.insertOne(newAirdrop);
    }

    async updateAirdrop(updatedAirdrop: Airdrop) {
        const id = await this.getAirdropId(updatedAirdrop.name);
        await this.airdropCollection.updateOne({ _id: id }, updatedAirdrop);
    }

    async deleteAirdrop(name: string) {
        await this.airdropCollection.deleteOne({
            name,
        });
    }

    async getTags(): Promise<string[]> {
        const dataset = await this.namespace.queryDataset('tags');
        return dataset.collections as any as string[];
    }

    async addTag(name: string) {
        await this.tagsCollection.insertOne({ name });
    }

    async deleteTag(name: string) {
        await this.tagsCollection.deleteOne({ name });
    }
}
