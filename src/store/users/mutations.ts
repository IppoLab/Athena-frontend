import {getStoreAccessors} from 'typesafe-vuex';

import {IUserProfile} from '@/models';
import {State} from '@/store/state';

import {UsersState} from './state';

export const mutations = {
    setUsers: (state: UsersState, payload: IUserProfile[]) => {
        state.users = payload;
    },
    setUser: (state: UsersState, payload: IUserProfile) => {
        const users = state.users.filter((user: IUserProfile) => user.id !== payload.id);
        users.push(payload);
        state.users = users;
    },
};

const {commit} = getStoreAccessors<UsersState, State>('');

export const commitSetUserProfiles = commit(mutations.setUsers);
export const commitSetUserProfile = commit(mutations.setUser);
