<!-- 2019/3/30 -->
<template>
  <div id="Home"
       @touchstart="startSwitchOverCity"
       @touchmove="nextOrPreviousCity"
       @touchend="executeSwitchOverCity"
       v-bind:style="{backgroundImage: 'url(' + require('../assets/image/weatherBackgroundImg/' + bgImage + '.jpg') + ')'}">
    <p class="AppAllExplain">{{msg}}</p>
    <header class="header">
      <div class="headerLeft" @touchend="addCity">
        <span class="addCityTitle">+</span>
        <span class="cityName">{{cityName? cityName : $store.state.nowCityMsg.name}}</span>
        <span class="locationTitle" v-if="$store.state.nowCityMsg.name.indexOf(cityName) !== -1"><i class="iconfont icon-dingwei"></i></span>
      </div>
      <div class="headerRight">
        <span class="share"><i class="iconfont icon-fenxiang"></i></span> <!-- icon-lingdang -->
      </div>
    </header>
    <div class="body">
      <mu-flex class="demo-linear-progress bodyUp">
        <mu-linear-progress :value="myCity.indexOf(cityName) === -1 ? myCity.indexOf(cityName) + 2 : myCity.indexOf(cityName) + 1" mode="determinate" color="white" :min="0" :max="myCity.length"></mu-linear-progress>
      </mu-flex>
      <div class="bodyTop"> <!-- 控制有无 v-if -->
        <span>左右滑动可更换用户先前使用过的城市</span>
      </div>
      <div class="bodyHead">
        <div class="headLeft">
          <span class="temperature" v-if="cityWeather.data[0].tem">{{cityWeather.data[0].tem.substring(0, cityWeather.data[0].tem.length -1)}}°</span>
          <span class="weatherStatus">{{cityWeather.data[0].wea}}</span>
          <p>{{cityWeather.data[0].tem2}}~{{cityWeather.data[0].tem1}}</p>
        </div>
        <div class="headRight">
          <div class="rightBox">
            <span class="rightTitle"
                  :class="{
                  'greenTitle': cityWeather.data[0].air_level === '优',
                  'yellowTitle': (cityWeather.data[0].air_level === '良' || cityWeather.data[0].air_level === '轻度'),
                  'redTitle': (cityWeather.data[0].air_level === '差' || cityWeather.data[0].air_level === '严重' || cityWeather.data[0].air_level === '中度')}"></span>
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
      cityWeather: { // 城市天气
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
      userMsg: {
        userName: '',
        myCity: []
      },
      // --------------------------------本页操作数据--------------------------------
      showMoreWeatherMsg: false, /* 是否展示较详细的天气信息 */
      nowCity: '', /* 当前定位城市 */
      cityName: '', /* 选择城市名 */
      touchInfo: { /* 滑动信息 */
        initial: false, // 是否初始化
        startX: 0, // 初始X
        startY: 0 // 初始Y
        // moveDistanceX: 0 // 移动距离X
      },
      myCity: [], // 用户储存城市
      bgImage: 'sunshineDaytime' // 背景图（天气）
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
    // console.group('beforeCreate 创建前状态===============》')
  },
  created () {
    // console.group('created 创建完毕状态===============》')
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
    this.userMsg = this.$store.state.userMsg
    this.myCity = this.userMsg.myCity
    this.mainIndex(this.$store.state.nowShowCityMsg.name)
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
    /*
    * 入口函数
    * */
    mainIndex (cityName) {
      console.log(cityName)
      if (cityName) {
        this.cityName = cityName
        cityName = this.cutCityText(cityName)// 剔除‘市’
        if (this.myCity.indexOf(cityName) === -1) { // 不存在myCity中
          this.myCity.push(cityName) // 将当前城市存入myCity中
          // 更新数据库中该字段
          this.updateUserMsg(this.userMsg._id, {myCity: this.myCity})
        }
        let cityMsg = {
          version: 'v1', // 必填（版本）
          cityid: '', // 城市ID（选填）
          city: cityName, // 城市名称（选填）
          ip: '', // 使用者IP（选填）
          callback: '' // jsonp参数（选填）
        }
        this.sendWeatherRequest(cityMsg).then(res => {
          if (res.status === 200) {
            this.cityWeather = res.data
            console.log(this.cityWeather)
            switch (res.data.data[0].wea) {
              case '晴':
                this.bgImage = 'sunshineDaytime'
                break
              case '多云':
              case '多云转晴':
                this.bgImage = 'cloudyDaytime'
                break
              default: this.bgImage = 'overcastDaytime'
            }
            // 储存当地出行及温度信息
            this.saveNowCityTripRecommendation(
              res.data.city,
              res.data.data[0].wea,
              res.data.data[0].tem,
              res.data.data[0].tem1,
              res.data.data[0].tem2,
              res.data.data[0].index,
              res.data.data[0].date
            )
          }
        })
      } else { // 没有输入城市
        this.getCurrentCity() // 获取当前位置信息，并获取该位置天气
      }
    },
    // ----------------------------------公用函数----------------------------------
    /*
     * 获取（数据库数据）函数
     * */

    // 存储函数
    // 储存当前城市推荐出行信息
    saveNowCityTripRecommendation (cityName, weather, tem, tem1, tem2, index, date) {
      let recommendationData = {
        cityName: cityName,
        wea: weather,
        tem: tem,
        tem1: tem1,
        tem2: tem2,
        index: index,
        date: date
      }
      console.log('储存当前城市推荐出行信息', recommendationData)
      this.$sendRequest.RTSPost('/rm_cityTripRecommendation/add_recommendation', {recommendationData: recommendationData}).then(res => {
        console.log(res)
      })
    },

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
        vm.$store.commit('updateNowCityMsg', locationMsg) // locationMsg 存入vuex中（更新当前位置）
        vm.$store.commit('updateNowShowCityMsgName', locationMsg.name) // locationMsg 存入vuex中（更新当前位置）
        locationMsg.name = this.cutCityText(locationMsg.name) // 剔除‘市’
        if (vm.myCity.indexOf(locationMsg.name) === -1) { // 不存在于myCity中
          vm.myCity.push(locationMsg.name) // 当前定位储存到用户城市名数组中
          this.updateUserMsg(vm.userMsg._id, {myCity: vm.myCity})
        }
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
            // 储存当地出行及温度信息
            this.saveNowCityTripRecommendation(
              res.data.city,
              res.data.data[0].wea,
              res.data.data[0].tem,
              res.data.data[0].tem1,
              res.data.data[0].tem2,
              res.data.data[0].index,
              res.data.data[0].date
            )
          }
        })
      })
    },

    // 发送天气API
    sendWeatherRequest (parameter) {
      parameter.city = this.cutCityText(parameter.city) // 剔除‘市’
      var vm = this
      return vm.$axios.get('https://www.tianqiapi.com/api/?' +
        'version=' + parameter.version +
        '&cityid=' + parameter.cityid +
        '&city=' + parameter.city +
        '&ip=' + parameter.ip +
        '&callback=' + parameter.callback
      )
    },

    // 修改用户信息
    updateUserMsg (id, userData) {
      console.log('修改用户信息', id, userData)
      this.$sendRequest.RTSPost('/rm_users/user_update', {id: id, user: userData}).then(res => {
        console.log(res)
      })
    },

    // 去除‘市’
    cutCityText (cityName) {
      if (cityName.indexOf('市') > -1) {
        cityName = cityName.substring(0, cityName.length - 1)
      }
      return cityName
    },
    // ----------------------------------本页函数----------------------------------
    // 添加城市
    addCity (event) {
      event.preventDefault()
      this.$router.push('/ManageCity')
    },

    // 开始滑动（准备切换城市）
    startSwitchOverCity (e) {
      // console.log('开始切换城市')
      // 记录初始位置
      this.touchInfo.startX = e.touches[0].pageX
      this.touchInfo.startY = e.touches[0].pageY
    },

    // 左右滑动更改固定城市（滑动中）
    nextOrPreviousCity (e) {
      this.touchInfo.initial = true // 初始化移动数据
      if (this.touchInfo.initial) {
        var moveDistanceX = e.touches[0].pageX - this.touchInfo.startX
        var moveDistanceY = e.touches[0].pageY - this.touchInfo.startY
        if (Math.abs(moveDistanceX) > Math.abs(moveDistanceY)) {
          // 横向移动
          this.touchInfo.moveDistanceX = moveDistanceX // 更新外部移动距离X
        } else {
          // 纵向移动
          if (this.touchInfo.initial) {
            this.touchInfo.initial = false
          }
        }
      }
    },

    // 执行切换城市操作
    executeSwitchOverCity () {
      var vm = this
      if (this.touchInfo.initial) {
        var direction = this.touchInfo.moveDistanceX
        var nowCityName = this.cityName ? this.cityName : this.$store.state.nowCityMsg.name
        nowCityName = this.cutCityText(nowCityName) // 剔除‘市’
        document.documentElement.scrollTop = 0 // 切换城市前先返回定
        if (direction > 0) {
          // console.log('向右滑动，展示左侧')
          if (this.myCity.indexOf(nowCityName) === 0) {
            this.$toast.message('左侧没了！')
          } else {
            vm.$store.commit('updateNowShowCityMsgName', vm.myCity[vm.myCity.indexOf(nowCityName) - 1]) // vuex中更新当前展示城市
            vm.mainIndex(vm.myCity[vm.myCity.indexOf(nowCityName) - 1])
          }
        } else if (direction < 0) {
          // console.log('向左滑动，展示右侧')
          if (this.myCity.indexOf(nowCityName) === this.myCity.length - 1) {
            this.$toast.message('右侧没了！')
          } else {
            vm.$store.commit('updateNowShowCityMsgName', vm.myCity[vm.myCity.indexOf(nowCityName) + 1]) // vuex中更新当前展示城市
            vm.mainIndex(vm.myCity[vm.myCity.indexOf(nowCityName) + 1])
          }
        }
        delete this.touchInfo.moveDistanceX
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import '../assets/less/main';

  #Home{
    padding: 12px 14px;
    font-size: 16px;
    .background-size(100%);
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
      position: relative;
      .bodyUp{
        width: 20%;
        position: absolute;
        top: -0.75em;
      }
      .bodyTop{
        padding: 0.75em 10%;
        >span{
          display: inline-block;
          border-top: 1px solid wheat;
          border-bottom: 1px solid wheat;
        }
      }
      .bodyHead{
        position: relative;
        .headLeft{
          .temperature{
            font-size: 6em;
          }
          .weatherStatus{
            font-size: 1.3em;
          }
        }
        .headRight{
          position: absolute;
          right: -0.875em;
          top: 0.7em;
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
              background: #fff42f;
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
