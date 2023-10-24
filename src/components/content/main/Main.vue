<template>
    <div class="cont_main">
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
                    <div class="col col-lg-4">
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
    </div>
</template>

<script src="./main.js?v=0.0.2"></script>

<style>
    @import 'main.css';
</style>