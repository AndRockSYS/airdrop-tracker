import { GlacierClient } from '@glacier-network/client';
import { Eip1193Provider } from 'ethers';

import { Airdrop, Tag } from 'types';
import Collection from '@glacier-network/client/dist/cjs/libs/Collection';

const endpoint = 'https://web3storage.onebitdev.com/glacier-gateway';

export default class Glacier {
    private airdropCollection: Collection<Airdrop>;
    private tagsCollection: Collection<Tag>;

    constructor(provider: Eip1193Provider) {
        const client = new GlacierClient(endpoint, { provider });
        const namespace = client.namespace('airdropsTracker');

        this.airdropCollection = namespace.dataset('airdrops').collection('tests');
        this.tagsCollection = namespace.dataset('tags').collection('tag');
    }

    async getAirdrops(): Promise<Airdrop[]> {
        return await this.airdropCollection.find().toArray();
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

    async getTags(): Promise<Tag[]> {
        return await this.tagsCollection.find().toArray();
    }

    async addTag(name: string) {
        await this.tagsCollection.insertOne({ name });
    }

    async deleteTag(name: string) {
        await this.tagsCollection.deleteOne({ name });
    }
}
