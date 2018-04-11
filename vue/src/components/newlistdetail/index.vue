<template>
  <div class="content newdetailcontent">
   
		<p>{{newlistdetail[0].newTitle}}</p>
		<p>
			<span>{{newlistdetail[0].author}}</span>
			<span>{{newlistdetail[0].time}}</span>
		</p>
		<div v-html="newlistdetail[0].editor"></div>

  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
