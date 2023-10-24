<template>
  <div id="app" class="main">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
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
      });
    }
  }
</script>

<style>
  a.router-link-active > div { color: #FFF; opacity: 1;}
</style>
