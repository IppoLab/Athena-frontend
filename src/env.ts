const env = process.env.VUE_APP_ENV;

let envApiUrl = '';

if (env === 'production') {
    envApiUrl = `https://${process.env.VUE_APP_DOMAIN_PROD}`;
} else {
    envApiUrl = `http://${process.env.VUE_APP_DOMAIN_DEV}:8000`;
}

export const apiUrl = envApiUrl + '/api';
export const appName = process.env.VUE_APP_NAME;
