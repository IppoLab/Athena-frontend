<template>
    <v-list v-if="loggedIn === false" dense>
        <v-list-tile :to="{name: 'login'}">
            <v-list-tile-action>
                <v-icon>perm_identity</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Войти</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
    <v-list v-else dense>
        <v-list-tile :to="{name: 'profile'}">
            <v-list-tile-action>
                <v-icon>account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Профиль</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <AdminMenu v-if="isAdmin"/>
        <StudentMenu v-if="isStudent"/>
        <TutorMenu v-if="iIsTutor"/>
        <v-list-tile :to="{name: 'settings'}">
            <v-list-tile-action>
                <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Настройки</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.prevent="logout">
            <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Выйти</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import {
        readIsLoggedIn,
        readUserIsAdmin,
        readUserIsStudent,
        readUserIsTeacher,
        readUserIsTutor,
    } from '@/store/auth/getters';
    import {dispatchLogout} from '@/store/auth/actions';

    import AdminMenu from '@/views/menu/AdminMenu.vue';
    import StudentMenu from '@/views/menu/StudentMenu.vue';
    import TutorMenu from '@/views/menu/TutorMenu.vue';

    @Component({
        components: {
            TutorMenu,
            StudentMenu,
            AdminMenu,
        },
    })
    export default class ActionMenu extends Vue {
        get loggedIn() {
            return readIsLoggedIn(this.$store);
        }

        public async logout() {
            await dispatchLogout(this.$store);
        }

        get isAdmin() {
            return readUserIsAdmin(this.$store);
        }

        get isStudent() {
            return readUserIsStudent(this.$store);
        }

        get iIsTutor() {
            return readUserIsTutor(this.$store);
        }

        get isTeacher() {
            return readUserIsTeacher(this.$store);
        }
    }
</script>
