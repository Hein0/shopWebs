// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { WechatPlugin } from 'vux'
import cookie from './config/util/cookie'
import { Loading } from 'vux'
import Vuex from 'vuex'
import store from './vuex/store'
import FastClick from 'fastclick'
import Rem from './config/util/flexible.js' //页面字体大小

Vue.use(VueResource)
Vue.use(WechatPlugin)
Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false

Vue.use(Vuex)

FastClick.attach(document.body);

//console.log(Vue.wechat) // 可以直接访问 wx 对象。

//拦截器
Vue.http.interceptors.push(function(request, next) {
	var _this = this;
	_this.$parent.loadingB = true;

	let TOKEN = cookie.Cookie.get("token");
	//console.log(TOKEN)
	if(TOKEN) {
		request.headers.set('token', TOKEN);
	}
	next(function(response) {
		_this.$parent.loadingB = false;
		return response
	});
});
//路由跳转前
router.beforeEach((to, from, next) => {
	//配置是否需要显示底部菜单tab
	let noTabBarPath = {
			login: 'login',
			login2: 'login2',
			order: 'order',
			forgetPasw: 'forgetPasw',
			register: 'register',
			myQcode: 'myQcode',
			pinganViewTest: 'pinganViewTest',
			pinganView: 'pinganView',
			pinganTCI: 'pinganTCI',
			pinganTCIContinue: 'pinganTCIContinue',
			'identity': 'identity',
			'bankcard': 'bankcard',
			'applyModify': 'applyModify',
			'message': 'message',
			'cardModfy': 'cardModfy',
			'questions': 'questions',
			'qaList': 'qaList',
			'myloan': 'myloan',
			'account': 'account',
			'billist': 'billist',
			'loanContract': 'loanContract',
			'prepayment': 'prepayment',
			'about': 'about',
			'inviteRecode': 'inviteRecode',
			'inviter': 'inviter',
			'search': 'search',
			'orderDetail': 'orderDetail',
			'installmentInfo': 'installmentInfo',
			'signContract': 'signContract',
			'repaymentBill': 'repaymentBill',
			'prepaymentDetails': 'prepaymentDetails',
			'tipPage': 'tipPage',
			'detail':'detail',//购买详情页
			'commentPage':'commentPage',//评论列表
			'pagelist':'pagelist',//商品列表
		},
		//pathName = to.name.toLowerCase();
		pathName = to.name;
	//  console.log('pathName',from)
	let obj = {
		flag: false, //是否显示
		index: 0 //选中
	};
	if(noTabBarPath[pathName]) {
		obj.flag = false;
	} else {
		obj.flag = true;
		if(pathName == "category") { //分类
			obj.index = 1
		} else if(pathName == "activity") { // 活动
			obj.index = 2
		} else if(pathName == "personal" || pathName == "message" || pathName == "altertel" || pathName == "applyModify" || pathName == "cardModfy" || pathName == "account" || pathName == "billist" || pathName == "repaymentBill" || pathName == "loanContract" || pathName == "prepayment" || pathName == "myloan" || pathName == "inviter" || pathName == "news" || pathName == "order" || pathName == "bilList" || pathName == "inviteRecode" || pathName == "about" || pathName == "orderDetail" || pathName == "contractDetail" || pathName == "prepaymentDetails") { //个人中心
			obj.index = 3
		} else { //首页
			obj.index = 0
		}
	}
	store.commit('setShowTabbar', obj);

	//配置需要登录路由
	let needLogin = {
		personal: 'personal', //个人中心
		message: 'message', //我的信息 头像信息
		altertel: 'altertel', //修改电话号码
		cardModfy: 'cardModfy', //银行卡变更
		account: 'account', //还款账号  申请修改
		inviter: 'inviter', //邀请人
		myloan: 'myloan', //我的贷款
		billist: 'billist', //贷款记录
		repaymentBill: 'repaymentBill', //还款账单
		loanContract: 'loanContract', //贷款合同
		order: 'order', //订单
		orderDetail: 'orderDetail', //订单详情
		contractDetail: 'contractDetail', //合同详情
		orderComplete: 'orderComplete', //已投保投保订单详情
		inviteRecode: 'inviteRecode', //邀请记录
		//myQcode:'myQcode',//我的二维码
		news: 'news', //我的消息
		identity: 'identity' //身份证信息
	}
	//console.log('pathName',pathName);
	//console.log('needLogin',needLogin[pathName]);
	next();
	//  if(needLogin[pathName]){
	//      let token = cookie.Cookie.get("token")?cookie.Cookie.get("token"):'',
	//          phoneNo = cookie.Cookie.get("phoneNo")?cookie.Cookie.get("phoneNo"):'';
	//      if(token){
	//          if(to.query.phoneNo){//邀请码透传
	//              next();
	//          }else{
	//              if(phoneNo){
	//                to.query['phoneNo'] = phoneNo;
	//                next({ path:to.path,query:to.query});
	//              }else{
	//                if(from.query.phoneNo){
	//                    to.query['phoneNo'] = from.query.phoneNo;
	//                    next({ path:to.path,query:to.query});
	//                }else{
	//                    next();
	//                }
	//              }
	//          }
	//      }else{
	//          store.commit('setLoginBackUrl',{
	//              path: to.path,
	//              query: to.query
	//          });
	//          next({ path: '/login' })
	//      }
	//  }else{
	//      if(to.query.phoneNo){//邀请码透传
	//          next();
	//      }else{
	//          if(from.query.phoneNo){
	//              to.query['phoneNo'] = from.query.phoneNo;
	//              next({ path:to.path,query:to.query});
	//          }else{
	//              next();
	//          }
	//      }
	//  }
})
//路由跳转后
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});
/* eslint-disable no-new */

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	},
	data() {
		return {

		}
	},
	computed: {
		url() {
			//全局变量
			var baseUrl = 'https://sitapiqz.bqjr.cn:8081/qzd/app';
			//    var baseUrl='http://bilsit.bqjr.cn/';
			//      var baseUrl='http://bil.bqjr.cn/';

			var origin = window.location.origin + '/';
			//如果域名为localhost 则取baseUrl   否则取当前域名
			return window.location.host.substr(0, 9) == 'localhost' ? baseUrl : origin;
			//使用本地IP测试
			//return baseUrl;
		},
		pingAnURL_VCI() {
			//如果为测试环境，则取平安test 否则取平安aop
			return window.location.host == 'bil.bqjr.cn' ? 'https://aop.pingan.com.cn/ebusiness/newUpingan/index.html#index?systemId=0052&isSpecialCity=true&mediaSource=ICP-BQJR-BIZ0001' : 'https://test2-icp-core.pingan.com.cn:24443/ebusiness/newUpingan/index.html#index?systemId=0052&isSpecialCity=true&mediaSource=ICP-BQJR-BIZ0001';
		},
		pingAnURL() {
			return window.location.host == 'bil.bqjr.cn' ? 'https://aop.pingan.com.cn/' : 'https://test2-icp-core.pingan.com.cn:24443/';
		}
	}
})