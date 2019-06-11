<template>
    <loader :loading="!loaded">
        <div slot="content">
            <list-table-header :buttonLink="creationLink" :search.sync="search"></list-table-header>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :pagination.sync="pagination"
                    :search="search"
                    hide-actions>
                <template slot="items" slot-scope="props">
                    <tr @click="onItemClick(props.item.id)">
                        <td v-for="header of headers">
                            <span v-if="$route.name === 'users-all' && header.value === 'roles'">
                                <span v-for="role in props.item[header.value]" :key="role">
                                    <v-chip>{{role}}</v-chip>
                                </span>
                            </span>
                            <span v-else>
                                {{props.item[header.value]}}
                            </span>
                        </td>
                    </tr>
                </template>
                <v-alert slot="no-data" :value="true" color="error" icon="warning">
                    Данных нет
                </v-alert>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Данных нет
                </v-alert>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </div>
    </loader>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    import Loader from '@/components/Loader.vue';
    import ListTableHeader from '@/components/ListTableHeader.vue';

    interface ITableHeader {
        text: string;
        value: string;
        sortable: boolean;
        align: string;
        customHtml?: (item: any) => string;
    }

    @Component({
        components: {
            Loader,
            ListTableHeader,
        },
    })
    export default class ItemsList extends Vue {
        @Prop({default: ''}) public creationLink!: string;
        @Prop({default: () => []}) public headers!: ITableHeader[];
        @Prop({default: async () => undefined}) public preload!: CallableFunction;
        @Prop({default: []}) public items!: any[];

        public loaded: boolean = false;
        public search: string = '';
        public pagination = {
            rowsPerPage: 10,
            totalItems: 0,
        };

        public onItemClick(id: string) {
            this.$emit('itemClick', id);
        }

        get pages() {
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
        }

        public async mounted() {
            await this.preload();

            this.pagination.totalItems = this.items.length;
            this.loaded = true;
        }
    }
</script>
