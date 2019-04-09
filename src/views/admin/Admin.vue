<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readUserIsAdmin} from '@/store/main/getters';
    import store from '@/store';

    const adminRouteGuard = async (to, from, next) => {
        if (!readUserIsAdmin(store)) {
            next(false);
        } else {
            next();
        }
    };

    @Component
    export default class Admin extends Vue {
        public beforeRouteEnter(to, from, next) {
            adminRouteGuard(to, from, next);
        }

        public beforeRouteUpdate(to, from, next) {
            adminRouteGuard(to, from, next);
        }
    }
</script>
