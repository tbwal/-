import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(Vuex)
Vue.use(ElementUI)
export default new Vuex.Store({
    state: {
        type: ''
    },
    mutations: {
        setType(state, type) {
            state.type = type
        }
    },
    actions: {},
    modules: {},
    getters: {}
})