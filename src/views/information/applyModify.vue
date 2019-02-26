<template>
	<div class="applyModify">
  	    <div class="apply_centent">
  	    	<x-input title="身份证号码" class="weui-vcode" placeholder="请输入身份证号码" v-model="idCard"></x-input>
	        <x-input title="手机号码" class="weui-vcode" placeholder="请输入手机号码" v-model="phone"></x-input>
	        <x-input title="验证码" class="weui-vcode" placeholder="请输入验证码"  v-model="verify">
	        	<x-button slot="right" type="primary" mini @click.native="verifyBut" :disabled="verifyButFlag">{{verifyButMsg}}</x-button>
	        </x-input>
  	    </div>
		<div class="apply_butt">
			 <x-button type="primary" action-type="button" @click.native="applybuts">提交</x-button>
		</div>
		<toast v-model="toastshow" type="text" width="10em">{{showtext}}</toast>
	</div>
</template>

<script>
	import { XInput, XButton, Toast} from 'vux'
	import cookie from '../../config/util/cookie'

	export default{
		name: 'applyModify',
    	components: {
		    XInput,
		    XButton,
		    Toast
		},
		data () {
		    return {
		        phone:'',//预留手机号
		        myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
		        isIDCard1:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
		        verify:'',//验证码
		        idCard:'',//身份证号码
		        token:'',//token值
		        toastshow:false,
				showtext:'',
				sendMsgDisabled:false,
				verifyButFlag:false,
				verifyButMsg:'发送验证码',
				time:60,
		    }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
           this.token = cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';
           console.log(this.token)
		},
	    //方法对象
	    methods:{
	    	//获取验证码
	    	verifyBut(){
	    		var _this = this;
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
			            "type":5,
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
//				        emulateJSON: false
				    }).then(function(data) {// 这里是处理正确的回调
						if(data.body.ask==0){
				    		this.showtext = '验证码已经发送，请注意查收短信!';
				    		_this.sendMsgDisabled = true;
					        let interval = window.setInterval(function() {
					            _this.verifyButMsg = _this.time>0?_this.time+'秒后获取':'发送验证码';
					            if ((_this.time--) <= 0) {
						            _this.time = 60;
						            _this.verifyButFlag = false;
						            _this.sendMsgDisabled = false;
						            window.clearInterval(interval);
						            _this.verifyButMsg = '发送验证码';
						        }
						    }, 1000);
				    	}else{
				    		_this.verifyButFlag = false;
							this.showtext = data.body.message;
				    	}
				    	this.toastshow = true;
				    }, function(error) {// 这里是处理错误的回调
				        _this.time = 0;
				        this.showtext = '发送失败，请重新发送';
	            		this.toastshow = true;
				    });
            	}
	    	},
	    	//提交
		  	applybuts(){
		  		var _this=this;
		  		if(this.idCard==""){
					_this.showtext = "请输入身份证号";
            		_this.toastshow = true;
	      	 	}else if(!this.isIDCard1.test(this.idCard)){
					_this.showtext = "身份证号格式不正确";
            		_this.toastshow = true;
	      	 	}else if(this.phone==""){
					_this.showtext = "请输入手机号";
            		_this.toastshow = true;
	      	 	}else if(!this.myreg.test(this.phone)){
					_this.showtext = "手机号格式不正确";
            		_this.toastshow = true;
	      	 	}else if(this.verify==""){
					_this.showtext = "请输入验证码";
            		_this.toastshow = true;
	      	 	}else{
					_this.$http({
			            method: 'GET',
			            url: this.$root.url+"member/vilidateIdentity",
				        params: {
				            "phone": this.phone,
			    			"idCard": this.idCard,
			    			"securityCode": this.verify
				        },
			            headers: {
			            	"token":this.token
			            }
			        }).then(function (res) {
			            console.log(res)
			         	var datas=res.body;
				        if(datas.ask==0&&datas.code=="0000"){
				        	this.$router.push({path:'/cardModfy',query: {}})//其中login是你定义的一个路由模块
				        }else{
				        	_this.showtext = res.body.message;
            				_this.toastshow = true;
				        }
			        }, function (error) {
						console.log(error)
						_this.showtext = error;
            			_this.toastshow = true;
			        });
            	}
		  	}

		},
		//计算属性
		computed:{

        }

	}

</script>

<style scoped>
	input, textarea {-webkit-appearance: none;outline: none;}
	.apply_centent{padding:5px 0px 10px;}
	.applyModify{background:#fff;margin: 10px;border-radius: 5px;}
	.apply_butt{width:60%;margin:auto;padding:25px 0 20px}
</style>
<style>
	.apply_butt .weui-btn_primary {background-color: #2491ff !important;}
	.apply_centent .weui-cell:before{border:none;}
	.apply_centent .weui-cell:after {content: " ";position: absolute;left: 0;bottom: 0;right: 0;height: 1px;border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5); left: 15px;}
    .apply_centent .weui-cell{padding:15px;}
    .apply_centent .weui-btn_primary{background:none;border:1px solid #2490FF;color:#2490FF}
    .apply_centent .weui-btn_primary:active{background:#eeeef1;color:#2490FF;}
    .apply_centent .weui-label{width: 6em !important;}
</style>
