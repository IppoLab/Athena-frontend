import axios from 'axios';
import {apiUrl} from '@/env';
import {IUserInLogin} from '@/interfaces';

function authHeaders(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export const api = {
    loginGetToken: async (user: IUserInLogin) => {
        return axios.post(`${apiUrl}/auth/login/`, user);
    },
    getMe: async (token: string) => {
        return axios.get(`${apiUrl}/auth/profile/me/`, authHeaders(token));
    },
};
