import {getStoreAccessors} from 'typesafe-vuex';

import {ISpeciality} from '@/models';
import {State} from '@/store/state';

import {SpecialitiesState} from './state';

export const mutations = {
    setSpecialities: (state: SpecialitiesState, payload: ISpeciality[]) => {
        state.specialities = payload;
    },
    setSpeciality: (state: SpecialitiesState, payload: ISpeciality) => {
        const specialities = state.specialities.filter((speciality: ISpeciality) => speciality.id !== payload.id);
        specialities.push(payload);
        state.specialities = specialities;
    },
};

const {commit} = getStoreAccessors<SpecialitiesState, State>('');

export const commitSetSpecialities = commit(mutations.setSpecialities);
export const commitSetSpeciality = commit(mutations.setSpeciality);
