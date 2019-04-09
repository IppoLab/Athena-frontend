<template>
    <div id="app">
        <v-app dark>
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
                </v-toolbar>
                <router-view/>
                <NotificationManager></NotificationManager>
                <v-footer app>
                    <v-layout align-end justify-end>
                        <span class="ma-4">Still In Development</span>
                    </v-layout>
                </v-footer>
            </v-content>
        </v-app>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readIsLoggedIn} from '@/store/main/getters';
    import {dispatchCheckLoggedIn, dispatchLogout} from '@/store/main/actions';
    import ActionMenu from '@/views/menu/ActionMenu.vue';
    import {appName} from '@/env';
    import NotificationManager from '@/components/NotificationManager.vue';

    @Component({
        components: {
            NotificationManager,
            ActionMenu,
        },
    })
    export default class App extends Vue {
        public drawer: boolean = false;

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
            await dispatchCheckLoggedIn(this.$store);
        }
    }
</script>
