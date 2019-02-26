<template>
	<div class="popuseWrap">
		<!-- 选择规格弹窗 -->
			<div class="my-popuse-wrap">
				<!-- 通用背景蒙层 -->
				<div class="gl-bg-corver"></div>
				<div class="choose-size-wrap choose-fadeIn">
				<!-- 选择度数弹框头部 -->
				<div class="choose-size-top">
					<img class="choose-size-top-img" src="https://bfs.biyao.com/group1/M00/62/4E/rBACVFvM3EiAS6AtAAEmbNiaPrE203_400x400.jpg" onerror="javascript:this.src='https://static.biyao.com/mnew/img/base/zwpic_5f672e7.png'" alt="">
					<div class="choose-size-title-price">
						<div class="choose-size-price-text">￥<span class="choose-size-price">599</span></div>
						<div class="choose-size-duration-text">生产周期：<span class="choose-size-duration">3</span>天</div>
						<div class="choose-size-choosed-style">
							<span class="choose-size-choosed-tit">已选择：</span>
							<div class="choose-size-choosed-text">黑色，XL，1件</div>
						</div>
					</div>
					<div class="close-choose-size" @click="closeWin">
						<pre class="icon"></pre>
					</div>
				</div>
				<div class="gl-choose-lens-content-wrap">
					<!-- 选择规格主体 -->
					<div class="choose-size-content">
						<div class="choose-title-wrap">
							<span class="lens-text">颜色</span>
							<span class="lens-choosed">（已选：<i class="lens-choosed-s">黑色</i>）</span>
							<div class="Specs-list">
								<div class="specs-detial-normalSpecs specs-detial-checked" id="81358">黑色</div>
							</div>
						</div>
						<div class="choose-title-wrap">
							<span class="lens-text">尺寸</span>
							<span class="lens-choosed">（已选：<i class="lens-choosed-s">XL</i>）</span>
							<div class="Specs-list">
								<div class="specs-detial-normalSpecs" id="81359">S</div>
								<div class="specs-detial-normalSpecs" id="81360">M</div>
								<div class="specs-detial-normalSpecs" id="81361">L</div>
								<div class="specs-detial-normalSpecs specs-detial-checked" id="81362">XL</div>
								<div class="specs-detial-normalSpecs" id="81363">XXL</div>
							</div>
						</div>
						<!-- 选择数量 -->
						<div class="choose-num-wrap">
							<div class="choose-num-test">购买数量</div>
							<div class="contral-num">
								<div class="count-reduce count-disabled">
									<span class="count-horizontal"></span>
								</div>
								<div class="buy-count">1</div>
								<div class="count-add">
									<span class="count-horizontal"></span>
									<span class="count-vertical"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 底部按钮 -->
				<div class="choose-size-bottom">
					<ul class="choose-bottom-btn-wrap choose-bootom-btn-con">
						<li class="buy-shopcar-choose">加入购物车</li>
						<li class="buy-now-choose">立即购买</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { Toast } from "vux";


	export default {
		name: "detail",
        props:{
            isPopuseWrap:false,//是否显示隐藏
        },
		data() {
			return {

			};
		},
		//过滤器
		filters: {

		},
		//组件
		components: {

		},
		//组件创建完成
		created: function() {
			let self = this;
			
		},
		//组件写入dom结构之前
		mounted: function() {

			
		},
		//方法
		methods: {
            
            closeWin(){
                this.$parent.isPopuseWrap = false;
            }

		},
		watch: {


		},
		//计算属性
		computed: {

		},

		updated: function() {
			
		}
	};
</script>

