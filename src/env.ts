export const env = process.env.VUE_APP_ENV;

let envApiUrl = '';

if (env === 'production') {
    envApiUrl = `https://${process.env.VUE_APP_DOMAIN_PROD}`;
} else {
    const httpsEnv = process.env.VUE_APP_DOMAIN_DEV_SECURE;
    const secureConnection = httpsEnv !== undefined ? JSON.parse(httpsEnv) : false;
    const scheme = secureConnection ? 'https' : 'http';
    envApiUrl = `${scheme}://${process.env.VUE_APP_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl + '/api';
export const appName = process.env.VUE_APP_NAME;
