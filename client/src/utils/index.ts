export const formatDate = (date: Date) => {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`
}

export const formatTime = (date: Date) => {
  const h = date.getHours()
  const m = date.getMinutes()
  return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`
}

export const getDayCn = (date: Date) => {
  const dayMap = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '日'
  }
  return dayMap[date.getDay()]
}
