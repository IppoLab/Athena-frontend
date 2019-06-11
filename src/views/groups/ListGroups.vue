<template>
    <items-list
            :creationLink="{name: 'groups-new'}"
            :headers="headers"
            :items="groups"
            :preload="loadGroups"
            @itemClick="routeGroup"
    ></items-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import ItemsList from '@/components/ItemsList.vue';

    import {readGroups} from '@/store/groups/getters';
    import {dispatchGetGroups, dispatchRouteEditGroup} from '@/store/groups/actions';

    import {IGroup, ListElementGroup} from '@/models';

    @Component({
        components: {
            ItemsList,
        },
    })
    export default class ListGroups extends Vue {
        public headers = [
            {
                text: 'Название',
                value: 'name',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Направление',
                value: 'speciality',
                sortable: false,
                align: 'left',
            },
        ];

        get groups() {
            return readGroups(this.$store).map((group: IGroup) => ListElementGroup.fromGroup(group));
        }

        public async loadGroups() {
            await dispatchGetGroups(this.$store);
        }

        public async routeGroup(id: string) {
            await dispatchRouteEditGroup(this.$store, id);
        }
    }
</script>
