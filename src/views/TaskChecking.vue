<template>
    <v-card width="80%" height="70%"
            style="margin: 10px auto; padding: 20px;">
        <div>
            <h3 class="comment">Проверка работ</h3>
        </div>

        <div>
            <v-combobox
                    v-model="chips"
                    :items="items"
                    label="Группы"
                    chips
                    clearable
                    solo
                    style="margin-top: 15px;"
                    multiple>
            </v-combobox>
            <table>
                <tr>
                    <th class="row_item">
                        <v-combobox class="comb"
                                    v-model="subject"
                                    :items="classes"
                                    label="Предмет"/>
                    </th>
                    <th class="row_item">
                        <v-combobox class="comb"
                                    v-model="type"
                                    :items="tasktp"
                                    label="Тип"/>
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
                    v-model="feedback"
                    label="Примечание тьютора"
                    required
            ></v-text-field>

            <v-btn style="margin-left: 100px">
                Oтвет
            </v-btn>
        </div>
    </v-card>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator/lib/vue-property-decorator'

    @Component
    export default class TaskChecking extends Vue {
        data() {
            return {
                items: ['ИКБО-13-18', 'ИКБО-03-18', "ИКБО-04-18"],
                classes: ['АСА', 'ООП', 'РПП', 'АиЭВМ'],
                tasktp: ['К/р', 'Лаб/р', 'Реф', 'ВКР', 'Практ/р'],
                deadline: new Date().toISOString().substr(0, 10),
            }
        }
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
