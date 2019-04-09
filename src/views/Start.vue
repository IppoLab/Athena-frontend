<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import store from '@/store';
    import {readIsLoggedIn} from '@/store/main/getters';
    import {dispatchCheckLoggedIn} from '@/store/main/actions';

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
        public beforeRouteEnter(to, from, next) {
            startRouteGuard(to, from, next);
        }

        public beforeRouteUpdate(to, from, next) {
            startRouteGuard(to, from, next);
        }
    }
</script>
