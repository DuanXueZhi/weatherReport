<!-- 2019/4/20 -->
<template>
  <div id="Register">
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
      <span>确认密码：</span>
      <mu-text-field v-model="confirmPassword" placeholder="Please input......" type="password" @blur="checkoutPassword"></mu-text-field>
      <mu-flex class="select-control-row">
        <span>男</span>
        <mu-radio value="男" v-model="userData.userSex">男</mu-radio>
      </mu-flex>
      <mu-flex class="select-control-row">
        <span>女</span>
        <mu-radio value="女" v-model="userData.userSex">女</mu-radio>
      </mu-flex>
    </div>
    <footer class="footer">
      <mu-button color="primary" @click="confirmRegister">确认</mu-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      msg: '用户注册界面', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      // --------------------------------本页操作数据--------------------------------
      userData: {
        userName: '', // 用户名
        password: '', // 密码
        userSex: '', // 性别
        identity: 'consumer' // 身份
      },
      confirmPassword: '' // 确认密码
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
    // 校验密码
    checkoutPassword () {
      return (this.userData.password === this.confirmPassword)
    },
    // ----------------------------------本页数据----------------------------------
    // 注册
    confirmRegister () {
      if (this.userData.userName !== '' && this.userData.password !== '') {
        if (this.checkoutPassword()) {
          this.$sendRequest.RTSPost('/rm_users/add_user', {user: this.userData}).then(res => {
            let title = ''
            let confirmText = ''
            let practice = false
            if (res.data.code === 0) {
              title = '恭喜'
              confirmText = '去登录'
              practice = true
            } else {
              title = '失败'
              confirmText = '知道了'
            }
            this.$alert(res.data.msg, title, {
              okLabel: confirmText
            }).then(() => {
              if (practice) {
                this.$router.push('/Native/User') // 去登录页面
              }
            })
          })
        } else {
          this.$toast.message('两次密码不一致')
        }
      } else {
        this.$toast.message('用户名或密码为空')
      }
    }
  }
}
</script>

<style scoped lang="less">
    #Register {
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
        padding: 16px;
        text-align: center;
        .select-control-row{
          padding: 16px 0 16px 10px;
        }
      }
      .footer{
        text-align: center;
      }
    }
</style>
