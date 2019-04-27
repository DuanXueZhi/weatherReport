<!-- 2019/4/27 -->
<template>
  <div id="HeaderCityName" :style="{background: backgroundData}">
    <p class="AppAllExplain">{{msg}}</p>
    <header class="headerBox">
      <div class="headerLeft" @touchend="addCity">
        <span class="addCityTitle">+</span>
        <span class="cityName">{{cityName? cityName : $store.state.nowCityMsg.name}}</span>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderCityName',
  props: {
    backgroundData: String // 背景值
  },
  data () {
    return {
      msg: '基础底部组件', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      // --------------------------------本页操作数据--------------------------------
      cityName: {} // 城市名
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
    this.cityName = this.$store.state.nowShowCityMsg.name
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
    // 添加城市
    addCity (event) {
      event.preventDefault()
      this.$router.push('/ManageCity')
    }
  }
}
</script>

<style scoped lang="less">
  #HeaderCityName {
    padding: 12px 14px;
    color: #fff;
    .headerBox{
      .headerLeft{
        display: inline-block;
        .addCityTitle{
          font-size: 1.75em;
        }
        .cityName{
          font-size: 1.25em;
        }
        .locationTitle>i{
          font-size: 1.5em;
        }
      }
      .headerRight{
        float: right;
        .share>i{
          font-size: 1.4em;
        }
      }
    }
  }
</style>
