/* tslint:disable:no-console */

import {register} from 'register-service-worker';

import store from '@/store';
import {commitAddNotification} from '@/store/app/mutations';

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB',
            );
        },
        registered() {
            console.log('Service worker has been registered.');
        },
        cached() {
            console.log('Content has been cached for offline use.');
        },
        updatefound() {
            console.log('New content is downloading.');
        },
        updated(options: ServiceWorkerRegistration) {
            console.log('New content is available; please refresh.');
            commitAddNotification(store, {
                content: 'Доступно обновление', actions: [
                    {
                        name: 'Обновить',
                        action: async () => {
                            if (options.waiting) {
                                options.waiting.postMessage({action: 'skipWaiting'});

                                window.location.reload();
                            }
                        },
                    },
                    {
                        name: 'Закрыть',
                        action: async () => undefined,
                    },
                ],
            });
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.');
        },
        error(error) {
            console.error('Error during service worker registration:', error);
        },
    });
}
