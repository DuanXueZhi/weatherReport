import Vue from 'vue'
import Router from 'vue-router'
/*
* Native(本土页面)
* */
import Native from '@/page/Native'
/*
* Home(主页)
* */
import Home from '@/page/Home'
/*
* User(用户)
* */
import User from '@/page/User'

/*
* ManageCity(管理城市)
* */
import ManageCity from '@/page/ManageCity'

Vue.use(Router)

export default new Router({
  mode: 'history', // 去除#
  routes: [
    {
      path: '/',
      redirect: 'Native/Home'
    },
    // Native(本土页面)
    {
      path: '/Native',
      name: 'Native',
      component: Native,
      children: [
        // Home(主页)
        {
          path: 'Home',
          name: 'Home',
          component: Home
        },
        // User(用户)
        {
          path: 'User',
          name: 'User',
          component: User
        }
      ]
    },
    // ChooseCity(选择城市)
    {
      path: '/ManageCity',
      name: 'ManageCity',
      component: ManageCity
    }
  ]
})
