import axios from 'axios';

//默认的请求地址
// axios.defaults.baseURL = 'http://localhost:3001';

//添加一个响应拦截器
axios.interceptors.response.use(function (res) {
    //在这里先对数据进行处理然后返回
    return res.data;
}, function (error) {
    //处理响应错误
    return Promise.reject(error);
});

//格式化axios请求
export default function (method, url, query = {}) {
    let request = "";
    if (method == 'get') {
        request = axios[method](url, {
            params: query
        });
    } else {
        request = axios[method](url, query);
    }

    return request;
}