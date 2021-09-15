// pages/login.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: login_res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(login_res);
        this.setData({
          code:login_res.code
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

  },
  
  bindGetUserInfo(){
    wx.getUserProfile({
      desc: '必须授权',
      success(res){
        console.log("授权成功",res);
      },
      fail(res){
        console.log("授权失败",res);
      }
    })
  },
  getAccess() {
    wx.getUserProfile({
      desc: 'desc',
      success: (info_res) => {
        //获得用户数据
          //console.log(info_res);
          wx.showLoading({
            title: '正在登陆中',
          }),
          wx.login({
            success: function(login_res) {
              //获取code
                console.log(login_res.code);
                console.log(info_res.rawData);
                console.log(info_res.signature);
                console.log(info_res.encryptedData);  
                console.log(info_res.iv);
                wx.request({
                  url: 'http://localhost:8080/login',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencode'
                  },
                  data: {
                    code: login_res.code, //临时登录凭证
                    rawData: info_res.rawData, //用户非敏感信息
                    signature: info_res.signature, //签名
                    encrypteData: info_res.encryptedData, //用户敏感信息
                    iv: info_res.iv //解密算法的向量
                  },
                  success: function(res) {
                    wx.hideLoading({
                      success: (res) => {},
                    })
                    if (res.data.status == 200) {
                      // 7.小程序存储skey（自定义登录状态）到本地
                      wx.setStorageSync('userInfo', info_res.userInfo);
                      wx.setStorageSync('skey', res.data.skey);
                      wx.setStorageSync('openid', res.data.openid);
                      wx.redirectTo({
                        url: '../index/index',
                      })
                    } else{
                      console.log('服务器异常');
                      wx.showToast({
                        title: '服务器状态异常，稍后重试',
                        icon:'none',
                        duration:2000
                      })
                    }
                  },
                  fail: function(error) {
                    //调用服务端登录接口失败
                    wx.hideLoading({
                      success: (res) => {},
                    }),
                    wx.showToast({
                      title: '请求错误，请检查网络配置',
                      icon:'none',
                      duration:2000
                    })
                    
                  }
                })
            }
          });
          this.setData({
            hasUserInfo: true,
            userInfo: {},
          })
      
      },
       
    })
   

  }
 
}

)