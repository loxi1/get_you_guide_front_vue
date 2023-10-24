import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: () => import(/* webpackChunkName: "registrar" */ '../views/registrar/Registrar'),
    meta: {
      requiresAuth: false,
      requestValid: false
    }
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/Main.vue'),
    meta: {
      requiresAuth: true,
      requestValid: true
    }
  },
  {
    path: '/paqueteturistico/:idpaqueteturistico',
    name: 'paqueteturistico',
    component: () => import(/* webpackChunkName: "paqueteturistico" */ '../views/paqueteturistico/Paqueteturistico.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // esta ruta requiere autenticación, verifique si inició sesión
    // si no, redirige a la página de inicio de sesión.

    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        /*query: { redirect: to.fullPath }*/
      })
    } else {
      next()
    }
  } else {
    //Si la url no coincide
    //Si existe session direccionar main sino direcciona al login
    if(store.getters.isLoggedIn)
      next({path: '/main'})
    else
      next()
  }
})

export default router
