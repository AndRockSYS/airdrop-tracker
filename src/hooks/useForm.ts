import { ChangeEvent, useContext } from 'react';

import useGlacier from './useGlacier';
import useTags from './useTags';

import { DataContext } from '@/context/AppContext';

import { inputsToAirdrop, airdropToInputs } from '@/utils/form-utils';
import { addTagToString, removeTagFromString } from '@/utils/utils';

import { Airdrop, FormState } from 'types';

const useForm = () => {
    const { glacier } = useGlacier();
    const { tags } = useTags();

    const { currentAirdrop, setCurrentAirdrop, formState, setFormState } = useContext(DataContext);

    const manageAirdrop = () => {
        if (!glacier) return;

        const airdrop = inputsToAirdrop(currentAirdrop);

        formState == FormState.Add ? glacier.addAirdrop(airdrop) : glacier.updateAirdrop(airdrop);

        closeForm();
    };

    const addTagToList = (
        listName: 'tags' | 'costToFarm' | 'chainTech',
        event: ChangeEvent<HTMLInputElement>
    ) => {
        if (!tags) return;

        const value = event.target.value;

        if (tags[value]) {
            const copy = Object.assign({}, currentAirdrop);
            copy[listName] = addTagToString(copy[listName], value);

            setCurrentAirdrop(copy);

            event.target.value = '';
        }
    };

    const deleteTagFromList = (listName: 'tags' | 'costToFarm' | 'chainTech', name: string) => {
        const copy = Object.assign({}, currentAirdrop);

        copy[listName] = removeTagFromString(copy[listName], name);
        setCurrentAirdrop(copy);
    };

    const openForm = (formState: FormState, airdrop?: Airdrop) => {
        setFormState(formState);

        const form = document.querySelector('section.airdrop-form') as HTMLElement;
        form.style.display = 'block';

        if (formState == FormState.Edit && airdrop) {
            setCurrentAirdrop(airdrop);
            airdropToInputs(airdrop);
        }
    };

    const closeForm = () => {
        const form = document.querySelector('section.airdrop-form') as HTMLElement;
        form.style.display = 'none';

        const inputs = document.querySelectorAll(
            'section.airdrop-form > form > input'
        ) as NodeListOf<HTMLInputElement>;

        inputs.forEach((input) => (input.value = ''));

        setCurrentAirdrop({ name: '', tier: '', priority: '', createdAt: 0, editedAt: 0 });
    };

    return {
        openForm,
        closeForm,

        setCurrentAirdrop,
        currentAirdrop,
        manageAirdrop,

        addTagToList,
        deleteTagFromList,

        formState,
        setFormState,
    };
};

export default useForm;
