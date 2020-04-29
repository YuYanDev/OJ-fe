const localStorage = window.localStorage

export default {
    name: 'storage',

    /**
     * save value(Object) to key
     * @param {string} key 键
     * @param {Object} value 值
     */
    set(key, value) {
        window.console.log("set key", key, value)
        localStorage.setItem(key, JSON.stringify(value))
    },

    /**
     * get value(Object) by key
     * @param {string} key 键
     * @return {Object}
     */
    get(key) {
        let value1 = localStorage.getItem(key)
        if (value1 === 'undefined') {
            return null
        }
        return JSON.parse(value1) || null
    },

    /**
     * remove key from localStorage
     * @param {string} key 键
     */
    remove(key) {
        localStorage.removeItem(key)
    },
    /**
     * clear all
     */
    clear() {
        localStorage.clear()
    }
}
