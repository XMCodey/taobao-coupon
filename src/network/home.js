import { topClient } from './requests.js'

// 淘宝客-推广者-物料精选 api 封装
export async function getGoodsList ( params = {}) {
  return await topClient(
    'taobao.tbk.dg.optimus.material',
    params
  )
}

export async function getActivityInfo (activityId) {
  return await topClient(
    'taobao.tbk.activity.info.get',
    { activity_material_id: activityId }
  )
}
