<template>
  <div class="identity">
    <div class="identity_centent">
      <div class="identity_centent_box ">
        <div class="box_title"><span>身份证正面</span><i @click="tips(0)"><img src="../../assets/question.png"/></i></div>
        <div class="right_cent">
        	<div class="zm_but1" v-if="cardFrontStatus">
        		<span class="succeed" @click="showImgBut(cardFrontUrl)">查看图片</span>
        		<input v-if='accountFlag' type="file" accept="image/*" @change="onFrontChange"/>
        	</div>
        	<div class="zm_but" v-else>
        		<span>点击上传</span>
        		<input type="file" accept="image/*" @change="onFrontChange"/>
        	</div>
        </div>
      </div>
      <div class="identity_centent_box ">
        <div class="box_title"><span>身份证反面</span><i @click="tips(1)"><img src="../../assets/question.png"/></i></div>
        <div class="right_cent">
            <div class="zm_but1" v-if="cardBackStatus">
                <span class="succeed" @click="showImgBut(cardBackUrl)">查看图片</span>
                <input v-if='accountFlag' type="file" accept="image/*" @change="onBackChange" />
            </div>
            <div class="zm_but" v-else>
                <span>点击上传</span>
                <input type="file" accept="image/*" @change="onBackChange" />
            </div>
        </div>
      </div>
      <div class="identity_centent_box ">
        <div class="box_title">个人近照</div>
        <div class="right_cent">
        	<div class="zm_but1" v-if="grUrl">
        		<span class="succeed" @click="showImgBut(grUrl)">查看图片</span>
        		<input v-if='accountFlag' type="file" accept="image/*" @change="grFileChange" />
        	</div>
        	<div class="zm_but" v-else>
        		<span>点击上传</span>
        		<input type="file" accept="image/*" @change="grFileChange" />
        	</div>
        </div>
      </div>
    </div>
    <div class="d1">
    	<div class="tr one_px_border_b">
            <div>姓名</div>
            <div>{{name}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>性别</div>
            <div>{{gender}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>身份证号</div>
            <div>{{citizen_id}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>有效期至</div>
            <div>{{valid_date_end}}</div>
        </div>
        <div class="tr one_px_border_b">
            <div>签发机关</div>
            <div>{{agency}}</div>
        </div>
        <div>
            <x-dialog v-model="showHideOnBlur" class="dialog-img" hide-on-blur>
                <div class="img-box">
                    <img :src="shouImg" class="shouImg" >
                </div>
                <div @click="showHideOnBlur=false">
                    <span class="vux-close"></span>
                </div>
            </x-dialog>
		</div>
        <div class="box_button">
			<div class="nexts_1" @click="identNext">下一步</div>
        </div>
        <alert v-model="alertShow" title="温馨提示"> {{alertTxt}}</alert>
        <toast v-model="toastShow" type="text" width="10em">{{toastShowTxt}}</toast>
        <x-dialog v-model="tipsPreview" class="dialog-tips">
            <p class="t-title">{{tipsTxt}}</p>
            <div class="t-img">
              <img :src="tipsImgSrc">
            </div>
            <p class="t-dec">证件需清晰完整，提高识别度</p>
            <div class="t-btn" @click="tipsPreview=false">
              <span>关闭</span>
            </div>
        </x-dialog>
    </div>
  </div>

</template>

<script>
    import { XButton, XDialog, Alert, Toast} from 'vux'
    import cookie from '../../config/util/cookie'
    import compres from '../../config/util/compress'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'

  export default {
    components: {
      XButton,
      XDialog,
      Alert,
      Toast
    },
    computed: {
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapGetters([
          'identutyFlag'
        ])
    },
    data () {
      return {
        citizen_id:"",//身份证号
        cardBackUrl:"",//身份证正面地址
        cardBackStatus:false,//身份证正面状态
        cardFrontUrl:"",//身份证反面地址
        cardFrontStatus:false,////身份证反面状态
        name:"",//名字
        gender:"",//性别
        birthday:"",//生日
        filemess:"",//
        cardAddress:"",//身份证详细地址
        agency:"",//签证机关
        valid_date_end:"",//有效期
        validDateEnd:"",//有效期日期暂存
        grUrl:"",  //个人近照url
        shouImg:"",//查看图片
        showHideOnBlur: false,//图片提示框
        alertShow:false,//错误提示框
        alertTxt:"",//错误提示语
        province:"",//户籍省
        city:"",//户籍市
        ip:"", // ip地址
		ipProvince:"", // ip地址省份
		ipCity:"", //ip 地址省份
		certid:"",//url带过来的身份证
		isRequs:'',//是否从首页进来
        installmentId:'',//分期申请数据 id
        accountFlag:true,//是否可编辑
        toastShow:false,
        toastShowTxt:'',

        tipsPreview:false,//正反面提示
        tipsImgSrc:'',
        tipsTxt:'',
        tipsFront:{
            txt:'身份证正面示例',
            src:require('../../assets/card-front.png')
        },
        tipsBack:{
            txt:'身份证反面示例',
            src:require('../../assets/card-back.png')
        },
      }
    },
    //实例已经创建完成之后
	created(){
        this.certid = this.$route.query.certid ? this.$route.query.certid : '';//取身份证号
        this.installmentId = this.$route.query.installmentId ? this.$route.query.installmentId : '';//申请表Id
        this.$parent.init();
        let tempUserId = this.$route.query.tempUserId ? this.$route.query.tempUserId : '';
	},
	//组件写入dom结构之前
	mounted(){

        var _this = this;

        //获取省市
        let s1 = document.createElement('script');
        s1.type = 'text/javascript';
        s1.src = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
        document.body.appendChild(s1);
        s1.onload= function(){
            _this.ipProvince=remote_ip_info["province"];  //ip省
            _this.ipCity=remote_ip_info["city"];    //ip市
        }
        //获取ip
        let s2 = document.createElement('script');
        s2.type = 'text/javascript';
        s2.src = 'http://pv.sohu.com/cityjson';
        document.body.appendChild(s2);
        s2.onload= function(){
            _this.ip=returnCitySN["cip"];  //ip
        }
        //if(this.identutyFlag){ //展示已保存数据
        if(this.installmentId){ //展示已保存数据
            //查询数据
            this.$http.post(this.$root.url+"installment/loadInstallment?installmentId="+_this.installmentId,{},{
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
            }).then(function(data) {// 这里是处理正确的回调
                
                if(data.body.ask==0){
                    var datas = data.body.data;
                    if(datas){
                        this.name = datas.name;
                        this.citizen_id = datas.cardNo;
                        this.cardFrontUrl = datas.cardFront;
                        this.cardBackUrl = datas.cardBack;
                        this.grUrl = datas.recentPicture;

                        this.cardBackStatus = datas.cardFront ? true :false;
                        this.cardFrontStatus = datas.cardBack ? true :false;

                        this.gender = datas.sex;
                        this.agency = datas.cardAgency;
                        this.valid_date_end = datas.cardValid;
                        this.cardAddress = datas.cardAddress;
                        this.province = datas.residenceProvince;
                        this.city = datas.residenceCity

                        if(datas.accountFlag==1){//禁止编辑
                            this.accountFlag = false;
                        }
                    }
                }else{
                    this.toastShowTxt = data.body.message;
                    this.toastShow = true;
                }
            }, function(error) {// 这里是处理错误的回调
                console.log(error)
            });
        }
    },
    //方法对象
    methods:{
        ...mapActions([
            'setIdentutyFlag'
        ]),
    	showImgBut:function(url){
    		this.shouImg = url
    		this.showHideOnBlur=true;
    	},
        alertHide:function(){
            window.location.reload()
        },
        tips:function(type){
            if(type==0){//正面
                this.tipsImgSrc = this.tipsFront.src;
                this.tipsTxt = this.tipsFront.txt;
            }else if(type==1){//反面
                this.tipsImgSrc = this.tipsBack.src;
                this.tipsTxt = this.tipsBack.txt;
            }
            this.tipsPreview = true;
        },
    	//身份证正面
    	onFrontChange:function(e) {
    		var self = this;
			var files = e.target.files || e.dataTransfer.files;
			if(!files.length) return;
			var fil = files[0];
			var maxsize = 3*1024*1024;
			var nubms = fil.size>maxsize ? '0.7' : '1';
            compres.comprImg.uploadImg(fil,maxsize,nubms,function(data){
	          self.filemess = data;

	            var text = window.atob(data.split(",")[1]);
			    var buffer = new Uint8Array(text.length);
			    var pecent = 0, loop = null;
			    for (var i = 0; i < text.length; i++) {
			      buffer[i] = text.charCodeAt(i);
			    }
			    var blob = compres.comprImg.getBlob([buffer], fil.type);
                var formData = new FormData();
		        formData.append("file", blob);
                formData.append("fileName", fil.name);
		        formData.append("type", 1);
	            self.uploaIdCar(formData);  ////上传身份证正反面
            })
		},
        //身份证反面
        onBackChange:function(e) {
            var self = this;
            var files = e.target.files || e.dataTransfer.files;
            if(!files.length) return;
            var fil = files[0];
            var maxsize = 3*1024*1024;
            var nubms = fil.size>maxsize ? '0.7' : '1';
            compres.comprImg.uploadImg(fil,maxsize,nubms,function(data){
              self.filemess = data;

                var text = window.atob(data.split(",")[1]);
                var buffer = new Uint8Array(text.length);
                var pecent = 0, loop = null;
                for (var i = 0; i < text.length; i++) {
                  buffer[i] = text.charCodeAt(i);
                }
                var blob = compres.comprImg.getBlob([buffer], fil.type);
                var formData = new FormData();
                formData.append("file", blob);
                formData.append("type",2);
                formData.append("fileName", fil.name);
                self.uploaIdCar(formData);  ////上传身份证正反面
            })
        },
		//上传身份证正反面
		uploaIdCar(formData){
			var self = this;
			self.$http.post(self.$root.url+"ocr/common", formData , {
		        headers: {'Content-Type': 'application/json;charset=UTF-8'},
		    }).then(function(data) {// 这里是处理正确的回调
		        var datas = data.body.data;
                if(data.body.ask==0 && datas.result){
                    
                    if(datas.result.token){
                        cookie.Cookie.set("token",datas.result.token);
                    }
                    if(datas.result.number && datas.url && datas.result.name && datas.result.sex){//反面
                        if(datas.result.number && self.certid && datas.result.number != self.certid){
                            this.citizen_id = '';
                            this.cardBackUrl = '';
                            this.name = '';
                            this.gender = '';
                            this.alertTxt = "上传身份证和注册身份证不一致,请重新上传！";
                            this.alertShow = true;
                            this.cardBackStatus = false;
                        }else{
                            this.cardBackStatus = true;
                            this.citizen_id = datas.result.number;//身份证号
                            this.cardBackUrl = datas.url;//身份证图片地址
                            this.name = datas.result.name;//身份证名字
                            this.gender = datas.result.sex;//性别
                            this.cardAddress = datas.result.address;//详细地址
                            this.province = datas.result.address_details.province ? datas.result.address_details.province :"无";
                            this.city = datas.result.address_details.city ? datas.result.address_details.city :"无";
                        }
                    }else if(datas.result.authority && datas.result.timelimit){ //正面
                        let cardValidFlag = true;
                        let endDateStr = datas.result.timelimit ? datas.result.timelimit.split('-')[1]: '';//20050921-20150921
                        if(endDateStr.length==8){
                            endDateStr = endDateStr.substr(0,4) + "-" + endDateStr.substr(4,2) + "-" + endDateStr.substr(6,2);
                            let endDateTime = new Date(endDateStr).getTime();
                            if(endDateTime && endDateTime < new Date().getTime()){
                                cardValidFlag = false;
                            }
                        }
                        if(cardValidFlag){
                            this.cardFrontStatus = true;
                            this.cardFrontUrl = datas.url;
                            this.valid_date_end = endDateStr;
                            this.agency = datas.result.authority;//签证机关
                        }else{
                            this.alertTxt = "您的身份证已过期，请重新上传！";
                            this.alertShow = true;
                        }
                    }else{
                        this.alertTxt = '身份证识别有误';
                        this.alertShow = true
                    }
                }else{
                    this.alertTxt = data.body.message;
                    this.alertShow = true
                }
		    }, function(error) {// 这里是处理错误的回调
		        console.log(error)
		  });
		},
		//个人近照
		grFileChange(e){
			var _this=this;
			var files = e.target.files || e.dataTransfer.files;
			if(!files.length) return;
			var fiss=files[0];
			var maxsize=3*1024*1024;
			var nubms = fiss.size>maxsize ? '0.7' : '1';
            compres.comprImg.uploadImg(fiss,maxsize,nubms,function(data){
                var text = window.atob(data.split(",")[1]);
    			    var buffer = new Uint8Array(text.length);
    			    var pecent = 0, loop = null;
    			    for (var i = 0; i < text.length; i++) {
    			      buffer[i] = text.charCodeAt(i);
    			    }
    			    var blob = compres.comprImg.getBlob([buffer], fiss.type);
                var formDa = new FormData();
                formDa.append("file", blob);
    	        formDa.append("fileName", fiss.name);
                formDa.append("type",3);
              _this.uploaGr(formDa);  ////上传个人照发送请求
            })
		},
		//上传个人照发送请求
		uploaGr(formDa){
			var _this = this;
			_this.$http.post(this.$root.url+"upload/upload", formDa, {
		        headers: {'Content-Type': 'application/json;charset=UTF-8'},
		    }).then(function(data) {// 这里是处理正确的回调
		        var datas=data.body.data;
		        if(datas&&data.body.ask==0){
		       	  _this.grUrl=datas; //个人近照url
		        }
		    }, function(error) {// 这里是处理错误的回调
		        console.log(error)
		  });
		},
        //下一步
        identNext(){
            if(this.agency==''||this.gender==''||this.valid_date_end==''||this.cardFrontUrl==''){
                this.alertTxt="请上传身份证正面";
                this.alertShow=true
            }else if(this.citizen_id==''||this.name==''||this.cardBackUrl==''){
                this.alertTxt="请上传身份证反面";
                this.alertShow=true
            }else if(this.grUrl==''){
                this.alertTxt="请上传个人近照";
                this.alertShow=true
            }else{
                this.$http.post(this.$root.url+"ifc/verify",{
                    "name":this.name,
                    "certno":this.citizen_id
                }, {
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                }).then(function(data) {// 这里是处理正确的回调
                    if(data.body.ask==0){
                        var params = {
                            "installmentId":this.installmentId,
                            "name":this.name,
                            "cardNo":this.citizen_id,
                            "cardValid":this.valid_date_end,
                            "sex":this.gender,
                            "cardAgency":this.agency,
                            "cardFront":this.cardFrontUrl,
                            "cardBack":this.cardBackUrl,
                            "recentPicture":this.grUrl,
                            "cardAddress":this.cardAddress,
                            "residenceProvince":this.province,
                            "residenceCity":this.city,
                            "ip":this.ip,
                            "ipProvince":this.ipProvince,
                            "ipCity":this.ipCity,
                        };

                        this.$http.post(this.$root.url+"installment/updateInstallment", params ,{ //
                            headers: {'Content-Type': 'application/json;charset=UTF-8'},
                        }).then(function(data) {// 这里是处理正确的回调
                            if(data.body.ask==0){
                                this.setIdentutyFlag(true);
                                this.$router.push({path:'/bankcard',query: {"name":this.name,"cardNo":this.citizen_id,'installmentId':this.installmentId}})//跳转路由模块
                            }else{
                                this.alertTxt=data.body.message;
                                this.alertShow=true
                            }
                        }, function(error) {// 这里是处理错误的回调
                            console.log(error)
                        });
                    }else{
                        this.alertTxt=data.body.message;
                        this.alertShow=true
                    }
                },function(error) {// 这里是处理错误的回调
                    console.log(error)
                });
            }
        }
    }
  }
</script>

<style scoped>
  .identity{padding:10px;}
  .fbox{display: flex;}
  .fbox>div{flex:1;height:100px;background: #fff;}
  .fbox>div:last-child{margin-left:15px;}
  .identity_centent{border-radius: 5px;background: #fff;overflow: hidden;}
  .identity_centent_box{display: flex;font-size:16px;width:100%;position:relative;}
  .identity_centent_box .box_title{text-align: left;color:#8ca3b5;padding:15px 0 15px 10px}
  .identity_centent_box .box_title>span,.identity_centent_box .box_title>i{display:inline-block;vertical-align: middle;}
  .identity_centent_box .box_title>i{width: 18px;height: 18px;margin-left:8px; }
  .identity_centent_box .box_title>i>img{width: 100%;display:block;}
  .identity_centent_box .right_cent{flex:1;text-align: right;color:#434f5d;padding:15px 10px 15px 0px}
  .identity_centent_box .right_cent .zm_but,.identity_centent_box .right_cent .zm_but1{width:120px;display: inline-block;position:relative;padding-right:35px;background:url(../../assets/xiangji_icon.png) no-repeat right center;background-size:27px 19px;}
  .identity_centent_box .right_cent .zm_but span,.identity_centent_box .right_cent .zm_but1 span{display: block;width:100%;text-align: center;color:#8ca2b7}
  .identity_centent_box .right_cent .zm_but1 span.succeed{color:#2491FF}
  .identity_centent_box .right_cent .zm_but input{ position: absolute;display: block;width: 100%;height: 100%;opacity: 0;z-index: 2;left:0;top:0;border-radius: 3px;}
  .identity_centent_box .right_cent .zm_but1 input{ position: absolute;display: block;width: 35px;height: 100%;opacity: 0;z-index: 2;right:0;top:0;border-radius: 3px;}
  .identity_centent_box:after{content: " ";position: absolute;left: 2%;right:2%;bottom: 0; width: 96%;height: 1px;
    border-bottom: 1px solid #eef0f1;color: #eef0f1;
    -webkit-transform-origin: 0 100%;transform-origin: 0 100%;-webkit-transform: scaleY(0.5); transform: scaleY(0.5);}

  .d1{margin-top:10px;background: #fff;border-radius: 5px;}
  .tr{display: flex;font-size:16px;}
  .tr>*{padding:15px 0;}
  .tr>*:first-child{text-align: left;color:#8ca3b5;padding-left:10px;}
  .tr>*:last-child{flex:1;text-align: right;color:#434f5d;padding-right:10px;}

  .tablev{display: table;width: 100%;height: 100%;text-align: center;font-size:14px;color:#8ca3b5;line-height: 1}
  .tablev>*{display: table-cell;vertical-align: middle;}
  .tablev>*>img{max-width: 50px;height: auto;}
  .addinput input{outline: 0;border: 0;text-align: right;font-size:16px;}
  .idennetxBut{width:60%;margin:auto;padding:25px 0 20px}
  .shouImg{max-width:100%;max-height:50%;display:block;margin:0 auto}

  .box_button{padding:7.625% 6.25%;margin:0 auto;}
	.box_button:after{clear:both;content: '';display: block;}
	.box_button .nexts_1{display: block;text-align: center;width: 80%;height: 45px;margin: 20px auto;background-color: #2491ff;border-width: 0;color: #FFFFFF;line-height: 2.33333333;border-radius: 3px;font-size: 18px;outline: 0;}
    .dialog-tips{}
    .dialog-tips .t-title{color: #2f353c;font-size: 17px;line-height: 50px;width: 80%;margin: 0 auto;border-bottom: 1px solid #eff1f0;}
    .dialog-tips .t-img{width: 93.75%;margin: 8px auto;}
    .dialog-tips .t-img>img{display:block;margin: 0 auto;width: 100%;}
    .dialog-tips .t-dec{color: #2f353c;font-size: 12px;}
    .dialog-tips .t-btn{color: #2491ff;font-size: 14px;padding: 5px 0;background-color: #eee;margin-top:10px; }
</style>
<style>
	.idennetxBut .weui-btn_primary {background-color: #2491ff !important;}
    .dialog-img .weui-dialog{background-color:transparent; }
    
</style>



