<template>
    <v-list>
        <v-list-group>
            <v-list-tile slot="activator">
                <v-list-tile-action>
                    <v-icon>supervisor_account</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Тьютор</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'tasks-all'}">
                <v-list-tile-action>
                    <v-icon>folder_shared</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Задания</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'reports-all'}">
                <v-list-tile-action>
                    <v-icon>folder_special</v-icon>
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
    export default class TutorMenu extends Vue {
    }
</script>
