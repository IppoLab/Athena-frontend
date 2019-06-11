<template>
    <items-list
            :creationLink="{name: 'subjects-new'}"
            :headers="headers"
            :preload="loadSubjects"
            :items="subjects"
            @itemClick="routeSubject"
    ></items-list>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import ItemsList from '@/components/ItemsList.vue';

    import {readSubjects} from '@/store/subjects/getters';
    import {dispatchGetSubjects, dispatchRouteEditSubject} from '@/store/subjects/actions';

    @Component({
        components: {
            ItemsList,
        },
    })
    export default class Subjects extends Vue {
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
                sortable: false,
                align: 'left',
            },
        ];

        get subjects() {
            return readSubjects(this.$store);
        }

        public async loadSubjects() {
            await dispatchGetSubjects(this.$store);
        }

        public async routeSubject(id: string) {
            await dispatchRouteEditSubject(this.$store, id);
        }
    }
</script>
