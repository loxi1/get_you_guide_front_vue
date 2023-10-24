<template>
    <div class="cont_navegacion">
        <router-link to="ahora">
          <div class="step white animation active-step-one">
            <span class="t2"><strong>Inicio</strong></span>
          </div>
        </router-link>
    </div>
</template>

<script>
    const axios = require('axios')
    export default {
        name: 'Navegacion',
        data() {
            return {
                newurl: this.$route.name,
                param: 0,
                subparam: 0,
                menu: {},
                nomenu: {},
                pad_id: 0,
            }
        },
        mounted() {

        },
        computed : {
            isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },
        created: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch(logout)
                    }
                    throw err;
                });
            })
        }
    }
</script>

<style scoped>
  .cont_navegacion .t2 {
    text-transform: uppercase;
  }
</style>
