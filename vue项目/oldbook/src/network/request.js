import axios from "axios";
import cookie from 'vue-cookies'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 5000,

    })

    instance.interceptors.request.use(req => {
        let token = ''
        if (cookie.get('user_token')) {
            token = cookie.get('user_token')
        }
        if (token) {
            token ? req.headers.Authorization = token : null
        }
        console.log(req.headers.Authorization)
        return req
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        console.log("响应拦截成功")
        return res.data
    }, err => {
        console.log(err)
    })

    return instance(config)


}