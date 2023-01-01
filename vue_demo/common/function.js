import Config from "./config";
// 如果不需要加密可以不引用这个 
//import CryptoJS from '/crypto-js.js';  


/**
 * 缓存
 * 读取缓存 uni.$func.cache("userInfo")
 * 设置换成 uni.$func.cache("UID",1)
 * @param {Object} key 键名，不传value时为获取值，默认会调用一次JSON.parse
 * @param {Object} value 要缓存的值，字符串或json或数组
 * @param {Object} expire 缓存时间（秒，默认永久）
 */
function cache(key, value, expire) {
  key = Config.prefix + key;
  var now = Date.parse(new Date()) / 1000;
  if (value != undefined) { //缓存数据
    if (value == null || value == "") {
      uni.setStorageSync(key, {
        data: null,
        expire: expire_at
      })
    } else {
      var expire_at = parseInt(expire) > 0 ? (parseInt(expire) + now) : 0;
      uni.setStorageSync(key, {
        data: value,
        expire: expire_at
      })
    }
    return true;
  } else { //获取缓存 
    var data = uni.getStorageSync(key);
    if (data == null || data == '') return data;
    try {
      if (parseInt(data.expire) > 0) {
        if (data.expire >= now) {
          return data.data;
        }
        return "";
      } else {
        return data.data;
      }
    } catch (e) {

    }
    return data.data;
  }
}
/**
 * 时间戳转换成多少天以前
 * @param {Object} time
 */
function beforeTime(time) {
  if (parseInt(time) > 1) {
    time = uni.$func.strtotime(time);
  }
  var seconds = uni.$func.now() - time;
  if (seconds < 60) {
    return seconds + '秒前';
  } else if (seconds < 3600) {
    return Math.floor(seconds / 60) + '分钟前'
  } else if (seconds < 86400) {
    return Math.floor(seconds / 3600) + '小时前'
  } else if (seconds < 86400 * 30) {
    return Math.floor(seconds / 86400) + '天前'
  } else if (seconds < 86400 * 365) {
    let day = uni.$func.datetime(time, 3)
    return day.m + '月' + day.d + '日';
  } else {
    let day = uni.$func.datetime(time, 1)
    return day;
  }
}
/**
 * AES 对称加密 （加密方式：AES-128-CBC）
 * @param {Object} str
 */
