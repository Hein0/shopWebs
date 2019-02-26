<template>
	<div class="classify">
		<div class="clasHeader">
			<div class="headerSite"></div>
			<div class="headerFix" @click="goSearch">
				<div class="search">
					<p class="iconfont">请输入您想要的商品</p> 
				</div>
			</div>
	    </div>
	    <!--左边菜单-->
	    <div class="category_content">
	       <CategoryLeftView></CategoryLeftView>
	       <CategoryRightView></CategoryRightView> 
	    </div>
	    
	</div>
	
</template>

<script>
	import { XButton, Toast, Alert} from 'vux'
	import CategoryLeftView from './categoryLeft.vue';
	import CategoryRightView from './categoryRight.vue';
	/*组件*/
	export default {
		name: 'classify',
		components: {
			XButton,
			Toast,
			Alert,
			CategoryLeftView,
			CategoryRightView,
		},
		data () {
			return {

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
	        //跳转搜索页
	       	goSearch(){
	       		this.$router.push({path:'/search',query: {}});
	       	}
	        
		}
	}
</script>

<style scoped>
	.clasHeader{position: relative;}
	.headerSite{height:.9rem;}
	.headerFix {position: fixed;top: 0;left: 0;z-index: 90;width: 10rem;border-bottom: 1px solid #ccc; overflow: hidden; background: #fff;}
	.headerFix .search{    display: block;width: 9.5rem;height: .8rem; line-height: .6rem;margin: .16rem auto;text-align: center; border-radius: .06rem; background-color: #f2f2f2;}  
	.headerFix .search .iconfont {display: inline-block; color: #666;text-align: center;padding-left:0.6rem;font-size: .3rem;background: url(../../assets/search.png) no-repeat left center;background-size: .5rem .5rem;}  
	  
	  
</style>