import { convertTimestampToDate, stringToTags } from '@/utils/utils';

import Glacier from '@/service/Glacier';

import { Airdrop, Tag } from 'types';

export default function AirdropRow(
    airdrop: Airdrop,
    isOwner: boolean,
    glacier: Glacier | undefined,
    tags: { [key: string]: Tag } | undefined
) {
    const tagsToObjects = (input: string | undefined): JSX.Element[] => {
        return stringToTags(input).map((tagName) => {
            return (
                <div
                    id='tag'
                    key={tagName}
                    style={{ backgroundColor: tags && tags[tagName] ? tags[tagName].color : '' }}
                >
                    {tagName}
                </div>
            );
        });
    };
    return (
        <tr key={airdrop.name}>
            <td>{airdrop.name}</td>
            <td>{airdrop.tier}</td>
            <td>{tagsToObjects(airdrop.costToFarm)}</td>
            <td>{airdrop.status}</td>
            <td>{airdrop.progress}</td>
            <td>{airdrop.funding ? `$${airdrop.funding}` : ''}</td>
            <td>{airdrop.val ? `$${airdrop.val}` : ''}</td>
            <td>{airdrop.stage}</td>

            <td>{tagsToObjects(airdrop.tags)}</td>
            <td>{tagsToObjects(airdrop.chainTech)}</td>

            <td>{convertTimestampToDate(airdrop.createdAt)}</td>
            <td>{convertTimestampToDate(airdrop.editedAt)}</td>
            {isOwner ? (
                <td>
                    <button id='button'>Edit</button>
                    <button
                        id='button'
                        onClick={() => {
                            if (glacier) glacier.deleteAirdrop(airdrop.name);
                        }}
                    >
                        Delete
                    </button>
                </td>
            ) : (
                <></>
            )}
        </tr>
    );
}
