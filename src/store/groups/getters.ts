import {getStoreAccessors} from 'typesafe-vuex';

import {IGroup} from '@/models';
import {State} from '@/store/state';

import {GroupsState} from './state';

export const getters = {
    groups: (state: GroupsState) => state.groups,
    groupById: (state: GroupsState) => (groupId: string) => {
        const filteredGroups = state.groups.filter((group: IGroup) => group.id === groupId);
        if (filteredGroups.length > 0) {
            return filteredGroups[0];
        }
        return null;
    },
};

const {read} = getStoreAccessors<GroupsState, State>('');


export const readGroups = read(getters.groups);
export const readGroupById = read(getters.groupById);
