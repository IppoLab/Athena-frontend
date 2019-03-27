<template>
    <div class="student-page">
        <div class="container-page" style="margin-top: 200px;">
            <h1>Работы</h1>

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
                    <th class="row_item">
                    </th>
                    <th class="row_item">
                        <v-btn>Найти работы</v-btn>
                    </th>

                </tr>
            </table>

            <v-list>
                <v-list-tile class="list-tile">Л/б №2</v-list-tile>
                <v-list-tile class="list-tile">Л/б №3</v-list-tile>
                <v-list-tile class="list-tile">Л/б №4</v-list-tile>
            </v-list>

            <div style="margin-top: 30px">
                <v-label style="margin-top: 20px">Загрузить работу:</v-label>
                <input type="file" style="margin-left: 30px">
            </div>
            <v-card width="80%"
                    style="margin: 10px auto;">


                <div>
                    <h3 class="comment">Ошибок в оформлении нет. Принести на подпись.</h3>
                </div>
            </v-card>

            <v-btn>Загрузить работу</v-btn>
        </div>
    </div>
</template>

<script>
    import {Vue, Component} from "vue-property-decorator/lib/vue-property-decorator";

    @Component
    export default class StudentForm extends Vue {
        data() {
            return {
                classes: [
                    'АСА',
                    'ООП',
                    'РПП',
                    'АиЭВМ'
                ],
                tasktp: [
                    'К/р',
                    'Лаб/р',
                    'Реф',
                    'ВКР',
                    'Практ/р'
                ],
            }
        }
    }
</script>

<style scoped>

    .student-page {
        width: 40%;
        margin: 0 auto;
        text-align: center;
    }

    .comb {
        width: 95%;
    }

    .row_item {
        width: 120px;
    }

    .comment {
        background-color: darkseagreen;
        border-radius: 5px;
        padding: 10px;
    }

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
