<template>
	<div class="datum">
  	    <div class="test_select_mark cler_border" id="shengname">
  	    	<x-address title="投保城市" @on-hide="addreChange" placeholde="请输入投保城市" v-model="provinceCode" raw-value :list="addressData"  hide-district></x-address>
		</div>
		<div class="test_select" v-show="!isChange">
  	    	<div class="test_select_cen2">
	  	    	<label>车牌号码</label>
			    <span class="inputs">
			    	<input type="text" placeholder="请输入车牌号" style="text-transform: uppercase" v-model="vehicleNo" maxlength="8" @input="attInput"  />
			    </span>
		    </div>
		</div>
		<div class="test_select_mark" v-show="isChange">
			<x-switch :title="'新车未上牌'" v-model="isChange"></x-switch>
		</div>
		<div class="test_select">
  	    	<div class="test_select_cen2">
	  	    	<label>车主姓名</label>
	  	    	<div class="test_sele_text">{{name}}</div>
		    </div>
		</div>
		<div class="test_select">
  	    	<div class="test_select_cen2">
	  	    	<label>车主身份证号</label>
	  	    	<div class="test_sele_text">{{cardNo}}</div>
		    </div>
		</div>
		<div class="xieyi">
			<span>请核对车主本人车辆信息，目前只支持9座以下本人私家车</span>
		</div>
		<div class="buttons">
			<div class="backs" @click="back">上一步</div>
			<div class="nexts" @click="datumbuts">下一步</div>
		</div>
		<!--错误提示语-->
	    <div>
	      <alert v-model="alertShow" title="温馨提示"> {{alertTxt}}</alert>
	    </div>
	</div>
</template>

