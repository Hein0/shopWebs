<template>
	<div class="nobrand">
		<!--<div class="cardModfy_centent" v-if="urlId=='1'">
	        <div class="cardModfy_centent_box ">
		        <div class="box_title">新车购置发票</div>
		        <div class="right_cent">
		        	<div class="zm_but2" v-if="vehicleInvoice">
		        		<span class="succeed"  @click="showImgBut(vehicleInvoice)">查看图片</span>
		        		<input type="file" multiple capture="camera"  accept="image/*" @change="img_inpuchage" />
		        	</div>
		        	<div class="zm_but" v-else>
		        		<span>点击上传</span>
		        		<input type="file" multiple capture="camera"  accept="image/*" @change="img_inpuchage" />
		        	</div>
		        </div>
	        </div>
	    </div>-->
	    <div class="cardModfy_centent" >
	        <div class="cardModfy_centent_box ">
		        <div class="box_title">行驶证</div>
		        <div class="right_cent">
		        	<div class="zm_but1" v-if="driving">
		        		<span class="succeed" @click="showImgBut(driving)">查看图片</span>
		        		<span class="showsBut" @click="shows"></span>
		        	</div>	
		        	<div class="zm_but" @click="shows" v-else>
		        		<span>点击上传</span>
		        	</div>
		        </div>
	        </div>
	    </div>
		
		<div class="input_center">
			<!--<div class="test_input_mark" v-if="urlId=='1'">
			    <datetime confirm-text="确定" cancel-text="取消" placeholder="请输入开票日期" v-model="billedDate" :title="'开票日期'"></datetime>
			</div>-->
			<!--<div class="test_select" v-if="urlId=='1'">
				<div class="test_select_cen test_select_cen2 right-arrow" >
		  	    	<label>厂牌型号<i @click="helpval=true"><img src="../../assets/question.png"/></i></label>
				    <span class="inputext" @click="linkSearch">{{inputvalue}}</span>
			    </div>
			</div>	-->
			<div class="test_select" >
				<div class="test_select_cen test_select_cen2 right-arrow" >
		  	    	<label>品牌车型<i @click="helpval=true"><img src="../../assets/question.png"/></i></label>
				    <span class="inputext" @click="linkSearch">{{inputvalue}}</span>
			    </div>
			</div>
			<div class="test_select">
	  	    	<div class="test_select_cen test_select_cen2">
		  	    	<label>发动机号码<i @click="helpval=true"><img src="../../assets/question.png"/></i></label>
				    <span class="inputs intext">
				    	<input type="text" placeholder="请输入发动机号码" v-model="engineNo" />
				    </span>
			    </div>
			</div>
			<div class="test_select">
	  	    	<div class="test_select_cen test_select_cen2">
		  	    	<label>车辆识别代号<i @click="helpval=true"><img src="../../assets/question.png"/></i></label>
				    <span class="inputs intext">
				    	<input type="text" placeholder="请输入车辆识别代号/车架号" v-model="vin" />
				    </span>
			    </div>
			</div>
			<div class="test_input_mark" >
			    <datetime confirm-text="确定" cancel-text="取消" v-model="registerDate" placeholder="请输入注册日期"  :title="'注册日期'"></datetime>
			</div>
			<div class="test_input_mark isGh">
				<x-switch :title="'是否过户车'" v-model="transfer" @on-change="offOn"></x-switch>
			</div>
			<div class="test_input_mark" v-show="transfer">
			    <datetime confirm-text="确定" cancel-text="取消" v-model="transferDate" placeholder="请输入过户日期" :title="'过户日期'"></datetime>
			</div>
			
			<div class="box_button">
				<x-button type="primary" action-type="button" @click.native="yesbrandbuts">抢先申请</x-button>
		    </div>
		    
		</div>
		
		<div class="alerts">
	       <alert v-model="helpval"   button-text="我知道了">
	       		<div><img src="../../assets/xingshizheng 2.png" /></div>
	       </alert>
	    </div>
	    <!--查看银行卡图片-->
		<div>
	      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
	        <div class="img-box">
	          <img :src="shouImg" class="shouImg">
	        </div>
	      </x-dialog>
	    </div>
	    <!--弹窗dialog-->
	    <div>
	      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%'}">
	        <div style="color:#999;text-align:center;" @click="showDialogStyle = false">
	          <span class="showTitle">拍照或者选择相册中照片</span>
	          <div class="img_shou"><img src="../../assets/xingshizheng.png" /></div>
	          <p class="img_title2">调整好拍摄角度，避免反光，证件需清晰完整提高识别度</p>
	          <div class="input_buts">
	          	<span class="input_buts_maoc">立即拍照</span>
	          	<input type="file" class="myFileUpload"  multiple capture="camera"  accept="image/*" @change="img_inpuchage">
	          </div>
	        </div>
	      </x-dialog>
	    </div>
        <!--错误提示语-->
	    <div>
	      <alert v-model="alertShow" title="温馨提示"> {{alertTxt}}</alert>
	    </div>
	</div>
