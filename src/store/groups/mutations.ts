import {getStoreAccessors} from 'typesafe-vuex';

import {IGroup} from '@/models';
import {State} from '@/store/state';

import {GroupsState} from './state';

export const mutations = {
    setGroups: (state: GroupsState, payload: IGroup[]) => {
        state.groups = payload;
    },
    setGroup: (state: GroupsState, payload: IGroup) => {
        const groups = state.groups.filter((group: IGroup) => group.id !== payload.id);
        groups.push(payload);
        state.groups = groups;
    },
};

const {commit} = getStoreAccessors<GroupsState, State>('');

export const commitSetGroups = commit(mutations.setGroups);
export const commitSetGroup = commit(mutations.setGroup);
