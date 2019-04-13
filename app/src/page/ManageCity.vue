<!-- 2019/4/5 -->
<template>
  <div id="ManageCity">
    <p class="AppAllExplain">{{msg}}</p>
    <div class="top">
      <router-link to="/Native/Home" class="topLeft">
        <span class="leftTitle"><i class="iconfont icon-arrow-left"></i></span>
        <span class="leftText">天气助手</span>
      </router-link>
      <div class="topRight">
        <span class="rightBox"><i class="iconfont icon-bianji"></i></span>
      </div>
    </div>
    <header class="header">
      <input class="headerInput" type="text" v-model="inputCityName" @keyup="getCityName(inputCityName)" placeholder="输入城市名或拼音">
      <button class="headerBtn" @touchstart="getCityName(inputCityName)">确定</button>
    </header>
    <ul class="body" v-if="inputCityName === ''">
      <li class="cityList">
        <div class="cityListLeft">
          <span>{{$store.state.nowCityMsg.name}}</span>
        </div>
        <div class="cityListRight">
          <span>14℃</span>
          <span>太阳</span>
        </div>
      </li>
    </ul>
    <div class="searchingCity" v-if="inputCityName !== ''">
      <ul class="searchingCityBox">
        <li class="eachCityMsg" v-for="(cityMsg, index) in receiveCityMsg" :key="index" @touchstart="chooseCity(cityMsg.cityZh)">
          <p class="cityName">{{cityMsg.cityZh}}</p>
          <p class="cityMsg"><span>{{cityMsg.cityZh}}</span>《<span>{{cityMsg.leaderZh}}</span>《<span>{{cityMsg.provinceZh}}</span></p>
        </li>
        <li class="cityMsgEmpty" v-if="receiveCityMsg.length === 0">
          <p class="emptyCityBox"><i class="iconfont icon-dingwei1"></i></p>
          <p class="emptyCityText">未定位到该城市</p>
        </li>
      </ul>
    </div>
    <footer class="footer">
      <h3 class="footerHead">热门城市</h3>
      <div class="cityTitle" v-for="(city, index) in cityRecommend" :key="index">
        <span class="titleText" @touchstart="chooseCity(city)">{{city}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ManageCity',
  data () {
    return {
      msg: '管理城市页面', /* 该文件的解释 */
      // ----------------------------------系统数据----------------------------------
      // --------------------------------本页操作数据--------------------------------
      cityRecommend: [ /* 城市推荐 */
        '北京', '上海', '广州', '深圳',
        '天津', '武汉', '成都', '拉萨',
        '福建', '厦门', '乌鲁木齐', '哈尔滨'
      ],
      inputCityName: '', /* 用户输入的城市名 */
      receiveCityMsg: [] /* 获取到的城市信息（根据输入城市名搜索得到） */
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
    // 请求本地city数据
    getCityName (inputCityName) {
      var vm = this
      this.$axios.get('https://liufeiyu.cn/static/json/city.json').then(res => {
        console.log(res)
        vm.receiveCityMsg = [] // 清空城市数组
        res.data.forEach(city => {
          if (city.cityZh.indexOf(inputCityName) !== -1 || city.provinceZh.indexOf(inputCityName) !== -1 || city.leaderZh.indexOf(inputCityName) !== -1 || city.cityEn.indexOf(inputCityName) !== -1 || city.provinceEn.indexOf(inputCityName) !== -1 || city.leaderEn.indexOf(inputCityName) !== -1) {
            vm.receiveCityMsg.push(city)
          }
        })
      })
    },
    /*
    * 函数
    * */
    // 选好城市跳转页面
    chooseCity (cityName) {
      this.$router.push({path: '/Native/Home', query: {city: cityName}})
    }
    // ----------------------------------本页数据----------------------------------
  }
}
</script>

<style scoped lang="less">
  @import url('../assets/less/main');

  #ManageCity{
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
    .header{
      border-bottom: .5px solid #dfdfdf;
      padding: 20px 40px;
      .headerInput{
        .border_radius(1em);
        padding: 0.2em 6px;
        width: 70%;
        font-size: 1em;
      }
      .headerBtn{
        width: 20%;
      }
    }
    .body{
      padding: 1em 1.5em;
      .cityList{
        font-size: 1.2em;
        border-bottom: 1px solid grey;
        padding: 12px 0 10px;
        .cityListLeft{
          display: inline-block;
        }
        .cityListRight{
          float: right;
        }
      }
    }
    .searchingCity{
      padding: 1em 1.5em;
      .searchingCityBox{
        .eachCityMsg{
          border-bottom: 1px solid black;
          .cityName{
            font-size: 1.5em;
          }
          .cityMsg{
            font-size: 1.2em;
            margin: 6px 0;
          }
        }
        .cityMsgEmpty{
          padding: 50px 0;
          text-align: center;
          .emptyCityBox>i{
            font-size: 3em;
          }
          .emptyCityText{
            font-size: 2em;
          }
        }
      }
    }
    .footer{
      .footerHead{
        margin: 0.5em 0 0.5em 1em;
      }
      .cityTitle{
        font-size: 1em;
        display: inline-block;
        width: 25%;
        text-align: center;
        margin: 1em 0;
        .titleText{
          background: #f8f8f8;
          border-radius: 0.25em;
          padding: 0.375em 0.625em;
        }
      }
    }
  }
</style>