<style scope>
	/*选择框弹窗*/
	i{font-style: normal; font-weight: 400;}
	.my-popuse-wrap {position: fixed; top: 0;left: 0; bottom: 0; right: 0; background-color: rgba(0,0,0,.4);z-index: 999;}
	.gl-bg-corver {position: absolute; top: 0;left: 0;bottom: 0; right: 0; height: 100%; width: 100%; z-index: 90;}
	.choose-size-wrap { position: absolute; bottom: 0; left: 0;height: 9rem; width: 100%;background-color: #fff;z-index: 100; transition: transform .3s ease;-webkit-transition: transform .3s ease; transform: translate3D(0,100%,0); -webkit-transform: translate3D(0,100%,0);}
	.choose-fadeIn {transform: translate3D(0,0,0);-webkit-transform: translate3D(0,0,0);}
	.choose-size-top {
		position: relative;
		width: 100%;
		height: 2.2rem;
		background-color: #fff;
		z-index: 10;
	}
	.choose-size-top-img {
		position: absolute;
		top: -.23rem;
		left: .2rem;
		width: 2.14rem;
		height: 2.14rem;
		border: 1px solid #ccc;
		background-color: #fff;
	}
	.choose-size-title-price {
		margin-left: 2.57rem;
		padding-top: .2rem;
		width: 4.7rem;
	}
	.choose-size-price-text, .choose-size-price-text span {
		font-size: .45rem;
		color: #f33;
	}
	.choose-size-duration-text {
		margin: .15rem 0;
		font-size:.3rem;
	}
	.choose-size-duration-text, .choose-size-duration-text span {
		color: gray;
	}
	.choose-size-choosed-style {
		position: relative;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.choose-size-choosed-tit {
		position: absolute;
		color: #828282;
		font-size: .24rem;
	}
	.choose-size-choosed-text {
		font-size:.3rem;
		line-height: 1.5em;
		text-indent: 1.2rem;
	}
	.close-choose-size {
		position: absolute;
		top: .15rem;
		right: .24rem;
		width: .44rem;
		height: .44rem;
		font-size: .44rem;
	}
	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -.15em;
		fill: currentColor;
		overflow: hidden;
		background: url(../assets/p7.png) no-repeat center;
        background-size:.4rem .4rem;
	}
	.gl-choose-lens-content-wrap {
		position: relative;
		-webkit-overflow-scrolling: touch;
	}
	.choose-size-content {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		padding: 0rem .25rem .5rem;
		overflow-y: auto;
		max-height: 5.6rem;
	}
	.choose-title-wrap {
		padding-top: .5rem;
	}
	.choose-title-wrap span {
		font-size: .3rem;
	}
	.Specs-list {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		-webkit-justify-content: flex-start;
		align-items: center;
		-webkit-align-items: center;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		margin-top: .2rem;
	}
	.specs-detial-normalSpecs {
		position: relative;
		height: .89rem;
		line-height: .89rem;
		padding: 0 .5rem;
		font-size:.3rem;
		margin-right: 5%;
		margin-bottom: .2rem;
		border: 1px solid #ccc;
		border-radius: .06rem;
		box-sizing: border-box;
	}
	.specs-detial-checked {
		border: 1px solid #0b9aff;
		border-radius: .06rem;
	}
	.Specs-list>div.specs-detial-normalSpecs.specs-detial-checked {
		background: #0b9aff;
		color: #fff;
	}
	.choose-num-wrap {
		position: relative;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		box-pack: justify;
		-webkit-box-pack: justify;
		align-items: center;
		-webkit-align-items: center;
		height: 1.25rem;
		line-height: 1.25rem;
		margin-top: .375rem;
	}
	.choose-num-wrap::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		border-bottom: 1px solid #ccc;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	.choose-num-test {font-size: .375rem;}
	.contral-num {
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		-webkit-justify-content: space-around;
		align-items: center;
		-webkit-align-items: center;
		height: .67rem;
		border: 1px solid #dadada;
		border-radius: .05rem;
	}
	
	.count-reduce, .count-add {
		position: relative;
		width: .625rem;
		height: .625rem;
		background-color: #F4F4F4;
	}
	.count-reduce {border-top-left-radius: .03rem;border-bottom-left-radius: .03rem;}
	.count-add {border-top-right-radius: .03rem;border-bottom-right-radius: .03rem;}
	.count-horizontal {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 50%;
		height: .02rem;
		background-color: #353535;
		transform: translate3d(-50%,-1px,0);
		-webkit-transform: translate3d(-50%,-1px,0);
	}
	.count-disabled span {background-color: #dadada;}
	.buy-count {
		height: .67rem;
		line-height: .67rem;
		padding: 0 .3rem;
		border-left: 1px solid #dadada;
		border-right: 1px solid #dadada;
		font-size: .3rem;
	}
	.choose-size-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 1.2rem;
		line-height: 1.2rem;
		width: 100%;
		text-align: center;
		background-color: #fff;
	}
	.choose-bottom-btn-wrap {
		position: relative;
		display: flex;
		display: -webkit-flex;
		justify-content: space-around;
		-webkit-justify-content: space-around;
		align-items: center;
		-webkit-align-items: center;
	}
	.buy-now, .buy-now-choose {
		color: #fff;
		background-color: #0b9aff;
		cursor: pointer;
	}
	.buy-shopcar-choose {
		position: relative;
		font-family: PingFang-SC-Medium;
		font-size: .37rem;
		color: gray;
		background-color: #fff;
	}
	.choose-bottom-btn-wrap li {
		position: relative;
		flex-grow: 1;
		-webkit-flex-grow: 1;
		font-size: .37rem;
		width: 50%;
		height: 1.2rem;
		cursor: pointer;
	}
	.buy-shopcar-choose::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 1px;
		width: 100%;
		border-top: 1px solid #ccc;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	
		
</style>
