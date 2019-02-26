export default {
	jsApi:function(vm,sucCallBack,errCallBack){
		vm.$http.get(vm.$root.url+"userCenter/wxShare").then(function(res) {//success
           if(res.ok&&res.body.ask==0){
                //console.log('res',res.body.data);
                var data = res.body.data;
                    
                vm.$wechat.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: [
                    			'onMenuShareTimeline',
								'onMenuShareAppMessage',
								'onMenuShareQQ',
								'onMenuShareWeibo',
								'onMenuShareQZone',
								'startRecord',
								'stopRecord',
								'onVoiceRecordEnd',
								'playVoice',
								'pauseVoice',
								'stopVoice',
								'onVoicePlayEnd',
								'uploadVoice',
								'downloadVoice',
								'chooseImage',
								'previewImage',
								'uploadImage',
								'downloadImage',
								'translateVoice',
								'getNetworkType',
								'openLocation',
								'getLocation',
								'hideOptionMenu',
								'showOptionMenu',
								'hideMenuItems',
								'showMenuItems',
								'hideAllNonBaseMenuItem',
								'showAllNonBaseMenuItem',
								'closeWindow',
								'scanQRCode',
								'chooseWXPay',
								'openProductSpecificView',
								'addCard',
								'chooseCard',
								'openCard',
				        	] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                vm.$wechat.ready(function(){
                    sucCallBack(data);
                });
                this.$wechat.error(function(res){
                	errCallBack(res);
                });
           }else{
              
           }
      }, function(res) {// fail
         
      });
	},
	parseURL:function(url){
		let str = url.substr(url.lastIndexOf('/')).split('?');
		let params = str[1]?str[1].split('&'):[],
			paramsJson = {};

		for(let i=0;i<params.length;i++){
			let tmp = params[i].split('=');
			paramsJson[tmp[0]] = tmp[1];
		}
		let parseURLJson = {
			path:str[0],
			params:paramsJson
		}
		//console.log(parseURLJson);
		return parseURLJson;
	},
	//设置导航头
	setTitle: function(str = "") {
	    var u = navigator.userAgent;
	    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
	    if (u.indexOf("OS") != -1) {
	      	
	    } else if (isAndroid) {
	      	
	    }
	},
	//根据参数删除数组对应的元素
	contains:function(a, obj) {
	 	var i = a.length;
	 	while (i--) {
	  		if (a[i] === obj) {
	   		return i;
	  		}
	 	}
	 	return false;
	}
}