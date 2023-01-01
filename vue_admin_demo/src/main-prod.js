import Vue from 'vue';
import App from './App.vue';
import router from './router';

//导入字体图标
import './assets/font/iconfont.css';
//导入全局样式表
import './assets/css/global.css';
import TreeTable from 'vue-table-with-tree-grid';

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';

// 导入  NProgress包 对应的js和css
import NProgress from 'nprogress';

import axios from 'axios';
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
// axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/';

// ``````在 request拦截器中 展示进度条   NProgress.start();
axios.interceptors.request.use(config => {
    // console.log(config);
    NProgress.start();
    //为请求头对象，添加token验证的 Authorization 字段
    config.headers.Authorization = window.sessionStorage.getItem('token');
    //在最后必须 return config
    return config;
});
//`````` 在response 拦截器中隐藏进度条  NProgress.done();
axios.interceptors.response.use(config => {
    NProgress.done();
    return config;
});

Vue.prototype.$http = axios;

//关闭vue生产提示
Vue.config.productionTip = false;

Vue.component('tree-table', TreeTable);

// 将富文本编辑器注册为全局可用得到组件
Vue.use(VueQuillEditor);

// 全局格式化时间的过滤器
Vue.filter('dateFormat', function (originValue) {
    const dt = new Date(originValue);
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + '').padStart(2, '0');
    const d = (dt.getDate() + '').padEnd(2, '0');

    const hh = (dt.getHours() + '').padEnd(2, '0');
    const mm = (dt.getMinutes() + '').padStart(2, '0');
    const ss = (dt.getSeconds() + '').padStart(2, '0');

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
