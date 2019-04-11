<!-- 2019/3/30 -->
<template>
  <div id="Home">
    <p class="AppAllExplain">{{msg}}</p>
    <header class="header">
      <div class="headerLeft" @click="addCity()">
        <span class="addCityTitle">+</span>
        <span class="cityName">北京市</span>
        <span class="locationTitle"><i class="iconfont icon-dingwei"></i></span>
      </div>
      <div class="headerRight">
        <span class="share"><i class="iconfont icon-fenxiang"></i></span>
      </div>
    </header>
    <div class="body">
      <div class="bodyHead">
        <div class="headLeft">
          <span class="temperature">15°</span>
          <span class="weatherStatus">晴</span>
        </div>
        <div class="headRight">
          <div class="rightBox">
            <span class="rightTitle"></span>
            <span class="airStatus">良</span>
            <span class="airScore">60</span>
          </div>
          <div class="rightBox">
            <span class="rightTitle"></span>
            <span class="airStatus">良</span>
            <span class="airScore">60</span>
          </div>
        </div>
      </div>
      <ul class="bodyMiddle">
        <li class="titleLine">
          <div class="titleBox">
            <span><i class="iconfont icon-fengsu"></i></span>
            <span>南风2级</span>
          </div>
          <div class="titleBox">
            <span><i class="iconfont icon-shidu"></i></span>
            <span>相对湿度&nbsp;21</span>
          </div>
        </li>
        <li class="titleLine" v-if="showMoreWeatherMsg">
          <div class="titleBox">
            <span><i class="iconfont icon-fengsu"></i></span>
            <span>南风2级</span>
          </div>
          <div class="titleBox">
            <span><i class="iconfont icon-shidu"></i></span>
            <span>相对湿度&nbsp;21</span>
          </div>
        </li>
        <li class="titleLine" v-if="showMoreWeatherMsg">
          <div class="titleBox">
            <span><i class="iconfont icon-fengsu"></i></span>
            <span>南风2级</span>
          </div>
          <div class="titleBox">
            <span><i class="iconfont icon-shidu"></i></span>
            <span>相对湿度&nbsp;21</span>
          </div>
        </li>
        <li class="moreTitle" @click="showMoreWeatherMsg = !showMoreWeatherMsg">
          <span><i class="iconfont" :class="{'icon-arrow-up': showMoreWeatherMsg === true, 'icon-arrow-down': showMoreWeatherMsg === false}"></i></span>
        </li>
      </ul>
      <div class="bodyFoot"></div>
    </div>
    <footer>

    </footer>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: '主页页面', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      // --------------------------------本页操作数据--------------------------------
      showMoreWeatherMsg: false, /* 是否展示较详细的天气信息 */
      cityName: '' /* 城市名 */
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
    // 获取当前经纬度坐标（浏览器自带功能） ------------------------------------------- 好像因为Google Chrome被墙了
    // this.getPositionBrowser().then(result => {
    //   // 返回结果示例：
    //   // {latitude: 30.318030999999998, longitude: 120.05561639999999}
    //   // 一般小数点后只取六位，所以用以下代码搞定
    //   let queryData = {
    //     longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
    //     latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
    //     channelType: '00'
    //   }
    //   console.log('获取地理位置', queryData)
    //   // 以下放置获取坐标后你要执行的代码:
    //   // ...
    // }).catch(err => {
    //   console.log('获取错误', err)
    // })

    this.getCurrentCity() // 获取当前位置信息

    var cityMsg = {
      version: 'v1', // 必填（版本）
      cityid: '', // 城市ID（选填）
      city: this.$route.query.city, // 城市名称（选填）
      ip: '', // 使用者IP（选填）
      callback: '' // jsonp参数（选填）
    }
    this.sendWeatherRequest(cityMsg).then(res => {
      console.log('城市天气', res)
    })
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
     * 获取（数据库数据）函数
     * */

    /*
     * 函数
     * */
    // 获取当前用户定位chrome目前不能用（浏览器自带定位）
    // getPositionBrowser () {
    //   return new Promise((resolve, reject) => {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function (position) { // -------- 好像因为Google Chrome被墙了
    //         console.log('获取地理位置')
    //         let latitude = position.coords.latitude
    //         let longitude = position.coords.longitude
    //         let data = {
    //           latitude: latitude,
    //           longitude: longitude
    //         }
    //         console.log(data)
    //         resolve(data)
    //       }, function () {
    //         reject(arguments)
    //       })
    //     } else {
    //       console.log('获取地理位置错误')
    //       reject(new Error('你的浏览器不支持当前地理位置信息获取'))
    //     }
    //   })
    // },

    // 获取当前使用者位置信息（通过使用者IP）——>并获取当前位置天气
    getCurrentCity () {
      var vm = this
      this.$getCurrentLocation.getCurrentLocationMsg().then((locationMsg) => {
        console.log('当前城市', locationMsg)
        // locationMsg 存入vuex中（更新当前位置）
        var currentLocation = {
          version: 'v1', // 必填（版本）
          cityid: '', // 城市ID（选填）
          city: locationMsg.name, // 城市名称（选填）
          ip: '', // 使用者IP（选填）
          callback: '' // jsonp参数（选填）
        }
        vm.sendWeatherRequest(currentLocation).then(res => {
          console.log('当前城市天气', res)
        })
      })
    },

    // 发送天气API
    sendWeatherRequest (parameter) {
      if (parameter.city.indexOf('市') > -1) { // 剔除‘市’
        parameter.city = parameter.city.substring(0, parameter.city.length - 1)
      }
      var vm = this
      return vm.$axios.get('https://www.tianqiapi.com/api/?' +
        'version=' + parameter.version +
        '&cityid=' + parameter.cityid +
        '&city=' + parameter.city +
        '&ip=' + parameter.ip +
        '&callback=' + parameter.callback
      )
    },
    // ----------------------------------本页函数----------------------------------
    // 添加城市
    addCity () {
      this.$router.push('/ManageCity')
    }
  }
}
</script>

<style scoped lang="less">
  @import '../assets/less/main';

  #Home{
    padding: 12px 14px;
    font-size: 16px;
    background: url("../assets/image/backgroundImg/sunshineDaytime.jpg") no-repeat;
    .background-size(100%);
    position: relative;
    color: #fff;
    .header{
      border-bottom: 1px solid #f3f4e9;
      padding-bottom: 10px;
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
    .body{
      padding-top: 3em;
      .bodyHead{
        .headLeft{
          .temperature{
            font-size: 6em;
          }
          .weatherStatus{
            font-size: 1.5em;
          }
        }
        .headRight{
          position: absolute;
          right: 0;
          top: 7.7em;
          .rightBox{
            padding: 4px 8px;
            margin-bottom: 6px;
            background: rgba(255, 255, 255, 0.23);
            .align-items;
            justify-content: left;/*flex布局后文字水平居中*/
            .rightTitle{
              display: inline-block;
              width: 5px;
              height: 20px;
              background: #73ef80;
            }
            .airStatus{
              padding: 0 6px;
            }
          }
        }
      }
      .bodyMiddle{
        .titleLine{
          margin: 12px 0;
          .titleBox{
            display: inline-block;
            width: 49.3%;
            /*text-align: center;*/
          }
        }
        .moreTitle{
          background: rgba(255, 255, 255, 0.3);
          text-align: center;
          margin-top: 12px;
        }
      }
      .bodyFoot{}
    }
  }
</style>
