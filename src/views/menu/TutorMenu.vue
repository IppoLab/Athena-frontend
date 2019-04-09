<template>
    <v-list>
        <v-list-group>
            <v-list-tile slot="activator">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Тьютор</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/">
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
                    <v-list-tile-title>Управлять пользователями</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list-group>
    </v-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class TutorMenu extends Vue {

    }
</script>

<style scoped>

</style>
