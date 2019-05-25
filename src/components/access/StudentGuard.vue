<template>
    <router-component></router-component>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import RouterComponent from '@/components/RouterComponent.vue';

    import store from '@/store';
    import {readUserIsStudent} from '@/store/auth/getters';


    async function studentRouteGuard(to, from, next) {
        if (!readUserIsStudent(store)) {
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
    export default class StudentGuard extends Vue {
        public async beforeRouteEnter(to, from, next) {
            await studentRouteGuard(to, from, next);
        }

        public async beforeRouteUpdate(to, from, next) {
            await studentRouteGuard(to, from, next);
        }
    }
</script>
