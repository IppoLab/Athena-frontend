<template>
    <Loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card class="elevation-10">
                <v-toolbar>
                    <v-toolbar-title primary-title>Изменение направления</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <template>
                        <v-form lazy-validation>
                            <v-text-field
                                    v-model="name"
                                    label="Название"
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
                        Изменить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </Loader>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {readSpecialityById} from '@/store/specialities/getters';
    import {dispatchChangeSpecialityById, dispatchGetSpecialities} from '@/store/specialities/actions';
    import {dispatchRouteNotFound} from '@/store/app/actions';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {Loader},
    })
    export default class EditSubject extends Vue {
        public name: string = '';
        public cipher: string = '';
        public formError: string | boolean = false;
        public loaded: boolean = false;

        public reset() {
            this.name = '';
            this.cipher = '';
            this.formError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public async mounted() {
            this.reset();

            await dispatchGetSpecialities(this.$store);
            const speciality = readSpecialityById(this.$store)(this.$router.currentRoute.params.id);

            if (speciality) {
                this.name = speciality.name;
                this.cipher = speciality.cipher;
            } else {
                await dispatchRouteNotFound(this.$store);
            }

            this.loaded = true;
        }

        public get fieldsAreValid() {
            return !!this.name && !!this.cipher;
        }

        public async submit() {
            this.formError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Проверьте обязательные поля';
            } else {
                await dispatchChangeSpecialityById(this.$store, {
                    id: this.$router.currentRoute.params.id,
                    speciality: {
                        name: this.name,
                        cipher: this.cipher,
                    },
                });
            }
        }
    }
</script>
