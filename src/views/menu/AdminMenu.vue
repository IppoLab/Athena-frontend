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
            <v-list-tile to="/admin/users/create">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Создать пользователя</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Управление пользователями</v-list-tile-title>
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
