<template>
    <v-list>
        <v-list-group>
            <v-list-tile slot="activator">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Администрирование</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/admin/users/all">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Пользователи</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/admin/subjects/all">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Предметы</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/admin/specialities/all">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Направления</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/admin/groups/all">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Группы</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list-group>
    </v-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class AdminMenu extends Vue {

    }
</script>

<style scoped>

</style>
