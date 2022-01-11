//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: [],
    tips: '',
    items: [],//定义变长数组
    accounts: []
  },
  // queryBtnClick:function(e){
  //   this.setData({
  //     accounts: [],
  //     tips: ''
  //   })

  //   var _this = this;
  //   console.log('enter query submited-tickets')

  //   if (app.globalData.sessionid){
  //     wx.request({
  //       url: 'https://www.microservice.work:8080/querytickets',
  //       method: 'GET',
  //       data:{
  //         sessionid:app.globalData.sessionid
  //       },
  //       success: function(res) {
  //         console.log(res)// 服务器回包信息
  //         if(res.data.result == "SUCCESS"){
  //           console.log('提交查询成功')
  //           app.globalData.accounts = res.data.tickets
  //           wx.showToast({ title: '提交查询成功' })
  //           _this.setData({
  //             tips:'[账号信息， 提交时间， 剩余服务天数]',
  //             accounts: res.data.tickets
  //           })
  //         }else{
  //           console.log('提交查询失败')
  //           wx.showToast({ title: '查询失败', icon:'none' })
  //         }
  //       },
  //       fail: function(res) {
  //         //console.log(url)
  //         console.log('提交查询异常')
  //         console.log(res)// 服务器回包信息
  //         wx.showToast({ title: '连接服务异常，请稍后重试', icon:'none' })
  //       }
  //     })
  //   }else{
  //     console.log('查询账户会话为空')// 服务器回包信息
  //     wx.showToast({ title: '登录信息异常，请重新进入小程序', icon:'none' })
  //   }
  //   console.log('get this accounts is ' + this.data.accounts)
   
  // },
  queryBtnClick2: function (e) {
    this.setData({
      items: []
    })

    var that = this;
    console.log('enter query submited-tickets')

    function strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k, v] of strMap) {
        obj[k] = v;
      }
      return obj;
    }

    if (app.globalData.sessionid) {
      wx.request({
        url: 'https://www.microservice.work:8080/querytickets',
        method: 'GET',
        data: {
          sessionid: app.globalData.sessionid
        },
        success: function (res) {
          console.log(res)// 服务器回包信息
          if (res.data.result == "SUCCESS") {
            console.log('提交查询成功')
            wx.showToast({ title: '提交查询成功' })
            //var map = new Map();
            let aa=[]
            for (var i = 0; i < res.data.tickets.length; ++i) {
              var map = new Map();
              console.log(res.data.tickets[i])
              map.set("count", res.data.tickets[i].split(",")[0])
              map.set("time", res.data.tickets[i].split(",")[1])
              map.set("day", res.data.tickets[i].split(",")[2])
              aa[i] = (strMapToObj(map))

            }
            

            that.setData({
              items: aa
            })
            console.log(aa)
            console.log(aa[0])
          } else {
            console.log('提交查询失败')
            wx.showToast({ title: '查询失败', icon: 'none' })
          }
        },
        fail: function (res) {
          //console.log(url)
          console.log('提交查询异常')
          console.log(res)// 服务器回包信息
          wx.showToast({ title: '连接服务异常，请稍后重试', icon: 'none' })
        }
      })
    } else {
      console.log('查询账户会话为空')// 服务器回包信息
      wx.showToast({ title: '登录信息异常，请重新进入小程序', icon: 'none' })
    }
    console.log('get this accounts is ' + that.data.items)

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
