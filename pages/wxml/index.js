// pages/wxml/index.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '请提交要预约申购的账户信息',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickname: '',
    infoMess: '',
    userN: '',
    passW: '',
    inviteCode: '',
    //与后端的连接信息
    sessionKey: '',
  },
  //用户名和密码输入框事件
  accountInput:function(e){
    this.setData({
      userN:e.detail.value
    })
  },
  passWdInput:function(e){
    this.setData({
      passW:e.detail.value
    })
  },
  inviteCodeInput:function(e){
    this.setData({
      inviteCode:e.detail.value
    })
  },
  //用户协议勾选框
  agree(e){
    var flag = e.detail.value[0];
    if (flag === undefined) {
      this.data.bbb = "#bbb";
      flag = false;

    } else {
      this.data.bbb = "red";
      flag = true;
    }
    this.setData({
      if_rem_user: flag,
      bbb: this.data.bbb
    })
  },
  //用户协议
  terms: function (){
    wx.navigateTo({
      url: '/pages/license/license',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick:function(){
    if (this.data.if_rem_user === undefined) {
      this.data.if_rem_user = false;
    }
    if (this.data.if_rem_user == false) {
      this.setData({
        infoMess: '未勾选《用户协议》',
      })
      return;
    }
    if(this.data.userN.length == 0 || this.data.passW.length == 0 ){
      this.setData({
        infoMess:'提示：用户名、密码不能为空！',
      })
    }else{
     this.setData({
      motto: '发起预约……'
    })

     console.log(this.data.userInfo)
     console.log(this.data.userInfo.nickName)
     //var nickname = encodeURI(this.data.userInfo.nickName)
     //console.log(nickname)
     var _this = this;
      wx.request({
        //url: 'https://www.microservice.work:8080/login?username='+this.data.userN+'&password='+this.data.passW+'&bond=1&share=1&duration=30&sell=0&nickname='+this.data.userInfo.nickName,
        url: 'https://www.microservice.work:8080/login',
        method: 'GET',
        data:{
          username:this.data.userN,
          password:this.data.passW,
          bond:'1',
          share:'1',
          duration:'90',
          sell:'0',
          nickname:this.data.userInfo.nickName,
          sessionid:this.data.sessionKey,
          country:this.data.userInfo.country,
          city:this.data.userInfo.city,
          gender:this.data.userInfo.gender
        },
        //method: 'POST',
        /*
        header: { 'content-type': 'application/json'},
        data: {
          userName:this.data.userN,
          passWord:this.data.passW,
          inviteCode:this.data.inviteCode
        },
        */
        success: function(res) {

          console.log(res)// 服务器回包信息
          if(res.data == "True"){

            wx.showToast({ title: '提交成功' })
            _this.setData({
              motto: '恭喜！提交预约成功！点击头像查询已预约账户信息！'
            })
          }else{
            console.log('get return else')
            wx.showToast({ title: '提交失败', icon:'none' })
            _this.setData({
              motto: '预约失败！请校验账户信息并重试！'
            })
          }
        },
        fail: function(res) {
          //console.log(url)
          console.log(res)// 服务器回包信息
          wx.showToast({ title: '系统错误', icon:'none' })
          _this.setData({
            motto: '抱歉！预约失败了！'
          })

        }
      })

    }
  },
  //重置按钮点击事件
  clearBtnClick:function(e){
    this.setData({
      motto: '请提交要预约申购的账户信息',
      /*
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      */
      infoMess: '',
      userN:'',
      passW:'',
      inviteCode:'',
      Account:'',
      Password:'',
      InviteCode:'',
    })
  },

  //事件处理函数
  bindViewTap: function() {
    // var _this = this;
    // console.log('enter query submited-tickets')
    // wx.request({
    //   url: 'https://www.microservice.work:8090/querytickets',
    //   method: 'GET',
    //   data:{
    //     sessionid:this.data.sessionKey
    //   },
    //   success: function(res) {
    //     console.log(res)// 服务器回包信息
    //     if(res.data.result == "SUCCESS"){
    //       console.log('提交查询成功')
    //       app.globalData.accounts = res.data.tickets
    //       // wx.showToast({ title: '提交成功' })
    //       // _this.setData({
    //       //   motto: '恭喜！提交预约成功！'
    //       // })
    //     }else{
    //       console.log('提交查询失败')
    //       // wx.showToast({ title: '提交失败', icon:'none' })
    //       // _this.setData({
    //       //   motto: '预约失败！请校验账户信息并重试！'
    //       // })
    //     }
    //   },
    //   fail: function(res) {
    //     //console.log(url)
    //     console.log('提交查询异常')
    //     console.log(res)// 服务器回包信息
    //     // wx.showToast({ title: '系统错误', icon:'none' })
    //     // _this.setData({
    //     //   motto: '抱歉！预约失败了！'
    //     // })

    //   }
    // })


    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('app sessionid is '+ app.globalData.sessionId)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        nickname: app.globalData.userInfo.nickname
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    if (app.globalData.sessionId) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("index onload get app sessionid ：" + app.globalData.sessionId)
      this.setData({
        sessionKey: app.globalData.sessionId,
      })
      console.log("index onload get this sessionKey ：" + this.data.sessionKey,)
    } else {
      app.sessionInfoReadyCallback = res => {
        console.log("sessionid call back， get sessionid is "+ res.data.sessionid)
        this.setData({
          sessionKey: res.data.sessionid
        })
        app.globalData.sessionid = res.data.sessionid
      };
      console.log("globalData.sessionId is empty, need callback")
    }

 },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})