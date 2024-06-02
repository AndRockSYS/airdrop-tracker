import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import useGlacier from './useGlacier';

import { Tag, TagProp } from 'types';

const useTags = () => {
    const { glacier } = useGlacier();

    const allTags = useMemo(() => {
        if (!glacier) return;

        const result: { [key: string]: Tag } = {};
        glacier.getAllTags().then((tags) => {
            tags.map((tag) => (result[tag.name] = tag));
        });
        return result;
    }, [glacier]);

    const addTag = (event: ChangeEvent<HTMLInputElement>, prop: TagProp) => {
        if (!glacier) return;

        const tagRegex = /(\w+ \/ #.{6})/gm;
        const value = event.target.value;

        if (value == 'Add Tag') {
            event.target.placeholder = 'Name / Color in Hex';
            event.target.value = '';
        } else if (tagRegex.test(value)) {
            const input = value.match(tagRegex)?.[0];
            const [name, color] = (input as string).split(' / ');
            glacier.addTag({ name, color, prop });

            event.target.value = '';
            event.target.placeholder = prop;
        }
    };

    return { addTag, allTags };
};

export default useTags;
