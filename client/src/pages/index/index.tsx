import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import { formatDate, formatTime } from '../../utils';
import IndexButton from './button'
import IndexMusic from './music'

interface State {
  time: Date
}

export default class Index extends Component<{}, State> {

  constructor() {
    super()
    this.state = {
      time: new Date()
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({
        time: new Date()
      })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  private interval: NodeJS.Timeout
  private dayMap = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  }

  componentDidShow () { }

  componentDidHide () { }

  config: Taro.Config = {
    navigationBarTitleText: '打卡'
  }

  onShareAppMessage () {
    return {
      title: '晚安打卡，告别熬夜～',
      path: '/pages/index/index'
    }
  }

  render () {
    return (
      <View className='index'>
        <View className='index__time'>{formatTime(this.state.time)}</View>
        <View className='index__date'>
          <Text>{formatDate(new Date(this.state.time))}</Text>
          <Text className='index__date__day'>周{this.dayMap[this.state.time.getDay()]}</Text>
        </View>
        <IndexButton></IndexButton>
        <IndexMusic></IndexMusic>
      </View>
    )
  }
}
