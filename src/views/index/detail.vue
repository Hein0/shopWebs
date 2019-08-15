<template>
	<div id="detail">
		<div class="details" id="details">
			<headBack :fH="true" :cD="true" :msg="msgTitle"></headBack>
			<!--锚点tab-->
			<ul class="headerTabs" id="headerTabs">
				<li class="active" @click="toActive('.details')">商品</li>
				<li @click="toActive('.comment')">评价</li>
				<li @click="toActive('#detailImg')">详情</li>
				<li @click="toActive('#recommend')">推荐</li>
				
			</ul>
	
			<div class="container" :data-id="goodDetail.id" style="margin-bottom: 1.3333rem;">
				<div class="swiper-container swiper-container-horizontal" style="cursor:pointer;min-height: 200px">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(n,index) in goodDetail.goods_url" :key="index">
							<img v-if="n.src" src="../../assets/card-back.png" alt="" class="preview-img" :style="'background: url('+n.src+') no-repeat center;background-size:cover;'" @click="$preview.open(index,goodImg)">
							<div v-else class="video-wrap" style="min-height: 200px">
								<img :src="n" alt="" v-show="!showVideo">
								<p @click='play' v-show="!showVideo"></p>
								<div class="shade" v-show="!showVideo"></div>
								<video :src="goodDetail.goods_video_url" webkit-playsinline="" preload="auto" width="100px" height="100px" playsinline="" x5-playsinline="" x-webkit-airplay="" v-show="showVideo" alt="" ref='video' @ended="end" @click="pause"></video>
							</div>
						</div>
					</div>
				</div>
	
				<!-- 商品信息 -->
				<section class="info" id="info">
					<div class="info-title">经典卡其 双排扣沉稳厚实保暖大衣</div>
					<div class="info-salePoint">卡其色斜纹厚实面料，衣袖翻叠后腰带装饰细节设计，时尚沉稳更彰显男士风度！</div>
					<div id="collectSign" class="collectSign">
						<i></i>
						<p class="collectText">收藏</p>
					</div>
					<div class="priceWrap">
						<div class="infoPriceWrap">
								<div class="gl-price">￥<span>1499</span></div>
						</div>
						<div class="infoDurationWrap">
							<span class="gl-duration-icon"></span>
							<span class="gl-duration">生产周期：7天</span>
						</div>
					</div>
				</section>
	
				<!-- 三大承诺 -->
				<div class="threePromiseWrap">
					<div class="threePromise">
						<div class="duiHao">闪电/过期退</div>
						<div class="duiHao">无隐形消费</div>
						<div class="duiHao">正品保障</div>
					</div>
				</div>
                
				<!--已选择-->
				<section class="rangeWarp padLR spriteIcon" @click="cliSection">
					<div class="standard">
						<span>已选择：&nbsp;</span>
						<div class="choosed-size">
							<span class="type-des">DY18224卡其色，46，</span><span class="type-num">1件</span>
						</div>
					</div>
					<span class="gl-more"></span>
				</section>
                
				<!--可配送地址-->
				<section class="myAddress spriteIcon" id="myAddress">
					<img class="locationicon" src="https://static.biyao.com/m/img/master/togetherGroup/location_purple48@2x.png?v=biyao_7462100">
					<div class="location-detial" style="padding-top: 0.16rem;">
						<p class="location-area">广东省 深圳市 福田区</p>
						<p class="location-status">可配送</p>
					</div>
				</section>
				
				<!--评价-->
				<div class="comment">
					<div class="commentWrap">
						<div class="commentContent">
							<div class="commentDetial-title">商品评价&nbsp;&nbsp;<span>(81)</span></div>
							<div class="commentDetial">
								<div class="commentImg">
									<img class="commentAvatar" onerror="javascript:this.src='https://static.biyao.com/m/img/base/defult_userimg.png'" src="https://bfs.biyao.com/group1/M00/4A/4F/rBACVFtwPfeANdcXAAAH6BLwRX4916.png" alt="">
									<div class="commentName">X一Q</div>
								</div>
								<div class="commentTtem">不错哦，老公很喜欢</div>
								<div class="commentMore" @click="commentMore">查看全部评论</div>
							</div>
						</div>
					</div>
				</div>
				
				<!--推荐-->
				<section class="recommend" id="recommend" >
					
				</section>
				
				<!--详情-->
				<div id="detailImg">
					<div class="gosTitle">商品详情</div>
					<div class="pro-detial">
						<!--商品尺寸-->
						<div class="txq_header">
						  	<div class="txq_item">
						   		<dl>
						    		<dt>【消费流程】</dt>
						    		<dd> 下订单并支付预约金</dd>
						    		<dd> 咨询客服，客服会帮您完成咨询预约面诊</dd>
						    		<dd> 手术前将支付凭证给医生进行验证，并支付余下手术费用</dd>
						   		</dl>
						  	</div>
						  	<div class="txq_item">
						   		<dl>
						    		<dt>【如何预约】</dt>
						    		<dd> 点击页面上方的咨询或电话，和仟姿客服人员预约面诊时间。</dd>
						   		</dl>
						  	</div>
						  	<div class="txq_item">
						   		<dl>
						    		<dt>【如何退款】</dt>
						    		<dd> 点击APP右下角“我的”，在我的-我的订单-点击“售后/退款”，即可拨打客服电话，仟姿客服人员将尽快协助您完成退款。</dd>
						   		</dl>
						  	</div>
						  	<div class="txq_item">
						   		<dl>
							   		<dt>【消费须知】</dt>
									<dd>1. 下单后，可点击本页面“在线咨询”或者下方导航栏“咨询”与医院预约到院时间。</dd>
									<dd>2. 请在确定手术后，再将支付凭证交给医生，支付凭证交给医生后，视为已经手术您将无法完成退款。</dd>
									<dd>3. 该商品在线支付预约金成功后，请于支付之日起三个月内与医院协调沟通具体到院时间。</dd>
									<dd>4. 在线支付成功后，您还需到院缴纳剩余尾款（仟姿平台价-预约金）。</dd>
									<dd>5. 若您仍有疑问请在线联系客服或拨打仟姿客服热线4008058889咨询。</dd>
						  		</dl>
						  	</div>
						</div>
						<!--商品图片-->
						<div class="txq_details">
						  	<p style="text-align: center;"><img src="https://bfs.biyao.com/group1/M00/7A/2F/rBACVFwOHaqALbmMAALEfMz_71Y561.jpg" onerror="javascript:this.src='https://static.biyao.com/m/img/base/zwpic.png'"></p>
						  	<p style="text-align: center;"><img src="https://bfs.biyao.com/group1/M00/79/F6/rBACVFwNxlKAaGqDAAFcDngaWAM938.jpg" onerror="javascript:this.src='https://static.biyao.com/m/img/base/zwpic.png'"></p>
						  	<p style="text-align: center;"><img src="https://bfs.biyao.com/group1/M00/7A/59/rBACW1wKIcyAIkttAAC9LvHS4Gk518.jpg" onerror="javascript:this.src='https://static.biyao.com/m/img/base/zwpic.png'"></p>
						  	<p style="text-align: center;"><img src="https://bfs.biyao.com/group1/M00/78/9B/rBACVFwKIcyAEyr9AAGV0ykSTS0577.jpg" onerror="javascript:this.src='https://static.biyao.com/m/img/base/zwpic.png'"></p>
						</div> 
					</div>
					
					<div v-html="goodDetail.detail_page" v-if="goodDetail.detail_page" class="txt"></div>
					<div v-else><img :src="goodDetail.goods_detail_url" alt=""></div>
				</div>

			</div>
			<!--底部购买按钮-->
			<Footers></Footers>
			<!--提示语组件-->
			<toast v-model="showPosition" type="text" :time="800" :is-show-mask="true" :text="texts" position="default"></toast>
			
			<!-- 规格弹窗 -->
			<popuseWrap v-show="isPopuseWrap" :isPopuseWrap="isPopuseWrap"></popuseWrap>
		
		
		</div>
	</div>	
