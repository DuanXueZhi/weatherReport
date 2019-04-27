<!-- 2019/4/24 -->
<template>
  <div id="Trip">
    <p class="AppAllExplain">{{msg}}</p>
    <!--布局-->
    <div v-if="false">
      <div>
        <ul>
          <li>
            <p>4.20</p>
            <p>tem1~tem2/tem</p>
            <p>穿衣、洗车、空气污染扩散</p>
          </li>
          <li>
            <p>4.21</p>
            <p>tem1~tem2/tem</p>
            <p>穿衣、洗车、空气污染扩散</p>
          </li>
          <li>
            <div>前七天平均温度折线图</div>
          </li>
        </ul>
      </div>
      <div>
        <p>今日温度、天气、预警</p>
        <p>今日出行推荐【直接通过城市名连接api获取到（index[0]）】</p>
        <p>今日小时温度图表</p>
      </div>
      <div>
        <ul>
          <li>
            <div>展开的图表（包括今天）后七天温度的折线图【直接在api中获取数据传入Echart】</div>
          </li>
          <li>
            <p>4.23</p>
            <p>tem1~tem2/tem</p>
            <p>穿衣、洗车、空气污染扩散</p>
          </li>
          <li>
            <p>4.23</p>
            <p>tem1~tem2/tem</p>
            <p>穿衣、洗车、空气污染扩散</p>
          </li>
        </ul>
      </div>
      <div><button @click="getCityTripRecommendationMsg('上海')">查询</button></div>
    </div>
    <header-city-name backgroundData="#1e8bf2"></header-city-name>
    <div class="body">
      <mu-container>
        <mu-tabs :value.sync="active3" center color="teal">
          <mu-tab>
            <mu-icon value="arrow_back"></mu-icon>
            上周
          </mu-tab>
          <mu-tab>
            <mu-icon value="flight"></mu-icon>
            今日
          </mu-tab>
          <mu-tab>
            <mu-icon value="arrow_forward"></mu-icon>
            下周
          </mu-tab>
        </mu-tabs>
        <div class="demo-text" v-if="active3 === 0">
          <mu-expansion-panel v-for="(cityTripMsg, index) in previousNowCityMsg" :key="index" v-if="index !== previousNowCityMsg.length - 1">
            <div slot="header">
              {{index}}
              <span>{{cityTripMsg.date | textCutOut(10)}}</span>
              <span class="cityWeatherStatus">小雨转晴{{cityTripMsg.wea}}</span>
              <span>{{cityTripMsg.tem}}</span>
            </div>
            <ul class="tripRecommendBox">
              <li class="dateRecommend" v-for="(recommend, recommendIndex) in cityTripMsg.index" :key="recommendIndex">
                <div class="recommendTitle" v-if="recommend.level !== null">
                  {{recommend.title}}：
                  <span class="recommendLevel">{{recommend.level}}</span>
                </div>
                <div>{{recommend.desc}}</div>
              </li>
            </ul>
          </mu-expansion-panel>
          <div class="emptyDataShow" v-if="previousNowCityMsg.length === 0">
            <p class="emptyDataText">数据为空</p>
            <span><img :src="require('../assets/image/emptyData.png')" alt=""></span>
          </div>
        </div>
        <div class="demo-text todayNowCityMsg" v-if="active3 === 1">
          <ul class="tripRecommendBox">
            <li class="upWea">
              <span>更新时间：</span><span>{{cityNowWeather.update_time}}</span><mu-icon value="cached" class="updateIcon"></mu-icon>
              <div class="upWeaBox">
                <span class="nowTemperature">{{cityNowWeather.data[0].tem}}</span>
                <span class="nowWeatherStatus">{{cityNowWeather.data[0].wea}}</span>
              </div>
              <div>
                <span>{{cityNowWeather.data[0].tem1}}~{{cityNowWeather.data[0].tem2}}</span>
              </div>
            </li>
            <li class="dateRecommend" v-for="(recommend, recommendIndex) in cityNowWeather.data[0].index" :key="recommendIndex">
              <div class="recommendTitle" v-if="recommend.level !== null">
                {{recommend.title}}：
                <span class="recommendLevel">{{recommend.level}}</span>
              </div>
              <div>{{recommend.desc}}</div>
            </li>
          </ul>
        </div>
        <div class="demo-text" v-if="active3 === 2">
          <mu-expansion-panel v-for="(cityTripMsg, index) in cityNowWeather.data" :key="index" v-if="index !== previousNowCityMsg.length - 1">
            <div slot="header">
              {{index}}
              <span>{{cityTripMsg.date | textCutOut(10)}}</span>
              <span class="cityWeatherStatus">{{cityTripMsg.wea}}</span>
              <span>{{cityTripMsg.tem}}</span>
            </div>
            <ul class="tripRecommendBox">
              <li class="dateRecommend" v-for="(recommend, recommendIndex) in cityTripMsg.index" :key="recommendIndex">
                <div class="recommendTitle" v-if="recommend.level !== null">
                  {{recommend.title}}：
                  <span class="recommendLevel">{{recommend.level}}</span>
                </div>
                <div>{{recommend.desc}}</div>
              </li>
            </ul>
          </mu-expansion-panel>
        </div>
      </mu-container>
    </div>
  </div>
