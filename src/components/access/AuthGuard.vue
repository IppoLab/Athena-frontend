<template>
    <router-component></router-component>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import RouterComponent from '@/components/RouterComponent.vue';

    import store from '@/store';
    import {readIsLoggedIn} from '@/store/auth/getters';
    import {dispatchCheckLoggedIn} from '@/store/auth/actions';


    async function authRouteGuard(to, from, next) {
        await dispatchCheckLoggedIn(store);
        const userLoggedIn = readIsLoggedIn(store);
        if (to.path !== '/login' && !userLoggedIn) {
            next('/login');
        } else if (to.path === '/login' && userLoggedIn) {
            next('/');
        } else {
            next();
        }
    }

    @Component({
        components: {
            RouterComponent,
        },
    })
    export default class AuthGuard extends Vue {
        public async beforeRouteEnter(to, from, next) {
            await authRouteGuard(to, from, next);
        }

        public async beforeRouteUpdate(to, from, next) {
            await authRouteGuard(to, from, next);
        }
    }
</script>
