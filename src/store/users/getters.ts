import {getStoreAccessors} from 'typesafe-vuex';

import {IUserProfile} from '@/models';
import {State} from '@/store/state';

import {UsersState} from './state';


export const getters = {
    users: (state: UsersState) => state.users,
    userById: (state: UsersState) => (userId: string) => {
        const filteredUsers = state.users.filter((user: IUserProfile) => user.id === userId);
        if (filteredUsers.length > 0) {
            return filteredUsers[0];
        }
        return null;
    },
};

const {read} = getStoreAccessors<UsersState, State>('');

export const readUsers = read(getters.users);
export const readUserProfileById = read(getters.userById);
