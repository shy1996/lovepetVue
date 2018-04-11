<template>
  <div class="content">
    <div class="petdetail">
			<p>
				<span>{{petdetail[0].variety}}</span>
				<span>{{petdetail[0].status}}</span>
			</p>
			<div>
				<span>{{petdetail[0].variety}}</span>,
				<span>{{petdetail[0].sex}}</span>,
				<span>{{petdetail[0].age}}</span>
				<div v-html="petdetail[0].editor" style="display:inline"></div>
			</div>
			<div>
				<img :src="petdetail[0].imgUrl" style="width:100%"/>
			</div>
			<span class="goHomeLove">【领养】</span>
		</div>
	</div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
