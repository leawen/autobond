// pages/license/license.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //使用条款及声明
    usetipsdefault: '用户须知：\n您必须同意以下所有条款才能使用本小程序功能或未来的更新。如果您不同意以下任一条款，请不要使用本小程序功能或任何更新。使用本软件即表明您同意以下所有条款。\n\n免责声明：\n1、本软件功能供您免费使用；\n2、本软件根据您的授权做部分的自动交易操作，视为您意愿的表达。\n3、交易即存在资金损失的风险。在任何情况下，本软件、服务提供者，都不对任何交易产生的本金损失、交易佣金损失，以及任何间接、相应而生、附带的损失或任何失去的利润，或因业务中断而致的任何损失承担任何责任。\n\n责任限制：\n1、本软件不会主动搜集您的账户等相关信息，并确保采取措施安全传输、存储、管理您所提交的信息。\n2、本软件不会主观故意泄露、或向第三方提供您所提交的信息。',
    //小程序用途
    useinfodefault: '1、使用本软件，即表明您授权、同意本软件，每日使用您提交的账户信息自动登录、申购可转债；以及根据您的设置，在可转债上市后自动卖出可转债。\n2、本软件不涉及您账户信息管理，账户内资金、股票操作。',
    useinfo: '',
    usetips: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'https://www.microservice.work:8080/license',
      method: 'GET',
      data:{
      },
      success: function(res) {
        console.log(res)// 服务器回包信息
        if(res.data.result == "SUCCESS"){
          _this.setData({
            usetips: res.data.announce,
            useinfo: res.data.useinfo,
          })
        }else{
          console.log('get use tips and info failure')
          _this.setData({
            usetips: _this.data.usetipsdefault,
            useinfo: _this.data.useinfodefault,
          })
        }
      },
      fail: function(res) {
        console.log(res)// 服务器回包信息
        wx.showToast({ title: '系统错误', icon:'none' })
        _this.setData({
          usetips: _this.data.usetipsdefault,
          useinfo: _this.data.useinfodefault,
        })

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