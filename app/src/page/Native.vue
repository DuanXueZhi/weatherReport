<!-- 2019/3/31 -->
<template>
  <div id="Native">
    <p class="AppAllExplain">{{msg}}</p>
    <!-- 主体 -->
    <router-view></router-view>
    <!-- 底部 -->
    <bottom-nav-bar></bottom-nav-bar>
  </div>
</template>

<script>
import BottomNavBar from '../components/Base/BottomNavBar' // 基础底部组件

export default {
  name: 'Native',
  components: {
    'BottomNavBar': BottomNavBar
  },
  data () {
    return {
      msg: '整体本土基页面' /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      // --------------------------------本页操作数据--------------------------------
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  /* vue完整生命周期 */
  beforeCreate () {
    console.group('beforeCreate 创建前状态===============》')
  },
  created () {
    console.group('created 创建完毕状态===============》')
  },
  beforeMount () {
    console.group('beforeMount 挂载前状态===============》')
  },
  mounted () {
    console.group('mounted 挂载结束状态===============》')
  },
  beforeUpdate () {
    console.group('beforeUpdate 更新前状态===============》')
  },
  updated () {
    console.group('updated 更新完成状态===============》')
  },
  beforeDestroy () {
    console.group('beforeDestroy 销毁前状态===============》')
  },
  destroyed () {
    console.group('destroyed 销毁完成状态===============》')
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
  #Native {
    position: relative;
    width: 100%;
    height: 100%;
    margin-bottom: 67.2px;
  }
</style>
