// import moment from 'moment'
import Vue from 'vue'


/* 公用js */
// 郭
// const hosturl = 'http://192.168.0.180/api/'
// 刺猬
const hosturl = 'https://53.app.meichen88.com/api/'
const wssurl = 'ws://121.41.217.116:7272'

// h5分享链接
// const hosturls = 'https://25.app.meichen88.com/'



import moment from 'moment'
// osss
// const imgUrl = 'https://e6b8.oss-cn-zhangjiakou.aliyuncs.com/yhtest/'

// 提示函数
const toast = (content, icon = 'none') => {
	uni.showToast({
		title: content,
		icon,
		mask: true
	})
}

// 提示showLoading函数
const load = (content) => {
	uni.showLoading({
		title: content,
		mask: true
	})
}


// 封装提示音函数 需要传入函数连接
const playDede = (src) => {
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.src = src
}

const isNull = (str) => {
	if (str == '' || str == undefined || str == null || str == 'null' || str == 'undefined') {
		return false
	} else {
		return true
	}
}

// 真实姓名
const isName = (s) => {
	return /^[\u4e00-\u9fa5]{2,4}$/.test(s)
}

// 验证电话号码
const isMobile = (s) => {
	return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(s)
}

// 验证银行卡号
const isCard = (s) => {
	// return /^([1-9]{1})(\d{14}|\d{18})$/.test(s)
	return /^(\d{16}|\d{19})$/.test(s)
}

