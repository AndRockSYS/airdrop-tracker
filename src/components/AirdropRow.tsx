import { convertTimestampToDate, stringToTags } from '@/utils/utils';

import { Airdrop } from 'types';

import tagStyle from './tag.module.css';

export default function AirdropRow(airdrop: Airdrop) {
    return (
        <tr key={airdrop.name}>
            <td>{airdrop.name}</td>
            <td>{airdrop.tier}</td>
            <td>
                {stringToTags(airdrop.costToFarm).map((item) => (
                    <div key={item.name} className={tagStyle.tag}>
                        {item.name}
                    </div>
                ))}
            </td>
            <td>{airdrop.status}</td>
            <td>{airdrop.progress}</td>
            <td>{airdrop.funding ? `$${airdrop.funding}` : ''}</td>
            <td>{airdrop.val ? `$${airdrop.val}` : ''}</td>
            <td>{airdrop.stage}</td>
            <td>
                {stringToTags(airdrop.tags).map((item) => (
                    <div key={item.name} className={tagStyle.tag}>
                        {item.name}
                    </div>
                ))}
            </td>
            <td>
                {stringToTags(airdrop.chainTech).map((item) => (
                    <div key={item.name} className={tagStyle.tag}>
                        {item.name}
                    </div>
                ))}
            </td>
            <td>{convertTimestampToDate(airdrop.createdAt)}</td>
            <td>{convertTimestampToDate(airdrop.editedAt)}</td>
        </tr>
    );
}
