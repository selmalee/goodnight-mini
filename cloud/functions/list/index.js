const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await db
      .collection('night_records')
      .where({
        openid: wxContext.OPENID
      })
      .get()
    return result.data
  } catch(e) {
    return false
  }
}
