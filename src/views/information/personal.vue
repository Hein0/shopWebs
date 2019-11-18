<template>
	<div class="presonal">
		<div class="p-info">
			<div class="p-pannel">
				<img @click="presolink" class="p-icon" :src="avatarUrl" alt="">
				<div class="p-n">
					<span class="p-name">{{memberName}}</span>
					<img v-if="isBrjqStaff" class="p-staff" src="../../assets/user-2.png" alt="">
				</div>
			</div>
		</div>
		<ul class="p-links">
			<li>
				<router-link :to="{path:'/order',query: {}}">
					<img class="p-l-img" src="../../assets/user-5.png" alt="">
					<p class="p-l-txt">我的订单</p>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/myloan',query: {}}">
					<img class="p-l-img" src="../../assets/user-5.png" alt="">
					<p class="p-l-txt">我的贷款</p>
				</router-link>
			</li>
			<li>
				<router-link :to="myQcodeUrl">
					<img class="p-l-img" src="../../assets/user-6.png" alt="">
					<p class="p-l-txt">我的二维码</p>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/inviteRecode',query: {}}">
					<img class="p-l-img" src="../../assets/user-7.png" alt="">
					<p class="p-l-txt">邀请记录</p>
				</router-link>
			</li>
			<li>
				<router-link :to="{path:'/about',query: {}}">
					<img class="p-l-img" src="../../assets/user-8.png" alt="">
					<p class="p-l-txt">关于我们</p>
				</router-link>
			</li>

		</ul>
		<div class="outRow">
			<button class="out-button " >退出登录</button>
		</div>
		<toast v-model="toastshow" type="text" width="10em">{{showtext}}</toast>
	</div>
</template>

<script>
import { Tabbar, TabbarItem, Cell, Toast } from 'vux'
import cookie from '../../config/util/cookie'
/*组件*/
export default {
  	name: 'personal',
    components: {
	    Tabbar,
	    TabbarItem,
	    Cell,
	    Toast
  	},
    data () {
	    return {
			avatarUrl:require("../../assets/user-1.png"),//头像地址
			avatarUrlDefault:require("../../assets/user-1.png"),//默认头像地址
			token:'',//获取token
			memberName:'',//用户名
			orderNuber:'',//未完成统计数据
			orderCount:{
				all:0,
				pending:0,
				finished:0
			},
			myQcodeUrl:'',
			isBrjqStaff:false, //是否佰仟员工
			toastshow:false,
			showtext:'',
	    }
	},
	//实例已经创建完成之后
    created(){
        this.$parent.init();
	},
	//组件写入dom结构之前
	mounted(){

		this.token = cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';
    // this.getUserInfo();

	},
	//方法
    methods:{

      getUserInfo(){
        this.$http.post(this.$root.url+"member/getMemberInfo", {
        }, {
              headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
          }).then(function(data) {// 这里是处理正确的回调
              var datas=data.body.data;
              if(data.body.ask==0 && datas && datas.memberInfo){
                this.memberName = datas.memberInfo.memberName;
                this.avatarUrl = datas.memberInfo.avatarUrl?datas.memberInfo.avatarUrl:this.avatarUrlDefault;
                this.myQcodeUrl = {path:'/myQcode',query: {phoneNo:datas.memberInfo.phoneNo}};
                this.isBrjqStaff = datas.memberInfo.jobNumber?true:false;
                //console.log(this.myQcodeUrl);
            }else{
            this.showtext = '获取数据失败';
                  this.toastshow = true;
            }
          }, function(error) {// 这里是处理错误的回调
              console.log(error)
          });
        //请求数据统计
        this.$http.post(this.$root.url+"order/countAllCase", {
          "orderStatus":0
        }, {
            headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
        }).then(function(data) {// 这里是处理正确的回调
            var datas=data.body.data;
            if(data.body.ask==0&&datas){
              this.orderCount = datas;
          }else{
          this.showtext = '获取数据失败';
                this.toastshow = true;
          }
        }, function(error) {// 这里是处理错误的回调
            console.log(error)
        });
      },


	  	presolink(){
            this.$router.push({path:'/message',query: {}})//其中login是你定义的一个路由模块
	  	}
	}
}
</script>

<style scoped lang="less">
	.presonal{background-color:#fff;padding-bottom: 1rem;}
	.p-info{
		width:100%;
		background:url('../../assets/user-3.png') no-repeat top center;
		background-size:100% 60%;
		padding-top:36px;
		margin-bottom:15px;
		.p-pannel{
			width:93.4375%;
			margin:0 auto;
			background:url('../../assets/user-4.png') no-repeat top center;
			background-size:100% 100%;
			padding-top:28px;
			padding-bottom:28px;
			.p-icon{
				display:block;
				margin:0 auto;
				width:47px;
				height:47px;
				border-radius:100%;
			}
			.p-n{
				text-align:center;
				color:#434f5d;
				margin:6px auto 20px;
				.p-name{
					display:inline-block;
					vertical-align:middle;
					font-size:14px;
					margin-right:8px;
				}
				.p-staff{
					display:inline-block;
					vertical-align:middle;
					width:42px;
					height:14px;
				}
			}

		}
	}
	.p-links{
		text-align:center;
		list-style:none;
		position:relative;
		border-top: 1px solid #eee;
		-moz-box-sizing: border-box;
     	-webkit-box-sizing: border-box;
     	box-sizing: border-box;
		li{
			width:33%;
			float:left;
			padding:24px 0;
			position:relative;
			border-right: 1px solid #eee;
			border-bottom: 1px solid #eee;
			.p-l-img{
				width:40px;
				height:35px;
				display:block;
				margin:0 auto 16px;
			}
			.p-l-txt{
				color:#a9b2b9;
				font-size:12px;
			}
			a{
				display:block;
				margin:0 auto;
			}
		}
		li:nth-child(3n){border-right:none;}
	}
	.p-links:after{content: " ";clear: both;display: block;}
	.outRow{width: 7rem;margin: 1rem 1.5rem 0rem;}
	.outRow .out-button{display: block;width: 100%;height: 1.04rem;line-height: 1.04rem;background-color: #e6e6e6 ;color: #666;font-size: .42rem;border-radius:0.52rem;}

</style>
<style>
	.list_link .weui-cell{padding:15px;}
</style>
