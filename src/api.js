// import request from '../utils/request';
import Vue from 'vue'
// import store from '@/store'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export async function login(body) {
    return ajax('login', 'post', {data: body});
}

export async function sign_up(body) {
    return ajax('sign_up', 'post', {data: body});
}

export async function logout() {
    return ajax('logout', 'post',);
}

export function getCaptcha() {
    return ajax('captcha', 'get')
}

export async function getUserInfo() {
    return ajax('profile', 'get')
}

/**
 * @param url
 * @param method get|post|put|delete...
 * @param params like queryString. if a url is index?a=1&b=2, params = {a: '1', b: '2'}
 * @param data post data, use for method put|post
 * @returns {Promise}
 */
function ajax(url, method, options) {
    if (options !== undefined) {
        var {params = {}, data = {}} = options
    } else {
        params = data = {}
    }
    return new Promise((resolve, reject) => {
        axios({
            url,
            method,
            params,
            data
        }).then(res => {
            // API正常返回(status=20x), 是否错误通过有无error判断
            if (res.data && res.data.status !== 0) {
                Vue.prototype.$message({
                    showClose: true,
                    message: res.data.message,
                    type: 'error'
                });
                resolve(res)
                // 若后端返回为登录，则为session失效，应退出当前登录用户
                // if (res.data.data.startsWith('Please login')) {
                //   store.dispatch('changeModalStatus', {'mode': 'login', 'visible': true})
                // }
            } else {
                resolve(res)
                // if (method !== 'get') {
                //   Vue.prototype.$success('Succeeded')
                // }
            }
        }, res => {
            // API请求异常，一般为Server error 或 network error
            reject(res)
            Vue.prototype.$message({message: res.data.message, type: 'error'})
        })
    })
}
