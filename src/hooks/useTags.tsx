import { useContext, useEffect } from 'react';

import useGlacier from './useGlacier';

import { DataContext } from '@/context/AppContext';

import { stringToTagsNames } from '@/utils/utils';

import { Tag } from 'types';

const useTags = () => {
    const { glacier } = useGlacier();

    const { tags, setTags } = useContext(DataContext);

    useEffect(() => {
        if (!glacier) return;

        const result: { [key: string]: Tag } = {};

        glacier.getAllTags().then((tags) => {
            tags.map((tag) => (result[tag.name] = tag));
        });

        setTags(result);
    }, [glacier]);

    const tagsToObjects = (tagsInput?: string): JSX.Element[] => {
        if (!tagsInput) return [];

        return stringToTagsNames(tagsInput).map((tagName, index) => {
            return (
                <div
                    id='tag'
                    key={index}
                    style={{
                        backgroundColor: tags && tags[tagName] ? tags[tagName].color : '',
                    }}
                >
                    {tagName}
                </div>
            );
        });
    };

    return { tags, tagsToObjects };
};

export default useTags;
