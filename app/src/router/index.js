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
* NextWeek(近七日预报)
* */
import NextWeek from '@/page/NextWeek'
/*
* User(用户)
* */
import User from '@/page/User'
/*
* UserLogin(用户登录)
* */
import UserLogin from '@/page/UserLogin'
/*
* Native(本土页面)【完】
* */

/*
* ManageCity(管理城市)
* */
import ManageCity from '@/page/ManageCity'
/*
* Register(用户注册)
* */
import Register from '@/page/Register'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 去除#
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
        // NextWeek(近七日天气)
        {
          path: 'NextWeek',
          name: 'NextWeek',
          component: NextWeek
        },
        // User(用户)
        {
          path: 'User',
          name: 'User',
          component: User
        },
        // UserLogin(用户登录)
        {
          path: 'UserLogin',
          name: 'UserLogin',
          component: UserLogin
        }
      ]
    },
    // ChooseCity(选择城市)
    {
      path: '/ManageCity',
      name: 'ManageCity',
      component: ManageCity
    },
    // Register(用户注册)
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
