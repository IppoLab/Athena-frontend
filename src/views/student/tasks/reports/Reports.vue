<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import store from '@/store';
    import {dispatchRouteReportCreateOrEdit} from '@/store/reports/actions';
    import Loader from '@/components/Loader.vue';

    @Component
    export default class Reports extends Vue {
    }
</script>
