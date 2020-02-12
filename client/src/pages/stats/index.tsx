import '@tarojs/async-await';
import {
  Picker,
  ScrollView,
  Text,
  View
  } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import './index.less';
import { formatDate, formatTime, getDayCn } from '../../utils';

interface ListItem {
  date: string,
  timestamp: number
}

interface State {
  list: ListItem[],
  date: string,
  isLoading: boolean
}

export default class Index extends Component<{}, State> {

  constructor() {
    super()
    this.state = {
      list: [],
      date: formatDate(new Date(), 'YYYY-MM'),
      isLoading: false
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getListData()
  }

  componentWillUnmount () { }

  componentDidShow () {
    // 新打卡，重新获取数据
    console.log(Taro.getApp().globalData)
    if (Taro.getApp().globalData.isUpdate && !this.state.isLoading) {
      this.getListData()
      Taro.getApp().globalData.isUpdate = false
    }
  }

  componentDidHide () { }

  config: Taro.Config = {
    navigationBarTitleText: '数据'
  }

  onShareAppMessage () {
    return {
      title: '晚安打卡，告别熬夜～',
      path: '/pages/index/index'
    }
  }

  async getListData() {
    this.setState({
      isLoading: true
    })
    Taro.showLoading()
    try {
      const resp = await Taro
        .cloud
        .callFunction({
          name: 'list',
          data: {
            date: this.state.date
          }
        })
      // console.log(resp)
      if (resp.result) {
        this.setState({
          list: resp.result
        })
      } else {
        Taro.showToast({
          title: '获取数据失败，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
    } catch(e) {
      console.error(e.toString())
      Taro.showToast({
        title: '获取数据出错，请联系管理员',
        icon: 'none',
        duration: 2000
      })
    }
    Taro.hideLoading()
    this.setState({
      isLoading: true
    })
  }

  handleCHangeDate(e) {
    this.setState({
      date: e.target.value
    }, this.getListData)
  }

  render () {
    return (
      <View>
        <Picker mode='date' value={this.state.date} fields='month' end={formatDate(new Date())} onChange={this.handleCHangeDate} className='picker'>
          <Text className='picker__button'>选择月份</Text>
          <Text className='picker__date'>{this.state.date}</Text>
        </Picker>
        <ScrollView scrollY className='list'>
          {
            this.state.list.length > 0 ?
            this.state.list.map((item: ListItem) => {
              const nowDate = new Date(item.timestamp)
              return (
                <View className='list__item' key={item.date}>
                  <Text className='list__item__date'>{item.date}</Text>
                  <Text className={'list__item__day' + ((nowDate.getDay() === 0 || nowDate.getDay() === 6) ? ' list__item__day_weekend' : '')}>{getDayCn(nowDate)}</Text>
                  <Text className='list__item__time'>{formatTime(nowDate)}</Text>
                </View>
              )
            }) :
            <View className='list__msg'>暂无数据</View>
          }
        </ScrollView>
      </View>
    )
  }
}
