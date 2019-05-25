<template>
    <router-component></router-component>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import RouterComponent from '@/components/RouterComponent.vue';

    import store from '@/store';
    import {readUserIsAdmin} from '@/store/auth/getters';


    async function adminRouteGuard(to, from, next) {
        if (!readUserIsAdmin(store)) {
            next(false);
        } else {
            next();
        }
    }

    @Component({
        components: {
            RouterComponent,
        },
    })
    export default class AdminGuard extends Vue {
        public async beforeRouteEnter(to, from, next) {
            await adminRouteGuard(to, from, next);
        }

        public async beforeRouteUpdate(to, from, next) {
            await adminRouteGuard(to, from, next);
        }
    }
</script>
