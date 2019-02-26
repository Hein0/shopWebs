<template>
	<div class="forgetpasw">
  	    <div class="forget_input">
  	    	<x-input class="weui-vcode" placeholder="输入注册时身份证号码" v-model="idCard"></x-input>
	        <x-input class="weui-vcode" placeholder="请输入手机号码" v-model="phone"></x-input>
	        <x-input class="weui-vcode" placeholder="请输入验证码" v-model="verify">
	        	<x-button slot="right" type="primary" mini  @click.native="verifybut">发送验证码</x-button>
	        </x-input>
	        
	        <div class="vux-x-input weui-cell weui-vcode">
	        	<div class="weui-cell__bd weui-cell__primary">
	        		<input placeholder="请设置新密码" v-show="eyeshow" type="text" v-model="password" class="weui-input">
	        		<input placeholder="请设置新密码" v-show="!eyeshow" type="password" v-model="password" class="weui-input">
	        	</div> 
	        	<div class="weui-cell__ft" @click="eyeshow=!eyeshow">
	        	    <span class="yan " :class="eyeshow?'off':'hine'"></span>
	        	</div>
	        </div>
  	    </div>
  	    
		<div class="setpaswbuts">
			 <x-button type="primary" action-type="button" @click.native="setpasw">重置密码</x-button>
		</div>
		<toast v-model="toastshow" type="text" width="20em">{{showtext}}</toast>
	</div>
</template>

<script>
	import { XInput, XButton,Toast} from 'vux'
	
	export default{
		name: 'forgetpasw',
    	components: {
		    XInput,
		    XButton,
		    Toast
		}, 
		data () {
		    return {
		        idCard:'',//身份证
		        phone:'',//预留手机号
		        verify:'',//验证码
		        password:'',  //密码
		        eyeshow:false,
		        toastshow:false,
		        showtext:'验证码已经发送，请注意查收短信!',
		        myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
		        isIDCard1:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
		    }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
           
		},
	    //方法对象
	    methods:{
	    	//获取验证码
            verifybut(){
            	var _this=this;
            	if(this.phone!==""&&this.myreg.test(this.phone)){
            		this.toastshow=true;
					_this.$http.post(this.$root.url+"member/securityCode", {
		    			"phone": this.phone,
			            "type":3
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
//				        emulateJSON: false
				    }).then(function(data) {// 这里是处理正确的回调
				
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
            	}else{
            		alert("手机号码不能为空或格式错误")
            	}
            },
            //重置密码
		  	setpasw(){
		  		var _this=this;
		  		if(this.phone!==""&&this.myreg.test(this.phone)&&this.idCard!==""&&this.isIDCard1.test(this.idCard)&&this.password!==""&&this.verify!==""){
					_this.$http.post(this.$root.url+"member/forgetPassword", {
		    			"phone": this.phone,
		    			"idCard": this.idCard,
		    			"password": this.password,
		    			"securityCode": this.verify
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
//				        emulateJSON: false
				    }).then(function(data) {// 这里是处理正确的回调
				    	console.log(data)
				        var datas=data.body;
				        if(datas.ask==0&&datas.code=="0000"){
				        	this.$router.push({path:'/login',query: {}})//跳转路由模块
				        }
				
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
            	}else{
            		alert("内容不能为空或格式错误")
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
	.forget_input{padding:5px 0px 10px;}
	.forgetpasw{background:#fff;}
	.forget_input .weui-vcode{font-size:0.42rem}
	.forget_input .weui-vcode .weui-cell__ft{height:0.8rem;line-height: 0.8rem;;}
	.forget_input .weui-vcode .weui-cell__ft span.yan{width:0.73rem;height:0.7rem;display: inline-block;text-align: center;}
	.forget_input .weui-vcode .weui-cell__ft span.hine{background:url(../../assets/yan_icon.png) no-repeat center center;background-size:0.73rem auto;}
    .forget_input .weui-vcode .weui-cell__ft span.off{background:url(../../assets/QM_icon.png) no-repeat center center;background-size:0.73rem auto;}
	.setpaswbuts{width:80%;margin:auto;padding:30px 0}
	.setpaswbuts .weui-btn_primary {background-color: #2491ff !important;display: block;width: 6.4rem;height: 1.04rem;border: none;border-radius: 0.52rem;margin: 0 auto;font-size: 0.4533rem;line-height: 1.04rem; color: #fff;}
</style>
<style>
	
	.forget_input .weui-cell:before{border:none;}
	.forget_input .weui-cell:after {content: " ";position: absolute;bottom: 0;right:15px;height: 1px;border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5); left: 15px;}
    .forget_input .weui-cell{padding:15px;}
    .forget_input .weui-btn_primary{background:none;border:1px solid #2490FF;color:#2490FF}
</style>