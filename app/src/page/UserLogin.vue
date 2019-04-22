<!-- 2019/4/21 -->
<template>
  <div id="UserLogin">
    <p class="AppAllExplain">{{msg}}</p>
    <div class="top">
      <a href="javascript:history.go(-1)" class="topLeft">
        <span class="leftTitle"><i class="iconfont icon-arrow-left"></i></span>
        <span class="leftText">天气助手</span>
      </a>
      <div class="topRight">
        <span class="rightBox"><i class="iconfont icon-bianji"></i></span>
      </div>
    </div>
    <div class="body">
      <span>用户名：</span>
      <mu-text-field v-model="userData.userName" placeholder="Please input......"></mu-text-field>
      <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
      <mu-text-field v-model="userData.password" placeholder="Please input......" type="password"></mu-text-field>
    </div>
    <footer class="footer">
      <div class="btnBox">
        <mu-button color="primary" @click="userLogin">登录</mu-button>
      </div>
      <router-link :to="{name: 'Register'}" style="color: deepskyblue;">没有账号？去注册</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      msg: '用户登录界面', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      // --------------------------------本页操作数据--------------------------------
      userData: {
        userName: '',
        password: ''
      }
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
    /*
    * 函数
    * */
    // ----------------------------------本页数据----------------------------------
    // 用户登录
    userLogin () {
      if (this.userData.userName !== '' && this.userData.password !== '') {
        console.log(this.userData)
        this.$sendRequest.RTSPost('/rm_users/user_login', {user: this.userData}).then(res => {
          if (res.data.code === 0) {
            this.$store.commit('updateUserMsg', res.data.data) // 存入用户信息（vuex）
            this.$router.push('/Native/User') // 去用户信息页面
          } else {
            this.$alert(res.data.msg, '登录失败', {
              okLabel: '知道了'
            })
          }
        })
      } else {
        this.$toast.message('有空值')
      }
    }
  }
}
</script>

<style scoped lang="less">
    #UserLogin {
      font-size: 16px;
      .top{
        background-color: rgba(255,255,255,1);
        height: 3em;
        line-height: 3em;
        border-bottom: .5px solid #dfdfdf;
        padding: 0 1.5em;
        .topLeft{
          color: #333;
          display: inline-block;
          .leftTitle>i{
            font-size: 1em;
          }
          .leftText{
            font-size: 1.125em;
          }
        }
        .topRight{
          float: right;
          .rightBox>i{
            font-size: 1.625em;
          }
        }
      }
      .body{
        padding: 1em;
        text-align: center;
        .select-control-row{
          padding: 1em 0 1em 10px;
        }
      }
      .footer{
        text-align: center;
        .btnBox{
          margin-bottom: 1em;
        }
      }
    }
</style>
