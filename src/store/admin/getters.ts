import {AdminState} from './state';
import {getStoreAccessors} from 'typesafe-vuex';
import {State} from '@/store/state';

export const getters = {
    adminUsers: (state: AdminState) => state.users,
    adminUserById: (state: AdminState) => (userId: string) => {
        const filteredUsers = state.users.filter((user) => user.id === userId);
        if (filteredUsers.length > 0) {
            return {...filteredUsers[0]};
        }
    },
};

const {read} = getStoreAccessors<AdminState, State>('');

export const readAdminUserById = read(getters.adminUserById);
export const readAdminUsers = read(getters.adminUsers);
