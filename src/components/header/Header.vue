<template>
    <div v-bind:id="textoheader(claseheader)" class="header">
        <div class="txt_align">
            <div v-bind:class="[claseheader == 'black' ? 'align' : '', '']">
                <img :src="getPic(img)" width="25%" height="auto" alt="DesignUp" style="float: left;">
                <span v-bind:class="[claseheader == 'black' ? 't3 white' : 't3 black', '']"  style="margin-right: 25px;">{{ username }}</span>
                <a v-if="isLoggedIn" @click="logout" v-bind:class="[claseheader == 'black' ? 'bt_orange' : 'bt_black', '']">cerrar sesión</a>
            </div>
            <Navegacion  v-if="claseheader === 'orange'" />
        </div>
    </div>
</template>

<script>
    import Navegacion from "../../components/navegacion/Navegacion.vue"
    export default {
        props: {
            claseheader: String,
            img: String,
        },
        data() {
            return {
                username: localStorage.getItem('username')
            }
        },
        methods: {
            getPic(index) {
                return require('@/assets/images/' + index + '.png');
            },
            textoheader(txt) {
                return 'header-'+ txt;
            },
            logout() {
                this.store.dispatch('logout').then(() => {
                    this.$router.push('/login')
                })
            },
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },
        components: {
            Navegacion
        },
        computed: {
            isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
        },
        created: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch(logout)
                    }
                    throw err;
                });
            });
        },
    }
</script>