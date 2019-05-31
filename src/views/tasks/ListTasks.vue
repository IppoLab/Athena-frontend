<template>
    <Loader :loading="!loaded">
        <div slot="content">
            <ListTableHeader :search.sync="search"></ListTableHeader>
            <v-data-table
                    :headers="headers"
                    :items="tasks"
                    :pagination.sync="pagination"
                    hide-actions
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.subject.name }}</td>
                    <td>{{ props.item.deadline }}</td>
                    <td class="justify-center layout px-0">
                        <v-btn slot="activator" flat :to="{name: 'tasks-view', params: {id: props.item.id}}">
                            <v-icon>remove_red_eye</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                        Данных нет
                    </v-alert>
                </template>
                <template slot="no-results">
                    <v-alert :value="true" color="error" icon="warning">
                        Данных нет
                    </v-alert>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </Loader>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readTasks} from '@/store/tasks/getters';
    import {dispatchGetTasks} from '@/store/tasks/actions';
    import ListTableHeader from '@/components/ListTableHeader.vue';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class ListTasks extends Vue {
        public loaded: boolean = false;

        public search: string = '';
        public pagination = {
            rowsPerPage: 10,
            totalItems: 0,
        };

        public headers = [
            {
                text: 'Название',
                value: 'name',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Предмет',
                value: 'subject',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Срок сдачи',
                value: 'deadline',
                sortable: true,
                align: 'left',
            },
            {
                text: 'Действия',
                sortable: false,
                align: 'center',
            },
        ];

        get pages() {
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
        }

        get tasks() {
            return readTasks(this.$store);
        }

        public async mounted() {
            await dispatchGetTasks(this.$store);
            this.pagination.totalItems = this.tasks.length;

            this.loaded = true;
        }
    }
</script>
