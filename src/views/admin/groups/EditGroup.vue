<template>
    <Loader :loading="!loaded">
        <v-container slot="content" class="fluid">
            <v-card class="elevation-10">
                <v-toolbar>
                    <v-toolbar-title primary-title>Изменение группы</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <template>
                        <v-form lazy-validation>
                            <v-text-field
                                    v-model="name"
                                    label="Название группы"
                                    :rules="[() => !!name || 'Поле обязательно']"
                                    required
                                    type="text">
                            </v-text-field>
                            <v-combobox
                                    :items="specialities"
                                    v-model="speciality"
                                    clearable
                                    item-text="display"
                                    label="Направление">
                            </v-combobox>
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

    import {readGroupById} from '@/store/groups/getters';
    import {readSpecialities} from '@/store/specialities/getters';
    import {dispatchChangeGroupById, dispatchGetGroupById} from '@/store/groups/actions';
    import {ListElementSpeciality} from '@/models';
    import {dispatchRouteNotFound} from '@/store/app/actions';
    import Loader from '@/components/Loader.vue';

    @Component({
        components: {Loader},
    })
    export default class EditGroup extends Vue {
        public name: string = '';
        public speciality: ListElementSpeciality | null = null;
        public formError: string | boolean = false;
        public loaded: boolean = false;

        public reset() {
            this.name = '';
            this.speciality = null;
            this.formError = false;
        }

        public cancel() {
            this.$router.back();
        }

        public async mounted() {
            this.reset();

            await dispatchGetGroupById(this.$store, this.$router.currentRoute.params.id);

            const group = readGroupById(this.$store)(this.$router.currentRoute.params.id);

            if (group) {
                this.name = group.name;
                this.speciality = new ListElementSpeciality(group.speciality!);
            } else {
                await dispatchRouteNotFound(this.$store);
            }

            this.loaded = true;
        }

        public get specialities(): ListElementSpeciality[] {
            return readSpecialities(this.$store).map((speciality) => new ListElementSpeciality(speciality));
        }

        public get fieldsAreValid() {
            return !!this.name && !!this.speciality;
        }

        public async submit() {
            this.formError = false;

            if (!this.fieldsAreValid) {
                this.formError = 'Проверьте обязательные поля';
            } else {
                await dispatchChangeGroupById(this.$store, {
                    id: this.$router.currentRoute.params.id,
                    group: {
                        name: this.name,
                        speciality: this.speciality!.id,
                    },
                });
            }
        }
    }
</script>
