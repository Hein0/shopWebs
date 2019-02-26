<template>
	<div class="index-root">
		<div class="header">
	      	<search-bar ></search-bar>
	      	<head-tabs></head-tabs>
	    </div>
	    <div class="content">
			<main-swiper></main-swiper>
			<index-product></index-product>
	    </div>
		<!--<div class="index-wrap">
			
			<div class="index">
				<div class="img-wrap">
					<img class="img-1" src="../../assets/index-1.png">
					<img class="img-2" src="../../assets/index-2.png">
					<img class="img-3" src="../../assets/index-3.png">
					<img class="img-3" src="../../assets/index-4.png">
					<img class="img-3" src="../../assets/index-5.png">
				</div>
				<div class="nav">
					<ul>
						<li>
							<router-link to="/guide">
								<img class="li-img" src="../../assets/index-6.png" alt="">
								<p>理赔指南</p>
							</router-link>
						</li>
						<li>
							<router-link to="/questions">
								<img class="li-img" src="../../assets/index-7.png" alt="">
								<p>常见问题</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>-->
		<!--<div class="btn-wrap">
			<router-link to="/" @click.native="getTempId(1)">
				<img class="btn-img" src="../../assets/index-8.png" alt="">
			</router-link>
			<router-link to="/" @click.native="getTempId(2)">
				<img class="btn-img" src="../../assets/index-8.png" alt="">
			</router-link> 
		</div>-->
		<toast v-model="toastshow" type="text" width="10em">{{showtext}}</toast>
		<alert v-model="alertShow" @on-hide='alertClose'> {{alertTxt}}</alert>
	</div>
</template>

<script>
	import { XButton, Toast, Alert} from 'vux'
	import { mapGetters,mapActions } from 'vuex'
    import searchBar from "../../components/Search-bar";
    import HeadTabs from "../../components/Head-tabs.vue";
    import MainSwiper from "../../components/Main-Swiper.vue";
    import IndexProduct from "../../components/Index-product.vue";
    import cookie from '../../config/util/cookie' 
	/*组件*/
	export default {
		name: 'indexs',
		components: {
			XButton,
			Toast,
			Alert,
			searchBar,
			HeadTabs,
			MainSwiper,
			IndexProduct,
		},
		data () {
			return {
				toastshow:false,
				showtext:'',
				phoneNo:'',
				alertShow:false,//错误提示框
        		alertTxt:"您有未处理的分期订单，请优先处理",//错误提示语
			}
		},
		created(){
      		this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
			/*this.phoneNo = this.$route.query.phoneNo?this.$route.query.phoneNo:'';
			console.log(this.phoneNo)
			*/
		},
		computed:{
          ...mapGetters([
            'recommenderCode'
          ])
        },
		//方法
		methods:{
			getTempId(type){
	            this.$http({
					method: 'GET',
					url: this.$root.url + "userCenter/initTempUserNo",
					params: {'recommenderCode':this.$route.query.recommenderCode},
				}).then(function (res) {
					if(res.data.ask==0){
						let data = res.data.data;
						this.SetRecommenderCode(data.tempUserId);
						cookie.Cookie.set("tempUserId ",data.tempUserId);
						if(data.applyFlag){
							//pingAnURL
							if(type==1){
								//this.$router.push({path:'/pinganView',query: {'tempUserId':data.tempUserId,type:1}});
								location.href = this.$root.pingAnURL_VCI + '?userId=' + data.tempUserId;
							}else if(type==2){
								this.$router.push({path:'/pinganView',query: {'tempUserId':data.tempUserId,type:2}});
							}
						}else{
							this.alertShow = true;
						}
					}else{
						this.showtext = '获取数据失败';
            			this.toastshow = true;
					}
	            }, function (error) {
					this.showtext = '获取数据失败';
            		this.toastshow = true;
	            })
	        },
	        alertClose(){
	        	this.$router.push({path:'/order',query: {}});
	        },
	        
	        ...mapActions([
            	'SetRecommenderCode'
            ])
		}
	}
</script>

<style scoped lang="less">
	
  
	.index-root{
		width: 100vw;
	    min-height: 4rem;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	    -webkit-box-pack: start;
	    -webkit-justify-content: flex-start;
	    justify-content: flex-start;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    font-family: PingFangSC-Light, helvetica, 'Heiti SC';
	    background-color: rgba(0,0,0,0.075);
	}
	.header{height: 2rem;width: 10rem;
	  display: flex;flex-direction: column;justify-content: flex-start;align-items: center;
	  overflow: hidden;background-color: rgba(255,255,255,1)}

	.content{
		height: 14.5rem ;
	  	width: 10rem;
	  	display: flex;
	  	flex-direction: column;
	  	justify-content: flex-start;
	  	align-items: center;
	  	/*overflow-y: scroll;*/
	  	overflow-x: hidden;
	}
	  
</style>
<style>
	.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color:#0b9aff !important;}
	/* Head-tabs*/
	.head-tabs .scrollable .vux-tab-item {flex: 0 0 18% !important;height: 60px !important;line-height: 60px !important;}
	.vux-tab-container {height: 60px !important;}
	.head-tabs .scrollable .vux-tab-ink-bar {bottom: 2px !important;}
	/* Main-swiper*/
	.vux-icon-dot {
	  	width: 36px !important;
	  	height: 4px !important;
	  	/* margin-left: 4px !important; */
	  	border-radius: 0 !important;
	}

</style>
