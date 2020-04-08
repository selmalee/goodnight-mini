import Taro, { Component } from '@tarojs/taro'
import { Button } from '@tarojs/components'
import '@tarojs/async-await'
import './index.less'
import { formatDate } from '../../utils';

interface State {
  loading: boolean
}

export default class IndexButton extends Component<{}, State> {

  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
          name: 'record',
          data: {
            time: date.getTime(),
            date: formatDate(date)
          }
        })
      if (resp) {
        Taro.showToast({
          title: '打卡成功',
          icon: 'success'
        })
        Taro.getApp().globalData.isUpdate = true
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

  render () {
    return (
      <Button className='index__button' onClick={this.handleClick} loading={this.state.loading}>晚安</Button>
    )
  }
}
