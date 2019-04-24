<template>
    <div>
        <v-switch v-model="useDarkTheme"></v-switch>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {dispatchChangeTheme, dispatchCheckTheme} from '@/store/main/actions';
    import {darkTheme, lightTheme} from '@/utils';
    import {readUseDarkTheme} from '@/store/main/getters';

    @Component
    export default class ThemeSwitcher extends Vue {
        public useDarkTheme: boolean = true;

        @Watch('useDarkTheme')
        public async onPropertyChanged(value: boolean, oldValue: boolean) {
            await dispatchChangeTheme(this.$store, value ? darkTheme : lightTheme);
        }

        public async created() {
            await dispatchCheckTheme(this.$store);
            this.useDarkTheme = readUseDarkTheme(this.$store);
        }
    }
</script>

<style scoped>

</style>
