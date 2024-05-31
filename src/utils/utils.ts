import { Tag } from 'types';

export function convertTimestampToDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}

export function stringToTags(input: string): Tag[] {
    const separated = input.split(' / ');
    return separated.map((item) => {
        return {
            name: item,
        };
    });
}
