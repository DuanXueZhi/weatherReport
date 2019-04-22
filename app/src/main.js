// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 插件 */
import axios from 'axios' // 引入axios插件
import './assets/plugin/iconfont/iconfont.css' // 全局引入阿里矢量图标库
import store from './assets/Vuex/store' // 引入Vuex
// muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast'
import Message from 'muse-ui-message'
import 'muse-ui-message/dist/muse-ui-message.css'

/* 自定义函数 */
import getCurrentLocation from './assets/js/getLocationByIP' // 获取当前位置信息通过用户IP
import sendRequest from './assets/js/sendRequest' // 全局引入发送请求函数

/* 过滤器 */
import * as textFilter from './assets/js/filter/textFilter' // 文本过滤器

Vue.config.productionTip = false

/* 原型绑定 */
Vue.prototype.$axios = axios // 将axios绑定到原型上
Vue.prototype.$store = store // 将Vuex的store绑定到原型上
Vue.prototype.$getCurrentLocation = getCurrentLocation // 将getCurrentLocation绑定到原型上
Vue.prototype.$sendRequest = sendRequest // 将sendRequest函数文件绑定到原型上

for (var keyT in textFilter) { // 文本过滤器
  Vue.filter(keyT, textFilter[keyT])
}

/* muse-ui */
Vue.use(MuseUI)
const ToastOption = {
  position: 'top', // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning' // 错误信息图标
}
Vue.use(Toast, ToastOption)
Vue.use(Message)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// console.log = function () {} // 屏蔽系统中所有console.log打印
