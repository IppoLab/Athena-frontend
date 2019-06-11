<template>
    <div id="app">
        <v-app :dark="darkTheme">
            <loader :loading="loggedIn === null">
                <v-content slot="content">
                    <v-navigation-drawer
                            v-model="showDrawer"
                            clipped
                            fixed
                            app>
                        <ActionMenu/>
                    </v-navigation-drawer>
                    <v-toolbar app fixed clipped-left>
                        <v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
                        <v-toolbar-title>{{appName}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <router-view/>
                    <NotificationManager></NotificationManager>
                    <v-footer app>
                        <v-layout align-end justify-end>
                            <span class="ma-4" v-if="appInDev">Still In Development</span>
                        </v-layout>
                    </v-footer>
                </v-content>
            </loader>
        </v-app>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readUseDarkTheme} from '@/store/app/getters';
    import {readIsLoggedIn} from '@/store/auth/getters';
    import {dispatchCheckDarkThemeUsage} from '@/store/app/actions';
    import {dispatchCheckLoggedIn, dispatchLogout} from '@/store/auth/actions';
    import ActionMenu from '@/views/menu/ActionMenu.vue';
    import {appName, env} from '@/configs/env';
    import NotificationManager from '@/components/NotificationManager.vue';
    import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {
            Loader,
            ThemeSwitcher,
            NotificationManager,
            ActionMenu,
        },
    })
    export default class App extends Vue {
        public showDrawer: boolean = false;

        public async created() {
            await dispatchCheckDarkThemeUsage(this.$store);
            await dispatchCheckLoggedIn(this.$store);
        }

        public get darkTheme() {
            return readUseDarkTheme(this.$store);
        }

        public get loggedIn() {
            return readIsLoggedIn(this.$store);
        }

        public get appName() {
            return appName;
        }

        public get appInDev() {
            return env !== 'production';
        }

        public async logout() {
            await dispatchLogout(this.$store);
        }
    }
</script>
