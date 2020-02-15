/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const getter = {
    username: (state,getters)=>{

    },
    login_state: false,
}

export default new Vuex.Store({
  state: {
  },
  modules: {
    user,
  },
  strict: debug
})

