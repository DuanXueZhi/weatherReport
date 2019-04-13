import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 使用Vuex
// 创建一个常量对象
const state = {
  nowCityMsg: {
    center: '',
    code: '',
    level: '',
    name: ''
  }
}
const mutations = {
// 所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
// 第二个参数是可选参数，用于调用该 mutations 方法的时候传参
  updateNowCityMsg (state, nowCityMsg) { // 更新city信息
    state.nowCityMsg = nowCityMsg
    console.log('更新vuex中nowCityName的值', nowCityMsg)
  }
}
// 让外部引用vuex
export default new Vuex.Store({ // 创建vuex中的store对象
  state,
  mutations
})
