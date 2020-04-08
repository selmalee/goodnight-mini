import Taro, { Component } from '@tarojs/taro'
import { View, OpenData, Textarea, Button, Form } from '@tarojs/components'
import '@tarojs/async-await'
import './index.less'

interface State {
  suggestion: string
}

export default class Index extends Component<{}, State> {

  constructor() {
    super()
    this.state = {
      suggestion: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config: Taro.Config = {
    navigationBarTitleText: '建议'
  }

  onShareAppMessage () {
    return {
      title: '晚安打卡，告别熬夜～',
      path: '/pages/index/index'
    }
  }

  handleSubmit() {

  }

  render () {
    return (
      <View className='user'>
        <View className='user__info'>
          <OpenData className='user__info__avator' type='userAvatarUrl'></OpenData>
          <OpenData className='user__info__name' type='userNickName'></OpenData>
        </View>
        <Form onSubmit={this.handleSubmit}>
          <Textarea value={this.state.suggestion} placeholder="form 中的 textarea" name="textarea"/>
          <Button form-type="submit"> 提交 </Button>
        </Form>
      </View>
    )
  }
}
