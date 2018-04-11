<template>
  <ul class="content">
    <!-- 轮播图Start -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for = "(item, index) in bannerlist" :key = "index">
        <a :href = "item.bannerLink">
          <img v-lazy="item.bannerSrc"/>
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图End -->

    <!-- nav导航Start -->
   <ul class="navlist">
    	<li v-for = "(item, index) in navlist" :key = "index"> 
    		<img v-lazy="item.navSrc" alt="" />
         <p>{{item.navName}}</p>
    	</li>
    </ul>
    <!-- nav导end -->

    <!-- news列表start -->
    <ul class="newslist">
    	<router-link :to="{name:'newlistdetail',params:{newID:item.newID}}" tag="li" v-for = "(item, index) in newslist" :key = "index"> 
        <div class="newsauthor">
          <span class="author_left"><img :src="item.newUrl" alt=""></span>
          <p>
            <span>{{item.author}}</span>
            <span>品种|郑州市|幼儿园</span>
          </p>
          <span class="author_right" ref="attentiontext" @click="attention()">关注</span>
        </div>
        <p class="newstitle">{{item.newTitle}}</p>
    		<!-- <img v-lazy="item.newUrl" alt="" /> -->
        <ul>
          <li v-html="item.editor"></li>
        </ul>
    	</router-link>
    </ul>
    <!-- news列表end -->
  </ul>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
