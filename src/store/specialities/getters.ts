import {getStoreAccessors} from 'typesafe-vuex';

import {State} from '@/store/state';
import {ISpeciality} from '@/models';

import {SpecialitiesState} from './state';

export const getters = {
    specialities: (state: SpecialitiesState) => state.specialities,
    specialityById: (state: SpecialitiesState) => (specialityId: string) => {
        const filteredSpecialities = state.specialities.filter(
            (speciality: ISpeciality) => speciality.id === specialityId,
        );
        if (filteredSpecialities.length > 0) {
            return filteredSpecialities[0];
        }
        return null;
    },
};

const {read} = getStoreAccessors<SpecialitiesState, State>('');

export const readSpecialities = read(getters.specialities);
export const readSpecialityById = read(getters.specialityById);
