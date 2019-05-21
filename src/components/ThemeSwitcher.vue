<template>
    <div>
        <v-switch v-model="darkTheme"></v-switch>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {dispatchChangeDarkThemeUsage, dispatchCheckDarkThemeUsage} from '@/store/app/actions';
    import {readUseDarkTheme} from '@/store/app/getters';

    @Component
    export default class ThemeSwitcher extends Vue {
        public darkTheme: boolean = true;

        @Watch('darkTheme')
        public async onPropertyChanged(value: boolean) {
            await dispatchChangeDarkThemeUsage(this.$store, value);
        }

        public async created() {
            await dispatchCheckDarkThemeUsage(this.$store);
            this.darkTheme = readUseDarkTheme(this.$store);
        }
    }
</script>
