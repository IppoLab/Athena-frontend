<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import store from '@/store';
    import {readUserIsTutor} from '@/store/auth/getters';

    const tutorRouteGuard = async (to, from, next) => {
        if (!readUserIsTutor(store)) {
            next(false);
        } else {
            next();
        }
    };

    @Component
    export default class Tutor extends Vue {
        public async beforeRouteEnter(to, from, next) {
            await tutorRouteGuard(to, from, next);
        }

        public async beforeRouteUpdate(to, from, next) {
            await tutorRouteGuard(to, from, next);
        }
    }
</script>
