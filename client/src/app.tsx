import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
    // 强制更新
    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = Taro.getUpdateManager()
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title:'更新提示',
        content:'新版本已经准备好，是否马上重启小程序？',
        success:function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      console.error('小程序的新版本下载失败')
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Taro.Config = {
    requiredBackgroundModes: ['audio'],
    pages: [
      'pages/index/index',
      'pages/stats/index',
      'pages/stats/history',
      'pages/user/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#000',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '打卡',
          iconPath: 'img/home.png',
          selectedIconPath: 'img/home-active.png'
        },
        {
          pagePath: 'pages/stats/index',
          text: '数据',
          iconPath: 'img/stats.png',
          selectedIconPath: 'img/stats-active.png'
        },
        // {
        //   pagePath: 'pages/user/index',
        //   text: '我的',
        //   iconPath: 'img/user.png',
        //   selectedIconPath: 'img/user-active.png'
        // }
      ]
    },
    cloud: true
  }

  // 全局变量
  globalData = {
    isUpdate: false
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
