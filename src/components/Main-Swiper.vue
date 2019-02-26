<template>
	<div class="main-swiper swiperWrap">
		<swiper class="swiper" :list="MainSliderList" dots-position="center" :height="height" :show-desc-mask="showdescmask" :auto="autoPlay">
			<swiper-item v-for="img in MainSliderList" :key="img.img">
				<img :src="img.img" :alt="img.img">
			</swiper-item>
		</swiper>
		<ul class="service-policy">
			<li class="policy-item">
				<span class="icon iconfont icon-wancheng"></span>
				<span class="text">自营品牌</span>
			</li>
			<li class="policy-item">
				<span class="icon iconfont icon-wancheng"></span>
				<span class="text">30天无忧退货</span>
			</li>
			<li class="policy-item">
				<span class="icon iconfont icon-wancheng"></span>
				<span class="text">48小时快速退款</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Swiper, SwiperItem } from "vux";
	import imgs from "../assets/index_banner.png";
	export default {
		name: "Main-Swiper",
		props: {},
		data() {
			return {
				autoPlay: true,
				showdescmask: false,
				height: "5.3rem",
				MainSliderList: [{
						url: "javascript:",
						img: imgs,
						fallbackImg: imgs
					},
					{
						url: "javascript:",
						img: imgs,
						fallbackImg: imgs
					},
				]
			};
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			
		},
		created() {
			
		},
		mounted() {
			
		}
	};
</script>

<style  scoped>
	.main-swiper{ background-color: rgba(255, 255, 255, 1)} 
	.main-swiper .swiper{ width: 10rem; height: 5.33rem;}
	.swiper img{ width: 100%; height:  5.33rem}
	.service-policy{ display: flex; justify-content: center; align-items: center; width: 9.2rem; height: 0.96rem; padding: 0 0.4rem;}
	.policy-item{ flex: 1 1 100%; display: flex; justify-content: center; align-items: center;}
	.icon{ font-size: 0.42rem; color: red; }
	.text{ font-family: PingFangSC-Light,helvetica,'Heiti SC'; font-size: 0.32rem; margin-left: 0.1rem;}
</style>

<style>
	.swiperWrap .vux-icon-dot {
    width: 0.48rem !important; 
    height: 0.05rem !important; 
    margin-left: 0.02rem !important; 
    border-radius: 0 !important;
	}
	.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background-color: #0b9aff;
	}
</style>