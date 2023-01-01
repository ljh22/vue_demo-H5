const user={
	login:function(params){
		return uni.$u.post('/api/user/login',params,{'Content-Type':'application/json'});
	}
}
export default user