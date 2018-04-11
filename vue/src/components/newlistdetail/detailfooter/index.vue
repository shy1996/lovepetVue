<template>
  <div class="newdetailfooter">
    <ul class="newfooter">
    	<router-link tag="li" to="" >
    		<span class="iconfont icon-liulanliang_icon"></span>
    		<p>1439</p>
    	</router-link>
			<router-link tag="li" to="">
    		<span class="iconfont icon-pinglun1"></span>
    		<p>评论</p>
    	</router-link>
			<router-link tag="li" to="">
				<span class="iconfont icon-web-icon-"></span>
    		<p>转发</p>
			</router-link>
    	<li ref="dianzancolor" @click="clickok()" >
				<span class="iconfont icon-31dianzan"></span>
    		<p ref="dianzan">234</p>
    	</li>
    </ul>
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>