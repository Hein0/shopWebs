<template>
	<div class="comment">
		<!--头部导航-->
		<headBack :fH="true" :cD="true" :msg="msgTitle"></headBack>
		<div class="commentItem box">
			<div class="goodItem box">
				<div class="goodImg box">
					<img class="box" src="../../assets/about-1.png" />
				</div>
				<table class="goodInfo box" >
					<tbody >
						<tr >
							<td >
								<div class="box">
									<div class="goodName box" >设计师款 男式海洋蓝印</div>
									<div class="goodspec box" >颜色:蓝色迷彩</div>
									<div class="goodspec box" >尺码:XL</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--  -->
			<div class="mb-comment">
				<div class="rateWrapper">
					<span>评价</span>
					<ul class="mb-rate">
						<li v-for="(itemClass,index) in itemClasses" :class="itemClass" @click="stars(index)" class="defauStyle"></li>
						<span>{{scoreText}}</span>
					</ul>
				</div>
				<!-- 差评时 -->
				<div class="problemList" v-show="isShow">
					<div class="title">请选择您遇到的问题:</div>
					<ul >
						<li class="tag" v-for="(item,index) in problemList" @click="chooseOrder($event,item.type)" key='index'>{{item.problem}}</li>
					</ul>
				</div>
				<!-- 评论框 -->
				<div class="commentTextarea">
					<textarea maxlength="300" name="content" placeholder="说说值得推荐的理由吧~ "></textarea>
					<div class="count" >
						<span >0</span>
						<span >/300</span>
					</div>
				</div>
			</div>
			<!-- 提交 -->
			<div class="commitWrap">
				<div class="commitButton">提交</div>
			</div>
			
		</div>
	</div>		
</template>

<script>
	import { XButton, Toast, Alert} from 'vux'
	import util from '../../config/util/util'
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
				isShow:false,
				score: 5,//星数
				scoreText:"非常满意",//评星提示语
				problemList:[
				{problem:"商品问题",type:"1"},
				{problem:"客服问题",type:"2"},
				{problem:"物流问题",type:"3"},
				{problem:"包装问题",type:"4"},
				{problem:"其它",type:"5"}],
				problemType:[],
				
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
        	itemClasses(){
				let result = []; // 返回的是一个数组,用来遍历输出星星
				let score = Math.floor(this.score * 2 ) / 2; // 计算所有星星的数量
				let hasDecimal = score % 1 !== 0; // 非整数星星判断
				let integer = Math.floor(score); // 整数星星判断
				for(let i=0;i<integer;i++){ // 整数星星使用defau-yellow
					result.push("defau-yellow"); // 一个整数星星就push一个CLS_ON到数组
				}
//				if(hasDecimal){ // 非整数星星使用half
//					result.push("half"); // 类似
//				
//				} 
				score <=3 ? this.isShow = true : this.isShow = false;
				while(result.length < 5){// 余下的用无星星补全,使用defau
					result.push("defau");
				}
				return result;
			} 	
          
        },
		//方法
		methods:{
	        stars:function(index){
				this.score = index + 1
			},
			//选择、取消
	        chooseOrder:function(e,type){
                if (e.target.className.indexOf("selected") == -1) {
                    e.target.className = "tag selected"; //切换按钮样式
                    this.problemType.push(type);
                } else {
                    e.target.className = "tag";//切换按钮样式
		        	this.problemType.splice(util.contains(type,this.problemType),1);//删除数组的某个
                }
	        },
		}
	}
</script>

<style scoped>
	.box {-moz-box-sizing: border-box;-webkit-box-sizing: border-box; box-sizing: border-box;}
	.commentItem{ position: relative; margin-bottom: .4rem;overflow: hidden;    background-color: #fff;padding:.3rem;}
	.commentItem .goodItem{margin:.3rem 0;overflow: hidden;position: relative;}
	.commentItem .goodItem .goodImg{width:1.8rem;height:1.8rem;position: absolute;left: 0;top: 0;}
	.commentItem .goodItem .goodImg img{width:100%;height:100%;border: none;}
	.commentItem .goodItem .goodInfo {margin-left: 2.1rem; width:7rem; height: 1.86667rem;vertical-align: middle;}
	.commentItem .goodItem .goodInfo .goodName { width: 100%;overflow: hidden;text-overflow: ellipsis; font-size: .37333rem;}
	.commentItem .goodItem .goodInfo .goodspec {font-size: .32rem;color: #666;}
	
	.mb-comment .problemList>.title { font-size: .32rem;color: #7f7f7f; margin-bottom: .05rem;}
	.mb-comment .problemList>ul {margin-bottom: .4rem;}
	.mb-comment .problemList .tag { display: inline-block;padding: .1rem .2rem .1rem;border: 1px solid #7F7F7F;border-radius: .05333rem; margin: .32rem .32rem 0 0;font-size: .32rem; line-height: .38667rem;}
	.selected{border: 1px solid #0b9aff !important;color:#0b9aff !important;}
	
	.mb-comment .rateWrapper {display: -webkit-box; display: -webkit-flex;display: -moz-flex;display: -ms-flexbox;display: flex;-webkit-flex-flow: row nowrap;-moz-flex-flow: row nowrap;-ms-flex-flow: row nowrap;flex-flow: row nowrap;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center; -moz-align-items: center; align-items: center;font-size: .37rem; margin-bottom: .4rem;}
	.mb-comment .rateWrapper>span { margin-right: .26667rem;}
	.mb-rate .defauStyle {width: .45rem; height: .44rem;float: left; margin-right: .21rem;display: inline-block;vertical-align: middle;background-repeat: no-repeat;background-size: 100% 100%;}		
	.mb-rate .defau {background-image: url(../../assets/img/pf-defau.png); }
	.mb-rate .defau-yellow {background-image: url(../../assets/img/pf-defau-yel.png);}
	.mb-comment .commentTextarea {height: 3.38rem;border: 1px solid #d9d9d9;margin-bottom: .26rem; border-radius: 3px; padding: .32rem; position: relative;}
	.mb-comment .commentTextarea textarea { border: 0; width: 100%;height: 100%;font-size: .37rem;}
	.mb-comment .commentTextarea .count {position: absolute; right: .26rem; bottom: .15rem; font-size: .37rem;color: #333; line-height: 1;}
	.commitWrap{text-align: center;margin: 0 auto;padding:.26rem 0;}
	.commitWrap .commitButton{width: 2.2rem;font-size: .37rem;margin: .26rem auto;height:.8rem;line-height: .8rem;border: 1px solid #999;color: #999;background-color: transparent;border-radius: 4px;overflow: hidden; }                                        
	
	
	
	
</style>