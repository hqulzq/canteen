// pages/entrance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  authorization(){
  //wx.setStorageSync('skey', '');
   getApp().globalData.skey=wx.getStorageSync('skey');
   getApp().globalData.openid=wx.getStorageSync('openid');
   if( getApp().globalData.skey!=''){
    wx.checkSession({
      success: (res) => {
        wx.request({
          url: 'http://localhost:8080/login',
          method:'POST',
          data:{
            skey:wx.getStorageSync('skey'),
            openid:wx.getStorageSync('openid')
          },
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            if(res.data.status==501){
              wx.navigateTo({
                url: '../login/login'
              })
            }else{
              wx.redirectTo({
              url: '../index/index'
            })
            }
            
          },
          fail:function () {
            wx.showToast({
              title: '数据请求失败，稍后再试',
              icon:'none',
              duration:2000
            })
         }
      
        })
       
      },
      fail:(res)=>{
        wx.navigateTo({
          url: '../login/login'
        })
      }  
    })
    }else{
      wx.navigateTo({
        url: '../login/login'
      })

    }
  }
})