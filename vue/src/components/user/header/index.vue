<template>
  <header class="myheader">
    <ul class="mytop">
      <ul>
        <router-link class="leftControl" to="home" tag="li">
          <span class="iconfont icon-fanhui"></span>
        </router-link>
        <li class="title">我的</li>
        <li class="leftControl">
          
        </li>
      </ul>
      <!-- 头部用户信息 -->
      <router-link class="loginBtn" to="login" tag="div">
        登陆/注册
      </router-link>
      <div class="loginSuccess">
        <div>
          <img src="../../../assets/loginapp.jpg" alt="">
        </div>
        <div>
          <span>{{user}}</span>
          <span>身份：游客</span>
        </div>
      </div>
    </ul>
    
  </header>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
