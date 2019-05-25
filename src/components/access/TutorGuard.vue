<template>
    <router-component></router-component>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import RouterComponent from '@/components/RouterComponent.vue';

    import store from '@/store';
    import {readUserIsTutor} from '@/store/auth/getters';


    async function tutorRouteGuard(to, from, next) {
        if (!readUserIsTutor(store)) {
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
    export default class TutorGuard extends Vue {
        public async beforeRouteEnter(to, from, next) {
            await tutorRouteGuard(to, from, next);
        }

        public async beforeRouteUpdate(to, from, next) {
            await tutorRouteGuard(to, from, next);
        }
    }
</script>
