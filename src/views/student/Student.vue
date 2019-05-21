<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import store from '@/store';
    import {readUserIsStudent} from '@/store/auth/getters';

    const studentRouteGuard = async (to, from, next) => {
        if (!readUserIsStudent(store)) {
            next(false);
        } else {
            next();
        }
    };

    @Component
    export default class Tutor extends Vue {
        public async beforeRouteEnter(to, from, next) {
            await studentRouteGuard(to, from, next);
        }

        public async beforeRouteUpdate(to, from, next) {
            await studentRouteGuard(to, from, next);
        }
    }
</script>
