<template>
    <Loader :loading="!loaded">
        <div slot="content">
            <ListTableHeader buttonLink="/admin/users/create" :search.sync="search"></ListTableHeader>
            <v-data-table
                    :headers="headers"
                    :items="users"
                    :pagination.sync="pagination"
                    hide-actions
                    :search="search">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.username }}</td>
                    <td>{{ props.item.secondName }}</td>
                    <td>{{ props.item.firstName }}</td>
                    <td>{{ props.item.lastName }}</td>
                    <td>
                    <span v-for="role in roles" :key="role.id">
                        <v-chip v-if="props.item.roles.includes(role[0])">{{role[1]}}</v-chip>
                    </span>
                    </td>
                    <td class="justify-center layout px-0">
                        <v-tooltip top>
                            <span>Изменить</span>
                            <v-btn slot="activator" flat :to="{name: 'users-edit', params: {id: props.item.id}}">
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
    import {readUsers} from '@/store/users/getters';
    import {dispatchGetUsers} from '@/store/users/actions';
    import {rolesRus} from '@/configs/constants';
    import ListTableHeader from '@/components/ListTableHeader.vue';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class Users extends Vue {
        public loaded: boolean = false;
        public search: string = '';
        public pagination = {
            rowsPerPage: 10,
            totalItems: 0,
        };

        public headers = [
            {
                text: 'Имя пользователя',
                value: 'username',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Фамилия',
                value: 'secondName',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Имя',
                value: 'firstName',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Отчество',
                value: 'lastName',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Права',
                value: 'roles',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Действия',
                sortable: false,
                align: 'center',
            },
        ];


        public get roles() {
            return rolesRus;
        }

        get pages() {
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
        }

        get users() {
            return readUsers(this.$store);
        }

        public async mounted() {
            await dispatchGetUsers(this.$store);
            this.pagination.totalItems = this.users.length;
            this.loaded = true;
        }
    }
</script>
