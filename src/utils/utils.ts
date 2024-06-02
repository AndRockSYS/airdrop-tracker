import { Tag } from 'types';

export function convertTimestampToDate(timestamp: number): string {
    const date = new Date(timestamp);

    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}

export function stringToTags(input?: string): string[] {
    if (!input) return [];
    return input.split(' / ');
}

export function tagsToString(tags: Tag[]): string {
    const allNames = tags.map((tag) => tag.name);
    return allNames.join(' / ');
}
