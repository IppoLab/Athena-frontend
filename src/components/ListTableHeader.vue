<template>
    <v-toolbar>
        <v-text-field
                v-model="searchText"
                append-icon="search"
                label="Поиск"
                single-line
                hide-details
        ></v-text-field>
        <v-btn v-if="buttonLink" color="primary" :to="buttonLink">Создать</v-btn>
    </v-toolbar>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class ListTableHeader extends Vue {
        @Prop({default: ''}) public buttonLink!: string;
        @Prop({default: ''}) public search!: string;

        public get searchText() {
            return this.search;
        }

        public set searchText(value) {
            this.$emit('update:search', value);
        }
    }
</script>
