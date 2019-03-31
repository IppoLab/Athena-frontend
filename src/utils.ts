const tokenKey = "token";

export const getLocalToken = () => localStorage.getItem(tokenKey);

export const saveLocalToken = (token: string) => localStorage.setItem(tokenKey, token);

export const removeLocalToken = () => localStorage.removeItem(tokenKey);
