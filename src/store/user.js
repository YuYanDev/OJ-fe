export default {
    state: {
        login_state: false,
        username: 'hhh',
    },
    mutations: {
        updateUsername(state, username) {
            state.username = username
        },
        updateLoginState(state, login_state) {
            state.login_state = login_state
            window.console.log(state.username, state.login_state)
        }
    },
    actions: {
        async logIn({ commit }) {
            const data = { status: 0, data: { username: 'test' } }
            if (data && data.data) {
                commit('updateUsername', data.data.username);
                commit('updateLoginState', true)
            }
        },
        logOut({ commit }) {
            commit('updateUsername', '')
            commit('updateLoginState', false)
        }
    }
}