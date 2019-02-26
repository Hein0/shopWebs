<template>
	<div class="commentPage">
		<headBack :fH="true" :cD="true" :msg="msgTitle"></headBack>
		
		<div class="product-score">
			<span class="score-title">商品满意度</span>
			<span class="score-num">100%</span>
		</div>
		
		<div class="commentWraps">
			<section class="comment-item">
				<div class="commet-top">
					<div class="comment-user">
						<img class="user-img" src="https://bfs.biyao.com/group1/M00/07/BA/rBACYVkX_LCAIHy7AAASTOEAxG0510.jpg" onerror="javascript:this.src='https://static.biyao.com/m/img/base/defult_userimg.png'">
						<span class="user-name">3***7</span>
					</div>
					<div class="comment-icon-wrap">
						<span class="comment-icon">
							<span class="good"></span>
						</span>
						<span class="comment-icon-text">好评</span>
					</div>
				</div>
				<div class="comment-content">
					刚到货！质感很好，尺码标准。这是购买的第二双鞋！值得信赖！
					<div class="comment-time">2018-12-09 01:37:22</div>
				</div>
				<div class="comment-img-wrap">
					<img class="comment-img-item" src="https://bfs.biyao.com/group1/M00/7B/29/rBACW1wMAMOACyAiAAK7TIK7ruI002.jpg" onerror="javascript:this.src='https://static.biyao.com/m/img/base/zwpic.png'">
				</div>
				<!--商家回复-->
				<div class="supplier-reply-wrap">
					<span class="supplier-reply-title">[商家回复]</span>
					因为有您的认可，给我们带来了很大的动力，我们会继续用高端舒适的产品和优质的服务给您带来更愉快的购物体验，希望亲能一如既往的支持噢，非常感谢亲的支持！！
				</div>
			</section>
			<section class="comment-item">
				<div class="commet-top">
					<div class="comment-user">
						<img class="user-img" src="https://bfs.biyao.com/group1/M00/07/BA/rBACYVkX_LCAIHy7AAASTOEAxG0510.jpg" onerror="javascript:this.src='https://static.biyao.com/m/img/base/defult_userimg.png'">
						<span class="user-name">3***7</span>
					</div>
					<div class="comment-icon-wrap">
						<span class="comment-icon">
							<span class="good"></span>
						</span>
						<span class="comment-icon-text">好评</span>
					</div>
				</div>
				<div class="comment-content">
					刚到货！质感很好，尺码标准。这是购买的第二双鞋！值得信赖！
					<div class="comment-time">2018-12-09 01:37:22</div>
				</div>
				
			</section>
		</div>
		
	</div>
</template>

<style scoped>
	.product-score {position: relative;font-size:.37rem;height: 1rem;line-height: 1rem;padding: 0 .2rem;background-color: #fff;display: flex;display: -webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;
	    align-items: center;-webkit-align-items: center;box-shadow: 0.01rem 0.01rem 0.05rem rgba(7,0,2,.2);-webkit-box-shadow: 0.01rem 0.01rem 0.05rem rgba(7,0,2,.2);}
	.commentWraps {background-color: #eee;padding: .2rem 0;}
	.commentWraps .comment-item{position: relative; border-bottom: 1px solid #ccc;background-color: #fff;}
	.commentWraps .comment-item .commet-top {box-sizing: border-box;font-size:.37rem;position: relative;display: flex;display: -webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;align-items: center;-webkit-align-items: center;padding: 0 .2rem;height: 1.2rem;line-height: 1.2rem;}                                         
	.commet-top::after {content: "";position: absolute;bottom: 0;left: 50%;transform: translate3D(-50%,0,0) scaleY(0.5);-webkit-transform: translate3D(-50%,0,0) scaleY(0.5);width: 95%;height: 1px;border-bottom: 2px solid #ccc;}
	.user-img {width: .8rem;height: .8rem;display: inline-block;vertical-align: middle;border-radius: 50%;margin-right: .1rem;}
	
	.commentWraps .comment-item .comment-content {padding: .3rem .2rem;line-height: 1.5em;word-wrap: break-word;font-size:.34rem}
	.commentWraps .comment-item .comment-content .comment-time {margin-top: .2rem;}
	
	.commentWraps .comment-item .comment-img-wrap {padding: 0 .2rem; padding-bottom: .2rem;display: flex;display: -webkit-flex; justify-content: flex-start;-webkit-justify-content: flex-start;align-items: center; -webkit-align-items: center;flex-wrap: wrap;-webkit-flex-wrap: wrap;}
	.commentWraps .comment-item .comment-img-wrap .comment-img-item {width: 2.1rem;height: 2.1rem;display: block;margin: 0 .2rem .2rem 0;}
	
	.supplier-reply-wrap {margin: .2rem;border-radius: .2rem; font-size:.34rem;line-height: 1.5em;background-color: #eaf0f5;padding: .1rem;}
	.supplier-reply-title{color: #0b9aff;}
	
	
</style>
<script>
	import { Confirm , Tab, TabItem} from 'vux';
	import headBack from '../../components/head-back';
	
	export default{
		name: 'commentPage',
    	components: {
		    headBack,
		},

		data () {
		    return {
		    	msgTitle:this.$route.meta.title,//路由标题

		    }
	    },
	    //实例已经创建完成之后
	    created(){
	    	
		},
	    //方法对象
	    methods:{
		    

		  	
		},
		
		//计算属性
		computed:{
        
        },
        //监听
        watch: {
		    
		},
	    
	}
	
	
	
	
	
</script>
