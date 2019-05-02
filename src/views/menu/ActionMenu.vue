<template>
    <v-list v-if="loggedIn === false" dense>
        <v-list-tile to="/login">
            <v-list-tile-action>
                <v-icon>perm_identity</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Войти</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
    <v-list v-else dense>
        <v-list-tile to="/">
            <v-list-tile-action>
                <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>События</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/profile">
            <v-list-tile-action>
                <v-icon>face</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Профиль</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <AdminMenu v-if="isAdmin"/>
        <StudentMenu v-if="isStudent"/>
        <TutorMenu v-if="iIsTutor"/>
        <TeacherMenu v-if="isTeacher"/>
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
        readUserIsStudent, readUserIsTeacher,
        readUserIsTutor,
        readUserProfile,
    } from '@/store/main/getters';
    import AdminMenu from '@/views/menu/AdminMenu.vue';
    import StudentMenu from '@/views/menu/StudentMenu.vue';
    import TutorMenu from '@/views/menu/TutorMenu.vue';
    import TeacherMenu from '@/views/menu/TeacherMenu.vue';
    import {dispatchLogout} from '@/store/main/actions';

    @Component({
        components: {
            TeacherMenu,
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

<style scoped>

</style>
