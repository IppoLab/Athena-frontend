<template>
    <div class="reg-page">
        <div class="container-page" style="margin-top: 200px;">
            <div class="row">

                <h1 class="text-xs-center">Регистрация</h1>
                <form>
                    <fieldset class="form-group">

                        <input
                                class="form-control"
                                type="text"
                                placeholder="Студ.билет">
                    </fieldset>
                    <fieldset class="form-group">
                        <input
                            class="form-control"
                            type="email"
                            placeholder="Email">
                        <input
                                class="form-control"
                                type="password"
                                placeholder="Password">
                        <input
                                class="form-control"
                                type="password"
                                placeholder="Password again">
                    </fieldset>
                    <v-btn>
                       Зарегистрироваться
                    </v-btn>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { Vue, Component } from "vue-property-decorator/lib/vue-property-decorator";

    @Component
    export default class Registration extends Vue{

    }
</script>

<style scoped>
    .form-control{
        background-color: #fff;
        color: #55595c;
        padding: .5rem .75rem;
        margin-bottom: 10px;
        margin-left: 20px;
        margin-right: 20px;
        width: 90%;
        border-radius: 5px;

    }

    .reg-page{
        width: 40%;
        margin: 0 auto;
        text-align: center;
    }

    .container-page{
        border-radius: 5px;
    }

    fieldset{
        border: cornflowerblue;
    }
</style>
