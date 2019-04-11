<!-- 2019/3/30 -->
<template>
    <div id="User">
      <p class="AppAllExplain">{{msg}}</p>

    </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: '用户界面' /* 该文件的解释 */
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

<style scoped>
    #User {}
</style>
