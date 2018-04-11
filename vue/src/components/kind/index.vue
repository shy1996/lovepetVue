<template>
  <div class="content">
    <ul class="kindhome">
      <router-link tag="li" to="dog">
         <span class="iconfont icon-gou"></span>
        狗类
      </router-link>
      <router-link tag="li" to="cat">
         <span class="iconfont icon-mao"></span>
        猫系
      </router-link>
    </ul>
    <div class="kindContent">
			<router-view></router-view>
		</div>
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
