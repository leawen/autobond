// pages/query/query.js
const util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    tips: '',
    items: [],//定义变长数组
    items2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('app sessionid is ' + app.globalData.sessionid)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.setData({
      items: [],
      items2: []
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

    // 时间比较函数
    function compareDate(startDate, endDate) {
      var arrStart = startDate.split("-");
      var startTime = new Date(arrStart[0], arrStart[1], arrStart[2]);
      var startTimes = startTime.getTime();
      var arrEnd = endDate.split("-");
      var endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2]);
      var endTimes = endTime.getTime();
      if (endTimes < startTimes) {
        return 0;
      }
      else if (endTimes == startTimes) {
        return 1;
      }
      else if (endTimes > startTimes) {
      return 2;
      }
    }

    wx.request({
      url: 'https://www.microservice.work:8080/getTodayBond',
      method: 'GET',
      
      success: function (res) {
        console.log(res)// 服务器回包信息
        if (res.data.result == "SUCCESS") {
          console.log('提交查询成功')
          //wx.showToast({ title: '提交查询成功' })
          //var map = new Map();
          let aa = []
          for (var i = 0; i < res.data.bonds.length; ++i) {
            var map = new Map();
            console.log(res.data.bonds[i])
            map.set("name", res.data.bonds[i].split(",")[0])
            map.set("code", res.data.bonds[i].split(",")[1])
            map.set("swapname", res.data.bonds[i].split(",")[2])
            map.set("swapcode", res.data.bonds[i].split(",")[3])
            map.set("rate", res.data.bonds[i].split(",")[4])
            map.set("num", res.data.bonds[i].split(",")[5])
            map.set("swapprice", res.data.bonds[i].split(",")[6])
            map.set("zgj", res.data.bonds[i].split(",")[7])
            map.set("start_date",res.data.bonds[i].split(",")[8])
            map.set("list_date", res.data.bonds[i].split(",")[9])

            var date = util.formatDate(new Date());
            console.log('date' + date)
            aa[i] = (strMapToObj(map))

          }


          that.setData({
            items: aa
          })
          console.log(aa)
          console.log(aa[0])
        } else {
          console.log('提交查询失败')
          //wx.showToast({ title: '查询失败', icon: 'none' })
        }
      },
      fail: function (res) {
        //console.log(url)
        console.log('提交查询异常')
        console.log(res)// 服务器回包信息
        wx.showToast({ title: '连接服务异常，请稍后重试', icon: 'none' })
      }
    })

    wx.request({
      url: 'https://www.microservice.work:8080/getTodayShare',
      method: 'GET',

      success: function (res) {
        console.log(res)// 服务器回包信息
        if (res.data.result == "SUCCESS") {
          console.log('提交查询成功')
          //wx.showToast({ title: '提交查询成功' })
          //var map = new Map();
          let bb = []
          for (var i = 0; i < res.data.shares.length; ++i) {
            var map2 = new Map();
            console.log(res.data.shares[i])
            map2.set("name", res.data.shares[i].split(",")[0])
            map2.set("code", res.data.shares[i].split(",")[1])
            map2.set("price", res.data.shares[i].split(",")[2])
            map2.set("start_date", res.data.shares[i].split(",")[3])
            map2.set("listt_date", res.data.shares[i].split(",")[4])

            var date = util.formatDate(new Date());
            console.log('date' + date)
            bb[i] = (strMapToObj(map2))

          }


          that.setData({
            items2: bb
          })
          console.log(bb)
          console.log(bb[0])
        } else {
          console.log('提交查询失败')
          //wx.showToast({ title: '查询失败', icon: 'none' })
        }
      },
      fail: function (res) {
        //console.log(url)
        console.log('提交查询异常')
        console.log(res)// 服务器回包信息
        wx.showToast({ title: '连接服务异常，请稍后重试', icon: 'none' })
      }
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