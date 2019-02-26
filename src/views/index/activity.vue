<template>
	<div class="activity">
	    <noData v-if="1">
	  		<img class="n-img" src="../../assets/img/gwc-icon.png" alt="">
	      	<p class="n-txt">去添加点什么吧</p>
	    </noData>
	</div>
</template>

<script>
	import { Cell, CellBox } from 'vux'
  	import noData from '../../components/noData'

	export default {
		name:"guide",
	    props: {

	    },
	    components: {
	    	Cell,
	    	CellBox,
        	noData:noData
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
	.activity {
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
</style>
