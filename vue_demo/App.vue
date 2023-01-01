<script>
  export default {
    globalData: {

    },
    onLaunch: function() {
      //线上版小程序自动更新
      // #ifdef MP-WEIXIN
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        console.log('小程序新版', res.hasUpdate)
      });
      updateManager.onUpdateReady(function(res) {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(function(res) {
        // 新的版本下载失败
        uni.showModal({
          title: '更新提示',
          content: '已经有新版本了哟~，请您删除当前小程序，重新搜索打开哟~',
        })
      });
      // #endif


      const self = this
      // 获取导航栏高度
      uni.getSystemInfo({
        success(res) {
          // 获取微信小程序胶囊相关
          const phoneInfo = {
            // 宽度
            windowHeight: res.windowWidth,
            // 高度
            windowHeight: res.windowHeight,
            // 手机型号
            phoneType: res.model,
            // 状态栏高度
            statusBar: res.statusBarHeight,
            // 导航栏高度
            customBar: res.navigationBarHeight,
            // 设备id
            deviceId: res.deviceId
          }
          console.log(phoneInfo)
          self.$store.commit('setPhoneInfo', phoneInfo)
        }
      })
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide');
    }
  }
</script>

<style lang="scss">
  /** 引入uview-ui ，如不需要可以注释 **/
  @import "@/uni_modules/uview-ui/index.scss";
  @import "@/static/css/common.scss";
</style>
