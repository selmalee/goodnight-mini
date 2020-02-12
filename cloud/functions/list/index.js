const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const dateWhere = event.date ? {
    $regex: '.*' + event.date,
    $options: 'i'
  } : undefined
  try {
    const result = await db
      .collection('night_records')
      .where({
        openid: wxContext.OPENID,
        date: dateWhere
      })
      .get()
    return result.data.sort((a, b) => b.timestamp - a.timestamp) // 倒序
  } catch(e) {
    return false
  }
}
