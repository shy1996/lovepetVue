<template>
  <div class="content cartcontent">
    <div class="cartdetail">
			<img :src="list.img2" />
			<p>
				<span>￥ {{list.priceWap}}</span>
				<span>{{list.location}}</span>
			</p>
			<p>{{list.title}}</p>
		</div>
		<div class="carttip">
			<p>本商品的收益将会全部赞助给流浪动物收容所，在您的小宠可以用到好的商品同时，也不忘记给其他小生命一些温暖...</p>
		</div>
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
