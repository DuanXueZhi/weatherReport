// 2019/4/4 获取当前位置（百度地图API）
import BMap from 'BMap'

let getCurrentLocationMsg = function () {
  return new Promise(function (resolve, reject) {
    let myCity = new BMap.LocalCity()
    myCity.get(function (result) {
      if (result) {
        resolve(result)
      } else {
        let res = '获取用户位置信息出错'
        reject(res)
      }
    })
  })
}

export default {getCurrentLocationMsg}
