import { Tag } from 'types';

export function convertTimestampToDate(timestamp?: number): string {
    if (!timestamp) return '';

    const date = new Date(timestamp);

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function convertTimestampToInputDate(timestamp?: number): string {
    if (!timestamp) return '';

    const date = new Date(timestamp);

    const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

export function convertDateToTimestamp(date: string): number {
    return date ? new Date(date).getTime() : 0;
}

export function stringToTagsNames(input?: string): string[] {
    if (!input) return [];
    return input.split(' / ');
}

export function addTagToString(tags: string | undefined, name: string): string {
    return tags ? `${tags} / ${name}` : name;
}

export function removeTagFromString(tags: string | undefined, name: string): string {
    const strings = stringToTagsNames(tags);

    const index = strings.indexOf(name);
    if (index != -1) strings.splice(index, 1);
    return strings.join(' / ');
}

export function tagsToString(tags: Tag[]): string {
    const allNames = tags.map((tag) => tag.name);
    return allNames.join(' / ');
}
