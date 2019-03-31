<template>
    <v-card height="98%" style="margin: 10px auto; padding: 20px;"
            width="80%">
        <div>
            <h3 class="comment">Создание работы</h3>
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
                    <th class="row_item">
                    </th>
                </tr>
            </table>
            <v-form>
                <v-text-field
                        :counter="max"
                        :rules="rules"
                        label="Наименование"
                        v-model="model">

                </v-text-field>
                <v-text-field
                        :counter="max"
                        :rules="rules"
                        label="Описание"
                        v-model="model">

                </v-text-field>
            </v-form>
            <v-label>Загрузить шаблон:</v-label>
            <input style="margin-left: 30px" type="file">
            <div>
                <v-label>Крайний срок сдачи:</v-label>
            </div>
            <v-date-picker landscape="true" v-model="deadline"></v-date-picker>
            <v-btn style="margin-left: 50px">
                Добавить работу
            </v-btn>
        </div>
    </v-card>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator/lib/vue-property-decorator";

    @Component
    export default class TaskManaging extends Vue {
        public items: string[] = ["ИКБО-13-18", "ИКБО-03-18", "ИКБО-04-18"];
        public classes: string[] = ["АСА", "ООП", "РПП", "АиЭВМ"];
        public tasktp: string[] = ["К/р", "Лаб/р", "Реф", "ВКР", "Практ/р"];
        public deadline: string = new Date().toISOString().substr(0, 10);
    }
</script>
