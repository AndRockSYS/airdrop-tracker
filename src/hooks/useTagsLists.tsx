import { useEffect, useState } from 'react';
import useGlacier from './useGlacier';

import { TagProp } from 'types';

const useTagsLists = () => {
    const { glacier } = useGlacier();

    const [progress, setProgress] = useState<JSX.Element>(<></>);
    const [tags, setTags] = useState<JSX.Element>(<></>);
    const [costToFarm, setCostToFarm] = useState<JSX.Element>(<></>);
    const [chainTech, setChainTech] = useState<JSX.Element>(<></>);
    const [stage, setStage] = useState<JSX.Element>(<></>);
    const [tier, setTier] = useState<JSX.Element>(<></>);
    const [prority, setPriority] = useState<JSX.Element>(<></>);
    const [status, setStatus] = useState<JSX.Element>(<></>);

    const getDatalist = (prop: TagProp): JSX.Element => {
        if (!glacier) return <></>;

        return (
            <datalist id={prop}>
                {glacier.getTagsByProp(prop).then((tags) =>
                    tags.map((tag) => (
                        <option value={tag.name} key={tag.name}>
                            {tag.name}
                        </option>
                    ))
                )}
                <option value='Add Tag'>Add Tag</option>
            </datalist>
        );
    };

    useEffect(() => {
        const form = document.querySelector('section.airdrop-form') as HTMLElement;
        if (form.style.display == 'none') return;

        setProgress(getDatalist('progress'));
        setTags(getDatalist('tags'));
        setCostToFarm(getDatalist('costToFarm'));
        setChainTech(getDatalist('chainTech'));
        setStage(getDatalist('stage'));
        setTier(getDatalist('tier'));
        setPriority(getDatalist('priority'));
        setStatus(getDatalist('status'));
    }, [glacier]);

    return { progress, tags, costToFarm, chainTech, stage, tier, prority, status };
};

export default useTagsLists;
