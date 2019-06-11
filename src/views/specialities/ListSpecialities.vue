<template>
    <items-list
            :creationLink="{name: 'specialities-new'}"
            :headers="headers"
            :preload="loadSpecialities"
            :items="specialities"
            @itemClick="routeSpeciality"
    ></items-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import ItemsList from '@/components/ItemsList.vue';

    import {readSpecialities} from '@/store/specialities/getters';
    import {dispatchGetSpecialities, dispatchRouteEditSpeciality} from '@/store/specialities/actions';

    @Component({
        components: {
            ItemsList,
        },
    })
    export default class ListSpecialities extends Vue {
        public headers = [
            {
                text: 'Название',
                value: 'name',
                sortable: false,
                align: 'left',
            },
            {
                text: 'Шифр',
                value: 'cipher',
                sortable: true,
                align: 'left',
            },
        ];

        get specialities() {
            return readSpecialities(this.$store);
        }

        public async loadSpecialities() {
            await dispatchGetSpecialities(this.$store);
        }

        public async routeSpeciality(id: string) {
            await dispatchRouteEditSpeciality(this.$store, id);
        }
    }
</script>
