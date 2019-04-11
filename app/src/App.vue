<template>
  <div id="app">
    <p class="AppAllExplain">App</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased; /*字体抗锯齿渲染*/
    -moz-osx-font-smoothing: grayscale;/*字体抗锯齿渲染*/
    color: #383838;
    font-size: 16px;
  }
  /*距离设置归零*/
  *{padding: 0;margin: 0;}
  /*清除列表格式*/
  li{list-style-type: none;}
  /* a */
  a,a:hover,a:active,a:visited,a:link,a:focus{
    -webkit-tap-highlight-color: rgba(0,0,0,0); /* 去除点击的背景 */
    -webkit-tap-highlight-color: transparent; /* 去除点击的背景 */
    outline:none;
    background: none;
    text-decoration: none; /*清除a标签的下划线*/
  }
  /*清除元素轮廓*/
  input,button,select,textarea{outline:none}
  /*阻止用户调整textarea标签的大小*/
  /*textarea{resize:none}*/
  /*图片垂直居中*/
  img{vertical-align:middle;}
  table{/*使用table标签时只需在标签中添加“border”字段即可显示出1边框*/
    width: 100%;
    text-align: center;
    border-collapse: collapse;/*无表格间距*/
    border-spacing: 0;/*控制中间空隙，若设置间距属性时*/
    border-color: black;
  }
  /*前端单方面阻止网页中文本选中*/
  /*body {*/
  /*-moz-user-select: none; !*火狐*!*/
  /*-webkit-user-select: none; !*webkit浏览器*!*/
  /*-ms-user-select: none; !*IE10*!*/
  /*-khtml-user-select: none; !*早期浏览器*!*/
  /*user-select: none;*/
  /*}*/
  /*页面and界面最顶部说明*/
  .AppAllExplain{
    color: red;
    font-weight: 700;
    text-align: center;
    display: none;
  }
  /*
  display: none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；
  visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
  display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；
  visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显示；
  修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。
  读屏器不会读取display: none;元素内容；会读取visibility: hidden;元素内容
  */
</style>