</template>
<style scope>
	*{-webkit-tap-highlight-color: transparent;-webkit-overflow-scrolling: touch;}
	.opticy {height: 100%;width: 100%;opacity: 0.7}
	#detail{height:100%;}
	.details{width:10rem;height:100%;-webkit-box-flex: 1;-moz-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;
    flex: 1;flex: 1 1 auto;overflow-x: hidden;overflow-y: auto;-webkit-overflow-scrolling: touch;position: relative;}
	.headerTabs{position: fixed; top: 1.2rem;opacity: 0; width: 100%; z-index: 101;height: 1rem;line-height: 1rem;box-sizing: border-box;background: #fff;display: flex;display: -webkit-flex;justify-content: space-around;-webkit-justify-content: space-around;align-items: center;
    -webkit-align-items: center;padding: 0 .2rem; box-shadow: 0 0 6px #dcc0de; -webkit-box-shadow: 0 0 6px #dcc0de;}
	.headerTabs li {text-align: center;color: #353535;font-size: .28rem;}
	.headerTabs li.active {color: #F23030;opacity: 1;}
	
	
	video {position: absolute;left: 0;top: 0;width: 100%;height: 100%;}
	.video-wrap {position: relative;width: 100%;height: 100%;}
	.video-wrap img {position: absolute;left: 0;top: 0;}
	.video-wrap p {position: absolute;left: 50%;top: 50%;width: 50px;height: 50px;z-index: 10;transform: translate(-50%, -50%);background-image: url(../../assets/img/play.png);
		background-position: center;background-repeat: no-repeat;background-size: 50px;}
	.video-wrap .shade {position: absolute;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.6);}
	
	/*评价*/
	.commentWrap {padding-top: 0.2rem;background-color: #eee;margin-bottom: .2rem;}
	.commentContent {padding: 0 .2rem;background-color: #fff;}
	.commentDetial-title {font-size: .42rem;line-height: .5rem;padding: .3rem 0;color: #353535;}
	.commentDetial {text-align: center;}
	.commentImg {display: flex;font-size:.37rem;display: -webkit-flex;justify-content: flex-start;-webkit-justify-content: flex-start;align-items: center;-webkit-align-items: center;margin-bottom: .2rem;}
	.commentImg .commentAvatar {width: 1rem;height: 1rem;border-radius: 50%;}
	.commentImg .commentName {margin-left: .2rem;color: #353535;}
	.commentTtem {line-height: .5rem; text-align: left;color: #353535; word-break: break-all;font-size:.35rem;}
	.commentMore { display: inline-block;margin: .4rem 0 .2rem;height: .8rem;width:4rem;line-height: .8rem;color: #999;border: 1px solid #999;border-radius: .4rem;font-size:.37rem}

	
	/*商品详情*/
	#detailImg{padding-top: 0.2rem;width: 100%;background-color: #eee;}
	#detail #detailImg .gosTitle,.comment .gosTitle {text-align: center;line-height: 1.3333rem;font-size: 0.42rem;color: #282828;background-color: #fff;}
	#detailImg .txt {padding-bottom: 10px;padding-left: 10px;padding-right: 10px;}
	.pro-detial{    background: #eee;}
	.txq_header {padding: .2rem;margin-bottom: .2rem;background: #fff;}
	.txq_item { border-bottom: 1px dotted #D9D9D9;line-height: .6rem; font-size: .37rem; text-align: left;padding: .16rem;}
	.txq_item dl {margin: 0;}
	.txq_item dt { float: left;width: 2.24rem;color: #828282;}
	.txq_item dd {margin-left: 2.3rem;color: #353535;}
	.txq_details {padding: 0 .2rem;line-height: 1.5;font-size: .37rem;overflow: hidden;background: #fff;}
	.txq_details p {word-break: break-all;}
	.txq_details img {width: 100%;display: block;}

	/*<!--已选择-->*/
	.padLR{padding:0 0.2rem;}
	.info {padding: .2rem;    background-color: #fff; position: relative;}
	.info .info-title {font-size: 0.42rem;width: 7.49rem;overflow: hidden;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;
    -webkit-box-orient: vertical;line-height: 1.35;color: #353535; padding-top: .2rem;margin-bottom: .1rem;}
	.info .info-salePoint {font-size: 0.37rem;color: #6F6F6F;width: 7.49rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;line-height: 1.5; padding-bottom: .04rem;word-break: break-all;}
	.info .collectSign {position: absolute;top: 0rem;right: .24rem;width: 1.3rem;height: 1.3rem;text-align: center; cursor: pointer;z-index: 99;}
	.info .collectSign i {display: inline-block;width: .44rem;height: .44rem;background-image: url(../../assets/img/sc_default.png); background-size: 100% 100%;}
	.info .collectSign .collectText {font-size: .24rem;color: gray;}
	.info .priceWrap {padding-top: .1rem;display: flex;display: -webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;height: .8rem;line-height: .8rem;align-items: center;-webkit-align-items: center;}
	.info .priceWrap .infoPriceWrap {display: flex;display: -webkit-flex;align-items: center;-webkit-align-items: center;}
	.info .priceWrap .infoPriceWrap .gl-price {font-size: .42rem;color: #f33;}
	.info .priceWrap .infoPriceWrap .gl-price span {font-size: .42rem;line-height: 1;}
	.info .priceWrap .infoDurationWrap {font-size: .4rem;color: #6F6F6F;line-height: .4rem;height: 0.4rem;}

	.threePromiseWrap {box-sizing: border-box;font-size: 0.36rem;background: #f6f8fa;padding-top: 0.3rem;padding-bottom: 0.3rem;}
	.threePromise {background: #fff;height: 1.2rem;line-height: 1.3rem;text-align: center;}
	.duiHao {padding-right: 0.46rem;padding-left: 0.46rem;background: url("../../assets/img/threePromise.png") no-repeat left center;display: inline-block;background-size: 0.35rem 0.35rem;box-sizing: border-box;}
	.noHidePrice {padding-right: 0.46rem;padding-left: 0.46rem;}
	.qualityGood {padding-left: 0.46rem;}
	
	.shopCar {width: 0.85rem;position: absolute;right: 6%;top: 2%;}
	.shopCar img {width: 100%;}

	/*已选*/
	.rangeWarp { position: relative;height: 1.13rem;width: 100%;line-height: 1.13rem;
	    display: flex;display: -webkit-flex;justify-content: space-between;-webkit-box-sizing: border-box;box-sizing: border-box;
	    -webkit-justify-content: space-between;align-items: flex-start;-webkit-align-items: flex-start;font-size: .4rem; color: #828282;}
	.rangeWarp .standard{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: flex; display: -webkit-flex;}
	.rangeWarp .standard span {color: #828282;font-size: .37rem;}
	.choosed-size {color: #353535;font-size: .37rem;overflow: hidden;white-space: nowrap; text-overflow: ellipsis;}	
	.rangeWarp .standard .type-des, .rangeWarp .standard .type-num {color: #353535;}
	.rangeWarp::after {content: "";border-bottom: 1px solid #eee; position: absolute;left: 50%;bottom: 0;width: 100%;height: 1px;transform: translate3D(-50%,0,0) scaleY(0.5);-webkit-transform: translate3D(-50%,0,0) scaleY(0.5);}
	.iconBg{background: #fff url(../../assets/img/jianTouRight.png) no-repeat 97% center;background-size: 0.15rem 0.30rem;}
	.spriteIcon{background: #fff url(../../assets/img/spriteIcon.png) no-repeat 97% center;background-size: 0.42rem 0.42rem;}
	
	/*可配送地址*/
	.myAddress {padding: .16rem .2rem .16rem .24rem;background-color: #fff;position: relative;display: flex;display: -webkit-flex;justify-content: space-between;-webkit-justify-content: space-between; align-items: center;-webkit-align-items: center;}
	.myAddress .locationicon {width: .65rem;height: .65rem;}
	.location-detial {padding: .16rem .12rem 0 .08rem;}
	.location-area {width: 8.76rem;height: .4rem;line-height: .4rem; font-size: .37rem;color: #4A4A4A;overflow: hidden;}
	.location-status {margin-top: .16rem;font-size: .35rem;color: #F84242;line-height: .4rem;}
	
	/*轮播图*/
	.swiper-slide img {width: 100%;height: 100%;}
	.swiper-wrapper,.swiper-wrapper img {height: 100%}
	
	
	
	
	
	
	
	
	
	
	


</style>

<script>
	import { mapState } from "vuex";
	import { Toast } from "vux";
	import Footers from '../../components/footerDetail';
	import headBack from '../../components/head-back';
	import popuseWrap from '../../components/popuseWrap';
//	import "common/css/detail.css";

	export default {
		name: "detail",
		data() {
			return {
				no_data: false,
				goodImg: [],
				goodDetail:[{"id":18,"his_id":32,"name":"注射物取出，专业修复经验，取出不走形，让美丽不再受伤害！",
				"goods_url":[{"src":"https://qz.bqjr.cn/uploadfile/goods/20180926/201809261451251872690944.jpg","w":400,"h":600}],
				"qzd_price":3000,
				"hos_price":6000,
				"appo_price":600,
				"left_price":2400,
                "discount":5,
                "appoint_count":1,
                "goods_detail_url":"",
                "hos_id":31,
                "hos_logo":"uploadfile/goods/20180327/20180327154515892347148.jpg","hos_name":"沈阳沈河盛京尚美医疗美容门诊部有限公司","hos_address":"沈河区北顺城路9号甲5、甲6","hos_qualifications":"","hos_hospital_type":"168","hos_telphone":"024-88138333","hos_city":"沈阳市","detail_page":"<img src=\"https://qz.bqjr.cn/uploadfile/goods/20180511/20180511143543350001609.jpg\">","standard":"","rebate":0,"brand":"玻尿酸其他","catName":"注射物取出","firstTag":0,"firstUserTag":0,"redpacket":[{"id":75242,"amount":5,"condition":0,"type":1,"number":0,"numberType":2,"userId":"qz0462209e"},{"id":75243,"amount":1,"condition":0,"type":1,"number":0,"numberType":2,"userId":"qz0462209e"},{"id":75244,"amount":3,"condition":0,"type":1,"number":0,"numberType":2,"userId":"qz0462209e"},{"id":75245,"amount":1888,"condition":4000,"type":2,"number":0,"numberType":2,"userId":"qz0462209e"},{"id":75246,"amount":888,"condition":2000,"type":2,"number":0,"numberType":2,"userId":"qz0462209e"},{"id":75247,"amount":398,"condition":1000,"type":2,"number":0,"numberType":2,"userId":"qz0462209e"},{"id":75248,"amount":211,"condition":500,"type":2,"number":0,"numberType":2,"userId":"qz0462209e","flag":0},{"id":75249,"amount":88,"condition":200,"type":2,"number":0,"numberType":2,"userId":"qz0462209e","flag":1}],"anotherName":"沈阳盛京尚美","grade":"__vue_devtool_nan__"}],
				kefUrl: "",
				showVideo: false,
				isSpecification: false,
				hongBaoNum: "",
				city: this.$router.currentRoute.query.city,
				msgTitle:this.$route.meta.title,//路由标题
				totalIndex: 0,
				mySwiper: '',
				texts:"",//提示语内容
      			showPosition: false,//提示语组件弹出
                isPopuseWrap:false,//规格弹出
			};
		},
		//过滤器
		filters: {

		},
		//组件
		components: {
			Toast,
			Footers,
			headBack,
			popuseWrap,
		},
		beforeRouteLeave(to, from, next) {
			this.end()
			next()
		},
		//组件创建完成
		created: function() {
			let self = this;
			this.initSwiper();
//			if(!this.user_id) {
//				this.user_id = JSON.parse(localStorage.getItem("personInfo")).id;
//				if(this.user_id) {
//					Toast({
//						message: "请重新登录",
//						position: "middle",
//						duration: 2000
//					});
//				}
//			}
		},
		//组件写入dom结构之前
		mounted: function() {
			// console.log('...')
			window.addEventListener('scroll',this.gdScroll,true);
			
		},
		//方法
		methods: {
			//初始化
			initSwiper() {
				setTimeout(() => {
					this.mySwiper = new Swiper('.swiper-container', {
						autoplay: true,
					})
					if(document.querySelector('.video-wrap')) {
						document.querySelector('.video-wrap').style.height = document.querySelector('.swiper-container').offsetHeight + 'px';
					}

				}, 1000)
			},
			//查看更多评论
			commentMore(){
				this.$router.push({path:'/commentPage',query: {}});
			},
			//在线咨询
			onlineService() {
				
			},
			//滚动操作
			gdScroll(e){
				let container = this.$el.querySelector("#details");
				let self = this;
				let header = self.$el.querySelector("#headerTabs");
				let info = self.$el.querySelector("#info");
				let scrollTop = e.target.scrollTop;
					header.style.opacity = scrollTop / info.offsetTop <= 1 ? scrollTop / info.offsetTop : 1;

			},
            
			// 播放
			play() {
				this.$refs.video[0].play();
				this.showVideo = true;
				this.mySwiper.autoplay.stop();
			},
            
			pause() {
				this.showVideo = false;
				this.$refs.video[0].pause();
				this.mySwiper.autoplay.start();
			},
            
			// 结束
			end() {
				this.showVideo = false;
				this.mySwiper.autoplay.start();
			},
            
			//加入购物车
			toShoppingCart() {
				let self = this;
				self.texts = "已成功加入购物车",
				self.showPosition = true;
			},
            
            //已选择
            cliSection(){
               this.isPopuseWrap = true; 
            },

			//跳转锚点
			toActive(selector) {
				// console.log(event.currentTarget.parentNode.children)
				let self = this;
				let liTemp = event.currentTarget.parentNode.children;
				let anchor = self.$el.querySelector(selector);
				let $scollerEl = self.$el.querySelector("#details");
				let headerHeight = self.$el.querySelector("#headerTabs").offsetHeight;
				for(let i = 0; i < liTemp.length; i++) {
					liTemp[i].removeAttribute('class')
				}
				event.currentTarget.setAttribute('class', 'active');
				if(selector == '#details') {
					self.$nextTick(() => {
			          	$scollerEl.scrollTop = anchor.offsetTop;
			        });
				} else {
					self.$nextTick(() => {
			          	$scollerEl.scrollTop = anchor.offsetTop - headerHeight;
			        });
				}
			},



		},
		//监听
		watch: {
			goodImg(value) {
				value.forEach(element => {
					let imgTemp = new Image();
					imgTemp.src = element.src;
					if(imgTemp.complete) {
						element.w = imgTemp.width;
						element.h = imgTemp.height;
					} else {
						imgTemp.onload = function() {
							element.w = this.width;
							element.h = this.height;
						};
					}
					imgTemp = null;
				})
			},

		},
		//计算属性
		computed: {

		},
		//数据销毁
		destroyed(){//离开页面关闭监听
			window.removeEventListener('scroll',this.gdScroll)
		},
		updated: function() {
			if(this.toTarget) {
				this.goAnchor('.comment')
			}
		}
	};
</script>