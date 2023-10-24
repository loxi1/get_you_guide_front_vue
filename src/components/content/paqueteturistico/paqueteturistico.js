const axios = require('axios')
import Swal from 'sweetalert2'

import Lightbox from './lightbox.vue'
import Datepicker from 'vue-moment-datepicker'
import moment from "moment"
import {BFormRating, BIcon, BIconClockHistory, BIconArrowDown, BIconHeart, BIconHeartFill, BModal, VBModal} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'


export default {
    name: 'contpaqueteturistico',
    components: {
        Lightbox,
        Datepicker,
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
            paq_id: Number.parseInt(this.$route.params.idconfirmation),
            paquete: {},
            infogeneral: {},
            fechareserva: new Date(),
            numper: 1,
            images: [],
            esdisponible: false,
            infodisponible: {},
            disptotal: 0,
            dispfecha: "",
            disphorai: "",
            fechacance: "",
            modalOpen: true,
            idpais: 0,
            idcategoria: 0,
            showModal: false,
            paquetes: {},
            userid: localStorage.getItem('userid')
        }
    },
    created() {
        this.paq_id = Number.parseInt(this.$route.params.idpaqueteturistico);
        this.infopaqueteturistico();
        this.informaciongeneral();
        this.getimages();
    },
    methods: {
        async informaciongeneral(){
            try {                
                const spc1 = await axios.get(`/disponibilidadpaqueteTuristico/VerInformacionGeneral?id=`+this.paq_id)
                
                this.infogeneral = (spc1.status === 200) ? spc1.data.rta : {}
            } catch (error) {
                console.error(error);
            }
        },
        async infopaqueteturistico() {
            try {                
                const spc2 = await axios.get(`disponibilidadpaqueteTuristico/verpaqueteTuristico?id=`+this.paq_id)
                
                this.paquete = (spc2.status === 200) ? spc2.data.rta : {}
                
                this.idpais = (spc2.status === 200) ? this.paquete.idPais : ""
                this.idcategoria = (spc2.status === 200) ? this.paquete.idCategoria : ""
                this.showModal = false
            } catch (error) {
                console.error(error);
            }
        },
        async getimages()
        {
            try {
                const spc3 = await axios.get(`disponibilidadpaqueteTuristico/VerGaleriaFotos?id=`+this.paq_id)
                
                let lasimg = (spc3.status === 200) ? spc3.data.rta : {}
                let info = []
                
                let aux = 0;
                if (lasimg.length ) 
                {               
                    let iterable = new Set(lasimg);     
                    for (var dexur of lasimg) {
                        info[aux] = dexur.url
                        aux++
                    }
                }
                this.images = info;
            } catch (error) {
            }
        },
        async validardisponibilidad()
        {
            try {
                let transfecha = this.customFormatter(this.fechareserva)
                let send = "idp="+this.paq_id+"&fechareserva="+transfecha+"&numper="+this.numper
                if(this.numper > 0)
                {
                    const spc3 = await axios.get(`disponibilidadPaqueteTuristico/ReservaDisponible?`+send)
                    
                    this.infodisponible = (spc3.status === 200) ? spc3.data.rta : {}
                    this.esdisponible = spc3.data.estado
                    this.dispfecha = (this.esdisponible) ? this.infodisponible.fechaCancelacion : ""
                    this.disptotal = (this.esdisponible) ? this.infodisponible.montoTotal : ""
                    this.disphorai = (this.esdisponible) ? this.infodisponible.horaInicio : ""
                    this.showModal = false
                    if(!this.infodisponible)
                    {
                        this.informacionsugeridos()
                        this.showModal = true
                        this.$bvModal.show('modal-scrollable')
                        this.$refs['my-modal'].show()
                    }
                }
                else
                {
                    Swal.fire('Error','Ingresar Datos correctos','error')
                }
                
            } catch (error) {
                this.esdisponible = false
            }
        },
        async informacionsugeridos()
        {
            try {
                let send = "?idpais="+this.idpais+"&idcat="+this.idcategoria+"&iduser="+this.userid
                const spc4 = await axios.get(`disponibilidadpaqueteTuristico/ListarPaquetesSugeridos`+send)
                
                this.paquetes = (spc4.status === 200) ? spc4.data.rta : {}
            } catch (error) {
                console.error(error);
            }
        },
        customFormatter: function(date)
        {
            return moment(date).format('YYYY-MM-DD');
        },
        rating(idp, estrella)
        {
            console.log(idp+" estr-> "+estrella)
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
                this.informacionsugeridos()
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
                this.informacionsugeridos()
            }
        }
    },
    mounted() {
        
        //this.getstyle()
    }
}