<template>
  <div class="content ordercontainer">
	<div class="ordercontent">
		<div class="orderaddress">
			<div class="addressicon">
				<span class="iconfont icon-dizhi"></span>
			</div>
			<div class="addressdetail">
				<p>
					<span>收货人：哆啦A梦</span>
					<span>15836035355</span>
				</p>
				<p>收货地址：河南省郑州市二七区航海中路60号海为科技园C区12楼</p>
			</div>
		</div>

		<div class="orderwrap">
			<p class="dianpu"><span class="iconfont icon-gou"></span>爱在小窝店</p>
			<div class="orderproduct">
				<div class="productimg">
					<img :src="orderpro[0].pic_path" alt="">
				</div>
			<div class="productdetail">
				<p>{{orderpro[0].title}}</p>
				<p>{{orderpro[0].location}}</p>
				<p>￥ <i ref="pricewap">{{orderpro[0].priceWap}}</i></p>
			</div>
		</div>

		<div class="buynumber">
			<p>
				<span>购买数量</span>
				<span>
					<i @click="downnumber()"> - </i>
					<i ref="pronumber"> 1 </i>
					<i @click="upnumber()"> + </i>
				</span>
			</p>
			<p>
				<span>配送方式</span>
				<span>快递 免邮</span>
			</p>
			<p>
				<span>公益宝贝</span>
				<span>成交后将全部用于流浪动物公益事业</span>
			</p>
		</div>

		<div class="allmoney">
			<span>共计：￥<i ref="allmoney">{{orderpro[0].priceWap}}</i></span>
		</div>
	</div>
	</div>
    
	<footer class="orderfooter">
		<ul>
			<li class="buy" >
				<p>总计：￥ <i ref="allmoney2">{{orderpro[0].priceWap}}</i></p>
			</li>
			<router-link tag="li" to="" class="pay" >
				<p>立即支付</p>
			</router-link>
		</ul>
	</footer>
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
