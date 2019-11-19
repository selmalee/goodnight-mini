import Taro, { Component, Config } from '@tarojs/taro'
import { View, OpenData, Navigator } from '@tarojs/components'
import '@tarojs/async-await'
import './index.less'

interface State {
  time: Date,
  loading: boolean
}

export default class Index extends Component<{}, State> {

  config: Config = {
    navigationBarTitleText: '我的'
  }

  onShareAppMessage () {
    return {
      title: '晚安打卡，告别熬夜～',
      path: '/pages/index/index'
    }
  }

  constructor() {
    super()
    this.state = {
      time: new Date(),
      loading: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="user">
        <View className="user__info">
          <OpenData className="user__info__avator" type="userAvatarUrl"></OpenData>
          <OpenData className="user__info__name" type="userNickName"></OpenData>
        </View>
        <View className="user__menu">
          <Navigator url="/user/feedback" className="user__menu__item" hover-class="navigator-hover">我要反馈</Navigator>
        </View>
      </View>
    )
  }
}
