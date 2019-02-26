<template>
	<div class="bankcard">
		<div class="bankcard_centent">
			<div class="bankcard_centent_box ">
				<div class="box_title">银行卡正面</div>
				<div class="right_cent">
					<div class="zm_but1" v-if="bankCardFront">
			    		<span class="succeed"  @click="showImgBut(bankCardFront)">查看图片</span>
			    		<input v-if='accountFlag' type="file" accept="image/*" @change="carFileChange" />
					</div>
					<div class="zm_but" v-else>
			    		<span>点击上传</span>
			    		<input type="file" accept="image/*" @change="carFileChange" />
					</div>
				</div>
			</div>
		</div>
		<div class="d1">
			<div class="tr one_px_border_b">
				<div>持卡人姓名</div>
				<div>{{realName}}</div>
			</div>
			<!--持卡人银行卡号-->
			<div class="tr one_px_border_b">
				<div>持卡人银行卡号</div>
				<div v-if="accountFlag"><input type="tel" placeholder="请输入持卡人银行卡号" maxlength="19" v-model="bankAccount"></div>
				<div v-if="!accountFlag">{{bankAccount}}</div>
			</div>
			
			<!--开户银行-->
			<div v-if="accountFlag" class=" one_px_border_b accoun">
				<popup-picker title="开户银行" placeholder="请选择开户银行" :data="bankText" v-model="bankVal" @on-hide="onBankPopupHide" value-text-align="right"></popup-picker>
			</div>
			<div v-if="!accountFlag" class="tr one_px_border_b">
				<div>开户银行</div>
				<div>{{bankVal[0]}}</div>
			</div>
			<!--开户省市-->
			<div v-if="accountFlag" class="tr one_px_border_b sheng" id="addressNameArr">
				<x-address title="开户省市" placeholder="请输入开户省市" @on-hide="onAddressPopupHide" v-model="addressVal" raw-value :list="addressData"  hide-district :disabled="!accountFlag"></x-address>
			</div>
			<div v-if="!accountFlag" class="tr one_px_border_b">
				<div>开户省市</div>
				<div>{{addressNameArr[0].name+' '+addressNameArr[1].name}}</div>
			</div>
			<!--请选择支行-->
			<div v-if="accountFlag" class=" one_px_border_b accoun">
				<popup-picker placeholder="请选择支行" title="支行名称" :data="branchText" v-model="branchVal" @on-hide="onBranchPopupHide" value-text-align="right" :disabled="!accountFlag"></popup-picker>
			</div>
			<div v-if="!accountFlag" class="tr one_px_border_b">
				<div>支行名称</div>
				<div>{{branchVal[0]}}</div>
			</div>
			<!--银行预留手机号-->
			<div class="tr one_px_border_b">
				<div>银行预留手机号</div>
				<div v-if="accountFlag"><input type="tel" placeholder="请输入银行预留手机号" maxlength="11" v-model="reservedPhone" :disabled="!accountFlag"></div>
				<div v-if="!accountFlag">{{reservedPhone}}</div>
			</div>
			<!--邮箱-->
			<div class="tr one_px_border_b">
				<div>邮箱</div>
				<div v-if="accountFlag"><input type="email" placeholder="请输入邮箱" v-model="email" :disabled="!accountFlag"></div>
				<div v-if="!accountFlag">{{email}}</div>
			</div>
			<!--查看银行卡图片-->
			<x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
				<div class="img-box">
					<img :src="showImg" class="showImg" />
				</div>
			</x-dialog>
			<!--上下一步-->
			<div class="box_button">
				<!-- <div class="backs" @click="back">上一步</div> -->
				<div class="nexts_1" @click="bankNexts">下一步</div>
			</div>
			<alert v-model="alertShow" title="温馨提示" > {{alertTxt}}</alert>
		</div>
	</div>
</template>