// 验证电子邮件
const isEmail = (s) => {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

// 获取APP设备id
const getClientId = () => {
	const client = plus.push.getClientInfo();
	return client.clientid
}

// 获取H5唯一标识
const getSystemInfo = () => {
	let H5Id = ''
	uni.getSystemInfo({
		success: function(res) {
			H5Id = res.deviceId
		}
	})
	return H5Id
}

// 正则修改手机号为****
const test = (phone) => {
	phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	return phone;
}


// 时间戳转换成时间
const timesToTime = (t) => {
	var date = new Date(t * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear()
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
	var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

const isIdcard = (card) => {
	var vcity = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	};
	//检查号码是否符合规范，包括长度，类型
	var isCardNo = function(card) {
		//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (reg.test(card) === false) {
			return false;
		}
		return true;
	};
	//取身份证前两位,校验省份
	var checkProvince = function(card) {
		var province = card.substr(0, 2);
		if (vcity[province] == undefined) {
			return false;
		}
		return true;
	};
	//检查生日是否正确
	var checkBirthday = function(card) {
		var len = card.length;
		//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
		if (len == '15') {
			var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
			var arr_data = card.match(re_fifteen);
			var year = arr_data[2];
			var month = arr_data[3];
			var day = arr_data[4];
			var birthday = new Date('19' + year + '/' + month + '/' + day);
			return verifyBirthday('19' + year, month, day, birthday);
		}
		//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
		if (len == '18') {
			var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
			var arr_data = card.match(re_eighteen);
			var year = arr_data[2];
			var month = arr_data[3];
			var day = arr_data[4];
			var birthday = new Date(year + '/' + month + '/' + day);
			return verifyBirthday(year, month, day, birthday);
		}
		return false;
	};
	//校验日期
	var verifyBirthday = function(year, month, day, birthday) {
		var now = new Date();
		var now_year = now.getFullYear();
		//年月日是否合理
		if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
			//判断年份的范围（3岁到100岁之间)
			var time = now_year - year;
			if (time >= 3 && time <= 100) {
				return true;
			}
			return false;
		}
		return false;
	};
	//校验位的检测
	var checkParity = function(card) {
		//15位转18位
		card = changeFivteenToEighteen(card);
		var len = card.length;
		if (len == '18') {
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var cardTemp = 0,
				i, valnum;
			for (i = 0; i < 17; i++) {
				cardTemp += card.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[cardTemp % 11];
			if (valnum == card.substr(17, 1)) {
				return true;
			}
			return false;
		}
		return false;
	};
	var changeFivteenToEighteen = function(card) { //15位转18位身份证号
		if (card.length == '15') {
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var cardTemp = 0,
				i;
			card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
			for (i = 0; i < 17; i++) {
				cardTemp += card.substr(i, 1) * arrInt[i];
			}
			card += arrCh[cardTemp % 11];
			return card;
		}
		return card;
	};

	if (card === '') {
		return false;
	} //是否为空
	if (isCardNo(card) === false) {
		return false;
	} //校验长度，类型
	if (checkProvince(card) === false) {
		return false;
	} //检查省份
	if (checkBirthday(card) === false) {
		return false;
	} //校验生日
	if (checkParity(card) === false) {
		return false;
	} //检验位的检测
	return true;
};
//进行本地存储
// const setStorage=(opt)=>{
// 	uni.setStorage({
// 		key:opt.key,
// 		data:opt.data,
// 		success: function () {
// 			console.log(res.data)
// 		}
// 	});
// }
// 获取本地存储
// const getStorage=(opt)=>{
// 	uni.getStorage({
// 		key:opt.key,
// 		success: function (res) {
// 			console.log(res.data)
// 		}
// 	});
// }


// // #ifdef MP-WEIXIN
// var header = {
// 	'Content-type': 'application/json;charset=utf-8',
// 	"platform": "MP-WEIXIN"
// }
// // #endif
// // #ifdef H5
// var header = {
// 	'Content-type': 'application/json;charset=utf-8',
// 	"platform": "h5"
// }
// // #endif
// // #ifdef APP-PLUS
// var header = {
// 	'Content-type': 'application/json;charset=utf-8',
// 	"platform": "App"
// }
// // #endif

var header = {
	'Content-type': 'application/json;charset=utf-8'
	// 'Content-type': 'multipart/form-data'
	// 'Content-type': 'text/xml'
	// 'Content-type': 'application/x-www-form-urlencoded'
}


// 预览图片
function viewImg(i, arr) {
	uni.previewImage({
		urls: arr,
		current: i,
		longPressActions: {
			itemList: ['发送给朋友', '保存图片', '收藏'],
			success: function(data) {
				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			},
			fail: function(err) {
				console.log(err);
			}
		}
	});
}

// 封装倒计时
function timeD(time) {
	let endTime = moment(time).valueOf() // 获取结束时间
	let currentTime = moment().format('YYYY-MM-DD kk:mm:ss') // 获取当前时间
	let difference = moment(currentTime).valueOf()
	let numTime = endTime - difference
	if (numTime >= 0) {
		let d = Math.floor(numTime / 1000 / 60 / 60 / 24);
		let h = Math.floor(numTime / 1000 / 60 / 60 % 24);
		let m = Math.floor(numTime / 1000 / 60 % 60);
		let s = Math.floor(numTime / 1000 % 60);
		var aaa = {
			d: d,
			h: h,
			m: m,
			s: s,
			isshow: true
		}
	} else {
		var aaa = {
			d: 0,
			h: 0,
			m: 0,
			s: 0,
			isshow: false
		}
	}
	return aaa
}

// 获取当月天数
function Inday() {
	return moment(new Date()).daysInMonth()
}

function delete(url, params, onSuccess, num = 0,type = '') {
	// if(uni.getStorageSync('inf').token){
	// 	params.token=uni.getStorageSync('inf').token

	// }
	request(url, params, "DELETE", onSuccess, num,type);
}
function put(url, params, onSuccess, num = 0,type = '') {
	// if(uni.getStorageSync('inf').token){
	// 	params.token=uni.getStorageSync('inf').token

	// }
	request(url, params, "PUT", onSuccess, num,type);
}
function get(url, params, onSuccess, num = 0,type = '') {
	// if(uni.getStorageSync('inf').token){
	// 	params.token=uni.getStorageSync('inf').token
	// }
	request(url, params, "GET", onSuccess, num, type);
}

function post(url, params, onSuccess, num = 0,type = '') {
	// if(uni.getStorageSync('inf').token){
	// 	params.token=uni.getStorageSync('inf').token

	// }
	request(url, params, "POST", onSuccess, num,type);
}

function request(url, params, method, onSuccess, num,type) {
	// 如果值等于1出现加载中
	if (num == 1) {
		uni.showLoading({
			title: "加载中...",
			mask: true
		});
	}
	// type值等于"type" 更换 Content-type的值
	if (type == 'type') {
		header['Content-type'] = 'application/json;charset=utf-8'
	}
	if (uni.getStorageSync('userinfo-ciwei') && uni.getStorageSync('userinfo-ciwei').token) {
		header['token'] = uni.getStorageSync('userinfo-ciwei').token
	} else {
		header['token'] = ''
	}
	uni.request({
		url: hosturl + url,
		data: Params(params),
		method: method,
		header: header,
		dataType: 'json',
		success: function(res) {
			// console.log(res);
			if (res.data.code == 401) {
				setTimeout(() => {
					uni.clearStorageSync()
					uni.reLaunch({
						url: "/pages/tabBarA/login"
					})
				}, 1000)
			}
			if (num == 1) {
				uni.hideLoading();
			}

			onSuccess(res.data);

		},
		fail: function(error) {
			toast(error);
			uni.hideLoading();
		}
	})
}

function Params(params) {
	return params;
}

function login() {
	let code = getUrlCode('code')
	if (code !== null && code !== "") {
		// this.getOpenidAndUserinfo(code)
	} else {
		getCode()
	}
}

function getCode() {

	// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
	let code = getUrlCode('code')
	if (code === null || code === '') {
		let local = encodeURIComponent(window.location.href); //获取当前页面地址
		let Appid = 'wxa88a45d95801a94e';
		window.location.href =

			"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +

			Appid + ///你APP申请的APPId，每个app都有个ID是识别你app的方式

			"&redirect_uri=" +

			local +

			"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
	}

}

function getUrlCode(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1]
		.replace(
			/\+/g, '%20')) || null
}
export default {
	viewImg,
	timeD,
	Inday,
	toast,
	isNull,
	isMobile,
	isName,
	timesToTime,
	isIdcard,
	post,
	delete,
	put,
	get,
	isEmail,
	playDede,
	hosturl,
	// hosturls,
	load,
	// imgUrl,
	isCard,
	getClientId,
	getSystemInfo,
	test
}