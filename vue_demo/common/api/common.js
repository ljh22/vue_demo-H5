const common={
	upload:function(files,params){
		return uni.$func.upload('/api/attachment/upload',params);
	},
	mobileCode:function(params){//发送验证码
		return uni.$u.post("/api/common/mobileCode",params);
	}, 
}
export default common