<script>
	import { Selector, XSwitch,XAddress,Alert} from 'vux'
	import cookie from '../../config/util/cookie' 
	
	export default{
		name: 'datum',
    	components: {
		    Selector,
		    XSwitch,
		    XAddress,
		    Alert
		}, 
		data () {
		    return {
		        isChange:false,//是否上牌
		        shengshiname:[],//省市名称
		        addressData: [],//省、市列表数据
		        provinceCode:[],//省、市编码
		        provinceCodes:'',  //投保省份编码
				province:'',  // 投保省份
				cityCode:'', // 投保城市编码
				city:'', //投保城市
				areaCode:'',  // 投保区域编码（选填）
				area:'',// 投保区域 （选填）
				vehicleNo:'', // 车牌号  选填
				vehicleSign:'0', // 辆是否已上牌（0、已上牌，1、未上牌，默认0）
				name:'',   // 投保人 
				cardNo:'',  // 投保人
				token:'',//获取token
		        alertShow:false,//错误提示框
        		alertTxt:'',//错误提示语
		    }
	    },
	    //实例已经创建完成之后
	    created(){
//	    	this.name = this.$route.query.name?this.$route.query.name:'';
//			this.cardNo = this.$route.query.cardid?this.$route.query.cardid:'';
            this.$parent.init();
		},
		//组件写入dom结构之前
		mounted(){
            var vms=this
            //请求投保城市列表
            this.token=cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';
            
            vms.$http.post(this.$root.url+"basedata/getAreaInfo", {
    		}, {
		        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
		    }).then(function(data) {// 这里是处理正确的回调
		        var datas=data.body.data;
		        if(datas&&datas.length>0){
            		vms.addressData=datas
        		}
		    }, function(error) {// 这里是处理错误的回调
		        console.log(error)
		    });
		    //查询数据
      		this.$http.post(this.$root.url+"apply/queryApply",{
				},{
					headers: {'Content-Type': 'application/json;charset=UTF-8'},
			    }).then(function(data) {// 这里是处理正确的回调
		    	  var datas = data.body.data;
		        if(datas && data.body.ask==0){
		       	  	this.name = datas.name;
		        	this.vehicleNo = datas.vehicleNo?datas.vehicleNo:'';
		        	this.cardNo = datas.cardNo?datas.cardNo:'';
		        	this.vehicleSign = datas.vehicleSign;
		        	this.shengshiname.push({"name":datas.province?datas.province:'',"id":datas.provinceCode?datas.provinceCode:''});
		        	this.provinceCode.push(datas.provinceCode?datas.provinceCode:'');
		        	this.shengshiname.push({"name":datas.city?datas.city:'',"id":datas.cityCode?datas.cityCode:''});
		        	this.provinceCode.push(datas.cityCode?datas.cityCode:'');
		        }
			    }, function(error) {// 这里是处理错误的回调
			      console.log(error)
		  	});
		},
	    //方法对象
	    methods:{
		    //选中开户省市时调用方法
			addreChange(va){
				//获取支行列表
				var _this = this;
				this.shengshiname = getaddres(this.provinceCode,this.addressData);
			},
			//上一步
			back(){
				window.history.go(-1)
			},
			//监听输入的input
			attInput(e){
				var el = e.target &&e.target.value;
				console.log(el);
				
			},
		    //下一步提交
		    datumbuts(){
		    	console.log(this.shengshiname);
		    	if(this.provinceCode.length<=0){
		    		this.alertTxt="投保城市没选择";
				    this.alertShow=true
				    return false
		    	}else if(this.vehicleNo==""){
		    		this.alertTxt="车牌号码不能为空";
				    this.alertShow=true
				    return false
		    	}else if(this.name==""){
		    		this.alertTxt="车主姓名不能为空";
				    this.alertShow=true
				    return false
		    	}else if(this.cardNo==""){
		    		this.alertTxt="车主身份号不能为空";
				    this.alertShow=true
				    return false
		    	} 
		    	var group = {
		    	 	"province":this.shengshiname.length>0?this.shengshiname[0].name:"",//省名称
		    	 	"provinceCode":this.provinceCode[0],//省编码
					"city":this.shengshiname.length>0?this.shengshiname[1].name:"",//市名称
					"cityCode":this.provinceCode[1], //市编码
					"areaCode":this.areaCode,//区编码
					"area":this.area, //区
					"vehicleNo":this.isChange==false ? this.vehicleNo : '', //车牌号
					"vehicleSign":this.vehicleSign,   //是否上牌  0 已上牌  1 未上牌
//					"vehicleSign":this.Changeval,   //是否上牌
					"name":this.name,   //车主姓名
					"cardNo":this.cardNo,//车主身份号
		    	}
		    	
		    	this.$http.post(this.$root.url+"/apply/applyPolicy",group , {
			        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
			    }).then(function(data) {// 这里是处理正确的回调
			        if(data.body.ask==0){
			        	this.$router.push({path:'/yesbrand',query: {"Changeval":this.vehicleSign,"dardName":'',"modelCode":'',"chasePrice":''}})//其中login是你定义的一个路由模块
			        }
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			    });
		    }
		},
		//计算属性
		computed:{
           Changeval(){
           	return this.isChange==true?"1":"0"
           }
        }
	    
	}
	//获取省市的名称
	function getaddres(st,arrs){
		var addobj = [];
		for(var i=0;i<arrs.length;i++){
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
</script>

<style scoped>
	input, textarea {-webkit-appearance: none;outline: none;}
	.datum{background:#fff;margin:3.125%}
	.test_select{padding:11px 0;border-bottom:1px solid #ECECEC;margin:0px 15px 0;}
	.test_select_mark{padding:1px 0;border-bottom:1px solid #ECECEC;margin:0px 15px 0;}
	.test_select_cen{padding:3px 0;}
	.test_select_cen label,.test_select_cen2 label{padding:6px 0;width:45%;color: #8ca3b5;}
	.test_select_cen2{display: flex;}
	.test_select_cen2 .test_sele_text{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: right;color: #434f5d;padding:6px 0;line-height:25px}
	.test_select_cen2 .inputs{width:100%;flex: 1;line-height: 40px;}
	.test_select_cen2 .inputs input{height:40px;line-height:40px;width:100%;border: none;text-align: right;font-size:16px;}
	.weui-btn_primary {background-color: #2491ff !important;}
	.xieyi{padding:11px 0;margin:0px 15px 0;font-size:14px;color: #8ca3b5;}
	.xieyi span a{color:#2491ff}
	.box_fix{display: flex;display: -webkit-flex;}
	
	.buttons{padding:7.625% 6.25%;width:87.5%;margin:0 auto;}
	.buttons:after{clear:both;content: '';display: block;}
	.buttons .backs{width:45%;display: inline-block;margin-right:3.90625%;float:left;padding:10px 0;text-align: center;border:1px solid #8CA3B5;color:#adbdc9}
	.buttons .nexts{width:45%;display: inline-block;margin-left:3.90625%;float:left;padding:10px 0;text-align: center;background:#2491ff;color:#fff;border:1px solid #2491ff;}     
	
</style>
<style>
	.cler_border .vux-cell-box:before{border:none !important;}
	.datum .weui-cell{padding:10px 5px 10px 0 !important;}
	.datum .weui-label{color: #8ca3b5;}
	.datum .weui-switch:checked{    border-color: #2491ff; background-color: #2491ff;}
</style>