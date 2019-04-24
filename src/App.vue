<template>
    <div id="app">
        <v-app :dark="useDarkTheme">
            <v-content v-if="loggedIn === null">
                <v-container fill-height>
                    <v-layout align-center justify-center>
                        <v-flex>
                            <div class="text-xs-center">
                                <div class="headline my-5">Загрузка...</div>
                                <v-progress-circular size="100" indeterminate color="primary"></v-progress-circular>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
            <v-content v-else>
                <v-navigation-drawer
                        v-model="drawer"
                        clipped
                        fixed
                        app>
                    <ActionMenu/>
                </v-navigation-drawer>
                <v-toolbar app fixed clipped-left>
                    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                    <v-toolbar-title>{{applicationName}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <ThemeSwitcher class="mt-4"></ThemeSwitcher>
                </v-toolbar>
                <router-view/>
                <NotificationManager></NotificationManager>
                <v-footer app>
                    <v-layout align-end justify-end>
                        <span class="ma-4" v-if="appInDev">Still In Development</span>
                    </v-layout>
                </v-footer>
            </v-content>
        </v-app>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readIsLoggedIn, readUseDarkTheme} from '@/store/main/getters';
    import {dispatchCheckLoggedIn, dispatchCheckTheme, dispatchLogout} from '@/store/main/actions';
    import ActionMenu from '@/views/menu/ActionMenu.vue';
    import {appName, env} from '@/env';
    import NotificationManager from '@/components/NotificationManager.vue';
    import ThemeSwitcher from '@/components/ThemeSwitcher.vue';

    @Component({
        components: {
            ThemeSwitcher,
            NotificationManager,
            ActionMenu,
        },
    })
    export default class App extends Vue {
        public drawer: boolean = false;

        public get useDarkTheme() {
            return readUseDarkTheme(this.$store);
        }

        public get loggedIn() {
            return readIsLoggedIn(this.$store);
        }

        public get applicationName() {
            return appName;
        }

        public async logout() {
            await dispatchLogout(this.$store);
        }

        public async created() {
            await dispatchCheckTheme(this.$store);
            await dispatchCheckLoggedIn(this.$store);
        }

        public get appInDev() {
            return env !== 'production';
        }
    }
</script>
