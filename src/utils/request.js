import axios from 'axios'
import {Message} from 'element-ui'

// create an axios instance
const service = axios.create({
    // baseURL: process.env.BASE_API, // api的base_url
    baseURL: 'http://localhost:8888', // api的base_url
    timeout: 5000, // request timeout
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json'
    },
    method: 'post',
    withCredentials: true // 解决跨域session不一致问题

})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    // Promise.reject(error)
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
})

// respone interceptor
service.interceptors.response.use(
    response => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        const res = response.data

        if (res.statusCode !== 200) {
            if (res.errorCode === 'NO_AUTH_ERROR') {
                sessionStorage.removeItem("token")
                return
            }
            Message({
                message: res.message ? res.message : '服务器返回非成功状态',
                type: 'warning',
                duration: 5 * 1000
            });
        }

        return response.data
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default service
