import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 使用Vuex
// 创建一个常量对象
const state = {
  nowCityMsg: { // 用户当前定位城市
    center: '',
    code: '',
    level: '',
    name: ''
  },
  nowShowCityMsg: { // 系统当前展示城市
    name: ''
  },
  userMsg: {
    userName: '', // 用户名
    myCity: [], // 用户城市
    identity: '' // 用户身份
  }
}
const mutations = {
// 所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
// 第二个参数是可选参数，用于调用该 mutations 方法的时候传参
  updateNowCityMsg (state, nowCityMsg) { // 更新定位city信息
    state.nowCityMsg = nowCityMsg
    console.log('更新vuex中nowCityName的值', nowCityMsg)
  },
  updateNowShowCityMsgName (state, nowShowCityMsgName) { // 更新展示city信息
    state.nowShowCityMsg.name = nowShowCityMsgName
    console.log('更新vuex中nowShowCityMsg的值', nowShowCityMsgName)
  },
  updateUserMsg (state, userMsg) { // 更新当前用户信息
    state.userMsg = userMsg
    console.log('更新vuex中更新当前用户信息的值', userMsg)
  },
  updateUserMsgMyCity (state, myCity) { // 更新当前用户信息myCity
    state.userMsg.myCity = myCity
    console.log('更新vuex中更新当前用户信息的myCity值', myCity)
  }
}
// 让外部引用vuex
export default new Vuex.Store({ // 创建vuex中的store对象
  state,
  mutations
})
