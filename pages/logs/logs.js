//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: [],
    tips: '',
    accounts: []
  },
  queryBtnClick:function(e){
    this.setData({
      accounts: [],
      tips: ''
    })

    var _this = this;
    console.log('enter query submited-tickets')

    if (app.globalData.sessionid){
      wx.request({
        url: 'https://www.microservice.work:8080/querytickets',
        method: 'GET',
        data:{
          sessionid:app.globalData.sessionid
        },
        success: function(res) {
          console.log(res)// 服务器回包信息
          if(res.data.result == "SUCCESS"){
            console.log('提交查询成功')
            app.globalData.accounts = res.data.tickets
            wx.showToast({ title: '提交查询成功' })
            _this.setData({
              tips:'[账号信息， 提交时间， 剩余服务天数]',
              accounts: res.data.tickets
            })
          }else{
            console.log('提交查询失败')
            wx.showToast({ title: '查询失败', icon:'none' })
          }
        },
        fail: function(res) {
          //console.log(url)
          console.log('提交查询异常')
          console.log(res)// 服务器回包信息
          wx.showToast({ title: '连接服务异常，请稍后重试', icon:'none' })
        }
      })
    }else{
      console.log('查询账户会话为空')// 服务器回包信息
      wx.showToast({ title: '登录信息异常，请重新进入小程序', icon:'none' })
    }
    console.log('get this accounts is ' + this.data.accounts)
   
  },
  onLoad: function () {
    console.log('app sessionid is ' + app.globalData.sessionid)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
