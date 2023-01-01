//请求拦截器
import Config from "./config";

const install = (Vue, vm) => {
  return
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl:Config.baseUrl,
	});
	
	// 请求拦截部分，如配置，每次请求前都会执行，见上方说明
	Vue.prototype.$u.http.interceptor.request = (config) => {
		//config.header.Token = 'xxxxxx';
		let token=uni.$func.cache("token");
		if(token&&token!=''){
			config.header.Token=token
		} 
		return config;
	}
	
	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		
		if(res.code == 200) {
			return res.result;
		} else if(res.code == 201) {
			// 假设201为token失效，这里跳转登录 
			
			return false;
		} else {
			
		}
		return res;//这里直接返回整个数据，其他
	}
}

export default {
	install
}