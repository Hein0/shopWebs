<template>
	<div class="backWrap">
	    <div class="back_frame">
	    	<div class="backBar">
	    		<!--首页-->
	    		<div class="iconWrap" v-if="sY" @click="goHome">
		   			<p class="iconStle sy"></p>
		   		</div>
		   		<!--返回-->
		   		<div class="iconWrap" v-if="fH" @click="goBack">
		   			<p class="iconStle fh"></p>
		   		</div>
		   		<!--标题-->
		   		<div class="back_frame_center" :class="{text12: sS && gwC }">
		   			<span class="search-clear">{{msg}}</span>
		   		</div>
		   		<!--搜索-->
		   		<div class="iconWrap" v-if="sS" @click="goSearch">
		   			<p class="iconStle ss"></p>
		   		</div>
		   		<!--购物车-->
		   		<div class="iconWrap" v-if="gwC" @click="goShopCart">
		   			<p class="iconStle gwc"></p>
		   		</div>
		   		<!--菜单-->
		   		<div class="iconWrap" v-if="cD" @click="toMenu">
		   			<p class="iconStle cd"></p>
		   		</div>
	   		</div>
	    </div>
    </div>
</template>

<script>
	import { Search} from 'vux'
	export default{
		name: 'headBack',
    	components: {
		    Search
		},
		/*父组件*/
		props: {
	      	sY: false,//首页
	      	fH: false,//返回
	      	sS: false,//搜索
	      	gwC: false,//购物车
	      	cD: false,//购物车
	      	msg:"",//标题
	    },	
		data () {
		    return {
		    	

		    }
	    },
	    //实例已经创建完成之后
	    created(){
	    	
		},
	    //方法对象
	    methods:{
		    
		    //返回首页
			goHome(){
				this.$router.push({path:'/',query: {}});
			},
			//返回上一层
			goBack(){
				window.history.go(-1);
//				this.$router.go(-1);
			},
			//去搜索页
			goSearch(){
				this.$router.push({path:'/search',query: {}});
			},
			//去购物车页
			goShopCart(){
				this.$router.push({path:'/activity',query: {}});
			},
			//点击菜单
			toMenu(){
				
			}
		  	
		},
		
		//计算属性
		computed:{
        
        },
        //监听
        watch: {
		    
		},
	    
	}
	
</script>

<style scoped>
	.backWrap{height:1.2rem;}
	.backWrap .back_frame{height:1.2rem;position:fixed;z-index:200;width:100%;margin:0 auto;top:0;left: 0;right:0; background:#fff;}
    .backWrap .back_frame .backBar{z-index: 1;position: relative;border-bottom: #e4e4e4 solid .015rem;display: -webkit-box;display: flex;}
    .backWrap .back_frame .backBar .back_frame_center{width:8.3rem;color:#666;text-align:center;height:0.85rem;display:inline-block;font-size:0.42rem;line-height:0.85rem;position:relative;padding:0.15rem .1rem;border-radius:3px;}
    .backWrap .back_frame .backBar .back_frame_center.text12{text-indent: 1.2rem;;}
    .backWrap .back_frame .backBar .iconWrap{width:1.2rem;display:inline-block;height:0.85rem;text-align: center;font-size:0.38rem;line-height:0.85rem;padding:0.15rem .1rem;}
    .backWrap .back_frame .backBar .iconWrap .iconStle{height:0.85rem;text-align: center;border-radius:3px;font-size:0.42rem;}
    .backWrap .back_frame .backBar .iconWrap .iconStle.sy{background: url(../assets/icon_sy2.png) no-repeat center;background-size:0.6rem 0.6rem}
    .backWrap .back_frame .backBar .iconWrap .iconStle.fh{background: url(../assets/left_icon.png) no-repeat center;background-size:0.6rem 0.6rem}
	.backWrap .back_frame .backBar .iconWrap .iconStle.ss{background: url(../assets/search.png) no-repeat center;background-size:0.5rem 0.5rem}
	.backWrap .back_frame .backBar .iconWrap .iconStle.gwc{background: url(../assets/icon_gwc2.png) no-repeat center;background-size:0.6rem 0.6rem}
	.backWrap .back_frame .backBar .iconWrap .iconStle.cd{background: url(../assets/img/spriteIcon.png) no-repeat center;background-size:0.6rem 0.6rem}
	
	
</style>