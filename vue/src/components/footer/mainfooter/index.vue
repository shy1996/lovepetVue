<template>
  <footer>
    <ul>
			<router-link tag="li" to="/home">
				<span class="iconfont icon-shouye"></span>
				<p>首页</p>
			</router-link>
			<router-link tag="li" to="/kind">
				<span class="iconfont icon-chongwu"></span>
				<p>宠物</p>
			</router-link>
			<router-link tag="li" to="/cart">
				<span class="iconfont icon-aixin"></span>
				<p>赞助</p>
			</router-link>
			<router-link tag="li" to="/user">
				<span class="iconfont icon-wode"></span>
				<p>我的</p>
			</router-link>
    </ul>
  </footer>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>