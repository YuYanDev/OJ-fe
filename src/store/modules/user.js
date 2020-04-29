import {STORAGE_KEY, USER_TYPE} from '@/utils/constants'
import {getUserInfo} from "@/api/index";
import storage from '@/utils/storage'
import types from '@/utils/types'


const state = {
    profile: {}
}

const getters = {
    user: state => state.profile.user || {},
    profile: state => state.profile.profile,
    isAuthenticated: (state, getters) => {
        return !!getters.user.user_id
    },
    isAdminRole: (state, getters) => {
        return getters.user.role === USER_TYPE.ADMIN
    }
}

const mutations = {
    [types.CHANGE_PROFILE](state, {profile}) {
        state.profile = profile
        storage.set(STORAGE_KEY.AUTHED, profile)
    }
}

const actions = {
    async getProfile({commit}) {
        getUserInfo().then(res => {
            commit(types.CHANGE_PROFILE, {
                profile: res.data.data || {}
            })
        })
    },
    setProfile({commit}, profile) {
        commit(types.CHANGE_PROFILE, {profile: profile})
    },
    clearProfile({commit}) {
        commit(types.CHANGE_PROFILE, {
            profile: {}
        })
        storage.clear()
    }
}


export default {
    state,
    getters,
    actions,
    mutations,
}
