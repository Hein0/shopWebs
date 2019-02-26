<template>
	<div class="register">
		<div class="register_banner">
			<img src="../../assets/register_banner.png" />
		</div>
  	    <div class="register_input">
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
        	<div class="tel_input" v-if="codeFlag">
        		<i class="invite_icon"></i>
        		<span><input type="tel" placeholder="邀请码(可选填)" v-model="code" maxlength="11"/></span>
        	</div>
        	<div class="setpaswbuts">
				<x-button type="primary" action-type="button" @click.native="setpasw">注册</x-button>
			</div>
  	    </div>
		
		<div class="logins_but">
			<span>已有账号？<router-link :to="{path:'/login',query: {}}">马上登录</router-link></span>
		</div>

	    <div class="logins_agreement">
	      <div>点击“注册”，即表示您同意并愿意遵守</div>
	      <a href="javascript:;" @click="showPop">《用户注册服务协议》</a>
	    </div>

		<toast v-model="toastshow" type="text" width="10em">{{showtext}}</toast>

	    <div v-transfer-dom>
	      <x-dialog v-model="pop" :scroll="true" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '90%', 'background-color': 'transparent'}">
	        <div style="width: 95%;height:100%;background-color:#fff;margin:0 auto;border-radius:5px;padding:10px;overflow: scroll">
	          <div class="content">
	            <p style="text-align:center;">用户注册服务协议</p>
	            <br>
	            <p>在您注册成为保险分期用户之前，请您认真阅读保险分期用户注册服务协议（以下简称本协议）。您必须完全同意以下所有条款，方能成为保险分期用户。作为保险分期用户，您必须是中国大陆公民，年龄在18周岁以上，且具有完全的民事权利能力及民事行为能力。如不具备上述资格，您应立即停止相关注册程序、停止使用相关服务，本平台亦有权随时终止您的注册进程及服务。</p>
	            <p>一、用户条款的确认和接受</p>
	            <p>1. 本协议是注册用户与深圳市佰仟金融服务有限公司（以下简称佰仟金融）之间的法律协议。</p>
	            <p>2. 基本定义：</p>
	            <p>A．“保险分期”是指佰仟金融旗下为消费者提供保费分期中介服务的平台。</p>
	            <p>B．“注册用户”是指愿意接受或实际上已经接受保险分期产品和服务的个人。</p>
	            <p>3. 本协议是注册用户接受保险分期产品和服务时适用的通用条款。因此，在注册成为保险分期的注册用户前或接受保险分期产品和服务之前，确认已经详细地阅读了本协议的所有内容。</p>
	            <p>4. 注册用户了解并同意：只要注册用户点击“同意”按钮并完成注册，注册用户就已接受了本协议及佰仟金融公布的各项服务规则（包括填写实名的联系方式等等），并愿意受其约束。如果发生纠纷，注册用户不得以未仔细阅读为由进行抗辩。</p>
	            <p>5. 注册用户了解并同意：随着市场经营情况的变化，保险分期有权随时更改本协议及相关服务规则。修改本协议时，保险分期将于相关页面公告修改的事实，并有权不对注册用户进行个别通知。注册用户应该在每次登录购买商品或服务前查询保险分期官方发布的相关公告，以了解本协议及其他服务规则的变化。若注册用户不同意本协议或相关服务规则，或者不同意保险分期作出的修改，注册用户可以主动停止使用保险分期提供的产品和服务，如果在保险分期修改协议或服务规则后，注册用户仍继续使用保险分期提供的产品和服务，即表示注册用户同意保险分期对本协议及相关服务规则所做的所有修改。由于注册用户在本协议变更后因未熟悉公告规定而引起的损失，保险分期将不会承担任何责任。</p>
	            <p>6. 保险分期（以下简称本平台）的各项电子服务的所有权和运作权归本平台所有。本平台提供的服务将完全按照其发布的服务条款和操作规则严格执行。注册用户必须完全同意所有服务条款并完成注册程序，才能成为本平台的注册用户。注册用户确认：本协议条款是处理双方权利义务的当然约定依据，除非违反国家强制性法律，否则始终有效。在下订单的同时，您也同时承认了您拥有购买这些产品的权利能力和行为能力，并且将您对您在订单中提供的所有信息的真实性负责。</p>
	            <p>二、服务及隐私保护</p>
	            <p>本平台运用自己的操作系统通过国际互联网络为注册用户提供网络服务。同时，注册用户必须：</p>
	            <p>1.	自行配备上网的所需设备，包括个人电脑或其他必备上网装置。</p>
	            <p>2.	自行负担个人上网所支付的与此服务有关的网络费用。</p>
	            <p>3.	提供详尽、准确的个人资料。</p>
	            <p>4.	不断更新注册资料，以符合及时、详尽、准确的要求。</p>
	            <p>5.	本平台对注册用户的手机号等隐私资料进行保护，承诺不会在未获得注册用户许可的情况下擅自将注册用户的个人资料信息出租或出售给任何第三方，但以下情况除外。</p>
	            <p>A．	注册用户同意让第三方共享资料。</p>
	            <p>B．	注册用户同意公开其个人资料，以享受为其提供的产品和服务。</p>
	            <p>C．	本平台需要听从法庭传票、法律命令或遵循法律程序。</p>
	            <p>D．	本平台发现注册用户违反了本协议或本平台其它使用规定。</p>
	            <p>如果注册用户提供的资料包含有不正确的信息，本平台保留立即停止向该注册用户使用网络服务资格的权利。</p>
	            <p>三、注册用户的帐户信息保护及披露</p>
	            <p>1. 注册用户一旦注册成功，成为本平台的合法的注册用户。您可随时根据需要改变您的密码。注册用户将对注册用户名和密码安全负全部责任。另外，每个注册用户都要对以其注册用户名进行的所有活动和事件负全责。注册用户若发现任何非法使用注册用户帐户或存在安全漏洞的情况，请立即通告本平台。</p>
	            <p>2. 注册用户同意本平台在业务运营中收集和储存用户的用户信息，包括但不限于用户自行提供的资料和信息，以及本平台自行收集、取得的用户在本平台的交易记录和使用信息等。本平台收集和储存的用户信息的主要目的在于提高为用户提供服务的效率和质量。</p>
	            <p>3. 注册用户同意本平台在业务运营中使用用户的用户信息，包括但不限于：</p>
	            <p>A. 向本平台的合作机构（该合作机构仅限于本平台为了完成拟向您提供的服务而合作的机构）提供用户的用户信息；</p>
	            <p>B. 由人工或自动程序对用户用户信息进行评估、 分类、研究；</p>
	            <p>C. 使用用户的用户信息以改进本平台的推广；</p>
	            <p>D. 使用用户提供的联系方式与用户联络并向推送有关业务和管理方面的信息。</p>
	            <p>4. 本平台可能通过审查用户的资料以区分或鉴定使用多个用户名或别名的用户，以识别问题或解决有关争议。</p>
	            <p>四、拒绝提供担保及免责声明</p>
	            <p>注册用户个人对网络服务的使用承担风险。本平台对此不作任何类型的担保，不论是明确的或隐含的，但是不对商业性的隐含担保、特定目的和不违反规定的适当担保作限制。本平台不担保服务一定能满足注册用户的要求，也不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保。本平台对在本平台上得到的任何商品、服务或交易进程，不作担保。</p>
	            <p>五、用户管理</p>
	            <p>注册用户单独承担发布内容的责任。用户对服务的使用是根据所有适用于服务的地方法律、国家法律和国际法律标准的。注册用户承诺：</p>
	            <p>1．在本平台的网页上发布信息或者利用本平台的服务时必须符合中国有关法规，不得在本平台的网页上或者利用本平台的服务制作、复制、发布、传播以下信息： </p>
	            <p>A. 反对宪法所确定的基本原则的。</p>
	            <p>B. 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的。</p>
	            <p>C. 损害国家荣誉和利益的。</p>
	            <p>D. 煽动民族仇恨、民族歧视，破坏民族团结的。</p>
	            <p>E. 破坏国家宗教政策，宣扬邪教和封建迷信的。</p>
	            <p>F. 散布谣言，扰乱社会秩序，破坏社会稳定的。</p>
	            <p>G. 散布淫秽、色情、赌博、暴力、凶杀、恐怖内容或者教唆犯罪的。</p>
	            <p>H. 侮辱或者诽谤他人，侵害他人合法权益的。</p>
	            <p>J. 含有法律、行政法规禁止的其他内容的。</p>
	            <p>2．在本平台的网页上发布信息或者利用本平台的服务时，还必须符合其他有关国家和地区的法律规定以及国际法的有关规定。</p>
	            <p>3．不利用本平台的服务从事以下活动：</p>
	            <p>A. 未经允许，进入计算机信息网络或者使用计算机信息网络资源的。</p>
	            <p>B. 未经允许，对计算机信息网络功能进行删除、修改或者增加的。</p>
	            <p>C. 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的。</p>
	            <p>D. 故意制作、传播计算机病毒等破坏性程序的。</p>
	            <p>E. 其他危害计算机信息网络安全的行为。</p>
	            <p>4．不以任何方式干扰本平台的服务。</p>
	            <p>5．遵守本平台的其他规定和程序。</p>
	            <p>6. 注册用户须对自己在使用本平台服务过程中的行为承担法律责任，承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，在本平台首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予本平台等额赔偿。用户理解，如果本平台发现其网站传输的信息明显属于第五条第一款所列内容之一，依据中国法律，本平台有义务立即停止传输，保存有关记录，向国家有关机关报告，并且删除含有该内容的地址、目录或关闭服务器。 </p>
	            <p>7. 用户使用本平台论坛服务进行信息发布条件的行为，也须遵守本条的规定。</p>
	            <p>8． 若用户的行为不符合以上提到的服务条款，本平台将作出独立判断立即取消其服务账号。</p>
	            <p>六、有限责任</p>
	            <p>本平台对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害可能来自：不正当使用网络服务，在网上购买商品或进行同类型服务，在网上进行交易，非法使用网络服务或注册用户传送的信息有所变动。这些行为都有可能会导致本平台的形象受损，所以本平台事先提出这种损害的可能性。</p>
	            <p>七、通告</p>
	            <p>所有发给注册用户的通告都可通过重要页面的公告或电子邮件或常规的信件传送。本平台的活动信息也将定期通过页面公告及电子邮件方式向注册用户发送。注册用户协议条款的修改、服务变更、或其它重要事件的通告会以电子邮箱或者短信进行通知。</p>
	            <p>八、责任限制</p>
	            <p>1. 如因不可抗力或其他本平台无法控制的原因使本平台销售系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，本平台不承担责任。但是本平台会尽可能合理地协助处理善后事宜。</p>
	            <p>2. 除了本平台的使用条件中规定的其它限制和除外情况之外，在中国法律法规所允许的限度内，对于因交易而引起的或与之有关的任何直接的、间接的、特殊的、附带的、后果性的或惩罚性的损害，或任何其它性质的损害，本平台、本平台的管理人员、雇员、代理或其它代表在任何情况下都不承担责任。</p>
	            <p>九、法律管辖和适用</p>
	            <p>1. 本协议的订立、执行和解释及争议的解决均应适用中国法律。</p>
	            <p>2. 如发生本平台服务条款与中国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它合法条款则依旧保持对注册用户产生法律效力和影响。</p>
	            <p>3. 本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规定可被删除而其余条款应予以执行。</p>
	            <p>4. 如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；如协商无法解决，任何一方均应提请深圳国际仲裁院按照其仲裁规则进行仲裁，该仲裁裁决是终局裁决，对双方均有约束力。</p>
	            <p>十、其他规定</p>
	            <p>1. 如本用户协议中的任何内容无论因何种原因完全或部分无效或不具有执行力，本用户协议的其余内容仍应有效并且对协议各方有约束力。</p>
	            <p>2. 本用户协议中的标题仅为方便而设，不具法律或契约效果。</p>
	            <p>3. 本协议条款的最终解释权归深圳市佰仟金融服务有限公司所有。</p>
	            <p style="text-align:right;">2017年9月  日</p>
	          </div>
	          <btn msg="关闭" @btnClickEvent="colsePop"></btn>
	        </div>
	      </x-dialog>
	    </div>
	</div>
