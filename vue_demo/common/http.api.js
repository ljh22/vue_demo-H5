import common from "./api/common.js";
import user from "./api/user.js";
const apiList={
	common,
	user
};
const install = (Vue, vm) => {
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	Vue.prototype.$api = apiList
}
uni.$api = apiList;
export default {
	install
}