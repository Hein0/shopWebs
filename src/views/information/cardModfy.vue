<template>
	<div class="cardModfy">
		<div class="cardModfy_centent">
			<div class="cardModfy_centent_box ">
				<div class="box_title">银行卡正面</div>
				<div class="right_cent">
					<div class="zm_but1" v-if="bankCardFront">
			    		<span class="succeed"  @click="showImgBut(bankCardFront)">查看图片</span>
			    		<input type="file" accept="image/*" @change="carFileChange" />
					</div>
					<div class="zm_but" v-else>
						<span>点击上传</span>
						<input type="file" multiple capture="camera" accept="image/*" @change="carFileChange" />
					</div>
				</div>
			</div>
		</div>

		<div class="d1">
			<div class="tr one_px_border_b">
				<div>持卡人姓名</div>
				<div>{{realName}}</div>
			</div>

			<div class="tr one_px_border_b">
				<div>持卡人银行卡号</div>
				<div><input type="number" placeholder="请输入持卡人银行卡号" v-model="bankAccount"></div>
			</div>

			<div class="tr one_px_border_b">
				<div>银行预留手机号</div>
				<div><input type="number" placeholder="请输入银行预留手机号" v-model="reservedPhone"></div>
			</div>

			<div class=" one_px_border_b accoun">
				<popup-picker title="开户银行" placeholder="请选择开户银行" :data="bankText" v-model="bankVal" @on-hide="onBankPopupHide" value-text-align="right"></popup-picker>
			</div>

			<div class="tr one_px_border_b sheng" id="addressNameArr">
				<x-address title="开户省市" placeholde="请输入开户省市" @on-hide="onAddressPopupHide" v-model="addressVal" raw-value :list="addressData" hide-district></x-address>
			</div>

			<div class=" one_px_border_b accoun">
				<popup-picker placeholder="请选择支行" title="支行名称" :data="branchText" v-model="branchVal" @on-hide="onBranchPopupHide" value-text-align="right"></popup-picker>
			</div>
			<div class="loding">
				<loading v-model="show" :text="showtext"></loading>
			</div>
			<!--错误提示语-->
			<div>
				<alert v-model="alertShow" title="温馨提示"> {{alertTxt}}</alert>
			</div>
			<!--查看银行卡图片-->
			<div>
				<x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
					<div class="img-box">
						<img :src="shouImg" style="max-width:100%;max-height:50%">
					</div>
				</x-dialog>
			</div>
			<div class="offerBut">
				<x-button type="primary" action-type="button" @click.native="bankNexts">提交</x-button>
			</div>
		</div>
		<toast v-model="toastshow" type="text" width="10em">{{showtext}}</toast>
	</div>
</template>