</template>

<script>
	import { XInput, XButton, Toast,XDialog,TransferDomDirective as TransferDom} from 'vux'
	import axios from 'axios'
	import cookie from '../../config/util/cookie'
	import util from '../../config/util/util'
	import store from '../../vuex/store'
	import { mapGetters } from 'vuex'
  import Btn from '../widget/buttom-1'

	export default{
		name: 'register',
    directives: {
      TransferDom
    },
    	components: {
		    XInput,
		    XButton,
		    Toast,
        XDialog,
        'btn': Btn
		},
		data () {
		    return {
				idCard:'',//身份证
				phone:'',//预留手机号
				verify:'',//验证码
				code:'',  //密码
				eyeshow:false,
				myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
				isIDCard1:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
		    	sendMsgDisabled:false,
			    verifyButFlag:false,
			    time:60,
			    toastshow:false,
		    	showtext:'',
		    	phoneNo:'',
		    	backUrlIsPage:true, //跳转page或者controller
				backControllerPath:'',
				codeFlag:false,//是否有邀请码
          pop:false
		    }
	    },
	    //实例已经创建完成之后
	    created(){
			this.$parent.init();
		},
		computed: {
			// 使用对象展开运算符将 getters 混入 computed 对象中
			...mapGetters([
				'loginBackUrl'
			])
	    },
		//组件写入dom结构之前
		mounted(){
            this.code = this.$route.query.phoneNo?this.$route.query.phoneNo:'';
            this.codeFlag = this.code?false:true;
		},
	    //方法对象
	    methods:{
            //获取验证码
            verifybut(){
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
			            "type":1
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
				    }).then(function(data) {// 这里是处理正确的回调
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
            //注册绑定
            setpasw(){
            	var _this=this;
            	/*if(this.idCard==""){
					_this.showtext = "请输入身份证";
            		_this.toastshow = true;
	      	 	}else if(!this.isIDCard1.test(this.idCard)){
					_this.showtext = "身份证格式不正确";
            		_this.toastshow = true;
	      	 	}else */
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
					_this.$http.post(this.$root.url+"member/register", {
		    			"phone": this.phone,
		    			// "idCard": this.idCard,
		    			"recommenderCode": this.code,
		    			"securityCode": this.verify
		    		}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8'},
				    }).then(function(data) {// 这里是处理正确的回调
			        	if(data.body&&data.body.ask==0&&data.body.code=="0000"){
							//_this.$router.push({path:'/login',query: {}})//跳转路由模块

							cookie.Cookie.set("token",data.body.data.token);
							cookie.Cookie.set("phoneNo",_this.phone);

							let backUrlType = _this.$route.query.backUrlType?_this.$route.query.backUrlType:'',
								backPath = _this.$route.query.backPath?_this.$route.query.backPath:'';
								console.log(backUrlType)
							if(backUrlType=='page'){
				        		_this.loginBackUrl.query['phoneNo'] = _this.phone;//透传 登录后的邀请码
								_this.$router.push(_this.loginBackUrl)//记录的上一页路由
				        	}else if(backUrlType=='controller'){
				        		location.href = _this.$root.url + backPath + '&token=' + data.body.data.token +'&phoneNo=' + _this.phone;
				        	}else{
				        		_this.$router.push({path:'/',query: {}})//首页
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
        showPop(){
          this.pop=true;
        },
        colsePop(){
          this.pop=false
        }
		},
	}
</script>

<style scoped>
	.register_input{background:#fff;}
	.register{background:#fff;min-height: 100%;}
	.register_banner{width:100%;}
	.register_banner img{width:100%;min-height:98px;display: block;}
	.register_title{padding:10px 20px 10px 45px;position:relative;font-size:18px;color:#2591ff}
	.register_title:before{content: " ";height:30%;width:3px;position:absolute;left:25px;top:35%;color:#2591FF;bottom:0;right:15px;background:#2591FF;}

    .register_input{background:#fff;padding:20px 20px 0;}
    .register_input .tel_input{display: -webkit-box;display: -ms-flexbox;display: flex;border-bottom: 1px solid #D9D9D9;padding:0.4rem 0.15rem 0.15rem;}
    .register_input .tel_input i.tel_icon{width:0.73rem;height:0.8rem;background:url(../../assets/login_sj_icon.png) no-repeat left center;background-size:20px 20px;margin-right:5px;}
    .register_input .tel_input span{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: left;font-size: 13px;}
    .register_input .tel_input span input{height:0.8rem;line-height:0.8rem;width:100%;border:none;font-size:16px;color:#8ca3b5;}
    .register_input .tel_input .verifybut{height:0.8rem;line-height:0.8rem;width:100px;text-align:center;border:1px solid #2490FF;color:#2490FF;border-radius:3px;background-color: #fff;}
    .register_input .tel_input i.pasw_icon{width:0.73rem;height:0.8rem;background:url(../../assets/login_ys_icon.png) no-repeat left center;background-size:20px 20px;margin-right:5px;}
    .register_input .tel_input i.invite_icon{width:0.73rem;height:0.8rem;background:url(../../assets/login_invite_icon.png) no-repeat left center;background-size:20px 20px;margin-right:5px;}

	.setpaswbuts{width:100%;margin:auto;padding:25px 0 10px;margin-top:20px;}
	.logins_but{padding:10px 0 15px;margin:0 auto;text-align: center;color:#8ca3b5;font-size: 14px;}
	.logins_but span a{color:#2591FF;}
	.logins_agreement{margin:15% 5px 5px;text-align: center;color:#434f5d;font-size:12px;}
	.logins_agreement a{color:#0b92f1;}
	.verifybut{text-align:center;border:1px solid #2490FF;color:#2490FF;background-color: #fff;}
	.setpaswbuts .weui-btn_primary {background-color: #2491ff !important;display: block;width: 6.4rem;height: 1.04rem;border: none;border-radius: 0.52rem;margin: 0 auto;font-size: 0.4533rem;line-height: 1.04rem; color: #fff;}
</style>
<style>
	.register_input .weui-cell:before{border:none;}
	.register_input .weui-cell:after {content: " ";position: absolute;bottom: 0;right:20px;height: 1px;border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5); left: 20px;}
    .register_input .weui-cell{padding:15px 20px;}
    .register_title:after{content: " ";position: absolute;bottom: 0;right: 20px;height: 1px;
    border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;
    transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);left: 20px;}

   .content{font-size:12px;text-align:left;color:#333}
</style>
