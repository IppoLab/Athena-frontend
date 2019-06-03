import {IAuthResponse} from '@/models';

const accessKey = 'access';
const refreshKey = 'refresh';

const darkThemeKey = 'dark';
const apiUrlKey = 'apiUrl';

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

export const getLocalDarkThemeUsage = () => JSON.parse(localStorage.getItem(darkThemeKey) || 'false') === true;

export const saveLocalDarkThemeUsage = (useDarkTheme: boolean) => {
    localStorage.setItem(darkThemeKey, JSON.stringify(useDarkTheme));
};

export const getLocalApiUrl = () => JSON.parse(localStorage.getItem(apiUrlKey) || 'null');

export const saveLocalApiUrl = (apiUrl: string) => {
    return localStorage.setItem(apiUrlKey, JSON.stringify(apiUrl));
};

export const removeLocalApiUrl = () => localStorage.removeItem(apiUrlKey);
