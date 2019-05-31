<template>
    <Loader :loading="!loaded">
        <div slot="content">
            <ListTableHeader buttonLink="/admin/subjects/create" :search.sync="search"></ListTableHeader>
            <v-data-table
                    :headers="headers"
                    :items="subjects"
                    :pagination.sync="pagination"
                    hide-actions
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.semester }}</td>
                    <td class="justify-center layout px-0">
                        <v-tooltip top>
                            <span>Изменить</span>
                            <v-btn slot="activator" flat :to="{name: 'subjects-edit', params: {id: props.item.id}}">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-tooltip>
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
    import {readSubjects} from '@/store/subjects/getters';
    import {dispatchGetSubjects} from '@/store/subjects/actions';
    import ListTableHeader from '@/components/ListTableHeader.vue';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class Subjects extends Vue {
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
                text: 'Семестр',
                value: 'semester',
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

        get subjects() {
            return readSubjects(this.$store);
        }

        public async mounted() {
            await dispatchGetSubjects(this.$store);
            this.pagination.totalItems = this.subjects.length;
            this.loaded = true;
        }
    }
</script>