function encrypt(str) {
  if (typeof(str) == "object" || typeof(str) == "array") {
    str = JSON.stringify(str);
  } else {
    str = str.toString();
  }
  let key = CryptoJS.enc.Utf8.parse(Config.aes_key);
  let iv = CryptoJS.enc.Utf8.parse(Config.aes_iv);
  var encrypted = CryptoJS.AES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
/**
 * AES 对称解密 （加密方式：AES-128-CBC）
 * @param {Object} str
 */
function decrypt(str) {
  let key = CryptoJS.enc.Utf8.parse(Config.aes_key);
  let iv = CryptoJS.enc.Utf8.parse(Config.aes_iv);

  var decrypted = CryptoJS.AES.decrypt(str, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * H5判断当前是否是微信浏览器
 */
function isWechat() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/micromessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
/**
 * 当前时间戳
 */
function now() {
  return Date.parse(new Date()) / 1000;
}
/** 通过秒级时间戳返回指定格式时间， 默认3
（0返回完整时间,1返回日期，2返回时间，3返回每个节点数组,4返回时分）
 * @param {Object} time
 * @param {Object} type
 * @param {Object} wrong
 */
function datetime(time, type) {
  type = type || 0;
  var timestamp = parseFloat(time) > 0 ? time * 1000 : 0;
  var date = new Date(timestamp);

  var month = date.getMonth() + 1;
  var day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  var ret = {
    "y": date.getFullYear(),
    "m": month,
    "d": day,
    h: hour,
    "i": hour,
    's': sec,
    w: date.getDay(),
    "year": date.getFullYear()
  }
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (min >= 0 && min <= 9) {
    min = "0" + min;
  }
  if (sec >= 0 && sec <= 9) {
    sec = "0" + sec;
  }
  if (type == 3) {
    //简写ymdisw小于10不带0,星期不转化汉字
    ret.month = month;
    ret.day = day;
    ret.hour = hour;
    ret.second = sec;
    var weekday = ["日", "一", "二", "三", "四", "五", "六"];
    ret.weekday = weekday[date.getDay()];
    ret.date = date.getFullYear() + "-" + month + "-" + day;
    ret.time = hour + ":" + min + ":" + sec;
  } else if (type == 4) {
    ret = hour + ":" + min;
  } else if (type == 5) {
    ret = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min;
  } else if (type == 2) {
    ret = hour + ":" + min + ":" + sec;
  } else if (type == 1) {
    ret = date.getFullYear() + "-" + month + "-" + day;
  } else {
    ret = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
  }
  return ret;
}

/** 通过时间返回秒级时间戳
 * @param {Object} str 日期或完整时间 ，Y-m-d 或 Y-m-d H:i:s
 */
function strtotime(str) {
  var date = Date.parse(new Date(str.replace(/-/g, "/"))) / 1000;
  return date;
}
/**
 * 设置分页参数 - 适用后端框架 ThinkPHP, Laravel
 * uni.$func.initPage();
 * uni.$func.initPage(res.data,"goodsList",); 
 * @param {Object} objData 接口返回的分页器数据
 * @param {Object} page 分页器的名称，默认default，全局唯一 ,适用于一个页面同时需要多个不同分页
 */
function initPage(objData, page, list_rows) {
  list_rows = list_rows || 15;
  page = page || 'default';
  if (!objData) { //初始化
    objData = {
      total: 0,
      last_page: 1,
      current_page: 0,
      per_page: list_rows,
      list_rows: list_rows
    };
  }
  if (objData.data) objData.data = null;
  this.cache("paginate_" + page, objData)
  return objData;
}
/**
 * 生成下一页的参数 - 适用后端框架 ThinkPHP, Laravel
 * 
 * let page=this.$func.nextPage('goodsList');
 * if(!page){ console.log('已经没有了');return ;}
 * 
 * @param {Object} page 分页器的名称，全局唯一
 */
function nextPage(page) {
  page = page || 'default';
  let paginate = this.cache("paginate_" + page);

  if (!paginate || paginate == '') {
    console.log("分页器未初始化");
    return false;
  }
  if (parseInt(paginate.current_page) < parseInt(paginate.last_page)) {
    paginate.current_page++;
    paginate.page = paginate.current_page;
    return paginate;
  } else {
    return false;
  }
}
//加法函数，用来得到精确的加法结果  
function jia(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;

}
//乘法函数，用来得到精确的乘法结果    
function cheng(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//除法函数，用来得到精确的加法结果 
// a/b=chu(a,b)   
function chu(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1);

}
//减法函数   a-b=jian(a,b)
function jian(arg2, arg1) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  //lastmodifybydeeka  
  //动态控制精度长度  
  n = (r1 >= r2) ? r1 : r2;
  return ((arg2 * m - arg1 * m) / m).toFixed(n);
}
/** 随机整数
 * @param {Object} min
 * @param {Object} max
 */
function random(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min, 10)
}
/** 随机字符串
 * @param {Object} len 长度
 * @param {Object} fuhao 是否包含特殊符号
 */
function randChar(len, fuhao) {
  var arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,.?:[]!@#$%^&*()_+=-";
  var max = 61;
  if (typeof(fuhao) != "undefined") max = 82;
  len = (len == undefined || !parseInt(len)) ? 10 : len;
  var str = "";
  for (var i = 0; i < len; i++) {
    str += arr[this.rand(0, max)];
  }
  return str;
}
//toast提示框，带遮挡层
function toast(msg, icon, durationTime) {
  uni.showToast({
    icon: typeof(icon) == 'string' ? icon : 'none',
    duration: durationTime > 0 ? durationTime : 1500,
    mask: true, //防止点击穿透
    title: msg
  });
}
// alert 
function alert(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: "提示",
      content: content,
      showCancel: false,
      confirmColor: "#FF0000",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err)
      }
    })
  });
}
//loading提示框，带遮挡层，可用于避免表单重复提交
function loading(msg, timeout) {
  timeout = timeout || 0;
  uni.showLoading({
    mask: true, //防止点击穿透
    title: msg
  });
  if (parseInt(timeout) > 0) {
    setTimeout(function() {
      uni.hideLoading();
    }, timeout)
  }
}
/**
 * @param {Object} url  上传地址
 * @param {Object} files  本地文件 res.templatePath
 * @param {Object} formData 附加的参数
 */
function uploadTask(url0, files, formData) {
  if (url0.indexOf("http") != 0) { //统一的url
    url0 = Config.baseUrl + url0;
  }
  return new Promise((resolve, reject) => {
    var result = new Array(); //上传成功的
    var header = {};
    /* token 验证 */
    let token = uni.$func.cache("token");
    if (token != '' && token != null) {
      header.token = token;
    }

    //后台请求跨域时，设置为简单请求避免提交2次，自定义header字段要与后台一致
    //header['Content-Type']="multipart/form-data";

    files.forEach(function(fileUrl, index) {
      uni.uploadFile({
        url: url0,
        header: header || {},
        filePath: fileUrl,
        formData: formData || {},
        name: 'file',
        success: (res) => {
          let data = JSON.parse(res.data);
          if (data.code == 200 || data.code == 0) {
            result.push(data);
            if (result.length == files.length) {
              resolve(result)
            }
          } else {
            reject(data)
          }
        },
        fail: (res) => {
          reject(data);
        }
      })
    });

  })
}
const functions = {
  alert: alert,
  toast: toast,
  loading: loading,
  uploadTask: uploadTask,
  cache: cache,
  now: now,
  datetime: datetime,
  strtotime: strtotime,
  beforeTime: beforeTime,
  decrypt: decrypt,
  encrypt: encrypt,
  isWechat: isWechat,
  jia: jia,
  jian: jian,
  cheng: cheng,
  chu: chu,
  random: random,
  randChar: randChar,
  initPage: initPage,
  nextPage: nextPage
}
// $func挂载到uni对象上 
uni.$func = functions;

const install = Vue => {
  Vue.prototype.$func = functions
}
export default {
  install
}
