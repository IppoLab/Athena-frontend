<template>
    <v-container slot="content" class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-toolbar-title primary-title>Настройки</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <template>
                    <v-form lazy-validation>
                        <v-text-field
                                v-model="apiUrl"
                                label="API URL"
                                type="text">
                        </v-text-field>
                    </v-form>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-layout row wrap>
                    <v-spacer></v-spacer>
                    <v-btn @click="cancel" class="my-1">Назад</v-btn>
                    <v-btn @click="reset" class="my-1">Очистить</v-btn>
                    <v-btn @click="submit" :disabled="!apiUrl" class="my-1">
                        Изменить
                    </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import axios, {AxiosError} from 'axios';
    import {Component, Vue} from 'vue-property-decorator';
    import Loader from '@/components/Loader.vue';
    import {apiUrl} from '@/configs/env';
    import {removeLocalApiUrl, saveLocalApiUrl, setAxiosApiUrl} from '@/helpers';

    @Component({
        components: {Loader},
    })
    export default class Settings extends Vue {
        public apiUrl?: string = apiUrl;

        public reset() {
            this.apiUrl = '';
        }

        public cancel() {
            this.$router.back();
        }

        public async submit() {
            try {
                await axios.create().head(this.apiUrl!);
            } catch (e) {
                if (e.message === 'Network Error') {
                    return;
                }
            }

            if (this.apiUrl === apiUrl) {
                removeLocalApiUrl();
            } else {
                saveLocalApiUrl(this.apiUrl!);
            }

            setAxiosApiUrl(this.apiUrl);
        }
    }
</script>
