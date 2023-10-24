import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
  },
  mutations: {
      auth_request(state){
          state.status = 'loading'
      },
      auth_success(state, token, user){
          state.status = 'success'
          state.token = token
          state.user = user
      },
      auth_error(state){
          state.status = 'error'
      },
      logout(state){
          state.status = ''
          state.token = ''
      },
  },
  actions: {
      login({commit}, user){
          return new Promise((resolve, reject) => {
              commit('auth_request')
              axios({url: process.env.VUE_APP_APIURL+'/login/iniciosession', data: user, method: 'POST' })
                  .then(resp => {
                      const token = resp.data.token
                      const user = resp.data.rta
                      localStorage.setItem('userid', user.usuarioId)
                      localStorage.setItem('username', user.nombres)
                      localStorage.setItem('persid', user.personaId)
                      localStorage.setItem('token', token)
                      axios.defaults.headers.common['Authorization'] = token
                      commit('auth_success', token, user)
                      resolve(resp)
                  }).catch(err => {
                      commit('auth_error')
                      localStorage.removeItem('token')
                      reject(err)
                  })
          })
      },
      register({commit}, user){
          return new Promise((resolve, reject) => {
              commit('auth_request')
              axios({url: process.env.VUE_APP_APIURL+'/login/register', data: user, method: 'POST' })
                  .then(resp => {
                      const token = 'Bearer ' +resp.data.access_token
                      const user = resp.data.user
                      localStorage.setItem('userid', user.id)
                      localStorage.setItem('username', user.name)
                      localStorage.setItem('persid', user.per_id)
                      localStorage.setItem('token', token)
                      axios.defaults.headers.common['Authorization'] = token
                      commit('auth_success', token, user)
                      resolve(resp)
                  }).catch(err => {
                      commit('auth_error', err)
                      localStorage.removeItem('token')
                      reject(err)
                  })
          })
      },
      logout({commit}){
          return new Promise((resolve, reject) => {
              commit('logout')
              localStorage.removeItem('token')
              localStorage.removeItem('userid')
              localStorage.removeItem('username')
              localStorage.removeItem('persid')
              delete axios.defaults.headers.common['Authorization']
              resolve()
          })
      }
  },
  getters : {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
  }
})