</template>

<script>
import HeaderCityName from '@/components/Base/HeaderCityName'

export default {
  name: 'Trip',
  components: {
    HeaderCityName: HeaderCityName
  },
  data () {
    return {
      msg: '出行页面', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      previousNowCityMsg: [], // 今天之前该城市出行推荐信息
      // --------------------------------本页操作数据--------------------------------
      active3: 1,
      cityName: '', // 城市名
      cityNowWeather: {} // 城市天气
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
    if (this.cityName === '') {
      this.$toast.message('城市名为空')
    } else {
      this.mainIndex(this.cityName)
    }
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
    */
    mainIndex (cityName) {
      this.getCityTripRecommendationMsg(cityName)
      let cityMsg = {
        version: 'v1', // 必填（版本）
        cityid: '', // 城市ID（选填）
        city: cityName, // 城市名称（选填）
        ip: '', // 使用者IP（选填）
        callback: '' // jsonp参数（选填）
      }
      this.sendWeatherRequest(cityMsg).then(res => {
        if (res.status === 200) {
          this.cityNowWeather = res.data
          console.log(this.cityNowWeather)
        }
      })
    },
    // ----------------------------------公用函数----------------------------------
    /*
    * 获取函数
    * */
    // 通过城市名获取城市上周出行状况
    getCityTripRecommendationMsg (cityName) {
      let searchData = {
        cityName: cityName
      }
      searchData.cityName = this.cutCityText(searchData.cityName)
      this.$sendRequest.RTSPost('/rm_cityTripRecommendation/recommendation_findList', {searchData: searchData}).then(res => {
        console.log(res)
        this.previousNowCityMsg = res.data.data
      })
    },
    /*
    * 函数
    * */
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

    // 去除‘市’
    cutCityText (cityName) {
      if (cityName.indexOf('市') > -1) {
        cityName = cityName.substring(0, cityName.length - 1)
      }
      return cityName
    }
    // ----------------------------------本页数据----------------------------------
  }
}
</script>

<style scoped lang="less">
  #Trip{
    font-size: 16px;
    .body{
      .demo-text{
        .cityWeatherStatus{ /* ‘上周’‘今天’和‘下周’列表标题公用 */
          width: 8.75em;
          display: inline-block;
          text-align: center;
        }
        .emptyDataShow{
          text-align: center;
          padding: 50px;
          .emptyDataText{
            font-size: 2em;
            font-weight: 700;
          }
        }
        &.todayNowCityMsg{
          padding: 6px 26px;
        }
        .tripRecommendBox{ /* ‘上周’‘今天’和‘下周’列表内容公用 */
          .upWea{
            .updateIcon{
              float: right;
            }
            .upWeaBox{
              padding-left: 1.5em;
              .nowTemperature{
                font-size: 3.5em;
              }
              .nowWeatherStatus{
                font-size: 1.5em;
              }
            }
          }
          .dateRecommend{
            padding: 8px 0;
            border-top: 1px solid grey;
            .recommendTitle{
              .recommendLevel{
                float: right;
              }
            }
          }
        }
      }
    }
  }
</style>
