<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import store from '@/store';
    import {readIsLoggedIn} from '@/store/auth/getters';
    import {dispatchCheckLoggedIn} from '@/store/auth/actions';

    const startRouteGuard = async (to, from, next) => {
        await dispatchCheckLoggedIn(store);
        const userLoggedIn = readIsLoggedIn(store);
        if (to.path !== '/login' && !userLoggedIn) {
            next('/login');
        } else if (to.path === '/login' && userLoggedIn) {
            next('/');
        } else {
            next();
        }
    };


    @Component
    export default class Start extends Vue {
        public async beforeRouteEnter(to, from, next) {
            await startRouteGuard(to, from, next);
        }

        public async beforeRouteUpdate(to, from, next) {
            await startRouteGuard(to, from, next);
        }
    }
</script>
