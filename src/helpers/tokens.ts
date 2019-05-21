import {IAuthResponse} from '@/models';

const accessKey = 'access';
const refreshKey = 'refresh';

export const getLocalTokens = () => {
    return {
        access: localStorage.getItem(accessKey) || '',
        refresh: localStorage.getItem(refreshKey) || '',
    };
};

export const saveLocalTokens = (auth: IAuthResponse) => {
    localStorage.setItem(accessKey, auth.access);
    localStorage.setItem(refreshKey, auth.refresh);
};

export const removeLocalTokens = () => {
    localStorage.removeItem(accessKey);
    localStorage.removeItem(refreshKey);
};
