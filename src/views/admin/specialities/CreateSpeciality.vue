<template>
    <v-container class="fluid">
        <v-card class="elevation-10">
            <v-toolbar>
                <v-toolbar-title primary-title>Создание направления</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <template>
                    <v-form lazy-validation>
                        <v-text-field
                                v-model="name"
                                label="Назване"
                                :rules="[() => !!name || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                        <v-text-field
                                v-model="cipher"
                                label="Шифр"
                                :rules="[() => !!cipher || 'Поле обязательно']"
                                required
                                type="text">
                        </v-text-field>
                    </v-form>
                    <v-alert :value="formError" type="error" transition="fade-transition" v-if="formError">
                        {{formError}}
                    </v-alert>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel">Назад</v-btn>
                <v-btn @click="reset">Очистить</v-btn>
                <v-btn @click="submit" :disabled="!fieldsAreValid">
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {dispatchCreateSpeciality} from '@/store/specialities/actions';

    @Component
    export default class CreateSpeciality extends Vue {
        public name: string = '';
        public cipher: string = '';
        public formError: string | boolean = false;

        public async mounted() {
            this.reset();
        }

        public reset() {
            this.name = '';
            this.cipher = '';
            this.formError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public get fieldsAreValid() {
            return !!this.name && !!this.cipher;
        }

        public async submit() {
            this.formError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Проверьте обязательные поля';
            } else {
                await dispatchCreateSpeciality(this.$store, {
                    name: this.name,
                    cipher: this.cipher,
                });
            }
        }
    }
</script>
