const tokenKey = 'token';
const themeKey = 'darkTheme';
export const darkTheme = 'dark';
export const lightTheme = 'light';

export const getLocalToken = () => localStorage.getItem(tokenKey);

export const saveLocalToken = (token: string) => localStorage.setItem(tokenKey, token);

export const removeLocalToken = () => localStorage.removeItem(tokenKey);

export const getLocalTheme = () => localStorage.getItem(themeKey);

export const saveLocalTheme = (theme: string) => localStorage.setItem(themeKey, theme);
