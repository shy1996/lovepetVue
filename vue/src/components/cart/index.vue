<template>
  <div class="content">
    <ul class="cartlist">
			<router-link class="cartli" v-for="(item,index) in cartlist" :key="index" tag="li" :to="{name:'cartdetail',params:{item_id:item.item_id}}">
				<div><img :src="item.pic_path"></div>
				<div>
					<p>{{item.title}}</p>
					<p class="listPrice">
						<span><em>￥</em>{{item.priceWap}}</span>
						<span>{{item.location}}</span>
					</p>
					<p class="gotoShop">
						<span>去赞助</span>
					</p>
				</div>
			</router-link>
		</ul>	
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
