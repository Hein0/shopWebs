import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/components/404.vue'
import errPage from '@/components/500.vue'
import Plan from '@/components/Plan'

import pinganView from '@/components/pinganView'
import pinganViewTest from '@/components/pinganViewTest'
//classify  分类
import Category from '@/views/classify/category'

//index
import Index from '@/views/index/Index'
import Datum from '@/views/index/Datum'
import Activity from '@/views/index/activity'
import Search from '@/views/index/search'//search  搜索
import PageList from '@/views/index/pageList'//商品详情页
import Detail from '@/views/index/detail'//商品详情页
import CommentPage from '@/views/index/commentPage'//评价页面
import Service from '@/views/index/service'
import Yesbrand from '@/views/index/Yesbrand'
import Identity from '@/views/index/identitycard'
import Bankcard from '@/views/index/bankcard'
import Questions from '@/views/index/questions'   //常见问题
import QaList from '@/views/index/qaList'   //分类下常见问题列表
import About from '@/views/index/about'   //关于我们
import Guide from '@/views/index/guide'   //理赔指南
import Process from '@/views/index/process'   //投保流程
//personal
import Personal from '@/views/information/personal'
import Message from '@/views/information/message'
import Altertel from '@/views/information/altertel'
import ApplyModify from '@/views/information/applyModify'
import CardModfy from '@/views/information/cardModfy'
import Account from '@/views/information/account'
import bilList from '@/views/information/bilList'
import repaymentBill from '@/views/information/repaymentBill'
import loanContract from '@/views/information/loanContract'
import contractDetail from '@/views/information/contractDetail'
import prepayment from '@/views/information/prepayment'
import prepaymentDetails from '@/views/information/prepaymentDetails'
import Myloan from '@/views/information/myloan'
import Inviter from '@/views/information/inviter'
import News from '@/views/information/news'
import myQcode from '@/views/information/myQcode'
import inviteRecode from '@/views/information/inviteRecode'
//login
import Login from '@/views/logins/login'
import ForgetPasw from '@/views/logins/forgetPasw'
import Register from '@/views/logins/register'
//Price
import atPrice from '@/views/prices/atPrice'
import pinganTCI from '@/views/prices/pinganTCI'
import companySelect from '@/views/prices/companySelect'
import securityList from '@/views/prices/securityList'
import installmentInfo from '@/views/prices/installmentInfo'
import checkIdInfo from '@/views/prices/signContract'
import pinganTCIContinue from '@/views/prices/pinganTCIContinue'
//order
import order from '@/views/order/order'//我的订单
import Comment from '@/views/order/comment'//评论
import orderDetail from '@/views/order/orderDetail'
import orderComplete from '@/views/order/orderComplete'

//提示页面
import alert from '@/views/widget/alert'
import tipPage from '@/views/widget/tipPage'



Vue.use(Router)

