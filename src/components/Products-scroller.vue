<template>
	<div class="products-scroller">
		<div class="new-product">
			<div class="new-product-header ">
				<div class="text1">{{title[0]}}</div>
				<div class="text2 commons">
					<span class="text">{{title[1]}}</span>
					<span class="icon iconfont icon-right"></span>
				</div>
			</div>
			<div class="new-product-content">
				<scroller lock-y :scrollerbar-x=false>
					<ul class="new-product-list commons">
						<li class="new-product-item" v-for="item in productsList" :key="item.imgSrc">
							<img :src="item.imgSrc" :alt="item.imgSrc">
							<div class="text">
								<p class="text-overflow product-name">{{item.productName}}</p>
								<p class="text-overflow description">{{item.description}}</p>
								<p class="price">￥{{item.price}}</p>
							</div>
						</li>
						<li class="product-more">
							<span class="text">查看更多></span>
						</li>
					</ul>
				</scroller>
			</div>
		</div>
	</div>
</template>

<script>
	import { Scroller } from "vux";
	export default {
		name: "Products-scroller",
		props: {
			title: {
				type: Array,
				required: true
			},
			productsList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				
			};
		},
		components: {
			Scroller
		},
		computed: {},
		methods: {},
		created() {},
		mounted() {}
	};
</script>

<style scoped>
	.commons {display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-pack: center;-webkit-justify-content: center;justify-content: center;-webkit-box-align: center; -webkit-align-items: center; align-items: center;}
	.products-scroller .new-product{ width: 10rem; background-color: #fff; }
	.new-product-header{width: 10rem; height: 3.4rem;background-color: rgba(216,229,241,0.5);
    margin-bottom: 0.42rem;display: -webkit-box;display: -webkit-flex;
    display: flex;-webkit-box-pack: center;-webkit-justify-content: center;
    justify-content: center;-webkit-box-align: center;-webkit-align-items: center;align-items: center;
    -webkit-box-orient: vertical;-webkit-box-direction: normal;-webkit-flex-direction: column;flex-direction: column;}
	.new-product-header .text1{ font-size: 0.48rem; color: #8ba0b6; }
	.new-product-header .text2{ width: 3.2rem; height: 0.74rem; margin-top: 0.21rem; color: #8ba0b6; background-color: #d8e5f1;} 
	.new-product-header .text2 .text{ font-size: 0.37rem;} 
	.new-product-header .text2 .icon{ font-size: 0.34rem }
	
	.new-product-content .new-product-list{ width: 26.66rem; height: 5.52rem; display: inline-block; position: relative; }
	.product-more{ display: inline-block; width: 3.73rem; height: 280px; margin-left: 0.4rem; position: absolute; top: 0; }
	.product-more .text{ display: inline-block; width: 3.33rem; height: 3.33rem; line-height: 3.33rem; text-align: center; border: 0.1rem solid rgba(0, 0, 0, .15); font-size: 0.42rem; }
	.new-product-item{ display: inline-block; width: 3.73rem; height: 5.52rem; margin-left: 0.4rem;} 
	.new-product-item img{ width: 100%; background-color: rgba(0, 0, 0, .075); }
	.new-product-item .text{ width: 100%; height: 0.82rem; padding: 0 0.13rem; color: black; }
	.new-product-item .text .text-overflow{ width: 3.33rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: PingFangSC-Light,helvetica,'Heiti SC'; color: black; }
	.new-product-item .text .product-name{ font-size: 0.37rem; height: 0.44rem; padding: 0.13rem 0.13rem; }
	.new-product-item .text .description{ font-size: 0.32rem; color: #7f7f7f; padding: 0 0.13rem; }
	.new-product-item .text .price{ width: 100%; font-size: 0.37rem; height: 0.41rem; color: red;}
</style>