<!-- 2019/4/16 -->
<template>
  <div id="NextWeek">
    <p class="AppAllExplain">{{msg}}</p>
    <header class="header">
      <div class="headerLeft" @touchend="addCity">
        <span class="addCityTitle">+</span>
        <span class="cityName">{{cityName ? cityName : $store.state.nowCityMsg.name}}</span>
        <span class="locationTitle" v-if="$store.state.nowCityMsg.name.indexOf($store.state.nowShowCityMsg.name) !== -1"><i class="iconfont icon-dingwei"></i></span>
      </div>
      <div class="headerRight">
        <span class="share"><i class="iconfont icon-fenxiang"></i></span> <!-- icon-lingdang -->
      </div>
    </header>
    <div class="body">
      <mu-container>
        <mu-expansion-panel :style="{'backgroundColor': (index%2 === 0 ? '#86c6cf' : '#c1d8a5')}" v-for="(date, index) in cityNextWeekWeather.data" :key="index">
          <div slot="header">
            {{date.day}}<span class="headerTemperature">{{date.tem1}}~{{date.tem2}}</span><span class="headerWea">{{date.wea | textOmit(3)}}</span>
          </div>
          <ul class="dateBox">
            <li class="dateText">
              {{date.date}}
              <span class="dateWeek">{{date.week}}</span>
            </li>
            <li class="dateWeather">
              <span class="weatherTemperature">{{date.tem}}</span>
              <span class="weatherStatus">{{date.wea}}</span>
              <span class="temperature">{{date.tem1}}~{{date.tem2}}</span>
              <div class="dateWin">
                {{date.win[0]}}
                <span v-if="date.win.length === 2">/{{date.win[1]}}</span>
                &nbsp;&nbsp;{{date.win_speed}}
              </div>
            </li>
            <li class="dateHours">
              <mu-container>
                <mu-expansion-panel>
                  <div slot="header">小时预报</div>
                  <ul class="hoursWeatherReport">
                    <li class="eachHour" v-for="(hour, hourIndex) in date.hours" :key="hourIndex">
                      <div>{{hour.day}}</div>
                      <div>{{hour.tem}}</div>
                      <div>{{hour.wea}}</div>
                      <div>{{hour.win}}</div>
                      <div>{{hour.win_speed}}</div>
                    </li>
                    <li style="clear: both;"></li>
                  </ul>
                </mu-expansion-panel>
              </mu-container>
            </li>
            <li class="dateRecommend" v-for="(recommend, recommendIndex) in date.index" :key="recommendIndex">
              <div class="recommendTitle" v-if="recommend.level !== null">
                {{recommend.title}}：
                <span class="recommendLevel">{{recommend.level}}</span>
              </div>
              <div>{{recommend.desc}}</div>
            </li>
          </ul>
        </mu-expansion-panel>
      </mu-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextWeek',
  data () {
    return {
      msg: '七日天气预报', // 该文件的解释
      // ----------------------------------系统数据----------------------------------
      cityNextWeekWeather: { // 城市天气
        data: [
          {
            air: '',
            air_level: '',
            air_tips: '',
            alarm: '',
            date: '',
            day: '',
            hours: '',
            humidity: '',
            index: '',
            tem: '',
            tem1: '',
            tem2: '',
            wea: '',
            wea_img: '',
            week: '',
            win: '',
            win_speed: ''
          },
          {
            date: '',
            day: '',
            hours: '',
            index: '',
            tem: '',
            tem1: '',
            tem2: '',
            wea: '',
            wea_img: '',
            week: '',
            win: '',
            win_speed: ''
          }
        ]
      },
      // --------------------------------本页操作数据--------------------------------
      cityName: '', // 当前城市
      myCity: [ /* 用户储存城市 */
        '北京', '哈尔滨', '长春', '沈阳', '武汉', '洛阳', '大连', '厦门', '天津', '上海', '广州'
      ]
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
    this.cityName = this.$store.state.nowShowCityMsg.name !== '' ? this.$store.state.nowShowCityMsg.name : this.$store.state.nowCityMsg.name
    this.mainIndex(this.cityName)
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
        var cityMsg = {
          version: 'v1', // 必填（版本）
          cityid: '', // 城市ID（选填）
          city: cityName, // 城市名称（选填）
          ip: '', // 使用者IP（选填）
          callback: '' // jsonp参数（选填）
        }
        this.sendWeatherRequest(cityMsg).then(res => {
          if (res.status === 200) {
            this.cityNextWeekWeather = res.data
          }
        })
      } else { // 没有输入城市
        this.getCurrentCity() // 获取当前位置信息，并获取该位置天气
      }
    },
    // ----------------------------------公用函数----------------------------------
    /*
    * 获取函数
    * */
    /*
    * 函数
    * */
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

    // 获取当前使用者位置信息（通过使用者IP）——>并获取当前位置天气
    getCurrentCity () {
      var vm = this
      this.$getCurrentLocation.getCurrentLocationMsg().then((locationMsg) => {
        vm.$store.commit('updateNowCityMsg', locationMsg) // locationMsg 存入vuex中（更新当前位置）
        var existCity = false // 当前城市是否存在
        vm.myCity.forEach(e => {
          if (e.indexOf(locationMsg.name) !== -1 || locationMsg.name.indexOf(e) !== -1) {
            existCity = true // 当前城市已存在
          }
        })
        if (!existCity) {
          vm.myCity.push(locationMsg.name) // 当前定位储存到用户城市名数组中
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
            this.cityNextWeekWeather = res.data
            console.log(this.cityNextWeekWeather)
          }
        })
      })
    },
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
  @import '../assets/less/main';

  #NextWeek {
    padding: 12px 14px;
    font-size: 16px;
    .background-size(100%);
    color: #fff;
    background: url("../assets/image/bg/nextWeekBackground.jpg");
    min-height: 812px;
    margin-bottom: 15px;
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
      padding-top: 20px;
      font-size: 1em;
      .headerTemperature{
        padding: 0 6px;
        color: #fff;
      }
      .headerWea{
        display: inline-block;
        width: 4.375em;
        text-align: center;
      }
      .dateBox{
        >li{
          padding: 0.5em 0;
          border-bottom: 1px solid #173db6;
          &.dateText{
            .dateWeek{
              float: right;
            }
          }
          &.dateWeather{
            text-align: center;
            color: #fff;
            .weatherTemperature{
              font-size: 3em;
            }
            .weatherStatus{
              font-size: 1.5em;
              padding: 2px;
            }
            .temperature{
              font-size: 1em;
            }
            .dateWin{
              color: #333;
              text-align: left;
            }
          }
          &.dateHours{
            border: none;
            .hoursWeatherReport{
              .eachHour{
                float: left;
                width: 25%;
                text-align: center;
              }
            }
          }
          &.dateRecommend{
            .recommendTitle{
              .recommendLevel{
                float: right;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
