<template>
    <v-card width="80%" height="98%"
            style="margin: 10px auto; padding: 20px;">
        <div>
            <h3 class="comment">Создание работы</h3>
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
                    <th class="row_item">
                    </th>
                </tr>
            </table>
            <v-form>
                <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="Наименование">

                </v-text-field>
                <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="Описание">

                </v-text-field>
            </v-form>
            <v-label>Загрузить шаблон:</v-label>
            <input type="file" style="margin-left: 30px">
            <div>
                <v-label>Крайний срок сдачи:</v-label>
            </div>
            <v-date-picker v-model="deadline" landscape="true" ></v-date-picker>
            <v-btn style="margin-left: 50px">
               Добавить работу
            </v-btn>
        </div>
    </v-card>
</template>

<script>
    import {Vue, Component} from "vue-property-decorator/lib/vue-property-decorator"

    @Component
    export default class TaskManaging extends Vue {
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


</style>
