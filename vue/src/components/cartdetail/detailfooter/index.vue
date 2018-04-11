<template>
  <footer class="detailfooter">
    <ul>
    	<router-link tag="li" to="" style="border-right:1px solid #eee">
    		<span class="iconfont icon-shoucang"></span>
    		<p>收藏</p>
    	</router-link>
			<router-link tag="li" to="">
    		<span class="iconfont icon-lianxiwomen"></span>
    		<p>联系我们</p>
    	</router-link>
			<li class="buy" @click="tolovemoney()">
				<span class="iconfont icon-gouwuche"></span>
    		<p>去捐款</p>
			</li>
    	<li @click="paymoney()" class="pay">
    		<p>立即付款</p>
    	</li>
    </ul>
  </footer>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>