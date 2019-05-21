<template>
    <v-list>
        <v-list-group>
            <v-list-tile slot="activator">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Студент</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/student/tasks/all">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Задания</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/student/reports">
                <v-list-tile-action>
                    <v-icon>error</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Отчеты</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list-group>
    </v-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class StudentMenu extends Vue {

    }
</script>

<style scoped>

</style>
