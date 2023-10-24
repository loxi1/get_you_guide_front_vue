<template>
    <div id="cont_login" class="cont_login">
        <div id="redes_sociales" class="redes_wrapper">
            <input @click="showModal = true"  class="btn btn-info btn-lg" type="button" value="Registrate">
            <a href="https://www.facebook.com/loxi1" target="_blank" class="icon_redes icon_fb">Facebook</a>
            <a href="https://www.instagram.com/loxi1" target="_blank" class="icon_redes icon_in">Instagram&lt;</a>
            <a href="https://www.linkedin.com/company/7962656" target="_blank" class="icon_redes icon_ld">Linkedin</a>
            <a href="https://www.youtube.com/channel/loxi1" target="_blank" class="icon_redes icon_yt">YouTube</a>
            <a href="https://api.whatsapp.com/send?phone=51951609501" target="_blank" class="icon_whatsapp">Whatsapp</a>
        </div>

        <div class="login">
            <div class="wrapper">
                <div class="txt_align">
                    <div class="align">
                        <img src="@/assets/images/logo_design_up.png" width="25%" height="auto" alt="Design Up">
                        <div style="clear: both; margin-bottom: 50px;"></div>
                        <span class="t1 black"><strong>Bienvenido</strong></span>
                        <div style="clear: both; margin-bottom: 50px;"></div>

                        <div class="box">
                            <form @submit.prevent="login" id="formulariologin">
                                <span class="t3 white" style="text-transform: uppercase;">Usuario</span><br><br>
                                <input v-model="email" name="email" type="text" class="field required"><br><br>
                                <span class="t3 white" style="text-transform: uppercase;">Contraseña</span><br><br>
                                <input v-model="password" name="password" type="password" class="field required">
                                <div style="clear: both; margin-bottom: 30px;"></div>
                                <input name="btnForm" id="btnForm" type="submit" value="ENTRAR" class="send"><br><br>
                                <input type="hidden" value="" name="captcha" id="captcha">
                                <input type="hidden" value="090720" name="keyform" id="keyform">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal size="lg" v-model="showModal" scrollable title="Registrar Usuario">
            <div class="content">
                <div class="row justify-content-md-center">
                    <form ref="form"  @submit.prevent="submit" id="save_usuario" method="post" novalidate="true">
                        <div class="mb-3 row">
                            <label for="nombres" class="col-sm-3 col-form-label col-form-label-lg">Nombres</label>
                            <div class="col-sm-8">
                                <input placeholder="Nombres" v-model.trim="$v.nombres.$model" name="nombres" id="nombres" type="text" class="form-control form-control-lg required">
                                <div class="error orange" v-if="!$v.nombres.required">Requerido</div>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="apellidos" class="col-sm-3 col-form-label col-form-label-lg">Apellidos</label>
                            <div class="col-sm-8">
                                <input placeholder="Apellidos" v-model.trim="$v.apellidos.$model" name="apellidos" id="apellidos" type="text" class="form-control form-control-lg required">
                                <div class="error orange" v-if="!$v.apellidos.required">Requerido</div>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="direccion" class="col-sm-3 col-form-label col-form-label-lg">Dirección</label>
                            <div class="col-sm-8">
                                <input placeholder="Dirección" v-model="direccion" name="direccion" id="direccion" type="text" class="form-control form-control-lg required">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="ubicacion" class="col-sm-3 col-form-label col-form-label-lg">Ubicación</label>
                            <div class="col-sm-8">
                                <input placeholder="Ubicación" v-model="ubicacion" name="ubicacion" id="ubicacion" type="text" class="form-control form-control-lg required">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="telefono" class="col-sm-3 col-form-label col-form-label-lg">Celular</label>
                            <div class="col-sm-8">
                                <input placeholder="telefono" v-model.trim="$v.telefono.$model" name="telefono" id="telefono" type="text" class="form-control form-control-lg required">
                                <div class="error orange" v-if="!$v.telefono.required">Solo Numeros</div>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="correo" class="col-sm-3 col-form-label col-form-label-lg">Correo</label>
                            <div class="col-sm-8">
                                <input placeholder="Correo" v-model.trim="$v.correo.$model"  name="correo" id="correo" type="text" class="form-control form-control-lg required">
                                <div class="error orange" v-if="!$v.correo.required">Requerido</div>
                                <div class="error orange" v-if="!$v.correo.email">Email Invalido</div>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="clave" class="col-sm-3 col-form-label col-form-label-lg">Clave</label>
                            <div class="col-sm-8">
                                <input placeholder="Clave" v-model.trim="$v.clave.$model" name="clave" id="clave" type="text" class="form-control form-control-lg required">
                                <div class="error orange" v-if="!$v.clave.required">Requerido</div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button type="submit" form="save_usuario" class="btn btn-primary btn-lg">Guardar</button>
                            </div>
                        </div>
                    </form>                              
                </div>
            </div>
        </b-modal>

    </div>
</template>

<script scoped>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import {BModal, VBModal} from 'bootstrap-vue'
    import { required, email } from 'vuelidate/lib/validators'
    const axios = require('axios');
    import Swal from 'sweetalert2'

    export default {
        name: 'login',
        components: {
            BModal,
            VBModal
        },
        data () {
            return {
                email: '',
                password: '',
                showModal: false,
                nombres: '',
                apellidos: '',
                telefono: '',
                direccion: '',
                ubicacion: '',
                clave: '',
                correo: ''
            }
        },
        validations:  {
            nombres: {required},
            apellidos: {required},
            telefono: {
                required
            },
            clave: {required},
            correo: {
                required,
                email
            }
        },
        methods: {
            login: function () {
                let email = this.email
                let password = this.password
                this.$store.dispatch('login', { email, password })
                    .then(() => this.$router.push('main'))
                    .catch(err => console.log(err))
            },
            cambiarModal: function() {
                this.showModal = true
                console.log(this.showModal)
            },
            submit() {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    this.saveusuario()
                }
                else {
                    console.log("Error!")
                }
            },
            async saveusuario(){
                try {
                    let correo = this.correo
                    let clave = this.clave
                    let nombres = this.nombres
                    let apellidos = this.apellidos
                    let telefono = this.telefono
                    let direccion = this.direccion
                    let ubicacion = this.ubicacion
                    let envio = {"nombres" : nombres, "apellidos" : apellidos, "direccion" : direccion, "ubicacion" :ubicacion, "telefono" : telefono,"correo" : correo, "clave" : clave};
                    const rta = await axios.post(process.env.VUE_APP_APIURL+`/login/registrar/`, envio);
                    if (rta.status === 200)
                    {
                        this.showModal = false
                        this.$refs.form.reset(); 
                        Swal.fire('Ok','Ingrese sus datos para Iniciar sessión','success')
                    }
                    

                } catch (error) {
                    console.error(error)
                }
            },
        }
    }
</script>

<style>
    @import 'login.css';
</style>
