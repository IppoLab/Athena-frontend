import {IAuth} from '@/interfaces';

const accessKey = 'access';
const refreshKey = 'refresh';
const themeKey = 'darkTheme';
export const darkTheme = 'dark';
export const lightTheme = 'light';

export const getLocalAuth = () => {
    return {
        access: localStorage.getItem(accessKey),
        refresh: localStorage.getItem(refreshKey),
    } as IAuth;
};

export const saveLocalAuth = (auth: IAuth) => {
    localStorage.setItem(accessKey, auth.access);
    localStorage.setItem(refreshKey, auth.refresh);
};

export const removeLocalAuth = () => {
    localStorage.removeItem(accessKey);
    localStorage.removeItem(refreshKey);
};

export const getLocalTheme = () => localStorage.getItem(themeKey);

export const saveLocalTheme = (theme: string) => localStorage.setItem(themeKey, theme);
