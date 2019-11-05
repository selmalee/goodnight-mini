const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const result = await db.collection('night_records').add({
    data: {
      openid: wxContext.OPENID,
      date: event.date,
      timestamp: event.time,
    }
  })
  return result
}
