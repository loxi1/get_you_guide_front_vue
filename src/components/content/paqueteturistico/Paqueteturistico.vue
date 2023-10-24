<template>
    <div class="paqueteturistico">
        <span class="t4 white">
                <strong> {{paquete.paqueteTuristico}} </strong>
        </span><br><br>
        <Lightbox cells="4" :items="images"></Lightbox>
        <div class="clear_boot_5"></div>
        <div class="conte_info">
            <div class="descri_box">
                <span class="t2 white"> {{paquete.descripcion}} </span><br><br>

            </div>
            <div class="precio_box borderprecio margingprecio">
                <div class="conte_info">
                    <div class="descri_box">
                        <span class="t2 white"> Desde </span><br><br>
                        <strong class="t2 txtprecio"> {{paquete.precioUnitario}} {{paquete.simbolo}}</strong><br>
                        <span class="t2 white"> Por Persona </span>
                    </div>
                    <div class="precio_box">
                        <a v-bind:href="'#'" class="bt_orange" style="float: right; width:100%">Reservar</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear_boot_5"></div>
        <span><strong class="t7 white">Información General</strong> <strong class="t6 white float_right"><font-awesome-icon :icon="['fas','gift']"/> Compra como regalo</strong></span>
        <div class="clear_boot_5"></div>
        <div class="conte_info">
            <div v-for="(infogen, index) in infogeneral" :key="index">
                <strong class="white t6"><font-awesome-icon :icon="['fas', infogen.informacion.icons]"/> &nbsp;{{infogen.informacion.informacionGeneral}}</strong><br>
                <p class="t6 plomo sangria">{{infogen.informacion.detalleInformacionGeneral}}</p>
            </div>
        </div>
        
        
        <div class="clear_boot_5"></div>
        <div class="conte_info borderprecio t2">
            <strong class="white t7">SELECCIONE NUMERO DE PARTICIPANTES Y FECHA</strong>
            <datepicker v-model="fechareserva" :format="customFormatter"></datepicker>
            <div class="disponible float_left">
                
            </div>
            <div class="disponible float_left">
                <input type="number" min="1" v-model="numper" name="numper"/>
            </div>
            <div class="disponible float_right">
                <a v-bind:href="'#'" v-on:click="validardisponibilidad" class="bt_orange" style="float: right; width:100%; heigth:20px;">Comprobar Disponibilidad</a>
            </div>
            <div style="clear: both;"></div>        
        </div>

        <div class="clear_boot_5"></div>
        <div v-bind:class="[esdisponible ? 'verdisponible' : 'ocultardisponible', '']">
            <div class="conte_info borderprecio t2">
                <strong class="white t6">{{paquete.paqueteTuristico}}</strong>
                <div style="clear: both;"></div>
                <div class="precio_box">
                    <span class="t2 white"> Precio total </span><br><br>
                    <strong class="t2 txtprecio"> {{disptotal}} {{paquete.simbolo}} {{paquete.moneda}}</strong><br>
                    <span class="t2 white"> Todas las tasas e impuestos incluidos </span>
                </div>
                <div style="clear: both;"></div>
                <div class="box_four">
                    <div class="divmitad">
                        <span class="white t2">Hora Inicio</span><br>
                        <span class="white"><strong>{{disphorai}}</strong></span>
                    </div>
                    <div class="divmitad t2 float_right">
                        <span class="white t2">Desglose del precio</span><br>
                        <div class="box_four">
                            <span class="white">Persona <strong>{{numper}} x {{paquete.precioUnitario}} {{paquete.simbolo}} {{paquete.moneda}}</strong> <strong class="float_right">{{disptotal}} {{paquete.simbolo}} {{paquete.moneda}}</strong></span>
                        </div>
                        <div class="box_four">&nbsp;</div>
                    </div>
                    <div style="clear: both;"></div>
                </div>
                <div style="clear: both;"></div>
                <div>
                    <div class="divmitad">
                        <font-awesome-icon :icon="['fas', 'calendar']"/> &nbsp; Cancela antes de las <strong>{{dispfecha}}</strong> para recibir un reembolso completo.
                    </div>
                    <div class="divmitad">

                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" v-model="pad_id">

        <div class="clear_boot_7_5"></div>
        
        <div style="clear: both;"></div>
        
        <b-modal size="lg" v-model="showModal" scrollable title="Paquetes turisticos sugeridos">
            <div class="container">                  
            <div v-for="(paq, idpaq) in paquetes" :key="idpaq" class="row border border_blanco white p-2 mt-4">
                <div class="col col-lg-2 align-self-center">
                    <div class="card card-body">
                        <div class="h2 mb-0 text-danger">
                                <b-icon-heart-fill v-on:click="savefavorito(paq.id,0)" v-if="paq.esfavorito"></b-icon-heart-fill>
                                <b-icon-heart v-on:click="savefavorito(paq.id,1)"  v-else></b-icon-heart>
                        </div>
                        <img width="100%" class="rounded " :src="`${paq.unaimagen}`" />
                    </div>                        
                </div>
                <div class="col p-2">
                    <router-link target="_blank" :to="{ name: 'paqueteturistico', params: { idpaqueteturistico: paq.id}}"><span class="t1 txt_uppapercase float_left"><strong>{{ paq.paqueteTuristico }}</strong></span></router-link> <br>                 
                    <span class="t2 float_left">
                        <b-icon icon="clock-history"></b-icon> Validez: {{paq.tiempoDuracion}} {{ paq.unidadDuracion }} 
                    </span>
                    <div class="col col-lg-5">
                        <b-form-rating  v-on:change="saverating($event,paq.id)" size="lg" show-value-max="5" show-value variant="warning" stars="5" v-model="paq.raiting"/>
                    </div>
                </div>
                <div class="col col-lg-2 p-2">
                    <span class="t2 float_left">Desde</span><br>
                    <span class="t2 float_left">{{paq.precioUnitario}} {{ paq.simbolo }} </span>              
                    <span class="t2 float_left">Por persona</span><br>
                </div>
            </div>            
        </div>
        </b-modal>
    </div>
    
</template>

<script src="./paqueteturistico.js?v=0.0.4"></script>

<style scoped>
    @import 'paqueteturistico.css';
    @import 'lightbox.css';
    @import 'morioh.min.css';
</style>
