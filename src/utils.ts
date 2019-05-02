import {IAuth} from '@/interfaces';

const accessKey = 'access';
const refreshKey = 'refresh';
const darkThemeKey = 'dark';

export const getLocalTokens = () => {
    return {
        access: localStorage.getItem(accessKey) || '',
        refresh: localStorage.getItem(refreshKey) || '',
    };
};

export const saveLocalTokens = (auth: IAuth) => {
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
