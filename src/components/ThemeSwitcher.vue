<template>
    <div>
        <v-switch v-model="useDarkTheme"></v-switch>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {dispatchChangeDarkThemeUsage, dispatchCheckDarkThemeUsage} from '@/store/main/actions';
    import {readUseDarkTheme} from '@/store/main/getters';

    @Component
    export default class ThemeSwitcher extends Vue {
        public useDarkTheme: boolean = true;

        @Watch('useDarkTheme')
        public async onPropertyChanged(value: boolean, oldValue: boolean) {
            await dispatchChangeDarkThemeUsage(this.$store, value);
        }

        public async created() {
            await dispatchCheckDarkThemeUsage(this.$store);
            this.useDarkTheme = readUseDarkTheme(this.$store);
        }
    }
</script>
