<!-- 2019/3/30 -->
<template>
  <div id="User">
    <p class="AppAllExplain">{{msg}}</p>
    <router-link :to="{name: 'Register'}">注册</router-link>
    <router-link :to="{name: 'UserLogin'}">登录</router-link>
    <div class="body">
      <mu-paper :z-depth="1" class="demo-list-wrap">
        <mu-appbar color="teal" style="background-color: #88a7ff;">
          <mu-button icon slot="left">
            <mu-icon value="menu"></mu-icon>
          </mu-button>
          个人信息
        </mu-appbar>
        <div class="bodyHeader">
          <mu-paper class="demo-paper" :z-depth="3">
            <div class="userNameBox">
              <span class="userImage">
                <img :src="userData.userImage !== ''? userData.userImage : require('../assets/image/bg/nextWeekBackground.jpg')" alt="">
              </span>
              <span class="userName">
                {{userData.userName}}
              </span>
            </div>
          </mu-paper>
        </div>
        <mu-list>
          <mu-list-item button :ripple="false">
            <mu-list-item-action>
              <mu-icon value="inbox"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{userData.userSex}}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button :ripple="false">
            <mu-list-item-action>
              <mu-icon value="grade"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{userData.password | textPasswordShow}}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button :ripple="false">
            <mu-list-item-action>
              <mu-icon value="send"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{userData.identity}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <mu-divider></mu-divider>
        <mu-expansion-panel>
          <div slot="header">我的城市</div>
          <mu-list>
            <mu-list-item button :ripple="false" v-for="(city, index) in userData.myCity" :key="index"  v-if="userData.myCity.length !== 0">
              <mu-list-item-title>{{city}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="clear" @click="deleteCity(city)"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <div v-if="userData.myCity.length === 0" style="text-align: center;">
              <i class="iconfont icon-kongbaiblank28"></i>
              <p>空空如野，快去添加城市吧</p>
            </div>
          </mu-list>
        </mu-expansion-panel>
        <mu-expansion-panel v-if="userData.identity === 'admin'">
          <div slot="header">用户管理</div>
          <mu-list>
            <mu-list-item button :ripple="false" v-for="(user, index) in userList" :key="index"  v-if="userList.length !== 0">
              <mu-list-item-title>{{user.userName}}</mu-list-item-title>
              <mu-list-item-action v-if="user.identity !== 'admin'">
                <mu-icon value="clear" @click="deleteUser(user._id)"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </mu-expansion-panel>
      </mu-paper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: '用户界面', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      userData: {
        userName: '',
        password: '',
        userImage: '',
        userSex: '',
        myCity: [],
        identity: '',
        meta: {
          createAt: '',
          updateAt: ''
        }
      },
      userList: [] // 用户列表
      // --------------------------------本页操作数据--------------------------------
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  /* vue完整生命周期 */
  beforeCreate () {
    // console.group('beforeCreate 创建前状态===============》')
  },
  created () {
    // console.group('created 创建完毕状态===============》')
    if (this.$store.state.userMsg.userName === '') {
      // 用户未登录
      this.$router.push('/Native/UserLogin') // 去用户信息页面
    }
    this.getUserMsg(this.$store.state.userMsg)
  },
  beforeMount () {
    // console.group('beforeMount 挂载前状态===============》')
  },
  mounted () {
    // console.group('mounted 挂载结束状态===============》')
  },
  beforeUpdate () {
    // console.group('beforeUpdate 更新前状态===============》')
  },
  updated () {
    // console.group('updated 更新完成状态===============》')
  },
  beforeDestroy () {
    // console.group('beforeDestroy 销毁前状态===============》')
  },
  destroyed () {
    // console.group('destroyed 销毁完成状态===============》')
  },
  // 函数集
  methods: {
    // ----------------------------------公用函数----------------------------------
    /*
     * 获取函数
     * */
    // 获取用户信息
    getUserMsg (userData) {
      this.$sendRequest.RTSPost('/rm_users/user_findOrList', {user: userData}).then(res => {
        if (res.data.code === 0) {
          this.userData = res.data.data
          console.log(this.userData)
          if (this.userData.identity === 'admin') {
            this.getUserList()
          }
        }
      })
    },

    // 获取所有用户列表
    getUserList () {
      this.$sendRequest.RTSPost('/rm_users/user_findOrList', {user: ''}).then(res => {
        if (res.data.code === 0) {
          this.userList = res.data.data
          console.log(this.userList)
        }
      })
    },

    /*
     * 函数
     * */
    // 修改用户信息
    updateUserMsg (id, userData) {
      console.log('修改用户信息', id, userData)
      this.$sendRequest.RTSPost('/rm_users/user_update', {id: id, user: userData}).then(res => {
        console.log(res)
      })
    },

    // ----------------------------------本页数据----------------------------------
    // 删除城市
    deleteCity (cityName) {
      this.userData.myCity.splice(this.userData.myCity.indexOf(cityName), 1)
      this.updateUserMsg(this.userData._id, {myCity: this.userData.myCity})
      this.$store.commit('updateUserMsgMyCity', this.userData.myCity) // 更新vuex中userMsg中myCity数组
    },

    // 删除用户
    deleteUser (userId) {
      this.$sendRequest.RTSDelete('/rm_users/delete_user', {userId: userId}).then(res => {
        if (res.data.code === 0) {
          this.getUserList()
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import '../assets/less/main';

  #User{
    font-size: 16px;
    .body{
      .demo-list-wrap{
        .bodyHeader{
          .demo-paper{
            position: relative;
            height: 15.625em;
            background: url("../assets/image/weatherBackgroundImg/sunshineDaytime.jpg");
            .userNameBox{
              padding: 0.625em 1.875em;
              position: absolute;
              bottom: 0;
              width: 100%;
              background: rgba(0, 0, 0, 0.22);
              .align-items;
              justify-content: left;
              .userImage{
                display: inline-block;
                width: 3.125em;
                height: 3.125em;
                .border_radius(1.5625em);
                overflow: hidden;
                >img{
                  width: 100%;
                  height: 100%;
                }
              }
              .userName{
                font-weight: 400;
                font-size: 1.7em;
                padding: 0 0.625em;
              }
            }
          }
        }
      }
    }
  }
</style>
