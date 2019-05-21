const darkThemeKey = 'dark';
const apiUrlKey = 'apiUrl';

export const getLocalDarkThemeUsage = () => JSON.parse(localStorage.getItem(darkThemeKey) || 'false') === true;

export const saveLocalDarkThemeUsage = (useDarkTheme: boolean) => {
    localStorage.setItem(darkThemeKey, JSON.stringify(useDarkTheme));
};

export const getLocalApiUrl = () => JSON.parse(localStorage.getItem(apiUrlKey) || 'null');

export const saveLocalApiUrl = (apiUrl: string) => {
    return localStorage.setItem(apiUrlKey, JSON.stringify(apiUrl));
};

export const removeLocalApiUrl = () => localStorage.removeItem(apiUrlKey);
