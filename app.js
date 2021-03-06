//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录，获取sessionid
    wx.login({
      success: res => {
        var code = res.code; //返回code
        //在wx.request中，this不表示app或者本文件的上下文；而是在index的上下文了；如后面判断了this.sessionInfoReadyCallback是否存在

        console.log('获取用户code是：',code);
        wx.request({
          url: 'https://www.microservice.work:8080/getlogin',
          data: {
            code:code
          },
          header: {
            'content-type': 'json'
          },
          success: function(res) {
            console.log(res)
            if(res.data.result == 'true'){
              console.log('用户登录成功');
              that.globalData.sessionId = res.data.sessionid
            }else{
              console.log('用户登录失败');
              that.globalData.sessionId = "none"
            }

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.sessionInfoReadyCallback) {
              that.sessionInfoReadyCallback(res)
            }

          },
          fail: function(res) {
            console.log('获取登录信息失败'),
            that.globalData.sessionId = "none"

            if (this.sessionInfoReadyCallback) {
              that.sessionInfoReadyCallback(res)
            }

          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    sessionId: null,
    accounts: null
  },
})