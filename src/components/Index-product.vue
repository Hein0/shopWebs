<template>
	<div class="index-product">
		<div class="direct-supply">
			<div class="direct-supply-header commons">
				<span class="text">品牌制造商直供</span>
				<span class="icon iconfont icon-right-circle"></span>
			</div>
			<div class="direct-supply-content">
				<ul class="direct-supply-list commons">
					<li class="direct-supply-item" v-for="item in DirectSupply" :key="item.imgSrc">
						<div class="text">
							<div class="manufacturer">{{item.description}}</div>
							<div class="price">{{item.price}}元起</div>
							<div class="new" v-if="item.new"></div>
						</div>
						<img :src="item.imgSrc" :alt="item.imgSrc">
					</li>
				</ul>
			</div>
		</div>
		<!-- ================================================================== -->
		<products-scroller :title="NewProductsTitle" :productsList="NewProducts"></products-scroller>
		<products-scroller :title="PopularProductTitle" :productsList="PopularProduct"></products-scroller>
	</div>
</template>

<script>
	import { Scroller } from "vux";
	import imgs from "../assets/index_banner.png";
	import guide from "../assets/guide-3.png";
	import ProductsScroller from "../components/Products-scroller";
	export default {
		name: "IndexProduct",
		props: {},
		data() {
			return {
				DirectSupply: [{
						imgSrc: imgs,
						description: "新秀丽制造商",
						price: 49
					},
					{
						imgSrc: imgs,
						description: "Nine West制造商",
						price: 199,
						new: true
					},
					{
						imgSrc: imgs,
						description: "MUJI制造商",
						price: 19
					},
					{
						imgSrc: imgs,
						description: "CK Jeans制造商",
						price: 169,
						new: true
					}
				],
				NewProductsTitle: ["新品首发", "查看全部"],
				NewProducts: [{
						imgSrc: guide,
						productName: "网易智造减压眼部按摩仪",
						description: "让眼睛享受全方位按摩",
						price: 449
					},
					{
						imgSrc: guide,
						productName: "女式轻商务西装套",
						description: "正统的西装魂，由上而下的精致教程。",
						price: 499
					},
					{
						imgSrc: guide,
						productName: "明前特级西湖龙井（纸包） 150克",
						description: "2018新茶，梅家坞产区、品质自饮",
						price: 480,
						status: ["anniversary"]
					},
					{
						imgSrc: guide,
						productName: "可裸睡纯棉便携睡袋",
						description: "轻巧便携，亲肤裸睡",
						price: 129,
						status: ["anniversary", "gradientPrice"]
					},
					{
						imgSrc: guide,
						productName: "唤自然·棉麻透气夏凉被",
						description: "棉麻泡泡纱，透气亲肤可水洗",
						price: 319
					}
				],
				PopularProductTitle: ["热销产品", "查看更多"],
				PopularProduct: [{
						imgSrc: guide,
						productName: "IH电饭煲",
						description: "电磁感应加热，米饭更好吃",
						price: 499,
						status: ["gradientPrice"]
					},
					{
						imgSrc: guide,
						productName: "全净皓齿变速式声波电动牙刷（可单买刷头）",
						description: "999+好评爆款，洁齿又护龈",
						price: 219,
						status: ["gradientPrice"]
					},
					{
						imgSrc: guide,
						productName: "茅台镇的酒 500毫升",
						description: "品酒师专业甄选，酿酒人匠心打磨",
						price: 188,
						status: ["gradientPrice"]
					},
					{
						imgSrc: guide,
						productName: "男式全棉珠地经典polo衫",
						description: "古典优雅，休闲也精致",
						price: 79,
						status: ["anniversary", "gradientPrice"]
					}
				],
				SpecialTopics: [{
						imgSrc: guide,
						productName: "高颜值有内涵的小家电上线",
						description: "我们一直认为，对于一个家来说，厨房不该只是功能性空间，还要多些能温暖生活的美学元...",
						price: 0
					},
					{
						imgSrc: guide,
						productName: "新派绅士教科书",
						description: "做一个绅士，永远都不会太晚...",
						price: 29
					},
					{
						imgSrc: guide,
						productName: "严选制造升级大揭秘",
						description: "极致材料、独特工艺，揭秘严选黑科技...",
						price: 12
					}
				]
			};
		},
		components: {
			Scroller,
			ProductsScroller
		},
		methods: {
			
		},
		created() {
			
		},
		mounted() {
			
		}
	};
</script>

<style scoped>
	.commons {display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-pack: center;-webkit-justify-content: center;justify-content: center;-webkit-box-align: center; -webkit-align-items: center; align-items: center;}
	.index-product{ width: 10rem; margin-top: 0.26rem; padding-bottom: 0.66rem;}
	.direct-supply{ margin-bottom: 0.26rem; background-color: rgba(255, 255, 255, 1); }
	.direct-supply-header{height: 1.46rem;} 
	.direct-supply-header .text {font-size: 0.42rem;}
	.direct-supply-header .text .icon {margin-left: 0.13rem; font-size: 0.42rem; color: rgba(200, 160, 77, 1);} 
	
	.direct-supply-content {width: 10rem;}
	.direct-supply-content .direct-supply-list { width: 9.706667rem;-webkit-flex-wrap: wrap;flex-wrap: wrap;padding: 0 0.16rem 0.08rem 0.16rem;} 
	.direct-supply-item {flex: 0 1 4.66rem; height: 3.52rem; margin: 0.05rem; position: relative; background-color: rgb(244, 244, 244); overflow: hidden;} 
	.direct-supply-item img{width: 5rem}
	.direct-supply-item .text {position: absolute; top: 0; left: 0; padding: 0.26rem 0 0 0.26rem;} 
	.direct-supply-item .text .manufacturer {font-size: 0.37rem;} 
	.direct-supply-item .text .price {font-size: 0.32rem;} 
	.direct-supply-item .text .new{margin-top: 0.13rem;  width: 375px;}
</style>