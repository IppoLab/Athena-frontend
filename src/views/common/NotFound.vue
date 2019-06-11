<template>
    <v-container class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-spacer></v-spacer>
                <v-toolbar-title primary-title>Страница не существует</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-img src="@/assets/not-found.jpg"></v-img>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="back">Назад</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    import router from '@/router';

    @Component
    export default class NotFound extends Vue {
        public back() {
            router.back();
        }
    }
</script>
