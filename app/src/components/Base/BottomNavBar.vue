<!-- 2019/3/31 -->
<template>
  <div id="BottomNavBar">
    <p class="AppAllExplain">{{msg}}</p>
    <ul class="listBox">
      <li class="eachItem" @touchstart="navBarItem = 'Home'">
        <router-link class="itemBox" :to="{name: 'Home'}" v-bind:class="{'active': navBarItem === 'Home'}">
          <span class="itemIconfont"><i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i></span>
          <span class="itemText">主页</span>
        </router-link>
      </li>
      <li class="eachItem" @touchstart="navBarItem = 'NextWeek'">
        <router-link class="itemBox" :to="{name: 'NextWeek'}" v-bind:class="{'active': navBarItem === 'NextWeek'}">
          <span class="itemIconfont"><i class="iconfont icon-icon-test"></i></span>
          <span class="itemText">七天</span>
        </router-link>
      </li>
      <li class="eachItem" @touchstart="navBarItem = 'Trip'">
        <router-link class="itemBox"  :to="{name: 'Trip'}" v-bind:class="{'active': navBarItem === 'Trip'}">
          <span class="itemIconfont"><i class="iconfont icon-jiaotongchuhang"></i></span>
          <span class="itemText">出行</span>
        </router-link>
      </li>
      <li class="eachItem" @touchstart="navBarItem = 'User'">
        <router-link class="itemBox" :to="{name: 'User'}" v-bind:class="{'active': navBarItem === 'User'}">
          <span class="itemIconfont"><i class="iconfont icon-wode"></i></span>
          <span class="itemText">我的</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BottomNavBar',
  data () {
    return {
      msg: '基础底部组件', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      // --------------------------------本页操作数据--------------------------------
      navBarItem: 'Home' /* 菜单激活项 */
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {
    '$route' () {
      var vm = this
      console.log(vm.$route.name)
      vm.navBarItem = vm.$route.name // 通过路由更新活跃图标（也就是刷新不变激活图标）
    }
  },
  /* vue完整生命周期 */
  beforeCreate () {
    // console.group('beforeCreate 创建前状态===============》')
  },
  created () {
    // console.group('created 创建完毕状态===============》')
    var vm = this
    vm.navBarItem = vm.$route.name // 通过路由更新活跃图标（也就是刷新不变激活图标）
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
  }
}
</script>

<style scoped lang="less">
  #BottomNavBar{
    bottom: 0;
    width: 100%;
    position: fixed;
    border-top: 1px solid #999999;
    background: #f3f4e9;
    .listBox{
      width: 100%;
      display: flex;
      padding: 8px 0;
      .eachItem{
        text-align: center;
        width: 25%;
        .itemBox{
          color: #383838;
          >span{
            display: block;
            &.itemIconfont>i{
              font-size: 28px;
            }
          }
          &.active{
            color: #00BCD4;
          }
        }
      }
    }
  }
</style>
