<template>
    <v-card height="70%" style="margin: 10px auto; padding: 20px;"
            width="80%">
        <div>
            <h3 class="comment">Проверка работ</h3>
        </div>

        <div>
            <v-combobox
                    :items="items"
                    chips
                    clearable
                    label="Группы"
                    multiple
                    solo
                    style="margin-top: 15px;"
                    v-model="chips">
            </v-combobox>
            <table>
                <tr>
                    <th class="row_item">
                        <v-combobox :items="classes"
                                    class="comb"
                                    label="Предмет"
                                    v-model="subject"/>
                    </th>
                    <th class="row_item">
                        <v-combobox :items="tasktp"
                                    class="comb"
                                    label="Тип"
                                    v-model="type"/>
                    </th>

                    <th>
                        <v-btn>Найти работы</v-btn>
                    </th>
                </tr>
            </table>

            <v-list>
                <v-list-tile class="list-tile">Иванов Федор - Л/б №2</v-list-tile>
                <v-list-tile class="list-tile">Федор Неиванов - Л/б №2</v-list-tile>
                <v-list-tile class="list-tile">Нефедор Неиванов - Л/б №2</v-list-tile>
            </v-list>

            <v-text-field
                    label="Примечание тьютора"
                    required
                    v-model="feedback"
            ></v-text-field>

            <v-btn style="margin-left: 100px">
                Oтвет
            </v-btn>
        </div>
    </v-card>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator/lib/vue-property-decorator";

    @Component
    export default class TaskChecking extends Vue {
        public items: string[] = ["ИКБО-13-18", "ИКБО-03-18", "ИКБО-04-18"];
        public classes: string[] = ["АСА", "ООП", "РПП", "АиЭВМ"];
        public tasktp: string[] = ["К/р", "Лаб/р", "Реф", "ВКР", "Практ/р"];
        public deadline: string = new Date().toISOString().substr(0, 10);
    }
</script>

<style scoped>
    .list-tile {
        background-color: dimgrey;
        margin-bottom: 5px;
    }

    .list-tile:hover {
        background-color: lightslategrey;
    }

    .list-tile:checked {
        background-color: lightslategrey;
    }
</style>
