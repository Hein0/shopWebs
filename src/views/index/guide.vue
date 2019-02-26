<template>
	<div class="guide">
		<div class="guide_centent" >
			<div class="img-wrap">
				<img class="guide-1" src="../../assets/guide-1.png">
				<img class="guide-2" src="../../assets/guide-2.png">
				<img class="guide-2" src="../../assets/guide-3.png">
				<img class="guide-2" src="../../assets/guide-4.png">
				<img class="guide-2" src="../../assets/guide-5.png">
				<img class="guide-2" src="../../assets/guide-6.png">
				<img class="guide-2" src="../../assets/guide-7.png">
			</div>
		</div>
	</div>
</template>

<script>
	import { Cell, CellBox } from 'vux'
	export default {
		name:"guide",
	    props: {
	    	
	    },
	    components: {
	    	Cell,
	    	CellBox
	    },
	    data () {
      		return {
      			
      		}	
	    },
	    //实例已经创建完成之后
	  	created(){
      		this.$parent.init();
		},
		//监视
		watch:{

		},
		//组件写入dom结构之前
		mounted(){
			
		},
		//方法对象
    	methods:{
    		
    	}
	}    
</script>

<style scoped lang="less">
	.guide{background:#fff;}
	.guide_centent{
		padding:15px;
		line-height:28px;
		font-size:16px;
		color:#8ca3b5;
		.img-wrap{
			max-width:768px;
			margin:0 auto;
			padding:9% 0;
			img {
				display:block;
				margin-left:auto;
				margin-right:auto;
				width:93.75%;
			}
			.guide-1{
				margin-bottom:4.6%;
			}
			.guide-2{
				
			}
		}
	}
    
</style>