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