</template>

<script>
	import { XInput,XSwitch,Group,Datetime,Flexbox,FlexboxItem,Alert,TransferDom,XDialog,Icon,XButton,Confirm,Checklist } from 'vux'
	import cookie from '../../config/util/cookie' 
	import compres from '../../config/util/compress' 
	export default{
		name: 'yesbrand',
		directives: {
		    TransferDom
		},
		//获取路由上的值
		created(){
            this.$parent.init();
            this.urlId = this.$route.query.Changeval?this.$route.query.Changeval:'';//是否新车上牌
            
		},
    	components: {
		    XInput,
		    XSwitch,
		    Group,
		    Datetime,
		    Flexbox,
		    FlexboxItem,
		    Alert,
		    XDialog,
		    Icon,
		    XButton,
		    Confirm,
		    Checklist
		},
		data () {
		    return {
		    	urlId:'0',//路由ID
		    	vehicleInvoice:"",//新车购置发票图片URL
		    	driving:"",//行驶证url路径              
		    	searchval:'',//搜索的名字val
		    	inputvalue:'',//品牌车型名称val
		    	billedDate:"",//开票日期
		    	registerDate:"",//注册日期
		    	engineNo:"",//发动机号码
		    	vin:"",//车辆识别代号/车架号码
		    	vehicleModelCode:"", //车型编码
		    	brandModel:'',//品牌型号
		    	purchasePrice:"",//车辆价格
		    	transfer:false, ////是否过户（0、否，1、是，默认0）
		    	transferDate:'',//过户日期
		    	helpval:false,//是否显示弹出窗
		    	showDialogStyle:false,//行驶证拍照弹出窗
		    	showHideOnBlur:false,//显示弹出查看图片
		    	shouImg:'',//弹窗图片内容
		    	alertShow:false,//错误提示框
        		alertTxt:'',//错误提示语
        		
        		routeVal1:"",//车型名称
        		routeVal2:"",//车型名称
        		routeVal3:"",//车辆价格
		    }
	    },
	    //组件写入dom结构之前
		mounted(){
			var _this=this;
      		this.token=cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';
      		
      		this.routeVal1 = this.$route.query.dardName?this.$route.query.dardName:''; //车型名称
			this.routeVal2 = this.$route.query.modelCode?this.$route.query.modelCode:'';  //车型名称
			this.routeVal3 = this.$route.query.chasePrice?this.$route.query.chasePrice:'';   //车辆价格
      		//查询数据
      		this.$http.post(this.$root.url+"apply/queryVehicle",{
				},{
					headers: {'Content-Type': 'application/json;charset=UTF-8'},
			    }).then(function(data) {// 这里是处理正确的回调
		    	  	var datas = data.body.data;
			        if(datas && data.body.ask==0){
			       	  	this.driving = datas.driverLicense;
			        	this.registerDate = datas.registerDate ? datas.registerDate.substring(0,10) : '';
			        	this.urlId = datas.vehicleSign;
			        	this.vehicleSign = datas.vehicleSign;
						this.engineNo = datas.engineNo;
						this.vin = datas.vin;
						this.transfer = datas.transfer==1 ? true :false;
						this.inputvalue = this.routeVal1 ? this.routeVal1 : datas.brandModel;
						this.vehicleModelCode = this.routeVal2 ? this.routeVal2 : datas.vehicleModelCode;
						this.purchasePrice = this.routeVal3 ? this.routeVal3 : datas.purchasePrice;
						this.transferDate = datas.transferDate ? datas.transferDate.substring(0,10) : '';
			        }else{
			        	this.inputvalue = this.routeVal1;
			        	this.vehicleModelCode = this.routeVal2;
			        	this.purchasePrice = this.routeVal3;
			        }
			    },function(error) {// 这里是处理错误的回调
			      console.log(error)
		  	});
		},
		//计算属性
		computed:{
        	transferval(){
           		return this.transfer==false? 0 : 1 
            }
        },
	    //方法对象
	    methods:{
	    	//显示图片弹出
	    	showImgBut(url){
	    		this.showHideOnBlur=true;
	    		this.shouImg=url
	    	},
		    //弹出去拍照
		    shows(){
		    	this.showDialogStyle=true
		    },
		    //是否开户车的值
		    offOn(newVal){
		    	if(newVal==false){
		    		this.transferDate = ''
		    	}
		    },
		    //跳转到搜索页面
		    linkSearch(){
		    	this.$router.push({path:'/search',query: {}})
		    },
		    
		    //行驶中拍照
			img_inpuchage(e){
				var _this=this;
				var files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				var fiss = files[0];
        		var formDa = new FormData();
    			formDa.append("file", this.filemess);
				var maxsize=3*1024*1024;
				var nubms = fiss.size>maxsize ? '0.7' : '1';
				compres.comprImg.uploadImg(fiss,maxsize,nubms,function(data){
			        var text = window.atob(data.split(",")[1]);
				    var buffer = new Uint8Array(text.length);
				    var pecent = 0, loop = null;
				    for (var i = 0; i < text.length; i++) {
				      buffer[i] = text.charCodeAt(i);
				    }
					var blob =compres.comprImg.getBlob([buffer], fiss.type);
		          	var formDa = new FormData();
		          		formDa.append("file", blob);
				        formDa.append("fileName", fiss.name);
			          	_this.uploaGzsXsz(formDa);  ////上传个人照发送请求
		        })
			},
			//新车购置税发票、行驶证上传
			uploaGzsXsz(formDa){
				var _this = this;
				_this.$http.post(this.$root.url+"upload/upload", formDa, {
			        headers: {'Content-Type': 'application/json;charset=UTF-8'},
			    }).then(function(data) {// 这里是处理正确的回调
			        var datas=data.body.data;
			        if(datas&&data.body.ask==0){
			        	_this.driving=datas;
			        	//区分新车或已上牌的url 路径
//			       	  	if(this.urlId==1){
//			        		_this.vehicleInvoice=datas;
//			        	}else if(this.urlId==0){
//			        		_this.driving=datas;
//			        	}
			        }
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			  });
			},
			
		    //抢先申请
		    yesbrandbuts(){
		    	var pramData={};
//		    	if(this.urlId=="1" && this.vehicleInvoice==''){
//		    		this.alertTxt="新车购置发票没上传";
//				    this.alertShow=true
//				    return false
//		    	}else if(this.urlId=="1" && this.billedDate==''){
//		    		this.alertTxt="开票日期不能为空";
//				    this.alertShow=true
//				    return false
//		    	}else 
		    	if(this.urlId=="0" && this.driving==''){
		    		this.alertTxt="行驶证没有上传";
		    		this.alertShow=true
				    return false
		    	}else if(this.inputvalue==''){
		    		this.alertTxt="品牌型号不能为空";
				    this.alertShow=true
				    return false
		    	}else if(this.engineNo==''){
		    		this.alertTxt="发动机号码不能为空";
		    		this.alertShow=true
				    return false
		    	}else if(this.vin==''){
		    		this.alertTxt="车辆识别代号不能为空";
		    		this.alertShow=true
				    return false
		    	}else if(this.transferval=='1' && this.transferDate==''){
		    		this.alertTxt="过户日期不能为空";
		    		this.alertShow=true
				    return false
		    	}else if(this.urlId=="0" && this.registerDate==''){
		    		this.alertTxt="注册日期不能为空";
		    		this.alertShow=true
				    return false
		    	}
//		    	if(this.urlId=="1"){
//		    		pramData={
//		    			"vehicleInvoice":this.vehicleInvoice,"billedDate":this.billedDate,"vehicleSign":this.urlId,
//		    			"vehicleModelCode":this.vehicleModelCode,"engineNo":this.engineNo,"vin":this.vin,
//		    		    "brandModel":this.inputvalue,"transfer":this.transferval,"transferDate":this.transferDate
//		    		}
//		    	}else if(this.urlId=="0"){
		    		pramData={
		    			"driverLicense":this.driving,"registerDate":this.registerDate? new Date(this.registerDate).getTime() :'',"vehicleSign":this.urlId,
		    			"vehicleModelCode":this.vehicleModelCode,"engineNo":this.engineNo,"vin":this.vin,
		    			"transfer":this.transferval,"brandModel":this.inputvalue,"purchasePrice":this.purchasePrice,"transferDate":this.transferDate ? new Date(this.transferDate).getTime() :''
		    		}
//		    	}
		    	this.$http.post(this.$root.url+"apply/saveVehicle", pramData, {
			        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token}
			    }).then(function(data) {// 这里是处理正确的回调
			        var datas=data.body;
			        console.log(data)
			        if(datas.ask==0&&datas.code=="0000"){
	                    this.$router.push({path:'/plan',query: {}})//其中login是你定义的一个路由模块
			        }
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			    });
		    }
		}
		
	}