<script>
	import { Group, Selector, XAddress, PopupPicker, Loading, XButton, XDialog, Alert, Toast } from 'vux'
	import cookie from '../../config/util/cookie'
	import compres from '../../config/util/compress'
	export default {
		props: {

		},
		components: {
			Group,
			Selector,
			XAddress,
			PopupPicker,
			Loading,
			XButton,
			XDialog,
			Alert,
			Toast
		},
		data() {
			return {
				toastshow:false,
				showtext:'',
				cardId:'',            //身份证号
				bankCardFront:'',     //银行卡正面照片路径
				realName:'',          //持卡人姓名
				bankAccount:'',       //银行卡号
				reservedPhone:'',     //预留手机号
				email:'',     //邮箱
				myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,//手机号码验证
				emailReg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,//邮箱正则
				bankInfo:[],          //总行列表
				bankText:[['']],      //总行名称列表
				bankVal:[],           //总行新val
				bankLastVal:[],       //总行旧val

				addressData: [],      //省市地址
				addressVal:[],        //省市编码新val
				addressLastVal:[],    //省市编码旧val
				addressNameArr:[],    //省市中文名称

				branchInfo:[],        //分行列表 
				branchText:[['']],    //支行名称列表
				branchVal:[],         //支行val

				bankInfoObj:{},       //选中，总行编码 银行简称 银行名称
				branchInfobj:{},      //选中，支行编码 支行名称

				type:2,//操作类型

				provinceData:"",      //获取支行市区别直辖市或非直辖市
				municipality:["110000","120000","310000","500000"],//直辖市编码

				show: false,
				showtext: "",
				token: '', //token信息
				showHideOnBlur: false, //图片提示框
				shouImg: '', //图片提示框内容
				alertShow: false, //错误提示框
				alertTxt: '', //错误提示语
				myreg:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,   //手机号码验证
			}
		},
		//实例已经创建完成之后
		created() {
			//    this.realName=this.$route.query.name?this.$route.query.name:''
			this.$parent.init();
		},

		watch: {

		},
		//组件写入dom结构之前
		mounted() {
			//获取url信息    
			var _this = this;
			this.token = cookie.Cookie.get("token") ? cookie.Cookie.get("token") : '';
			
			//获取省市、获取银行卡列表、已保存的数据
			Promise.all([this.getCityData(), this.getBankData(), this.getSavedData()]).then(function (result) {
			    //获取省市
			    _this.addressData = result[0];
			    //获取银行卡列表
			    _this.bankInfo = result[1];
	        	_this.bankText = setDatas(result[1]);
	        	//展示已保存数据
	        	if(result[2]){
	        		_this.displaySavedData(result[2]);
	        	}
			}).catch(function(re){
				console.log(re);
			});
		},
		//方法对象
		methods: {
			//查看卡图片
			showImgBut(url) {
				this.showHideOnBlur = true;
				this.shouImg = url
			},
			//银行卡拍照
			carFileChange(e) {
				var _this = this;
				var files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				var fiss = files[0];
				var maxsize = 3 * 1024 * 1024;
				var nubms = fiss.size > maxsize ? '0.7' : '1';
				compres.comprImg.uploadImg(fiss, maxsize, nubms, function(data) {
					var text = window.atob(data.split(",")[1]);
					var buffer = new Uint8Array(text.length);
					var pecent = 0,
						loop = null;
					for(var i = 0; i < text.length; i++) {
						buffer[i] = text.charCodeAt(i);
					}
					var blob = compres.comprImg.getBlob([buffer], fiss.type);
					var formDa = new FormData();
					formDa.append("file", blob);
					formDa.append("fileName", fiss.name);
					formDa.append("type",4);
					_this.uploaGr(formDa); ////上传个人照发送请求
				})
			},
			//银行卡url发送请求
			uploaGr(formDa) {
				var _this = this;
				_this.$http.post(this.$root.url + "upload/upload", formDa, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						"token": this.token
					},
				}).then(function(data) { // 这里是处理正确的回调
					var datas = data.body.data;
					if(datas && data.body.ask == 0) {
						_this.bankCardFront = datas; //银行卡url
					}else{
						_this.showtext = data.body.message;
            			_this.toastshow = true;
					}
				}, function(error) { // 这里是处理错误的回调
					console.log(error)
				});
			},
			//选中总行
			onBankPopupHide(closeType){
				if(closeType){
					if(this.bankLastVal.length==0 || this.bankLastVal.length>0&&this.bankLastVal[0]!=this.bankVal[0]){//是否选择新的总行
						this.bankLastVal = this.bankVal;
						let _this = this;
						this.bankInfoObj = getBankItem(this.bankVal[0],this.bankInfo);
						if(this.addressVal.length>0){
							//获取支行列表
							this.BranchMonitor(this.bankInfoObj,this.addressVal,function(datas){
								_this.branchInfo = datas;
								_this.branchText = setDatas(datas);
								
								_this.branchVal = [_this.branchText[0][0]];//默认选中支行列表第一个支行
								console.log('_this.branchVal',_this.branchVal);
								_this.branchInfobj = getBankItem(_this.branchVal[0],_this.branchInfo);
							});
						}
					}
					
				}
			},
			//选中开户省市
			onAddressPopupHide(value){
				if(this.addressLastVal.length==0 || this.addressLastVal.length>0&&this.addressLastVal[1]!=this.addressVal[1]){//是否选择新的省市
					this.addressLastVal = this.addressVal;
					let _this = this;
					this.addressNameArr = getaddres(this.addressVal,this.addressData);
					if(this.bankVal.length>0){
						//获取支行列表
						this.BranchMonitor(this.bankInfoObj,this.addressVal,function(datas){
							_this.branchInfo = datas;
							_this.branchText = setDatas(datas);
							
							_this.branchVal = [_this.branchText[0][0]];//默认选中支行列表第一个支行
							_this.branchInfobj = getBankItem(_this.branchVal[0],_this.branchInfo);
						})
					}
				}
			},
			//选中支行
			onBranchPopupHide(value){
				let _this = this;
				if(this.branchVal.length>0&&this.branchInfo.length>0){
					this.branchInfobj = getBankItem(this.branchVal[0],this.branchInfo);
				}
			},
			//下一步
			bankNexts() {
				var self = this;
				if(this.bankCardFront==""){
			    		this.alertTxt="请上传银行卡";
					    this.alertShow=true
					    return false
		    	}else if(this.realName==""){
			    		this.alertTxt="持卡人姓名不能为空";
					    this.alertShow=true
					    return false
		    	}else if(this.bankAccount==""){
			    		this.alertTxt="持卡人银行卡号不能为空";
					    this.alertShow=true
					    return false
		    	}else if(this.reservedPhone==""){
			    		this.alertTxt="预留手机号不能为空";
					    this.alertShow=true
					    return false
		    	}else if(!this.myreg.test(this.reservedPhone)){
			    		this.alertTxt="预留手机号格式错误";
					    this.alertShow=true
					    return false
		    	}else if(this.bankVal.length<=0){
			    		this.alertTxt="开户行不能为空";
					    this.alertShow=true
					    return false
		    	}else if(this.addressNameArr.length<=0){
			    		this.alertTxt="开户省市不能为空";
					    this.alertShow=true
					    return false
		    	}else if(this.branchVal.length<=0||!(this.branchInfobj&&this.branchInfobj.bankCode)){
		    			this.alertTxt="开户支行不能为空";
					    this.alertShow=true
					    return false
		    	}
				var params = {
					"type": this.type,
					"bankCardFront": this.bankCardFront,//银行卡正面照片路径
					"realName": this.realName,//持卡人姓名
					"reservedPhone": this.reservedPhone,//预留手机号
					"bankAccount": this.bankAccount,//银行卡号

					"bankAbbreviation": this.bankInfoObj ? this.bankInfoObj.bankCodeDk : '',//银行简称
					//"parentBankCode": this.bankInfoObj ? this.bankInfoObj.bankCode : '',//总行编码
					"bankName": this.bankInfoObj ? this.bankInfoObj.bankName : '',//银行名称
					
					"bankProvince": this.addressNameArr[0].name,//开户省名称
					"bankProvinceCode": this.addressNameArr[0].id,//开户省编码
					"bankCity": this.addressNameArr[1].name,//开户市名称
					"bankCityCode": this.addressNameArr[1].id,//市编码
					
					"subbranchName": this.branchInfobj ? this.branchInfobj.bankName : '',//支行名称
					"bankCode": this.branchInfobj ? this.branchInfobj.bankCode : '',//支行编码 
				}

				self.$http.post(this.$root.url + "basedata/saveOrUpdateBankCard", params, {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						"token": this.token
					},
				}).then(function(data) { // 这里是处理正确的回调
					//				      this.show=true;
					if(data.body.ask == 0) {
						this.show = false;
						this.$router.push({path:'/personal',query: {}})//跳转路由模块
					} else {
						this.showtext = data.body.message;
            			this.toastshow = true;
					}
				}, function(error) { // 这里是处理错误的回调
					this.showtext = 'error';
            		this.toastshow = true;
				});
			},
			getCityData(){//获取省市
				let _this = this;
				return new Promise(function (resolve, reject) {
			        _this.$http.post(_this.$root.url+"basedata/getAreaInfo", {}, {
				      	headers: {'Content-Type': 'application/json;charset=UTF-8',"token":_this.token},
				    }).then(function(data) {// 这里是处理正确的回调
				        let datas = data.body.data;
				        if(datas){
				        	resolve(datas);
				        }else {
					        reject('未获取到数据');
					    }
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
				})
	    	},
			getBankData(params){//获取 总行 支行
				let _this = this;
				params = params?params:{};
				return new Promise(function (resolve, reject) {
			        _this.$http.post(_this.$root.url+"basedata/getBankInfo", params, {
				      	headers: {'Content-Type': 'application/json;charset=UTF-8',"token":_this.token},
				    }).then(function(data) {// 这里是处理正确的回调
				        let datas = data.body.data;
				        if(datas){
				        	resolve(datas);
				        }else {
					        reject('未获取到数据');
					    }
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
				})
	    	},
			getSavedData(){//获取已保存数据
				let _this = this;
				return new Promise(function (resolve, reject) {
				    //获取页面信息
				    _this.$http.post(_this.$root.url+"basedata/bankCardQuery", {}, {
				        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":_this.token},
				    }).then(function(data) {// 这里是处理正确的回调
				        
				        if(data.body.ask==0&&data.body.data){
				        	//let datas = JSON.parse(data.body.data.bankJson);
				        	resolve(data.body.data);
				        }else{
				        	resolve(null);
				        }
				    }, function(error) {// 这里是处理错误的回调
				        console.log(error)
				    });
				})
	    	},
	    	displaySavedData(obj){
	        	this.addressNameArr = [];
				this.bankAccount = obj.bankAccount;
				this.realName = obj.bankAccountName ? obj.bankAccountName :this.urlName;//持卡人姓名
				this.addressNameArr.push({
					name:obj.bankProvince,
					id:obj.bankProvinceCode
				});
				this.addressNameArr.push({
					name:obj.bankCity,
					id:obj.bankCityCode
				});
				this.bankCardFront = obj.bankCardFront;
				this.reservedPhone = obj.reservedPhone;

				this.branchInfobj["bankName"] = obj.subbranchName;//支银行卡名称
				this.branchInfobj["bankCode"] = obj.bankCode;//支银行卡编码
				//this.bankInfoObj["bankName"] = obj.bankName;//总银行卡名称
				//this.bankInfoObj["bankCodeDk"] = obj.bankAbbreviation;//总银行简称

				this.bankInfoObj = getBankItem(obj.bankName, this.bankInfo);//总行
				//console.log('bankInfoObj',this.bankInfoObj);
				
				this.bankVal.push(obj.bankName);  //显示开户银行
				this.bankLastVal = this.bankVal;

				this.addressVal.push(obj.bankProvinceCode);//显示省
				this.addressVal.push(obj.bankCityCode);//显示市
				this.addressLastVal = this.addressVal;

				//获取支行列表
				let _this = this;
				this.BranchMonitor(this.bankInfoObj,this.addressVal,function(datas){
					_this.branchInfo = datas;
					_this.branchText = setDatas(datas);
					
					_this.branchVal = [obj.subbranchName];//默认选中支行列表第一个支行
					_this.branchInfobj = getBankItem(_this.branchVal[0],_this.branchInfo);
				})
	    	},
	    	//监听获取支行列表
			BranchMonitor(bankObj,provinceObj,callback){
				let _this = this;
				_this.provinceData = Analysis(_this,provinceObj);//直辖市特殊处理
				if(bankObj&&provinceObj.length>0){
					this.getBankData({"bankCityCode":_this.provinceData,"parentCode":bankObj.bankCode}).then(function (data) {
					   	callback(data);
					}).catch(function(re){
						console.log(re);
					});
				}
			}
		}
	}
	//处理数据
	function setDatas(data) {
		let tmpList = [[]];
		if(data.length>0){
			for(let i=0;i<data.length;i++){
				tmpList[0].push(data[i].bankName);
			}
		}else{
			tmpList[0].push('');
		}
		return tmpList;
	}
	//返回银行卡编码和名称、简称
	function getBankItem(str, arr) {
		let obj = {
			bankCode:'',
			bankCodeDk:'',
			bankName:str
		};
		for(let i=0;i<arr.length;i++){
			if(arr[i].bankName == str){
				obj.bankCode = arr[i].bankCode;
				obj.bankCodeDk = arr[i].bankCodeDk;
			}
		}
		return obj;
	}
	//获取省市的名称
	function getaddres(st, arrs) {
		let addobj = [];
		for(let i=0;i<arrs.length;i++){
			if(arrs[i].value==st[0]||arrs[i].value==st[1]){
				addobj.push({
					name:arrs[i].name,
					parent:arrs[i].parent,
					id:arrs[i].value
				});
			}
		}
		return addobj;
	}
	//判断是否是直辖市
	function Analysis(_this,provinceObj){
		if(provinceObj.length>0){
			if(_this.municipality.indexOf(provinceObj[0])>=0){
				return provinceObj[0]
			}else{
				return provinceObj[1]
			}
		}
	}
</script>

<style scoped>
	input {outline: 0;border: 0;text-align: right;font-size: 16px;color: #434f5d;}
	select {font-size: 16px;}
	.d2 {padding: 10px 0;background: #fff;height: 100px;}
	.d1 {margin: 10px;padding: 10px;background: #fff;border-radius: 5px;}
	.tr {display: flex;font-size: 16px;}
	.tr>* {padding: 15px 0;}
	.tr>*:first-child {text-align: left;color: #8ca3b5;}
	.tr>*:last-child {flex: 1;text-align: right;color: #434f5d;}
	.cardModfy_centent {padding: 2px 10px;background: #fff;}
	.cardModfy_centent_box {display: flex;font-size: 16px;width: 100%;position: relative;}
	
	.cardModfy_centent_box .box_title {text-align: left;color: #8ca3b5;padding: 15px 0 15px 10px}
	.cardModfy_centent_box .right_cent {flex: 1;text-align: right;color: #434f5d;padding: 15px 10px 15px 0px}
	.cardModfy_centent_box .right_cent .zm_but,.cardModfy_centent_box .right_cent .zm_but1{width:120px;display: inline-block;position:relative;padding-right:20px;background:url(../../assets/xiangji_icon.png) no-repeat right center;background-size:27px 19px;}
	.cardModfy_centent_box .right_cent .zm_but span,.cardModfy_centent_box .right_cent .zm_but1 span{display: block;width:100%;text-align: center;color:#8ca2b7}
	.cardModfy_centent_box .right_cent .zm_but1 .succeed{color:#2491FF}
	.cardModfy_centent_box .right_cent .zm_but1 input{ position: absolute;display: block;width: 35px;height: 100%;opacity: 0;z-index: 2;right:0;top:0;border-radius: 3px;}
	.cardModfy_centent_box .right_cent .zm_but {width: 120px;display: inline-block;position: relative;padding-right: 20px;background: url(../../assets/xiangji_icon.png) no-repeat right center;background-size: 27px 19px;}
	.cardModfy_centent_box .right_cent .zm_but span {display: block;width: 100%;text-align: center;color: #8ca2b7}
	.succeed {color: #2491FF}
	
	.cardModfy_centent_box .right_cent .zm_but input {position: absolute;display: block;width: 100%;height: 100%;opacity: 0;z-index: 2;left: 0;top: 0;border-radius: 3px;}
	.select select {width: auto;height: 30px;text-align: center;}
	.select select option {text-align: center;}
	.tablev {display: table;width: 100%;height: 100%;text-align: center;font-size: 14px;color: #8ca3b5;line-height: 1}
	.tablev>* {display: table-cell;vertical-align: middle;}
	.tablev>*>img {max-width: 50px;height: auto;}
	
	.box_button {padding: 7.625% 6.25%;width: 87.5%;margin: 0 auto;}
	.box_button:after {clear: both;content: '';display: block;}
	.box_button .backs {width: 45%;display: inline-block;margin-right: 3.90625%;float: left;padding: 10px 0;text-align: center;border: 1px solid #8CA3B5;color: #adbdc9}
	.box_button .nexts {width: 45%;display: inline-block;margin-left: 3.90625%;float: left;padding: 10px 0;text-align: center;background: #2491ff;color: #fff;border: 1px solid #2491ff;}
	.offerBut {width: 60%;margin: auto;padding: 25px 0 20px}
</style>
<style>
	.sheng .vux-cell-box:before,.accoun .vux-cell-box:before {	border-top: none;height: 0;}
	.sheng .weui-cell {padding: 0;}
	.sheng label,.accoun label {text-align: left;color: #8ca3b5}
	.accoun .weui-cell {padding: 15px 0px;}
	.offerBut .weui-btn_primary {background-color: #2491ff !important;}
</style>