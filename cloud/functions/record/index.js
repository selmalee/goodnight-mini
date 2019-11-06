const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    // 更新记录
    const resultUpdate = await db
      .collection('night_records')
      .where({
        date: event.date,
        openid: wxContext.OPENID
      })
      .update({
        // data 字段表示需新增的 JSON 数据
        data: {
          timestamp: event.time,
          insert_time: new Date().getTime()
        }
      })
    if (!resultUpdate.stats.updated) {
      // 插入记录
      const resultAdd = await db
        .collection('night_records')
        .add({
          // data 字段表示需新增的 JSON 数据
          data: {
            date: event.date,
            timestamp: event.time,
            openid: wxContext.OPENID,
            insert_time: new Date().getTime()
          }
        })
      return resultAdd
    } else {
      return resultUpdate
    }
  } catch(e) {
    return false
  }
}
