<!-- 2019/3/30 -->
<template>
  <div id="Home" @touchmove="nextAndPreviousCity">
    <p class="AppAllExplain">{{msg}}</p>
    <header class="header">
      <div class="headerLeft" @touchstart="addCity()">
        <span class="addCityTitle">+</span>
        <span class="cityName">{{cityName? cityName : $store.state.nowCityMsg.name}}</span>
        <span class="locationTitle" v-if="$store.state.nowCityMsg.name.indexOf(cityName) !== -1"><i class="iconfont icon-dingwei"></i></span>
      </div>
      <div class="headerRight">
        <span class="share"><i class="iconfont icon-fenxiang"></i></span>
      </div>
    </header>
    <div class="body">
      <div class="bodyHead">
        <div class="headLeft">
          <span class="temperature" v-if="cityWeather.data[0].tem">{{cityWeather.data[0].tem.substring(0, cityWeather.data[0].tem.length -1)}}°</span>
          <span class="weatherStatus">{{cityWeather.data[0].wea}}</span>
          <p>{{cityWeather.data[0].tem2}}~{{cityWeather.data[0].tem1}}</p>
        </div>
        <div class="headRight">
          <div class="rightBox">
            <span class="rightTitle" :class="{'greenTitle': cityWeather.data[0].air_level === '优', 'yellowTitle': cityWeather.data[0].air_level === '良', 'redTitle': cityWeather.data[0].air_level === '差'}"></span>
            <span class="airStatus">{{cityWeather.data[0].air_level}}</span>
            <span class="airScore">{{cityWeather.data[0].air}}</span>
          </div>
          <div class="rightBox" v-if="cityWeather.data[0].alarm.alarm_type !== ''">
            <span class="rightTitle" :class="transitionWarning(cityWeather.data[0].alarm.alarm_level)"></span>
            <span class="airStatus">{{cityWeather.data[0].alarm.alarm_type}}</span>
            <span class="airScore">{{cityWeather.data[0].alarm_level}}</span>
          </div>
        </div>
      </div>
      <ul class="bodyMiddle">
        <li class="titleLine">
          <div class="titleBox">
            <span><i class="iconfont icon-fengsu"></i></span>
            <span>风速&nbsp;{{cityWeather.data[0].win_speed}}</span>
          </div>
          <div class="titleBox">
            <span><i class="iconfont icon-shidu"></i></span>
            <span>相对湿度&nbsp;{{cityWeather.data[0].humidity}}</span>
          </div>
        </li>
        <li class="titleLine">
          <span class="airTips">{{cityWeather.data[0].air_tips}}</span>
        </li>
        <li class="titleLine" v-if="showMoreWeatherMsg">
          <ul class="lineBox">
            <li class="hourBox" v-for="(hour, index) in cityWeather.data[0].hours" :key="index">
              <span>{{hour.day}}</span>
              <span>{{hour.tem}}</span>
              <span>{{hour.wea}}</span>
              <span>{{hour.win}}</span>
              <span>{{hour.win_speed}}</span>
            </li>
          </ul>
        </li>
        <li class="moreTitle" @touchstart="showMoreWeatherMsg = !showMoreWeatherMsg">
          <span><i class="iconfont" :class="{'icon-arrow-up': showMoreWeatherMsg === true, 'icon-arrow-down': showMoreWeatherMsg === false}"></i></span>
        </li>
      </ul>
      <div class="bodyFoot">
        <div class="bodyFootBox">
          <p><span class="todayTitle">今天</span><span class="bodyFootBoxRight">{{cityWeather.data[0].wea}}</span></p>
          <p><span>{{cityWeather.data[0].tem2}}/{{cityWeather.data[0].tem1}}</span><span class="bodyFootBoxRight"><span class="airLevelTitle">{{cityWeather.data[0].air_level}}</span></span></p>
        </div>
        <span class="centerTitle"></span>
        <div class="bodyFootBox">
          <p><span class="todayTitle">明天</span><span class="bodyFootBoxRight">{{cityWeather.data[1].wea}}</span></p>
          <p><span>{{cityWeather.data[1].tem2}}/{{cityWeather.data[1].tem1}}</span><span class="bodyFootBoxRight"><span class="airLevelTitle">{{cityWeather.data[0].air_level}}</span></span></p>
        </div>
      </div>
    </div>
    <ul class="footer">
      <li class="msgLine">
        <span>风向（早/晚）：</span><span>{{cityWeather.data[0].win[0]}}</span><span v-if="cityWeather.data[0].win.length === 2">/{{cityWeather.data[0].win[1]}}</span>
      </li>
      <li class="msgLine">
        <span>{{cityWeather.data[0].week}}</span>
      </li>
      <li class="msgLine" v-for="(desc, index) in cityWeather.data[0].index" :key="index">
        <span>{{desc.desc}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: '主页页面', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      cityWeather: { /* 城市天气 */
        data: [ /* 七天天气数据 */
          {
            air: 0,
            air_level: '',
            air_tips: '',
            alarm: {},
            date: '',
            day: '',
            hours: [
              {
                day: '',
                tem: '',
                wea: '',
                win: '',
                win_speed: ''
              }
            ],
            humidity: 0,
            index: [],
            tem: '',
            tem1: '',
            tem2: '',
            wea: '',
            wea_img: '',
            week: '',
            win: [],
            win_speed: ''
          },
          {
            wea: ''
          }
        ]
      },
      // --------------------------------本页操作数据--------------------------------
      showMoreWeatherMsg: false, /* 是否展示较详细的天气信息 */
      nowCity: '', /* 当前定位城市 */
      cityName: '', /* 选择城市名 */
      touchInfo: {} /* 页面滑动信息 */
    }
  },
  // 计算属性
  computed: {
    transitionWarning () { /* 转换预警 */
      return function (color) {
        var value = ''
        switch (color) {
          case '蓝色':
            value = 'blueWarning'
            break
          case '黄色':
            value = 'yellowWarning'
            break
          case '橙色':
            value = 'orangeWarning'
            break
          case '红色':
            value = 'redWarning'
            break
          default:
            value = false
        }
        return value
      }
    }
  },
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

    if (this.$route.query.city) {
      this.cityName = this.$route.query.city
      var cityMsg = {
        version: 'v1', // 必填（版本）
        cityid: '', // 城市ID（选填）
        city: this.$route.query.city, // 城市名称（选填）
        ip: '', // 使用者IP（选填）
        callback: '' // jsonp参数（选填）
      }
      this.sendWeatherRequest(cityMsg).then(res => {
        if (res.status === 200) {
          this.cityWeather = res.data
          console.log(this.cityWeather)
        }
      })
    } else {
      this.getCurrentCity() // 获取当前位置信息，并获取该位置天气
    }
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
        // locationMsg 存入vuex中（更新当前位置）
        console.log(locationMsg)
        this.$store.commit('updateNowCityMsg', locationMsg)
        var currentLocation = {
          version: 'v1', // 必填（版本）
          cityid: '', // 城市ID（选填）
          city: locationMsg.name, // 城市名称（选填）
          ip: '', // 使用者IP（选填）
          callback: '' // jsonp参数（选填）
        }
        vm.sendWeatherRequest(currentLocation).then(res => {
          if (res.status === 200) {
            this.cityWeather = res.data
            console.log(this.cityWeather)
          }
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
    },

    // 左右滑动更改固定城市
    nextAndPreviousCity () {
      console.log('滑动修改城市')

    },
    middleTouchStart(e) {
      // touch开始时,将touchInfo对象设置为已初始化状态
      this.touchInfo.initiated = true
      // 用来判断是否是一次移动
      this.touchInfo.moved = false
      const touch = e.touches[0]
      // 记录touch位置的横坐标与纵坐标
      this.touchInfo.startX = touch.pageX
      this.touchInfo.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.touchInfo.initiated) {
        return
      }
      const touch = e.touches[0]
      // 横坐标与纵坐标的偏移
      const deltaX = touch.pageX - this.touchInfo.startX
      const deltaY = touch.pageY - this.touchInfo.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) { // 纵向滑动
        return
      }
      if (!this.touchInfo.moved) {
        this.touchInfo.moved = true
      }
      // 判断当前显示的是cd还是歌词,如果是cd,则当前左偏移值为0,否则偏移值为-window.innerWidth
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      // 求偏移值
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      // 求偏移值占可视区域的百分比,用于判断是否应该切换显示状态
      this.touchInfo.percent = Math.abs(offsetWidth / window.innerWidth)
      // 移动时歌词模块的偏移效果
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style.transitionDuration = 0
      // 移动时CD模块的淡出效果
      this.$refs.cd.style.opacity = 1 - this.touchInfo.percent
      this.$refs.cd.style.transitionDuration = 0
    },
    middleTouchEnd() {
      if (!this.touchInfo.moved) {
        return
      }
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        // 移动百分比大于屏幕一半,则切换显示状态
        if (this.touchInfo.percent > 0.5) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touchInfo.percent < 0.5) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      // 最终状态的设置
      // 动画时间
      const time = 300
      // touch完毕后歌词模块应该放置的位置
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style.transitionDuration = `${time}ms`
      // touch完毕后CD模块的透明度
      this.$refs.cd.style.opacity = opacity
      this.$refs.cd.style.transitionDuration = `${time}ms`
      // 一次touch完成后,重置touchInfo对象尚未初始化状态
      this.touchInfo.initiated = false
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
            }
            .greenTitle{
              background: #73ef80;
            }
            .yellowTitle{
              background: #ee9900;
            }
            .redTitle{
              background: #e33;
            }
            .blueWarning{
              background: #009bff;
            }
            .yellowWarning{
              background: greenyellow;
            }
            .orangeWarning{
              background: darkorange;
            }
            .redWarning{
              background: #c33;
            }
            .airStatus{
              padding: 0 6px;
            }
          }
        }
      }
      .bodyMiddle{
        .titleLine{
          margin-bottom: 1.2em;
          .titleBox{
            display: inline-block;
            width: 49.3%;
            /*text-align: center;*/
          }
          .airTips{
            font-size: 1.1em;
          }
          .lineBox{
            .hourBox{
              display: inline-block;
              width: 25%;
              text-align: center;
              >span{
                display: block;
                padding: 4px 0;
              }
            }
          }
        }
        .moreTitle{
          background: rgba(255, 255, 255, 0.3);
          text-align: center;
          margin-top: 12px;
        }
      }
      .bodyFoot{
        .bodyFootBox{
          display: inline-block;
          width: 46%;
          padding: 0 2px;
          >p{
            padding: 6px 0 8px 0;
            >span{
              display: inline-block;
              &.todayTitle{
                width: 2em;
              }
              &.bodyFootBoxRight{
                float: right;
                >.airLevelTitle{
                  background: #5d9ea3;
                  padding: 2px 6px;
                  .border_radius(3px);
                }
              }
            }
          }
        }
        .centerTitle{
          display: inline-block;
          width: 1px;
          height: 46px;
          background: wheat;
        }
      }
    }
    .footer{
      .msgLine{
        padding-top: 2em;
        font-size: 1.1em;
      }
    }
  }
</style>
