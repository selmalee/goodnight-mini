import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import '@tarojs/async-await'
import './music.less'

interface State {
  // poster: string
  // name: string
  // author: string
  // src: string
  status: number
}

const music = {
  poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
  name: '小青龙推荐的音乐',
  author: '',
  src: 'http://ws.stream.qqmusic.qq.com/C400001DYZTs2nsd6z.m4a?guid=9025196737&vkey=FA53AE6A80237DF8EE716459F02D38D8BDD5F0DBCD9C42148903BDB17CCAD5CDAF777BA916EA8C10CE70174080039B2525A7FEA22179A1B0&uin=7069&fromtag=66'
}

const statusMsgMap = {
  0: '睡不着？来点音乐',
  1: `‖`,
  2: `▶`
}

export default class IndexMusic extends Component<{}, State> {

  constructor() {
    super()
    this.state = {
      status: 0
    }
  }

  private audioCtx: any

  componentWillMount () { }

  componentDidMount () {
    try {
      this.audioCtx = Taro.createInnerAudioContext()
      // this.audioCtx = Taro.getBackgroundAudioManager()
      this.audioCtx.src = music.src
      this.audioCtx.title = music.name
      this.audioCtx.play()
      this.audioCtx.onError((res) => {
        Taro.showToast({
          title: '播放异常：' + res.errMsg,
          icon: 'none',
          duration: 2000
        })
      })
    } catch(e) {
      Taro.showToast({
        title: '创建音频异常' + e.toString(),
        icon: 'none',
        duration: 2000
      })
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick () {
    switch(this.state.status) {
      case 0:
        this.audioCtx.play()
        this.setState({
          status: 1
        })
        break
      case 1:
        this.audioCtx.pause()
        this.setState({
          status: 2
        })
        break
      case 2:
        this.audioCtx.play()
        this.setState({
          status: 1
        })
        break
    }
  }

  render () {
    return (
      <View className="music" onClick={this.handleClick}>
        <Text className={this.state.status ? 'music__button' : 'music__title'}>{statusMsgMap[this.state.status]}</Text>
        {
          this.state.status &&
          <Text className="music__title">{music.name}</Text>
        }
      </View>
    )
  }
}