</script>

<style scoped>
	.nobrand{}
	input,textarea{-webkit-appearance: none;outline: none;}
	i{font-style:normal}
	
    .cardModfy_centent{padding:2px 10px;background: #fff;}
    .cardModfy_centent_box{display: flex;font-size:16px;width:100%;position:relative;}
    .cardModfy_centent_box .box_title{text-align: left;color:#8ca3b5;padding:15px 0 15px 10px}
    .cardModfy_centent_box .right_cent{flex:1;text-align: right;color:#434f5d;padding:15px 5px 15px 0px}
    .cardModfy_centent_box .right_cent .zm_but,.cardModfy_centent_box .right_cent .zm_but2{width:120px;display: inline-block;position:relative;padding-right:35px;background:url(../../assets/xiangji_icon.png) no-repeat right center;background-size:27px 19px;}
    .cardModfy_centent_box .right_cent .zm_but1{width:120px;display: inline-block;position:relative;padding-right:40px;}
    .cardModfy_centent_box .right_cent .zm_but span{display: block;width:100%;text-align: center;color:#8ca2b7}
    .cardModfy_centent_box .right_cent .zm_but1 .succeed,.cardModfy_centent_box .right_cent .zm_but2 .succeed{color:#2491FF}
    .cardModfy_centent_box .right_cent .zm_but1 .showsBut{width:35px;height:100%;position:absolute;right:0;top:0;bottom:0;z-index:5;display: inline-block;background:url(../../assets/xiangji_icon.png) no-repeat right center;background-size:27px 19px;}
    .cardModfy_centent_box .right_cent .zm_but input{ position: absolute;display: block;width: 100%;height: 100%;opacity: 0;z-index: 2;left:0;top:0;border-radius: 3px;}
    .cardModfy_centent_box .right_cent .zm_but2 input{ position: absolute;display: block;width: 30px;height: 100%;opacity: 0;z-index: 2;right:0;top:0;border-radius: 3px;}
	
	.input_center{margin:3.125%;background:#fff;}
	
	.right_photo_img{margin-left: 10px;}
	.test_input_mark {padding: 1px 0; border-bottom: 1px solid #ECECEC;margin: 0px 15px 0;}
	.box_button{padding:7.625% 6.25%;width:87.5%;margin:0 auto;}
	.box_button:after{clear:both;content: '';display: block;}
	.box_button .backs{width:45%;display: inline-block;margin-right:3.90625%;float:left;padding:10px 0;text-align: center;border:1px solid #8CA3B5;color:#adbdc9}
	.box_button .nexts{width:45%;display: inline-block;margin-left:3.90625%;float:left;padding:10px 0;text-align: center;background:#2491ff;color:#fff;border:1px solid #2491ff;}     
	
	.test_select{padding:11px 0;border-bottom:1px solid #ECECEC;margin:0px 15px 0;}
	.test_select_cen2{display: flex;}
	.test_select_cen label{vertical-align: middle;color:#8ca3b5;line-height:32px}
	.test_select_cen label i{width:20px;height:20px;padding:5px 2px 0 6px;display: inline-block;}
	.test_select_cen label i img{width:18px;height:18px;line-height: 20px;;}
	.test_select_cen .inputs{margin-left:5px;flex: 1;line-height: 32px;}
	.test_select_cen .inputext{/*position:absolute;right:20px;*/text-align:right;color:#434F5D;margin-left: 10px;-webkit-box-flex: 1;-ms-flex: 1;flex: 1;line-height: 32px;}
	.test_select_cen .inputs input{height:32px;line-height:32px;width:100%;border: none;text-indent:5px;text-align: right;}
	
	.img_shou{width:96%;margin:1% 2%;height:100%;}
	.img_shou img{width:100%;height:100%;}
	.showTitle{font-size:18px;width:80%;margin:0 auto;display: inline-block;text-align: center;padding:10px 0;position:relative}
	.showTitle:after {content: " ";position: absolute;left: 0;bottom: 0;right: 0;height: 1px; border-bottom: 1px solid #D9D9D9;color: #D9D9D9;
    -webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
	.img_title2{width:80%;margin:0 auto;}
	.input_buts{width:60%;margin:0 auto;position:relative;margin-top:15px;margin-bottom:15px;}
	.input_buts_maoc{height:40px;width:100%;display:inline-block;line-height:40px;text-align: center;color:#fff;background:#2491FF;border-radius:3px;}
	.myFileUpload{ position: absolute;display: block;width: 100%;height: 40px;opacity: 0;z-index: 2;left:0;top:0;border-radius: 3px;}
	
	/*搜索*/
	.search_top .search_frame{padding:10px;background:#fff;}
    .search_top .search_frame .search_frame_center{width:100%;position:relative;background:#EEF2F9;border-radius:3px;}
    .search_top .search_frame .search_frame_center input{width:100%;height:38px;line-height:38px;border:none;background:#EEF2F9;text-indent:5px;border-radius:3px;}
    .search_top .search_frame .search_frame_center .search_but{width:16%;height:38px;line-height:38px;z-index:10;display:inline-block;position: absolute;right:0;top:0;bottom:0;
    text-align: center;background: url(../../assets/search.png) no-repeat center center;background-size:21px 21px;border-radius:3px;}
	.no_listdata{text-align: center;margin:0 auto;padding:20px;}
	.listy{padding:10px 0;text-align: left;font-size:16px;position:relative}
	.listy:after{content: " ";position:absolute;left: 0;bottom: 0;width: 100%;height: 1px;border-bottom: 1px solid #eef0f1;color: #eef0f1;-webkit-transform-origin: 0 100%;transform-origin: 0 100%;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
	
	.shouImg{max-width:100%;max-height:50%;display:block;margin:0 auto}
	
	.showimg{position: relative;}
	.showimg .clearIocn{position:absolute;top:-10px;right:-10px;z-index:20;display: inline-block;}
	.showimg img{width:100%;height:100%;}
</style>
<style>
	.nobrand .weui-cell{padding:10px 0px;}
	.clearIocn .weui-icon-clear{font-size:18px;}
	.isGh .weui-switch:checked{    border-color: #2491ff; background-color: #2491ff;}
	.alerts .weui-dialog__btn_primary{color: #2491ff;}
	.test_input_mark a>div p,.test_input_mark label{color:#8ca3b5}
	.alerts img{width:100%;height:100%;}
	.box_button .weui-btn_primary {background-color: #2491ff !important;}
	
	
</style>