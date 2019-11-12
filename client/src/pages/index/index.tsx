import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import '@tarojs/async-await'
import './index.less'
import { formatDate, formatTime } from '../../utils';

interface State {
  time: Date,
  loading: boolean
}

export default class Index extends Component<{}, State> {

  config: Config = {
    navigationBarTitleText: '打卡'
  }

  onShareAppMessage () {
    return {
      title: '晚安打卡，告别熬夜～',
      path: '/pages/index/index'
    }
  }

  private interval:NodeJS.Timeout
  private dayMap = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  }

  constructor() {
    super()
    this.state = {
      time: new Date(),
      loading: false
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

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="index">
        <View className="index__time">{formatTime(this.state.time)}</View>
        <View className="index__date">
          <Text>{formatDate(new Date(this.state.time))}</Text>
          <Text className="index__date__day">周{this.dayMap[this.state.time.getDay()]}</Text>
        </View>
        <Button className="index__button" onClick={this.handleClick} loading={this.state.loading}>晚安</Button>
      </View>
    )
  }
  // 处理点击按钮
  handleClick() {
    const now = new Date()
    const hour = now.getHours()
    if (hour < 6) {
      const yesterday = new Date(now.getTime() - (24 * 3600000))
      Taro.showModal({
        title: '选择日期',
        content: `已过凌晨，选择记录日期为今天（${formatDate(now)}）还是昨天（${formatDate(yesterday)}）?`,
        confirmText: '今天',
        cancelText: '昨天',
        success: (res) => {
          if (res.confirm) {
            this.addRecord(now)
          } else if (res.cancel) {
            this.addRecord(yesterday)
          }
        }
      })
    } else if (hour >= 6 && hour < 20) {
      Taro.showModal({
        title: '确认',
        content: '非正常人类睡眠时间，确认要打卡?',
        confirmText: '确定',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.addRecord(now)
          }
        }
      })
    } else {
      this.addRecord(now)
    }
  }
  // 打卡
  async addRecord(date: Date) {
    this.setState({
      loading: true
    })
    try {
      const resp = await Taro
        .cloud
        .callFunction({
          name: "record",
          data: {
            time: date.getTime(),
            date: formatDate(date)
          }
        })
      if (resp) {
        console.log(resp)
        Taro.showToast({
          title: '打卡成功',
          icon: 'success'
        })
      } else {
        Taro.showToast({
          title: '打卡失败，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
    } catch(e) {
      console.error(e.toString())
      Taro.showToast({
        title: '打卡出错，请稍后再试',
        icon: 'none',
        duration: 2000
      })
    }
    this.setState({
      loading: false
    })
  }
}
