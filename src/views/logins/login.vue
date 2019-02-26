<template>
    <div class="loginMian">
        <div class="login2_bg">
           <img src="../../assets/login_bg.png" />
        </div>
        <div class="loginenter" @click="choiceenter">
          	<span :class="choicecolor ? 'ff' : ''" data-id="1">验证码登录</span><i>|</i>
          	<span :class="choicecolor ? '' : 'ff'" data-id="2" class="passwordenter">密码登录</span>
        </div>
        <div class="loginWrap">
        	<!--快捷登录-->
	        <div class="login2_cont" v-if="this.choicecolor==true">
	        	<div class="tel_input">
	        		<i class="tel_icon"></i>
	        		<span><input type="tel" placeholder="请输入手机号码" v-model="phone" maxlength="11"/></span>
	        	</div>
	        	<div class="tel_input">
	        		<i class="pasw_icon"></i>
	        		<span><input type="tel" placeholder="请输入验证码" v-model="verify"  maxlength="6"/></span>
	        		<button class="verifybut" @click="verifybut" :disabled="verifyButFlag">
				      <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
				      <span v-if="!sendMsgDisabled">发送验证码</span>
				    </button>
	        	</div>
	        	<div class="login_but">
			        <x-button type="primary" action-type="button" @click.native="login2">登录</x-button>
		        </div>
	        </div>
	        <!--密码登录-->
	        <div class="login_centen" v-else>
	        	<div class="tel_input">
	        		<i class="tel_icon"></i>
	        		<span><input type="tel" placeholder="请输入手机号码"  v-model="phones"/></span>
	        	</div>
	        	<div class="tel_input">
	        		<i class="pasw_icon"></i>
	        		<span v-show="eyeshow"><input type="text" placeholder="请输入密码" v-model="password" /></span>
	        		<span v-show="!eyeshow"><input type="password" placeholder="请输入密码" v-model="password" /></span>
	        		<i class="yan" :class="eyeshow?'off':'hine'" @click="eyeshow=!eyeshow"></i>
	        	</div>
	        	
	        	<div class="loginBut">
			        <x-button type="primary" action-type="button" @click.native="login">登录</x-button>
		        </div>
	        </div>
	        <!--注册、忘记密码-->
	        <div class="jump_but">
	        	<span class="fl_left">
	        		<router-link :to="{path:'/register',query: {}}">注册新用户</router-link>
	        	</span>
	        	<span class="fl_right">
	        		<router-link :to="{path:'/forgetPasw',query: {}}">忘记密码?</router-link>
	        	</span>
	        </div>
        </div>
        
        <toast v-model="toastshow" type="text" width="10em">{{showtext}}</toast>
    </div>
</template>

