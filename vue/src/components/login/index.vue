<template>
  <div class="content logincontent">
    <div class="bg_login">
      
    </div>
    <div class="login_input">
      <mt-field type="tel" label="手机号" placeholder="手机号" :state="phoneState" v-model="phone"></mt-field>
      <mt-field label="验证码" placeholder="验证码" :state="captchaState" v-model="captcha">
        <button label="发送验证码" type="default" :disabled='codeState' @click="sendCode()">发送验证码</button>
      </mt-field>
    </div>
    <div class="login_btn">
      <p @click="login()" type="default">登 录</p>
    </div>
    <div class="otherlogin">
      <p>
        <span>新用户注册</span>
        <span>找回密码</span>
      </p>
      <div>
        <span class="iconfont icon-qq"></span>
        <span class="iconfont icon-weixin"></span>
        <span class="iconfont icon-weibo"></span>
      </div>
    </div>
    
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
