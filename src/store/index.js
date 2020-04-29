/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
    },
    strict: debug,
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => Cookies.get(key),
            // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
            setItem: (key, value) =>
                Cookies.set(key, value, {expires: 3, secure: true}),
            removeItem: (key) => Cookies.remove(key),
        },
    }),],
})

