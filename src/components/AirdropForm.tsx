'use client';

import { ChangeEvent, useMemo } from 'react';

import useForm from '@/hooks/useForm';
import useGlacier from '@/hooks/useGlacier';
import useTags from '@/hooks/useTags';

import { stringToTagsNames } from '@/utils/utils';

import { TagProp, FormState } from 'types';

import './form.css';

export default function AirdropForm() {
    const { manageAirdrop, currentAirdrop, addTagToList, deleteTagFromList, closeForm, formState } =
        useForm();

    const { tags, tagsToObjects } = useTags();
    const { glacier } = useGlacier();

    const addNewTag = (event: ChangeEvent<HTMLInputElement>, prop: TagProp) => {
        if (!glacier) return;

        const tagRegex = /(\w.+ \/ #.{6})/gm;
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

            new Promise((resolve) => setTimeout(resolve, 5_000)).then(() => {
                const recallTags = new CustomEvent('call');
                document.dispatchEvent(recallTags);
            });
        }
    };

    const tagInput = (placeholder: string, list: string, isMultiple?: boolean): JSX.Element => {
        return (
            <input
                type='text'
                list={list}
                placeholder={placeholder}
                onChange={
                    isMultiple
                        ? (event) => {
                              addNewTag(event, list as TagProp);
                              addTagToList(list as 'tags' | 'costToFarm' | 'chainTech', event);
                          }
                        : (event) => addNewTag(event, list as TagProp)
                }
            />
        );
    };

    const datalist = (prop: TagProp): JSX.Element => {
        const list: JSX.Element[] = [];

        if (tags) {
            Object.entries(tags).map(([name, tag]) => {
                if (tag.prop == prop)
                    list.push(
                        <option value={name} key={name}>
                            {name}
                        </option>
                    );
            });
        }

        return (
            <datalist id={prop}>
                {list}
                <option value='Add Tag'>Add Tag</option>
            </datalist>
        );
    };

    const dateInput = (placeholder: string): JSX.Element => {
        return (
            <input
                type='text'
                onFocus={(event) => (event.target.type = 'date')}
                onBlur={(event) => (event.target.type = 'text')}
                placeholder={placeholder}
            />
        );
    };

    return (
        <section className='airdrop-form'>
            <form className='airdrop-form'>
                <button type='button' id='button' onClick={closeForm}>
                    Close
                </button>
                <input type='text' placeholder='Name' />
                {tagInput('Progress', 'progress')}
                {useMemo(() => datalist('progress'), [tags, tagsToObjects])}
                {tagInput('Tags', 'tags', true)}
                {useMemo(() => datalist('tags'), [tags, tagsToObjects])}
                <div>
                    {useMemo(
                        () =>
                            stringToTagsNames(currentAirdrop.tags).map((tag, index) => (
                                <h2 onClick={() => deleteTagFromList('tags', tag)} key={index}>
                                    {tag}
                                </h2>
                            )),
                        [currentAirdrop.tags]
                    )}
                </div>
                {tagInput('Cost to Farm', 'costToFarm', true)}
                {useMemo(() => datalist('costToFarm'), [tags, tagsToObjects])}
                <div>
                    {useMemo(() => {
                        return stringToTagsNames(currentAirdrop.costToFarm).map((tag, index) => (
                            <h2 onClick={() => deleteTagFromList('costToFarm', tag)} key={index}>
                                {tag}
                            </h2>
                        ));
                    }, [currentAirdrop.costToFarm])}
                </div>
                {tagInput('Chain / Tech', 'chainTech', true)}
                {useMemo(() => datalist('chainTech'), [tags, tagsToObjects])}
                <div>
                    {useMemo(() => {
                        return stringToTagsNames(currentAirdrop.chainTech).map((tag, index) => (
                            <h2 onClick={() => deleteTagFromList('chainTech', tag)} key={index}>
                                {tag}
                            </h2>
                        ));
                    }, [currentAirdrop.chainTech])}
                </div>
                {tagInput('Stage', 'stage')}
                {useMemo(() => datalist('stage'), [tags, tagsToObjects])}
                {tagInput('Tier', 'tier')}
                {useMemo(() => datalist('tier'), [tags, tagsToObjects])}
                {tagInput('Priority', 'priority')}
                {useMemo(() => datalist('priority'), [tags, tagsToObjects])}
                {tagInput('Status', 'status')}
                {useMemo(() => datalist('status'), [tags, tagsToObjects])}
                <input type='text' placeholder='Funding' />
                <input type='text' placeholder='Val' />
                {dateInput('Bridge Date')}
                {dateInput('First Tx')}
                <input type='text' placeholder='Completion' />
                <input type='text' placeholder='Referral' />
                <div>
                    <input type='checkbox' />
                    <h2>Snapshot</h2>
                </div>

                <input type='text' placeholder='Image URL' />
                <textarea name='about' id='about' placeholder='About The Project'></textarea>
                <textarea name='tasks' id='tasks' placeholder='Tasks'></textarea>

                {useMemo(
                    () => (
                        <button type='button' id='button' onClick={() => manageAirdrop()}>
                            {formState == FormState.Add ? 'Add' : 'Update'}
                        </button>
                    ),
                    [formState, currentAirdrop]
                )}
            </form>
        </section>
    );
}
