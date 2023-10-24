<template>
    <div id="cont_registrar" class="cont_login">
        <div id="redes_sociales" class="redes_wrapper">
            <a href="https://www.facebook.com/loxi1" target="_blank" class="icon_redes icon_fb">Facebook</a>
            <a href="https://www.instagram.com/loxi1" target="_blank" class="icon_redes icon_in">Instagram&lt;</a>
            <a href="https://www.linkedin.com/company/7962656" target="_blank" class="icon_redes icon_ld">Linkedin</a>
            <a href="https://www.youtube.com/channel/loxi1" target="_blank" class="icon_redes icon_yt">YouTube</a>
            <a href="https://api.whatsapp.com/send?phone=51951609501" target="_blank" class="icon_whatsapp">Whatsapp</a>
        </div>

        <div class="login">
            <div class="wrapper">
                <div class="txt_align">
                    <div class="alinear">
                        <img src="@/assets/images/logo_design_up.png" width="25%" height="auto" alt="Design Up">
                        <div style="clear: both; margin-bottom: 50px;"></div>
                        <div style="clear: both; margin-bottom: 50px;"></div>

                        <div class="content">
                            <div class="row justify-content-md-center">
                                <div class="col-8 border border-dark p-4 bg_black border_5p">
                                    <div class="col-12">
                                        <h1 class="t1 white"><strong>Registrar Usuario</strong></h1>}
                                    </div>
                                    <form>
                                        <div class="mb-3 row">
                                            <label for="nombres" class="white white col-sm-3 col-form-label col-form-label-lg">Nombres</label>
                                            <div class="col-sm-8">
                                                <ValidationProvider v-slot="{ errors }">
                                                    <input type="text" placeholder="Nombres"  class="form-control form-control-lg" v-model="datasave.nombres" value="">
                                                    <span>{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="apellidos" class="white col-sm-3 col-form-label col-form-label-lg">Apellidos</label>
                                            <div class="col-sm-8">
                                                <input type="text" placeholder="Apellidos"  class="form-control form-control-lg" v-model="datasave.apellidos" value="">
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="direccion" class="white col-sm-3 col-form-label col-form-label-lg">Direccion</label>
                                            <div class="col-sm-8">
                                                <input type="text" placeholder="Direccion"  class="form-control form-control-lg" v-model="datasave.direccion" value="">
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="ubicacion" class="white col-sm-3 col-form-label col-form-label-lg">Ubicacion</label>
                                            <div class="col-sm-8">
                                                <input type="text" placeholder="Ubicacion"  class="form-control form-control-lg" v-model="datasave.ubicacion" value="">
                                            </div>
                                        </div>
                                        
                                        <div class="mb-3 row">
                                            <label for="telefono" class="white col-sm-3 col-form-label col-form-label-lg">Telefono</label>
                                            <div class="col-sm-8">
                                                <input type="text" placeholder="Telefono"  class="form-control form-control-lg" v-model="datasave.telefono" value="">
                                            </div>
                                        </div>
                                        
                                        <div class="mb-3 row">
                                            <label for="ubicacion" class="white col-sm-3 col-form-label col-form-label-lg">Email</label>
                                            <div class="col-sm-8">
                                                <input type="text" placeholder="Ubicacion"  class="form-control form-control-lg" v-model="datasave.ubicacion" value="">
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="staticEmail" class="white col-sm-3 col-form-label col-form-label-lg">Email</label>
                                            <div class="col-sm-8">
                                                <input type="text"  class="form-control form-control-lg" v-model="datasave.email" value="email@example.com">
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="inputPassword" class="white col-sm-3 col-form-label col-form-label-lg">Password</label>
                                            <div class="col-sm-8">
                                                <input type="password" class="form-control form-control-lg" id="inputPassword">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-10">
                                                <button type="submit" class="btn btn-primary">Sign in</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script scoped>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import '@babel/polyfill'
    import { VeeValidate } from 'vee-validate';
    import {BootstrapVue, BForm, BFormText, LayoutPlugin, FormCheckboxPlugin, ButtonPlugin, FormInputPlugin  } from "bootstrap-vue";

    export default {
        name: 'registrar',
        components: {
            BootstrapVue,
            BForm, 
            BFormText,
            LayoutPlugin,
            FormCheckboxPlugin,
            ButtonPlugin,
            FormInputPlugin,
            VeeValidate
        },
        data () {
            return {
                email: '',
                password: '',
                datasave: {}
            }
        },
        methods: {
            login: function () {
                let email = this.email
                let password = this.password
                this.$store.dispatch('login', { email, password })
                    .then(() => this.$router.push('login'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style>
    @import 'registrar.css';
</style>
