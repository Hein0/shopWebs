<template>
	<div class="qcode">
		<img class="share-qcode" :src="imgBase" alt="">
        <p class="q-p1">请朋友扫描上方二维码，立享分期特权</p>
        <p class="q-p2">我的邀请码：{{phoneNo}}</p>
        <!-- <input class="path-input" type="text" v-model="qcodePath"> -->
		<!-- <p class="s-txt">发送你的推广链接，分享跟多的朋友</p>
		<a class="s-link" href="javascript:;">http//:xxxxxxxxxxxx</a> -->
		<div class="share-btn btn-qcode" :data-clipboard-text="qcodePath">
			<x-button type="primary" action-type="button" @click.native="saveOrUpdatePlan">复制链接邀请好友</x-button>
		</div>
        <p class="q-p3">{{qcodePath}}</p>
		<!-- <div>
              <div v-if="show" class="popup-cus">
            <div class="share-wrap">
                <div class="s-item" @click="shareFun(1)">
                  <img class="s-img" src="../../assets/wechat.png" alt="">
                  <p class="s-txt">微信好友</p>
                </div>
                <div class="s-item" @click="shareFun(2)">
                  <img class="s-img" src="../../assets/moments.png" alt="">
                  <p class="s-txt">朋友圈</p>
                </div>
                <div class="s-item" @click="shareFun(3)">
                  <img class="s-img" src="../../assets/qq.png" alt="">
                  <p class="s-txt">QQ好友</p>
                </div>
                <img class="s-img" src="../../assets/share-tips.png" alt="">
                <p>请点击右上角</p>
          <p>通过【发送给朋友】功能</p>
          <p>或【分享到朋友圈】功能</p>
          <p>把消息告诉小伙伴哟</p>
            </div>
            <div class="popup-mask" @click="popupMaskClick"></div>
              </div>
          </div> -->
        <toast v-model="toastshow" type="text" width="10em">{{showtext}}</toast>
	</div>
</template>

<script>

import { Cell, XButton, Popup, XSwitch, Toast } from 'vux'
import cookie from '../../config/util/cookie' 
import util from '../../config/util/util'
import Clipboard from 'clipboard';

/*组件*/
export default {
  	name: 'myQcode',
  	created () {
  		this.$parent.init();
  	},
    components: {
        Cell,
        XButton,
        Popup,
        XSwitch,
        Toast
    },
    data () {
        return {
            toastshow:false,
            showtext:'',
            url:"",
            show:false,
            imgBase:'',
            phoneNo:'',
            qcodePath:''
        }
    },
	mounted () {
    let that = this;
        const clipboard = new Clipboard('.btn-qcode');
         clipboard.on('success', function(e) {
            that.toastshow = true;
            that.showtext = '复制成功';
        });

        clipboard.on('error', function(e) {
            that.toastshow = true;
            that.showtext = '复制失败,请长按按钮下方链接进行复制！';
        });

    /*var vm = this;
    util.jsApi(this,function(data){
      console.log(location.href);
      vm.showTips = true;
      vm.showTipsMsg = 'success2'+data.appId;
      vm.$wechat.onMenuShareAppMessage({
          title: '我的二维码', // 分享标题
          desc: '把消息告诉小伙伴哟', // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: require('../../assets/logo300.jpg'), // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () { 
              // 用户确认分享后执行的回调函数
              vm.showTips = true;
              vm.showTipsMsg = 'success';
          },
          cancel: function () { 
              // 用户取消分享后执行的回调函数
          },
          complete:function(){
            vm.showTips = true;
            vm.showTipsMsg = 'complete';
          }
      });
    },function(res){

    });*/
		this.phoneNo = this.$route.query.phoneNo?this.$route.query.phoneNo:'';
		var vm = this;
        this.$http.post(this.$root.url+"userCenter/createQrCode",{
        	phoneNo:this.phoneNo
        }).then(function(res) {//success
           console.log('res',res);
           if(res.ok&&res.body.ask==0){
                vm.imgBase = 'data:image/png;base64,'+res.body.data.qrCode;
              	vm.qcodePath = res.body.data.url;
           }else{
              this.toastshow = true;
              this.showtext = res.body.message;
           }
        }, function(res) {// fail
           this.toastshow = true;
           this.showtext = 'error';
        });

	},
	//方法
    methods:{
	  	saveOrUpdatePlan:function(e){
	  		/*this.toastshow = true;
            this.showtext = '复制成功';*/
	  	},
	  	popupMaskClick:function(e){
	  		this.show = false
	  	}
	}
}
</script>

<style scoped>
    .qcode{text-align: center;padding: 11% 0;}
    .qcode .share-qcode{width: 150px;height: 150px;margin:0 auto;display:block;}
    .qcode .s-txt{font-size: 14px;color: #3c444d;}
    .qcode .s-link{font-size: 12px;color: #8ca3b5;}
    .qcode .share-btn{margin: 8.75% auto 2.2%;}
    .path-input{width:90%;border:1px solid rgba(0, 0, 0, 0.2);border-radius: 5px;    line-height: 2.33333333;font-size: 16px;margin: 10px 0;padding: 0 5px;}
    .share-btn{width:90%;margin:auto;}
    .share-btn .weui-btn_primary {background-color: #2491ff !important;font-size: 16px;}
    .share-wrap{overflow: auto;color: #fff;text-align: right;position: absolute;z-index: 2;width: 100%;top: 0;left: 0;}
    .share-wrap p{text-align: center;}
    .share-wrap .s-img{width: 66px;height: 50px;margin:30px 15px 0;}
    .share-wrap .s-item{width: 33.33%;float: left;text-align: center;padding: 20px 0;color: #3c444d;}
    .share-wrap .s-item .s-img{width: 52px;height: 52px;}
    .share-wrap .s-item .s-txt{}
    .popup-cus{position:absolute;top: 0;left: 0;right: 0;bottom: 0;}
    .popup-cus .popup-mask{position:absolute;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,.5);z-index: 1;}
    .q-p1{color: #3c444d;font-size: 14px;margin: 5.8% auto 1.7%;}
    .q-p2{color: #2491ff;font-size: 13px;}
    .q-p3{color: #8ca3b5;font-size: 12px;width: 90%;margin: 0 auto;word-break: break-all;}
</style>
<style>
	.qcode .vux-popup-dialog{background-color: transparent;}
</style>
