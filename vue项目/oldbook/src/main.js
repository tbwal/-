import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false
    // Vue.prototype.$axios = axios
    // axios.defaults.baseURL = "http://localhost:3000"
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')