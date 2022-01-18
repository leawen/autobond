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
  delInput: function (e) {
    var that = this;
    var nowidx = e.currentTarget.dataset.idx;//当前索引
    var oldarr = this.data.items;//循环内容
    wx.showModal({
      title: '是否确定删除内容？',
      success: function (res) {
      console.log('开始删除')
      console.log(nowidx)
      console.log(oldarr[nowidx])
      console.log(oldarr[nowidx].count)
        if (app.globalData.sessionid) {
          wx.request({
            url: 'https://www.microservice.work:8080/deleteuser',
            method: 'GET',
            data: {
              sessionid: app.globalData.sessionid,
              user: oldarr[nowidx].count
            },
            success: function (res) {
              console.log(res)// 服务器回包信息
              if (res.data.result == "SUCCESS") {
                console.log('删除成功')
                wx.showToast({ title: '删除成功' })
                oldarr.splice(nowidx, 1);    //删除当前索引的内容，这样就能删除view了
                if (oldarr.length < 1) {
                  oldarr = []  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
                }
                that.setData({
                  items: oldarr
                })
              }else {
                console.log('删除失败')
                wx.showToast({ title: '删除失败', icon: 'none' })
              }
            },
            fail: function (res) {
              //console.log(url)
              console.log('删除异常')
              console.log(res)// 服务器回包信息
              wx.showToast({ title: '连接服务异常，请稍后重试', icon: 'none' })
            }
          })
        } else {
          console.log('账户会话为空')// 服务器回包信息
          wx.showToast({ title: '登录信息异常，请重新进入小程序', icon: 'none' })
        }
      }
    })
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
              var bond = res.data.tickets[i].split(",")[3]
              console.log('自动申购可转债：' + bond)
              if (bond == "1") {
                map.set("bond", "是")
              }
              else {
                map.set("bond", "否")
              }
              var share = res.data.tickets[i].split(",")[4]
              console.log('自动申购新股：' + share)
              if (share == "1") {
                map.set("share", "是")
              }
              else {
                map.set("share", "否")
              }
              var bond_succ = res.data.tickets[i].split(",")[5]
              console.log('今天申购可转债成功：' + bond_succ)
              if (bond_succ == "1") {
                map.set("bond_succ", "是")
              }
              else {
                map.set("bond_succ", "否")
              }
              var share_succ = res.data.tickets[i].split(",")[6]
              console.log('今天申购新股成功：' + share_succ)
              if (share_succ == "1") {
                map.set("share_succ", "是")
              }
              else {
                map.set("share_succ", "否")
              }
              map.set("email", res.data.tickets[i].split(",")[7])
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
