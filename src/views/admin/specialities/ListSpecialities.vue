<template>
    <Loader :loading="!loaded">
        <div slot="content">
            <ListTableHeader buttonLink="/admin/specialities/create" :search.sync="search"></ListTableHeader>
            <v-data-table
                    :headers="headers"
                    :items="specialities"
                    :pagination.sync="pagination"
                    hide-actions
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.cipher }}</td>
                    <td class="justify-center layout px-0">
                        <v-tooltip top>
                            <span>Изменить</span>
                            <v-btn slot="activator" flat
                                   :to="{name: 'admin-specialities-edit', params: {id: props.item.id}}">
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
    import {readSpecialities} from '@/store/specialities/getters';
    import {dispatchGetSpecialities} from '@/store/specialities/actions';
    import ListTableHeader from '@/components/ListTableHeader.vue';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class ListSpecialities extends Vue {
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
                text: 'Шифр',
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

        get specialities() {
            return readSpecialities(this.$store);
        }

        public async mounted() {
            await dispatchGetSpecialities(this.$store);
            this.pagination.totalItems = this.specialities.length;
            this.loaded = true;
        }
    }
</script>