export default new Router({
  // mode:'history',//默认没有，带有#  加上就去掉#
  routes: [
    {
      path: '/test',
      name: 'test',
      component: require('@/views/prices/index'),
    },
    {
        path: '/404',
        meta: {
	        title: '404'
	      },
        component: NotFound,
        name: '',
    },
    {
        path: '/500',
        meta: {
	        title: '500'
	      },
        component: errPage,
        name: '',
    },
    {
        path: '*',
        redirect: { path: '/404' }
    },
    //首页
    {
      path: '/',    //首页
      name: 'index',
      meta: {
        title: '首页'
      },
      component: Index
    },
    {
      path: '/category',   //分类
      name: 'category',
      meta: {
        title: '分类'
      },
      component: Category  
    },
    {
      path: '/search',  //搜索
      name: 'search',
      meta: {
        title: '搜索'
      },
      component: Search
    },
	{
	path: '/pagelist',  //商品列表
	name: 'pagelist',
	meta: {
		title: '商品列表'
	},
	component: PageList
	},
    {
      path: '/detail',  //商品详情
      name: 'detail',
      meta: {
        title: '商品详情'
      },
      component: Detail
    },
    {
    	path: '/commentPage',  //评价
      name: 'commentPage',
      meta: {
        title: '评价'
      },
    	 component: CommentPage
    },
    {
      path: '/datum',  //投保人信息
      name: 'datum',
      meta: {
        title: '佰仟车险 '
      },
      component: Datum
    },
    {
      path: '/pinganView',  //平安嵌套页面
      name: 'pinganView',
      meta: {
        title: '平安车险 '
      },
      component: pinganView
    },
    {
      path: '/pinganViewTest',  //平安页面 测试
      name: 'pinganViewTest',
      meta: {
        title: '平安车险 '
      },
      component: pinganViewTest
    },
    {
      path: '/activity',   //活动
      name: 'activity',
      meta: {
        title: '活动'
      },
      component: Activity
    },
    {
      path: '/service',   //服务条款
      name: 'service',
      meta: {
        title: '服务条款'
      },
      component: Service
    },
    {
      path: '/yesbrand',   //车辆信息保存
      name: 'yesbrand',
      meta: {
        title: '佰仟车险'
      },
      component: Yesbrand
    },
    
    {
      path: '/identity',//校验身份证   添加
      name: 'identity',
      meta: {
        title: '录入分期身份信息'
      },
      component: Identity
    },
    {
      path: '/bankcard',//银行卡校验   添加
      name: 'bankcard',
      meta: {
        title: '录入分期银行卡信息'
      },
      component: Bankcard
    },
    {
      path: '/plan',       //险种选择
      name: 'plan',
      meta: {
        title: '险种选择'
      },
      component: Plan
    },
    {
      path: '/questions',       //常见问题
      name: 'questions',
      meta: {
        title: '常见问题'
      },
      component: Questions
    },
    {
      path: '/qaList',       //常见问题
      name: 'qaList',
      meta: {
        title: '常见问题'
      },
      component: QaList
    },
    {
      path: '/about',       //关于我们
      name: 'about',
      meta: {
        title: '关于我们'
      },
      component: About
    },
    {
      path: '/guide',       //理赔指南
      name: 'guide',
      meta: {
        title: '理赔指南'
      },
      component: Guide
    },
    {
      path: '/process',       //投保流程
      name: 'process',
      meta: {
        title: '投保流程'
      },
      component: Process
    },
    //我的
    {
      path: '/personal',     //个人中心
      name: 'personal',
      meta: {
        title: '个人中心'
      },
      component: Personal
    },
    {
      path: '/message',    //我的信息 头像信息
      name: 'message',
      meta: {
        title: '我的信息'
      },
      component: Message
    },
    {
      path: '/altertel',    //修改电话号码
      name: 'altertel',
      meta: {
        title: '修改手机号'
      },
      component: Altertel
    },
    {
      path: '/applyModify',    //检验身份
      name: 'applyModify',
      meta: {
        title: '检验身份'
      },
      component: ApplyModify
    },
    {
      path: '/cardModfy',    //银行卡变更
      name: 'cardModfy',
      meta: {
        title: '变更分期银行卡信息'
      },
      component: CardModfy
    },
    {
      path: '/account',   //还款账号  申请修改
      name: 'account',
      meta: {
        title: '还款账号'
      },
      component: Account
    },
    {
      path: '/billist',   //我的账单
      name: 'billist',
      meta: {
        title: '贷款记录'
      },
      component: bilList
    },
    {
      path: '/repaymentBill',  //还款账单
      name: 'repaymentBill',
      meta: {
        title: '还款账单'
      },
      component: repaymentBill
    },
    {
      path: '/loanContract',   //贷款合同
      name: 'loanContract',
      meta: {
        title: '贷款合同'
      },
      component: loanContract
    },
    {
      path: '/prepayment',   //提前结清
      name: 'prepayment',
      meta: {
        title: '提前结清'
      },
      component: prepayment
    },
    {
      path: '/prepaymentDetails',   //提前结清详情
      name: 'prepaymentDetails',
      meta: {
        title: '提前结清详情'
      },
      component: prepaymentDetails
    },
    {
      path: '/myloan',  //我的贷款  列表
      name: 'myloan',
      meta: {
        title: '我的贷款'
      },
      component: Myloan
    },
    {
      path: '/inviter',   //邀请人
      name: 'inviter',
      meta: {
        title: '我的邀请人'
      },
      component: Inviter
    },
    {
      path: '/news',    //我的消息
      name: 'news',
      meta: {
        title: '消息'
      },
      component: News
    },
    //登录
    {
      path: '/login',    //登录
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/forgetPasw',    //忘记密码
      name: 'forgetPasw',
      meta: {
        title: '忘记密码'
      },
      component: ForgetPasw
    },
    {
      path: '/register',    //注册新用户
      name: 'register',
      meta: {
        title: '注册'
      },
      component: Register
    },
    //报价
    {
      path: '/atPrice',    //正在报价
      name: 'atPrice',
      meta: {
        title: '正在报价'
      },
      component: atPrice
    },
    {
      path: '/pinganTCI',   //平安页面交强险
      name: 'pinganTCI',
      meta: {
        title: '平安车险'
      },
      component: pinganTCI
    },
    {
      path: '/pinganTCIContinue',    //继续支付
      name: 'pinganTCIContinue',
      meta: {
        title: '平安车险'
      },
      component: pinganTCIContinue
    },
    {
      path: '/companySelect',    //车险报价
      name: 'companySelect',
      meta: {
        title: '车险报价'
      },
      component: companySelect
    },
    {
      path: '/securityList',    //车险报价
      name: 'securityList',
      meta: {
        title: '车险报价'
      },
      component: securityList
    },
    {
      path: '/installmentInfo',   //分期信息
      name: 'installmentInfo',
      meta: {
        title: '分期信息确认'
      },
      component: installmentInfo
    },
    {
      path: '/signContract',    //签订合同
      name: 'signContract',
      meta: {
        title: '签订合同'
      },
      component: checkIdInfo
    },
    //订单
    {
      path: '/order',       //我的订单
      name: 'order',
      meta: {
        title: '我的订单'
      },
      component: order
    },
    {
      path: '/comment',       //评论
      name: 'comment',
      meta: {
        title: '评论'
      },
      component: Comment
    },
    {
      path: '/orderDetail',    //订单详情
      name: 'orderDetail',
      meta: {
        title: '订单详情'
      },
      component: orderDetail
    },
    {
      path: '/contractDetail',    //合同详情
      name: 'contractDetail',
      meta: {
        title: '合同详情'
      },
      component: contractDetail
    },
    {
      path: '/orderComplete',      //已投保投保订单详情
      name: 'orderComplete',
      meta: {
        title: '已投保投保订单详情'
      },
      component: orderComplete
    },
    {
      path: '/myQcode',    //我的二维码
      name: 'myQcode',
      meta: {
        title: '我的二维码'
      },
      component: myQcode
    },
    {
      path: '/inviteRecode',    //邀请记录 列表
      name: 'inviteRecode',
      meta: {
        title: '邀请记录'
      },
      component: inviteRecode
    },
    {
      path: '/alert',    //确定
      name: 'alert',
      meta: {
        title: '提示信息'
      },
      component: alert
    },
    {
      path: '/tipPage',    //提示信息
      name: 'tipPage',
      meta: {
        title: '提示信息'
      },
      component: tipPage
    }
  ]
})
