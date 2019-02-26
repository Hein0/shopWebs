<template>
    <div id="app">
        <div class="contents" :class="{'contents-bottom':!showTabbar.flag}">
            <!-- <x-header class="red">佰仟车险</x-header> -->
            <router-view v-wechat-title="$route.meta.title"></router-view>
        </div>
        <div class="tab_item" v-if="showTabbar.flag">
            <tabbar>
                <tabbar-item :selected="showTabbar.index==0" link="/">
                    <img slot="icon" src="./assets/icon_sy2.png">
                    <img slot="icon-active" src="./assets/icon_sy1.png">
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item :selected="showTabbar.index==1" link="/category">
                    <img slot="icon" src="./assets/icon_fl2.png">
                    <img slot="icon-active" src="./assets/icon_fl1.png">
                    <span slot="label">分类</span>
                </tabbar-item>
                <tabbar-item :selected="showTabbar.index==2" link="/activity">
                    <img slot="icon" src="./assets/icon_gwc2.png">
                    <img slot="icon-active" src="./assets/icon_gwc1.png">
                    <span slot="label">购物车</span>
                </tabbar-item>
                <tabbar-item link="/personal" :selected="showTabbar.index==3">
                    <img slot="icon" src="./assets/icon_wd2.png">
                    <img slot="icon-active" src="./assets/icon_wd1.png">
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </div>
        <div class="loding">
            <loading v-model="loadingB"></loading>
        </div>
        <alert v-model="alertB" title="提示" :content="alertT"></alert>
    </div>
</template>

<script>
	import {XHeader,Tabbar,TabbarItem,Loading,Alert} from 'vux'
  	import util from './config/util/util'
  	import { mapGetters } from 'vuex'

  	export default {
    	name: 'app',
    	components: {
  	    	XHeader,
  	    	Tabbar,
  	    	TabbarItem,
        	Loading,
        	Alert
  		},
	    data(){
	      	return {
	        	loadingB:false,
	        	urlId:'',
	        	alertB:false,
	        	alertT:'',
	        	alertTDefault:'系统异常，请重试'
	      	}
	    },
	    methods:{
	      	onHide () {
	        	console.log('on hide')
	      	},
	      	onShow () {
	        	console.log('on show')
	      	}
	    },
	    computed: {
	        // 使用对象展开运算符将 getters 混入 computed 对象中
	        ...mapGetters([
	            'showTabbar'
	        ])
	    },
	    beforeCreate:function(){
	    },
	    //获取路由上的值
	  	created(){
	
	  	},
	  	beforeMount(){
	
	  	},
	    mounted:function(){
	        //:active
	        document.body.addEventListener('touchstart', function () {})
	        //日期格式化
	        Date.prototype.Format = function (fmt) {
	            var o = {
	                "M+": this.getMonth() + 1, //月份
	                "d+": this.getDate(), //日
	                "h+": this.getHours(), //小时
	                "m+": this.getMinutes(), //分
	                "s+": this.getSeconds(), //秒
	                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	                "S": this.getMilliseconds() //毫秒
	            };
	            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	                for (var k in o)
	                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	            return fmt;
	        }
	    },
	    methods:{
	        init(){
	            //this.hideOrShowShareBtn();
	        },
	        hideOrShowShareBtn(){
	            if (typeof WeixinJSBridge == "undefined"){
	                if( document.addEventListener ){
	                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	                }else if (document.attachEvent){
	                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
	                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	                }
	            }else{
	                onBridgeReady();
	            }
	            function onBridgeReady(){
	                WeixinJSBridge.call('hideOptionMenu');
	            }
	        },
	    }
	}
</script>
<style lang="less">
	@import "./assets/css/reset.css";
</style>
<style>
  a img {border: 0 none;}
  a {text-decoration: none;}
  input, textarea {-webkit-appearance: none;outline: none;}
  .vux-tap-active {-moz-user-select: none;}
  .vux-tap-active:active {background-color: #ececec;}
  .weui-dialog__btn_primary{color:#666!important;}

  #app{}
  .full-size{width:100%;height:auto;}
  .full-screen{min-height: 100%;width: 100%;display: inline-block;}
  .red{color:red!important;}
  .black{color:black!important;}
  .blue-light{color:#2491ff!important;}
  /*1px 下边框*/
  .one_px_border_b{width:100%;position: relative;}
  .one_px_border_b:after {content: " ";position: absolute;left: 0;bottom: 0;width: 100%;height: 1px;border-bottom: 1px solid #eef0f1;color: #eef0f1;-webkit-transform-origin: 0 100%;transform-origin: 0 100%;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
  .act:active{background: #ececec;}

  /*右键头*/
  .right-arrow{padding-right:15px;position:relative;}
  .right-arrow:before{content: " ";display: inline-block;height: 6px;width: 6px;border-width: 2px 2px 0 0;border-color: #C8C8CD;border-style: solid;-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);position: absolute;top: 50%;margin-top: -4px;right: 2px;}
  .contents{width:100%;height:100%;position:absolute;overflow:auto;right:0;left:0;bottom:53px;top:0;margin: 0 auto;background:#f4f4f4;}
  .contents-bottom{bottom:0;}

  /*select*/
  .select{position:relative;display: inline-block;}
  .select>*{position:relative;border:none;background: none;}
</style>
