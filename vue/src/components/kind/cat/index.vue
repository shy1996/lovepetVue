<template>
	<div class="content">
		<ul class="petcatlist">
			<router-link v-for="(item,index) in petcatlist" :key="index" tag="li" :to="{name:'petdetail',params:{petID:item.petID}}">
				<img :src="item.imgUrl" class="imgPet" />
				<p class="petName">
					<span>{{item.variety}}</span>
					<span>{{item.sex}}</span>
				</p>
				<p class="petAge">
					<span>年龄：{{item.age}}</span>
					<span>{{item.status}}</span>
				</p>
				<p v-html="item.editor"></p>
				<p><span class="iconfont icon-dizhi"></span>{{item.area}}</p>
			</router-link>
		</ul>
	</div>
</template>
<script src="./script.js"></script>
<style lang="scss"  src="./style.scss"></style>