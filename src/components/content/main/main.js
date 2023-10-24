const axios = require('axios');
import Swal from 'sweetalert2'

import {BFormRating, BIcon, BIconClockHistory, BIconArrowDown, BIconHeart, BIconHeartFill, BModal, VBModal} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

export default {
    name: 'contentmain',
    components: { 
        BModal,
        VBModal,
        BIcon,
        BIconClockHistory,
        BIconArrowDown,        
        BIconHeart, 
        BIconHeartFill,
        BFormRating,
    },
    data() {
        return {
            paquetes: {},
            base_url: process.env.VUE_APP_APIURL,
            coderror: 0,
            userid: localStorage.getItem('userid')
        }
    },
    mounted() {        
    },
    created() {
        this.listarpaquetes()
    },
    methods: {
        async listarpaquetes(){
            try {                
                const spc1 = await axios.get(`/DisponibilidadPaqueteTuristico/ListarPaquetesTuristicos?iduser=`+this.userid)
                
                this.paquetes = (spc1.status === 200) ? spc1.data.rta : {}
            } catch (error) {
                console.error(error);
            }
        },
        async saverating (evt, id)
        {
            let rating = evt
            let paquetesturisticoid = id
            let usuarioId = this.userid
            let envio = {"rating" : rating, "paquetesturisticoid" : paquetesturisticoid, "usuarioId" : usuarioId};
            const spc5 = await axios.post(`rating/registrarrating`, envio)
            if (spc5.status === 200)
            {
                this.listarpaquetes()
            }
        },
        async savefavorito(id, estados)
        {
            let estado = estados
            let paquetesturisticoid = id
            let usuarioid = this.userid
            let envio = {"estado" : estado, "paquetesturisticoid" : paquetesturisticoid, "usuarioid" : usuarioid};
            const spc6 = await axios.post(`favoritos/registrarfavorito`, envio)
            if (spc6.status === 200)
            {
                this.listarpaquetes()
            }
        }
    }
}