<script>
	import { Group,Selector,XAddress,PopupPicker,Loading,Alert,XDialog} from 'vux'
	import cookie from '../../config/util/cookie' 
	import compres from '../../config/util/compress' 
	import { mapGetters } from 'vuex'
	import { mapActions } from 'vuex'

	export default {
	    components: {
			Group,
			Selector,
			XAddress,
			PopupPicker,
			Loading,
			Alert,
			XDialog
	    },
	    data () {
			return {
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

				type:1,//操作类型
				
				provinceData:"",      //获取支行市区别直辖市或非直辖市
				municipality:["110000","120000","310000","500000"],//直辖市编码

				show:false,           //显示刷新验证银行卡
				showText:"",
				token:'',             //获取token
				showHideOnBlur: false,//图片提示框
				showImg:'',           //图片提示框内容
				alertShow:false,      //错误提示框
				alertTxt:'',          //错误提示语
				urlName:'',           //路径带过来的名字
				installmentId:'',     //分期申请数据id
				accountFlag:true,     //是否可编辑
			}
	    },
	    computed: {
	        // 使用对象展开运算符将 getters 混入 computed 对象中
	        ...mapGetters([
	          'bankInfoFlag'
	        ])
	    },
	    //实例已经创建完成之后
		created(){
	    	this.urlName = this.$route.query.name?this.$route.query.name:'';
	    	this.realName = this.urlName;
	    	this.cardId = this.$route.query.cardNo?this.$route.query.cardNo:'';
	    	this.installmentId = this.$route.query.installmentId?this.$route.query.installmentId:'';
	        this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
	        //获取url信息    
	        let _this = this;
	        this.token = cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';

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
	    methods:{
	    	...mapActions([
	            'setBankInfoFlag'
	        ]),
	    	//查看卡图片
	    	showImgBut(url){
	    		this.showHideOnBlur = true;
	    		this.showImg = url
	    	},
	    	//银行卡拍照
			carFileChange(e){
				let _this = this,
					files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				let fiss = files[0],
					maxsize = 3*1024*1024,
					nubms = fiss.size>maxsize ? '0.7' : '1';
	        	compres.comprImg.uploadImg(fiss,maxsize,nubms,function(data){
		            let text = window.atob(data.split(",")[1]),
		            	buffer = new Uint8Array(text.length),
		            	pecent = 0, loop = null;
				    for (let i = 0; i < text.length; i++) {
						buffer[i] = text.charCodeAt(i);
				    }
				    let blob = compres.comprImg.getBlob([buffer], fiss.type),
				    	formDa = new FormData();
	          		formDa.append("file", blob);
		        	formDa.append("fileName", fiss.name);
		        	formDa.append("type",4);
		          	_this.uploaGr(formDa);  ////上传个人照发送请求
	        	});
			},
	        //银行卡url发送请求
			uploaGr(formDa){
				let _this = this;
				_this.$http.post(this.$root.url+"upload/upload", formDa, {
					headers: {'Content-Type': 'application/json;charset=UTF-8'},
				}).then(function(data) {// 这里是处理正确的回调
					let datas=data.body.data;
					if(datas&&data.body.ask==0){
						_this.bankCardFront = datas; //银行卡url
					}
				}, function(error) {// 这里是处理错误的回调
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
								_this.branchInfobj = getBankItem(_this.branchVal[0],_this.branchInfo);
							});
						}
					}
					
				}
			},
			//选中开户省市
			onAddressPopupHide(closeType){
				if(closeType){
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
				}
			},
			//选中支行
			onBranchPopupHide(value){
				let _this = this;
				if(this.branchVal.length>0&&this.branchInfo.length>0){
					this.branchInfobj = getBankItem(this.branchVal[0],this.branchInfo);
				}
			},
			//上一步
			back(){
				this.$router.push({path:'/identity',query: {'certid':this.cardId,}})//跳转路由模块
			},
			//下一步
			bankNexts(){
				let _this=this;
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
		    	}else if(this.reservedPhone==""){
		    		this.alertTxt="预留手机号不能为空";
				    this.alertShow=true
				    return false
		    	}else if(!this.myreg.test(this.reservedPhone)){
		    		this.alertTxt="预留手机号格式错误";
				    this.alertShow=true
				    return false
		    	}else if(this.email==""){
		    		this.alertTxt="邮箱不能为空";
				    this.alertShow=true
				    return false
		    	}else
		    	if(!this.emailReg.test(this.email)){
		    		this.alertTxt="邮箱格式错误";
				    this.alertShow=true
				    return false
		    	}
				let params = {
					"installmentId":this.installmentId,
					"type":this.type,
					"bankAbbreviation":this.bankInfoObj?this.bankInfoObj.bankCodeDk:'',//总行简称
					"bankAccount":this.bankAccount,
					"realName":this.realName,
					"bankProvince":this.addressNameArr[0].name,
					"bankCity":this.addressNameArr[1].name,
					"bankCardFront":this.bankCardFront,
					"subbranchName":this.branchInfobj?this.branchInfobj.bankName:'',//支行名称
					"bankName":this.bankInfoObj?this.bankInfoObj.bankName:'',//总行名称
					"bankCode":this.branchInfobj?this.branchInfobj.bankCode:'', //支行编码
					"reservedPhone":this.reservedPhone,
					"bankProvinceCode":this.addressNameArr[0].id,
					"bankCityCode":this.addressNameArr[1].id,
					"email":this.email,
				}
				this.$http.post(this.$root.url+"basedata/saveOrUpdateBankCard", params , {
			        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
			    }).then(function(data) {// 这里是处理正确的回调
			        if(data.body.ask == 0){
			        	_this.setBankInfoFlag(true);
			       	    _this.$router.push({path:'/installmentInfo',query: {installmentId:_this.installmentId}})//跳转路由模块
			        }else{
			        	_this.alertTxt = data.body.message;
			       	    _this.alertShow = true
			        }
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
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
			        if(_this.installmentId){ //展示已保存数据
					    //获取页面信息
					    _this.$http.post(_this.$root.url+"installment/loadInstallment?installmentId="+_this.installmentId, {}, {
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
					}
				})
	    	},
	    	displaySavedData(obj){
	    		if(obj.bankJson){
	    			let bankData = JSON.parse(obj.bankJson);
		        	this.addressNameArr = [];
					this.bankAccount = bankData.bankAccount;
					this.realName = bankData.bankAccountName ? bankData.bankAccountName :this.urlName;//持卡人姓名
					this.addressNameArr.push({
						name:bankData.bankProvince,
						id:bankData.bankProvinceCode
					});
					this.addressNameArr.push({
						name:bankData.bankCity,
						id:bankData.bankCityCode
					});
					this.bankCardFront = bankData.bankCardFront;
					this.branchInfobj["bankName"] = bankData.subbranchName;//支银行卡名称
					this.branchInfobj["bankCode"] = bankData.bankCode;//支银行卡编码
					//this.bankInfoObj["bankName"] = obj.bankName;//总银行卡名称
					//this.bankInfoObj["bankCodeDk"] = obj.bankAbbreviation;//总银行简称

					this.bankInfoObj = getBankItem(bankData.bankName, this.bankInfo);//总行
					
					this.bankVal.push(bankData.bankName);  //显示开户银行
					this.bankLastVal = this.bankVal;

					this.addressVal.push(bankData.bankProvinceCode);//显示省
					this.addressVal.push(bankData.bankCityCode);//显示市
					this.addressLastVal = this.addressVal;

					//获取支行列表
					let _this = this;
					this.BranchMonitor(this.bankInfoObj,this.addressVal,function(datas){
						_this.branchInfo = datas;
						_this.branchText = setDatas(datas);
						
						_this.branchVal = [bankData.subbranchName];//默认选中支行列表第一个支行
						_this.branchInfobj = getBankItem(_this.branchVal[0],_this.branchInfo);
					})

					this.reservedPhone = bankData.reservedPhone;
					this.email = bankData.email;
					
					if(obj.accountFlag==1){//禁止编辑
	                    this.accountFlag = false;
	                }
	    		}
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
	function setDatas(data){
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
	function getBankItem(str,arr){
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
	function getaddres(st,arrs){
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
	.d2{padding:10px 0;background: #fff;height:100px;}
	.d1{margin:10px;padding:0 10px;background: #fff;border-radius: 5px;}
	.tr{display: flex;font-size:16px;}
	.tr>*{padding:15px 0;}
	.tr>*:first-child{text-align: left;color:#8ca3b5;}
	.tr>*:last-child{flex:1;text-align: right;color:#434f5d;}

	.bankcard_centent{padding:2px 10px;background: #fff;overflow:hidden}
	.bankcard_centent_box{display: flex;font-size:16px;width:100%;position:relative;}
	.bankcard_centent_box .box_title{text-align: left;color:#8ca3b5;padding:15px 0 15px 10px}
	.bankcard_centent_box .right_cent{flex:1;text-align: right;color:#434f5d;padding:15px 10px 15px 0px}
	.bankcard_centent_box .right_cent .zm_but,.bankcard_centent_box .right_cent .zm_but1{width:120px;display: inline-block;position:relative;padding-right:20px;background:url(../../assets/xiangji_icon.png) no-repeat right center;background-size:27px 19px;}
	.bankcard_centent_box .right_cent .zm_but span,.bankcard_centent_box .right_cent .zm_but1 span{display: block;width:100%;text-align: center;color:#8ca2b7}
	.bankcard_centent_box .right_cent .zm_but1 .succeed{color:#2491FF}
	.bankcard_centent_box .right_cent .zm_but1 input{ position: absolute;display: block;width: 35px;height: 100%;opacity: 0;z-index: 2;right:0;top:0;border-radius: 3px;}
	.bankcard_centent_box .right_cent .zm_but input{ position: absolute;display: block;width: 100%;height: 100%;opacity: 0;z-index: 2;left:0;top:0;border-radius: 3px;}

	.select select{width:auto;height:30px;text-align: center;}
	.select select option{text-align: center;}
	.tablev{display: table;width: 100%;height: 100%;text-align: center;font-size:14px;color:#8ca3b5;line-height: 1}
	.tablev>*{display: table-cell;vertical-align: middle;}
	.tablev>*>img{max-width: 50px;height: auto;}

	.showImg{max-width:100%;max-height:50%;display:block;margin:0 auto}
	input{outline: 0;border: 0;text-align: right;font-size:16px;color: #434f5d;}
	select{font-size:16px;}
	.box_button{padding:7.625% 6.25%;margin:0 auto;}
	.box_button:after{clear:both;content: '';display: block;}
	.box_button .backs{width:45%;display: inline-block;margin-right:3.90625%;float:left;padding:10px 0;text-align: center;border:1px solid #8CA3B5;color:#adbdc9}
	.box_button .nexts{width:45%;display: inline-block;margin-left:3.90625%;float:left;padding:10px 0;text-align: center;background:#2491ff;color:#fff;border:1px solid #2491ff;}  
	.box_button .nexts_1{display: block;text-align: center;width: 80%;height: 45px;margin: 20px auto;background-color: #2491ff;border-width: 0;color: #FFFFFF;line-height: 2.33333333;border-radius: 3px;font-size: 18px;outline: 0;}   
</style>
<style>
	.sheng .vux-cell-box:before,.accoun .vux-cell-box:before{border-top:none;height:0;}
	.sheng .weui-cell{padding:0;}
	.sheng label,.accoun label{text-align:left;color:#8ca3b5}
	.accoun .weui-cell{padding:15px 0px;}
	/*.loding .weui-toast{width:50%;}*/
	.vux-popup-picker-value{color: #434f5d;}
</style>
