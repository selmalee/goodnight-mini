import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import '@tarojs/async-await'
import './index.less'

interface IState {
  time: Date,
  loading: boolean
}

export default class Index extends Component<{}, IState> {

  config: Config = {
    navigationBarTitleText: '打卡'
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
    setInterval(() => {
      this.setState({
        time: new Date()
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="index">
        <View className="index__time">{this.formatTime(this.state.time)}</View>
        <View className="index__date">{this.formatDate(new Date(this.state.time))}</View>
        <Button className="index__button" onClick={this.handleClick} loading={this.state.loading}>晚安</Button>
      </View>
    )
  }

  handleClick() {
    const now = new Date()
    if (new Date().getHours() < 6) {
      const yesterday = new Date(new Date().getTime() - (24 * 3600000))
      Taro.showModal({
        title: '选择日期',
        content: `已过凌晨，选择记录日期为今天（${this.formatDate(now)}）还是昨天（${this.formatDate(yesterday)}）?`,
        confirmText: '今天',
        cancelText: '昨天',
        success (res) {
          if (res.confirm) {
            this.addRecord(now)
          } else if (res.cancel) {
            this.addRecord(yesterday)
          }
        }
      })
    } else {
      this.addRecord(now)
    }
  }

  async addRecord(date: Date) {
    this.setState({
      loading: true
    })
    try {
      await Taro
        .cloud
        .callFunction({
          name: "record",
          data: {
            time: date.getTime(),
            date: this.formatDate(date)
          }
        })
      Taro.showToast({
        title: '打卡成功',
        icon: 'success'
      })
    } catch(e) {
      console.error(e.toString())
      Taro.showToast({
        title: '打卡失败，请稍后再试',
        icon: 'none',
        duration: 2000
      })
    }
    this.setState({
      loading: false
    })
  }

  private formatDate(date: Date) {
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    return `${y}-${m > 9 ? '' : '0'}${m}-${d > 9 ? '' : '0'}${d}`
  }

  private formatTime(date: Date) {
    return `${date.getHours()}:${date.getMinutes()}`
  }
}
