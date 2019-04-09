<template>
    <v-content app>
        <v-container class="fluid fill-height">
            <v-layout class=" justify-center">
                <v-flex class="xs12 md5 sm8">
                    <v-card>
                        <v-toolbar>
                            <v-toolbar-title> Загрузить работу</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>

                            <v-combobox :items="subjects"
                                        class="comb"
                                        label="Предмет"
                                        v-model="selectedSubject"/>

                            <v-combobox :items="taskTypes"
                                        class="comb"
                                        label="Тип"
                                        v-model="selectedType"/>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn>Найти работы</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class StudentForm extends Vue {
        public readonly subjects: string[] = [
            'АСА',
            'ООП',
            'РПП',
            'АиЭВМ',
        ];

        public readonly taskTypes: string[] = [
            'К/р',
            'Лаб/р',
            'Реф',
            'ВКР',
            'Практ/р',
        ];

        public selectedSubject: string = '';
        public selectedType: string = '';

    }
</script>
