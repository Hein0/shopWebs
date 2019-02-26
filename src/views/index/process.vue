<template>
	<div class="process">
		<div class="process_centent" >
			<p>投保流程。</p>
		</div>
	</div>
</template>

<script>
	import { Cell, CellBox } from 'vux'
	export default {
		name:"process",
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

<style>
	.process{background:#fff;}
	.process_centent{padding:15px;line-height:28px;font-size:16px;}
    
    
</style>