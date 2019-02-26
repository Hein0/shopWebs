<template>
	<div class="questions">
		<div class="hotQa">
			<div class="h-header">
				<img :src="qaType.icon" alt="">
				<span>{{qaType.name}}</span>
			</div>
			<div class="qa-item" v-for="(val,index) in qaList">
				<cell :title="index+1+'、'+val.question" is-link :arrow-direction="showContent==index ? 'up' : 'down'" @click.native="showContentBut(index)"></cell>
				<cell-box v-if="showContent==index" class="sub-item">答：{{val.answer}}</cell-box>
			</div>
		</div>
	</div>
</template>

<script>
	import { Cell, CellBox } from 'vux'
	import {qaTypes, hotQaIds} from '../../config/util/QAData'
	import qaDataFun from '../../config/util/QAData' 

	export default {
	    components: {
	    	Cell,
	    	CellBox
	    },
	    data () {
      		return {
      			showContent:"",
      			qaTypes:qaTypes,
      			hotQaIds:hotQaIds,
      			qaList:[],
      			qaType:{
      				typeId:'',
					name:'',
					icon:'',
      			}
      		}	
	    },
	    //实例已经创建完成之后
	  	created(){
      		this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
			let typeId = this.$route.query.type ? this.$route.query.type : '';//分类id
			let qaObj = qaDataFun.getQaListByTypeId(typeId);
			this.qaList = qaObj.qaList;
			this.qaType = qaObj.qaType;
		},
		//方法对象
    	methods:{
    		//点击当前
    		showContentBut(inds){
    			this.showContent = inds;
    		}
    	}
	}    
</script>

<style scoped lang="less">
	.questions{background-color:#eef2f9;}
	.questions .weui-cell:before {content: " ";position: absolute;left: 0;top: 0;right: 0;height: 1px;
    border-top: 1px solid #d9d9d9;color: #d9d9d9;
    -webkit-transform-origin: 0 0; transform-origin: 0 0;
    -webkit-transform: scaleY(.5);transform: scaleY(.5);left: 0;}
    .sub-item {background-color:#eef2f9;color:#808080;font-size:13px;}
    .weui-cell_access{color:#434f5d;font-size:13px;}
    
    .hotQa{
    	background-color:#fff;
		.h-header{
			padding:3.75% 4.375%;
			position:relative;
			img{
				display:inline-block;
				vertical-align:middle;
				width:8.2%;
				margin-right:2.5%;
			}
			span{
				display:inline-block;
				vertical-align:middle;
				font-size:15px;
				color:#000;
			}
		}
		.h-header:after{content: " ";position: absolute;left: 0;bottom: 0;width: 100%;height: 1px;border-bottom: 1px solid #eee;-webkit-transform-origin: 0 100%;transform-origin: 0 100%;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
    }
    .qa-item{
    	position:relative;
    }
    .qa-item:after{content: " ";position: absolute;left: 0;bottom: 0;width: 100%;height: 1px;border-bottom: 1px solid #eee;-webkit-transform-origin: 0 100%;transform-origin: 0 100%;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
</style>