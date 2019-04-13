// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 插件 */
import axios from 'axios' // 引入axios插件
import './assets/plugin/iconfont/iconfont.css' // 全局引入阿里矢量图标库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './assets/Vuex/store' // 引入Vuex

/* 自定义函数 */
import getCurrentLocation from './assets/js/getLocationByIP' // 获取当前位置信息通过用户IP

Vue.config.productionTip = false

/* 原型绑定 */
Vue.prototype.$axios = axios // 将axios绑定到原型上
Vue.prototype.$store = store // 将Vuex的store绑定到原型上

Vue.prototype.$getCurrentLocation = getCurrentLocation // 将getCurrentLocation绑定到原型上

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// console.log = function () {} // 屏蔽系统中所有console.log打印
