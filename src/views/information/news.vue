<template>
	<div class="news">
  	    <div class="news_list right-arrow">
  	    	<div class="lists_lf"><img src="../../assets/atprice.png"/></div>
  	    	<div class="lists_rt">
  	    		<div class="lists_rt_tit">邀请30元优惠券短信</div>
  	    		<div class="lists_rt_cent">邀请30元优惠券短信</div>
  	    	</div>
		</div>
		<div class="news_list right-arrow">
  	    	<div class="lists_lf"><img src="../../assets/atprice.png"/></div>
  	    	<div class="lists_rt">
  	    		<div class="lists_rt_tit">邀请30元优惠券短信</div>
  	    		<div class="lists_rt_cent">邀请30元优惠券短信</div>
  	    	</div>
		</div>
		
		
	</div>
</template>

<script>
	import { Selector} from 'vux'
	
	export default{
		name: 'news',
    	components: {
		    Selector
		}, 
		data () {
		    return {
		        
		        
		    }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
            var vms=this
            
		},
	    //方法对象
	    methods:{
		  	banner_onIndexChange (index) {
		      this.banner_index = index
		    },
		    logShow (str) {

		    },
		    
		},
		//计算属性
		computed:{
           
        }
	    
	}
	
</script>

<style scoped>
	input, textarea {-webkit-appearance: none;outline: none;}
	.news{background:#fff;padding:15px;}
	.news_list{padding:10px 0;border-bottom:1px solid #C8C8CD;width:100%;}
	.news_list:last-child{border-bottom:none;}
	.news_list:after{clear:both;content: '';display: block;}
	.news_list .lists_lf{float: left;width:60px;height:60px;border-radius:100%;text-align: center;}
	.news_list .lists_lf img{width:100%;height:100%;display: inline-block;}
	.news_list .lists_rt{float: left;margin-left:15px;height:60px;text-align: left;display: block;width:75%}
	.news_list .lists_rt .lists_rt_tit{font-size:16px;}
	.news_list .lists_rt .lists_rt_cent{font-size:14px;color:#C8C8CD;padding:5px 0px}
	
</style>
<style>
	
</style>