<script>
	import { XButton,Toast,ButtonTab, ButtonTabItem} from 'vux'
	import cookie from '../../config/util/cookie' 
	import util from '../../config/util/util'
	import store from '../../vuex/store'
	import { mapGetters } from 'vuex'

    export default {
	  	name: 'login',
	    components: {
	    	XButton,
	    	Toast,
	    	ButtonTab,
    		ButtonTabItem,
	    },
	    data () {
			return {
				phone:'',//快捷登录手机号
				verify:'',//验证码
				phones:'',//密码登录手机号
		        password:'',//密码
				choicecolor: true,//验证码登录还是快捷登录
				toastshow:false,
				showtext:'',
				sendMsgDisabled:false,
				verifyButFlag:false,
				time:60,
				myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
				backUrlIsPage:true, //跳转page或者controller
				backControllerPath:'',
				eyeshow:false,
			}
	    },
	    computed: {
			// 使用对象展开运算符将 getters 混入 computed 对象中
			...mapGetters([
				'loginBackUrl'
			])
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
	    //组件写入dom结构之前s
	    mounted:function(){
	    	//console.log(this.$route.fullPath.indexOf('backURL'));
			if(this.$route.fullPath.indexOf('backURL')>0){//平安进保险分期 处理回调url
				if(this.$route.fullPath.indexOf('#page#')>0){//回调  跳转page
					let backUrl = this.$route.hash,
					backUrlObj = util.parseURL(backUrl);
					//console.log('123',backUrlObj);
					store.commit('setLoginBackUrl',{
						path: backUrlObj.path,
						query: backUrlObj.params
					});
				}else if(this.$route.fullPath.indexOf('#controller#')>0){//回调  跳转controller
					this.backUrlIsPage = false;
					this.backControllerPath = this.$route.fullPath.split('#controller#')[1] ;
				}
			}
	    },
	    //方法对象
	    methods:{
	    	//切换登录方式
	    	choiceenter(e) {
		        var ids = e.target.dataset.id;
		        if (ids == 2) { // 密码登录
		          	this.choicecolor = false;
		          	this.sendMsgDisabled = false;
		          	this.phone = "";
		          	this.code = "";
		        } else {
		          	this.choicecolor = true;
		          	this.eyeshow = false;
		          	this.phones = "";
		          	this.password = "";
		        }
		    },
	    	//获取验证码
	    	verifybut(){
	    		var _this=this;
				if(this.phone==""){
					_this.showtext = "请输入手机号";
            		_this.toastshow = true;
	      	 	}else if(!this.myreg.test(this.phone)){
					_this.showtext = "手机号格式不正确";
            		_this.toastshow = true;
	      	 	}else{
			        _this.verifyButFlag = true;
					

					_this.$http.post(this.$root.url+"member/securityCode", {
		    			"phone": this.phone,
			            "type":2
		    		}, {headers: {'Content-Type': 'application/json;charset=UTF-8'},})
		    		.then(function(data) {// 这里是处理正确的回调
						if(data.body.ask==0){
				    		this.showtext = '验证码已经发送，请注意查收短信!';
				    		_this.sendMsgDisabled = true;
					        let interval = window.setInterval(function() {
					          if ((_this.time--) <= 0) {
					            _this.time = 60;
					            _this.verifyButFlag = false;
					            _this.sendMsgDisabled = false;
					            window.clearInterval(interval);
					          }
					        }, 1000);
				    	}else{
				    		_this.verifyButFlag = false;
							this.showtext = data.body.message;
				    	}
				    	this.toastshow = true;
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				        _this.time = 0;
				        this.showtext = '发送失败，请重新发送';
	            		this.toastshow = true;
				    });
            	}
	    	},
	    	//快捷登录
		  	login2() {
	      	 	var _this = this;
	      	 	if(this.phone==""){
					_this.showtext = "请输入手机号";
            		_this.toastshow = true;
	      	 	}else if(!this.myreg.test(this.phone)){
					_this.showtext = "手机号格式不正确";
            		_this.toastshow = true;
	      	 	}else if(this.verify==""){
					_this.showtext = "请输入验证码";
            		_this.toastshow = true;
	      	 	}else{
					_this.$http.post(this.$root.url+"case/login", {
		    			"telphone": this.phone,
		    			"random": this.verify
		    		}, {
		    			headers: {'Content-Type': 'application/json;charset=UTF-8'},
				    }).then(function(data) {// 这里是处理正确的回调
				        var datas = data.body.data;
				        if(data.body.ask==0 && datas){
				        	cookie.Cookie.set("token",datas.token);
				        	cookie.Cookie.set("phoneNo",_this.phone);
				        	if(_this.backUrlIsPage){
				        		_this.loginBackUrl.query['phoneNo'] = _this.phone;//透传 登录后的邀请码
								_this.$router.push(_this.loginBackUrl)//记录的上一页路由
				        	}else{
				        		location.href = _this.$root.url + _this.backControllerPath + '&token=' + datas.token +'&phoneNo=' + _this.phone;
				        	}
				        }else{
				        	_this.showtext = data.body.message;
            				_this.toastshow = true;
				        }
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				        _this.showtext = 'error';
            			_this.toastshow = true;
				    });
            	}
	        },
	        //密码登录
			login(){
	    		var self=this;
		  		if(this.phone!==""&&this.myreg.test(this.phone)&&this.password!==""){
					self.$http.post(this.$root.url+"member/login", {
		    			phone: this.phone,
		    			password: this.password,
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
				    }).then(function(data) {// 这里是处理正确的回调
				    	console.log(data)
				        var datas=data.body.data;
				        if(data.body.ask==0&&datas){
				        	cookie.Cookie.set("token",datas.token);
				        	this.$router.push({path:'/',query: {}})//跳转路由模块
				        }
				
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });	
            	}else{
            		self.showtext = '内容不能为空或格式错误';
            		self.toastshow = true;
            	}
	    	}


		}
	}
</script>

<style scoped>
    .loginMian{min-height: 100%;background-color: #fff;}
	.login2_bg{width:100%;}
	.login2_bg img{width:100%;min-height:147px;display: block;}
	.loginWrap{padding:20px}
    .login2_cont{}
    .login2_cont .tel_input{display: -webkit-box;display: -ms-flexbox;display: flex;border-bottom: 1px solid #D9D9D9;padding:0.45rem 0.15rem 0.15rem;}
    .login2_cont .tel_input i.tel_icon{width:0.73rem;height:0.8rem;line-height:0.8rem;background:url(../../assets/login_sj_icon.png) no-repeat left center;background-size:20px 20px;margin-right:5px;}
    .login2_cont .tel_input span{height:0.8rem;overflow:hidden;-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: left;font-size: 0.17rem;}
    .login2_cont .tel_input span input{height:0.8rem;line-height:0.8rem;width:100%;border:none;font-size:0.42rem;}
    .login2_cont .tel_input .verifybut{height:0.8rem;line-height:0.8rem;width:2rem;text-align:center;border:1px solid #2490FF;color:#2490FF;border-radius:3px;background-color: #fff;}
    .login2_cont .tel_input i.pasw_icon{width:0.73rem;height:0.8rem;line-height:0.8rem;background:url(../../assets/yzm-icon.png) no-repeat left center;background-size:20px 20px;margin-right:5px;}
    .login_but{width:100%;margin:auto;padding:25px 0 10px;margin-top:20px;}

    .loginenter{color: #a0a0a0;padding-left: 1.275rem;padding-right: 1.425rem;text-align: center;font-size:0.34rem}
    .loginenter i{color: #2491ff; padding: 0 0.4533rem;font-style:normal}
    .ff {color: #2491ff;}
    
    .jump_but{width: 100%;padding: 10px 0;font-size:0.34rem}
    .jump_but:after{clear:both;content: '';display: block;}
    .jump_but .fl_left{float:left;color:#A9B2B9}
    .jump_but .fl_right{float:right;color:#A9B2B9}
    .jump_but .fl_left a,.jump_but .fl_right a{color:#A9B2B9}
    
    /*密码登录*/
    .login_centen{}
    .login_centen .tel_input{display: -webkit-box;display: -ms-flexbox;display: flex;border-bottom: 1px solid #D9D9D9;padding:0.45rem 0.15rem 0.15rem;}
    .login_centen .tel_input i.tel_icon{width:0.73rem;height:0.8rem;background:url(../../assets/login_sj_icon.png) no-repeat left center;background-size:20px 20px;margin-right:5px;}
    .login_centen .tel_input span{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: left;font-size: 0.37rem;}
    .login_centen .tel_input span input{height:0.8rem;line-height:0.8rem;width:100%;border:none;font-size:0.42rem;}
    
    .login_centen .tel_input i.pasw_icon{width:0.73rem;height:0.8rem;background:url(../../assets/login_ys_icon.png) no-repeat left center;background-size:20px 18px;margin-right:5px;}
    .login_centen .tel_input i.yan{width:0.73rem;height:auto;display: inline-block;text-align: center;}
    .login_centen .tel_input i.hine{background:url(../../assets/yan_icon.png) no-repeat center center;background-size:0.73rem auto;}
    .login_centen .tel_input i.off{background:url(../../assets/QM_icon.png) no-repeat center center;background-size:0.73rem auto;}
    .loginBut{width:100%;margin:auto;padding:25px 0 10px;margin-top:20px;}
    
    
    
    
</style>
<style>
	.login_but .weui-btn_primary,.loginBut .weui-btn_primary{background-color: #2491ff !important;display: block;width: 6.4rem;height: 1.04rem;border: none;border-radius: 0.52rem;margin: 0 auto;font-size: 0.4533rem;line-height: 1.04rem; color: #fff;}
	.weui-toast_text .weui-toast__content{padding: 10px 5px;}
</style>