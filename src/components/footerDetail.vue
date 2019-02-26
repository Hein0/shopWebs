<template>
	<footer id="footerDetail" class="cart_d_footer">
        <div class="m">
            <ul class="m_box">
                <li class="m_item">
                    <div class="m_item_link" @click="goConsult">
                        <em class="m_item_pic"></em>
                        <span class="m_item_name">咨询</span>
                    </div>
                    <!--<div class="m_item_link">
                        <em class="m_item_pic two"></em>
                        <span class="m_item_name">关注</span>
                    </div>-->
                    <div class="m_item_link" @click="goActivity">
                        <em class="m_item_pic three"></em>
                        <span class="m_item_name">购物车</span>
                    </div>
                </li>
            </ul>
            <div class="btn_box clearfix" >
                <span class="buy_now" @click="addCart">加入购物车</span>
                <span class="buybuy" @click="shopNow">立即购买</span>
            </div>
        </div>
        <!--提示语组件-->
		<toast v-model="showPosition" type="text" :time="800" :is-show-mask="true" :text="texs" position="default"></toast>
    </footer>
</template>

<script>
	import { Toast } from "vux";
	
	export default {
		name: "footerDetail",
		data() {
			return {
				texs:"",//提示语内容
      			showPosition: false,
			};
		},
		//过滤器
		filters: {

		},
		//组件
		components: {
			Toast,
			
		},
		//组件创建完成
		created: function() {

		},
		//组件写入dom结构之前
		mounted: function() {
			
		},
		//方法
		methods: {
			//咨询
			goConsult(){
				this.texs = "开发中。。。"
				this.showPosition = true;
			},
			//去购物车
			goActivity(){
				this.$router.push({path:'/activity',query: {}});
			},
			//加入购物车
			addCart(){
				this.texs = "开发中。。。"
				this.showPosition = true;
			},
			//立即购买
			shopNow(){
				this.texs = "开发中。。。"
				this.showPosition = true;
			}
			
		},
		//监听
		watch: {
			
		},
		//计算属性
		computed: {

		},

		updated: function() {

		}
	};
	
</script>

<style scope>
	.cart_d_footer {
	    width: 100%;
	    height: 1.33rem;
	    position: fixed;
	    left: 0;
	    font-size:.37rem;
	    bottom: 0;
	    background-color: #fff;
	    border-top: 1px solid #BFBFBF;
	    border-bottom: 1px solid #BFBFBF;
	}
	
	.cart_d_footer .m {
	    width: 100%;
	    display: flex;
	    justify-content: space-around;
	}
	
	.m .m_box {
	    width: 40%;
	}
	
	.m .m_item {
	    display: inline-flex;
	    height: 100%;
	    text-align: center;
	    width: 100%;
	}
	
	.m_item .m_item_link {
	    display: inline-block;
	    width: 100%;
	    height: 100%;
	    text-align: center;
	}
	
	.m_item_link .m_item_pic {
	    display: block;
	    width: 0.6rem;
	    height: 0.6rem;
	    background: url("../assets/img/cart_sprits_all.png") no-repeat top center;
	    background-size: 100px 100px;
	    margin: 0.08rem auto 0;
	}
	
	.m_item_link .m_item_pic {
	    background-position: -0.7rem 0.04rem;
	}
	
	.m_item_link .two {
	    background-position: -1.3rem 0;
	}
	
	.m_item_link .three {
	    background-position: 0 -0.56rem;
	}
	
	.m .btn_box {
	    width: 60%;
	    height: 100%;
	    float: right;
	}
	
	.btn_box span {
	    display: inline-block;
	    width: 50%;
	    height: 1.33rem;
	    text-align: center;
	    color: #fff;
	    line-height: 1.33rem;
	}
	
	.btn_box .buy_now {
	    float: left;
	    background-color: #FFB03F;
	}
	
	.btn_box .buybuy {
	    float: right;
	    background-color: #F23030;
	}
</style>