import Vue from 'vue'
import App from './App'
  
// 请求配置接口封装
import config from './common/config.js';
import uView from './uni_modules/uview-ui';// 引入uView
import mixin from './common/mixin.js';
import store from './store'; // vuex
import Functions from "./common/function.js";// 引入常用方法封装 
import httpApi from '@/common/http.api.js';// http接口API集中管理引入部分


Vue.prototype.$config = config; 
Vue.prototype.$store = store 
//全局封装js文件引入并挂载
import common from '@/static/js/common.js'
Vue.prototype.common=common
Vue.prototype.$viewImg=common.viewImg;
Vue.prototype.$get=common.get;
Vue.prototype.$post=common.post;
Vue.prototype.$put=common.put
Vue.prototype.$DELETE=common.DELETE
Vue.use(Functions); 
Vue.use(httpApi)
let vuexStore = require("@/store/$u.mixin.js");


Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView);
Vue.mixin(vuexStore); 
Vue.mixin(mixin)

const app = new Vue({
	store,
    ...App
})
// http拦截器
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app) 



app.$mount()