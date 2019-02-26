<template>
	<div class="pageList">
		<!--头部导航-->
		<headBack :fH="true" :sS="true" :gwC="true" :msg="msgTitle"></headBack>
		<div class="commend-list box">
			<div class="commend-wrap">
				<ul class="productList">
					<li class="item aLinkJump"  @click="gotoDetail('1300365033060100001')">
						<div class="item-img">
							<img src="https://bfs.biyao.com/group1/M00/3C/45/rBACYVsXW3WASFM6AACGOP3R1yc261.jpg" onerror="javascript:this.src='https://static.biyao.com/mnew/img/base/zwpic_5f672e7.png'">
						</div>
						<div class="item-des">
								<p class="item-price"><i>￥</i>
									<span class="item-price-int">399</span>
								</p>
								<p class="item-labels">
									<span style="background:#AB7FD1;color:#FFFFFF;border-color:#AB7FD1">精选</span>
									<span style="background:;color:#FB4C81;border-color:#FB4C81">一起拼</span>
								</p>
								<p class="item-bck escp">LACOSTE制造商直供</p>
								<p class="item-title escp">男士单层系带德比鞋</p>
								<p class="item-praise escp">930条好评</p>
						</div>
					</li>
					<li class="item aLinkJump"  @click="gotoDetail('1300365033060100001')">
						<div class="item-img">
							<img src="https://bfs.biyao.com/group1/M00/3C/45/rBACYVsXW3WASFM6AACGOP3R1yc261.jpg" onerror="javascript:this.src='https://static.biyao.com/mnew/img/base/zwpic_5f672e7.png'">
						</div>
						<div class="item-des">
								<p class="item-price"><i>￥</i>
									<span class="item-price-int">399</span>
								</p>
								<p class="item-labels">
									<span style="background:#AB7FD1;color:#FFFFFF;border-color:#AB7FD1">精选</span>
									<span style="background:;color:#FB4C81;border-color:#FB4C81">一起拼</span>
								</p>
								<p class="item-bck escp">LACOSTE制造商直供</p>
								<p class="item-title escp">男士单层系带德比鞋</p>
								<p class="item-praise escp">930条好评</p>
						</div>
					</li>
				</ul>
			</div>
			
			
		</div>
	</div>		
</template>

<script>
	import { XButton, Toast, Alert} from 'vux'
	import headBack from '../../components/head-back'
	/*组件*/
	export default {
		name: 'comment',
		components: {
			XButton,
			Toast,
			Alert,
			headBack,
		},
		data () {
			return {
				msgTitle:this.$route.meta.title,//路由标题
				
			}
		},
		//组件创建完成
		created(){

		},
		//组件写入dom结构之前
		mounted(){

		},
		//计算属性
		computed:{
          
          
        },
		//方法
		methods:{
	        //购买详情页
	        gotoDetail(id){
	        	this.$router.push({path:'/detail',query: {id:id}});
	        },
	        
		}
	}
</script>

<style scoped>
	.box {-moz-box-sizing: border-box;-webkit-box-sizing: border-box; box-sizing: border-box;}
	.commend-list {display: -webkit-flex;display: flex; -webkit-flex-wrap: wrap;flex-wrap: wrap;}
	.commend-list .commend-wrap {width: 100%;}
	.commend-list .productList {display: -webkit-flex;display: flex;-webkit-flex-wrap: wrap; flex-wrap: wrap;}
	.commend-list .item { position: relative;width: 4.98rem;border-bottom: .02rem solid #F4F4F4;border-right: .02rem solid #F4F4F4;background: #fff;}
	.commend-list li:nth-of-type(-n+2) {border-top: .02rem solid #F4F4F4;}
	.commend-list .item .item-img {width: 4.98rem; height: 4.98rem; box-sizing: border-box;}
	.commend-list .item .item-img img {height: 100%;display: inline-block;}
	
	.commend-list .item-des { padding: .16rem .24rem .28rem;}
	.commend-list .item-price {font-size: 0;color: #F7A701;margin-bottom: .12rem;}
	.commend-list .item-price i, span.item-price-float { font-size: .2rem;float: none;width: auto; height: auto; margin-top: 0;line-height: 1;}
	.commend-list .item-price span {display: inline-block;width: auto;color: #F7A701;}
	.commend-list .item-price .item-price-int {font-size: .32rem;}
	.commend-list .item-labels {line-height: .26rem; overflow: hidden;}
	.item-labels span {display: inline-block;height: .2rem;line-height: .2rem; margin-right: .08rem; font-size: .18rem; color: #FFF;padding: .03rem .04rem;border-radius: .02rem; border: 1px solid #fff;margin-bottom: .12rem;width: auto;}
	.item-labels span:last-of-type { margin-right: 0;}
	.commend-list .item-bck { width: 3.18rem;line-height: .33rem; color: #BF9E6B;font-size: .24rem;margin-bottom: .08rem;}
	.escp {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.commend-list .item-title {font-size: .24rem;color: #4A4A4A;line-height: .33rem;}
	
	
	

	
	
</style>