<template>
	<div class="orderWrap">
		<!--头部导航-->
		<headBack :sY="true" :sS="true" :gwC="true" :msg="msgTitle"></headBack>
		<div class="orderHead">
			<tab :animate="false" active-color='#0b9aff'>
		      	<tab-item :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
		    </tab>
		</div>
		<div class="orderCenter">
			<!--<noData>
				<img class="n-img" src="../../assets/img/noOrder.png" alt="">
				<p class="n-txt">亲，您一个订单都没喔。</p>
			</noData>-->
			<div class="orderList box">
				<div class="orderItem box">
					<div class="orderItemTitle box">
						<span class="orderId box">订单编号:4586456181</span>
						<span class="orderDate box">下单日期:2018-12-10</span>
						<i class="deleteIcon box"></i>
					</div>
					<div class="packageList">
						<div class="listRow1">
							<div class="goodImg f-fl">
								<div class="wraper" ></div>
							</div>
							<div class="goodInfo f-fl">
								<div class="goodName">设计师款 </div>
								<div class="goodNum">蓝色迷彩*XL</div>
							</div>
							<div class="goodStatus f-fr">
								<div>包裹1</div>
								<div class="paStatus paStatus-green">交易成功</div>
							</div>
						</div>
						<div class="listRow2">
							<div class="rowBtu">
								<a class="btuStyle pjBtu" href="javascript:;" @click="commentFun('12')">评价</a>
								<a class="btuStyle zcwlBtu" href="javascript:;" >追踪物流</a>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			
		</div>
		
		<!--取消订单-->
		<confirm v-model="confirm" title="提示" @on-confirm="onConfirm(confirmOrderId)">
			<p style="text-align:center;">{{confirmTxt}}</p>
		</confirm>

		<!--删除订单-->
		<confirm v-model="deleteOrderBoolean" title="提示" @on-confirm="deleteOrderCon(confirmOrderId)">
			<p style="text-align:center;">{{deleteOrderTxt}}</p>
		</confirm>

	</div>
</template>

<script>
	import { Confirm , Tab, TabItem} from 'vux'
	import { formatDate } from '../../config/util/formatDate'
	import noData from '../../components/noData'
	import cookie from '../../config/util/cookie'
	import Btn from '../widget/buttom-1'
	import headBack from '../../components/head-back'
	export default {
		/*beforeCreate () {
		  document.querySelector('body').setAttribute('style', 'background:#eef2f9')
		},
		beforeDestroy () {
		  document.querySelector('body').setAttribute('style', '')
		},*/
		components: {
			Confirm,
			Tab,
			TabItem,
			noData,
			'btn': Btn,
			headBack,//头部返回
		},
		data() {
			return {
				mainData: {},
				list2: ['全部', '待付款', '待发货', '已发货', '待评价'],
      			demo2: this.$route.query.taps || '全部',
      			index: 0,
				orderStatus: this.$route.query.orderStatus,
				way: this.$route.query.way,
				confirm: false,
				confirmOrderId: '',
				confirmCancelType: '',
				confirmTxt: '',
				msgTitle:this.$route.meta.title,//路由标题
				deleteOrderBoolean: false,
				deleteOrderTxt: '是否删除此订单？'

			}
		},
		filters: {
			formatDate(time) {
				return time.substr(0, 10);
				/*var date = new Date(Date.parse(new Date(time)));
				return formatDate(date, 'yyyy-MM-dd');*/
			}
		},
		methods: {
			syncOrder() {
				//获取当前用户订单数据
				var _this = this;
				return new Promise(function(resolve, reject) {
					_this.$http({
						method: 'GET',
						url: _this.$root.url + "userCenter/syncOrder",
						params: {},
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(function(res) {
						if(res.data.ask == 0) {
							resolve(res.data.data);
						} else {
							_this.$parent.alertT = res.data.message;
							_this.$parent.alertB = true;
						}
					}, function(error) {
						_this.$parent.alertT = _this.$parent.alertTDefault;
						_this.$parent.alertB = true;
					})
				});
			},
			cancelInsurance(insuranceOrderId) {
				//insuranceOrderId 订单号
				this.confirmOrderId = insuranceOrderId;
				this.confirmTxt = '是否要取消此订单？';
				this.confirm = true;
			},
			continueInsurance(compositeType, installmentId, policyOrderNo, tempUserId) {
				//类型compositeType
				//申请表ID installmentId
				// tempUserId
				if(compositeType == 'vci') {
					this.$router.push({
						path: '/identity',
						query: {
							installmentId: installmentId
						}
					})
				} else if(compositeType == 'tci') {
					this.$router.push({
						path: '/pinganTCIContinue',
						query: {
							policyOrderNo: policyOrderNo,
							tempUserId: tempUserId
						}
					})
				}
			},
			viewDetails(a) {
				//查看详情
				this.$router.push({
					path: '/orderDetail',
					query: {
						orderId: a
					}
				})
			},
			//评论
			commentFun(id){
				console.log(id);
				this.$router.push({path: '/comment',query: {id: id}})
			},
			onConfirm(orderId) {
				this.$http({
					method: 'GET',
					url: this.$root.url + "order/cancelOrder",
					params: {
						orderId: orderId
					},
					headers: {
						'Content-Type': 'application/json',
					}
				}).then(function(res) {
					if(res.data.ask == 0) {
						//取消成功
						this.$parent.alertT = '取消订单成功！';
						this.$parent.alertB = true;
						this.inits();
					} else {
						this.$parent.alertT = res.data.message;
						this.$parent.alertB = true;
					}
				}, function(error) {
					this.$parent.alertT = this.$parent.alertTDefault;
					this.$parent.alertB = true;
				})
			},
			deleteOrderCon(orderId) {
				this.$http({
					method: 'GET',
					url: this.$root.url + "order/delete",
					params: {
						orderId: orderId
					},
					headers: {
						'Content-Type': 'application/json',
					}
				}).then(function(res) {
					if(res.data.ask == 0) {
						//删除成功
						this.inits();
					} else {
						this.$parent.alertT = res.data.message;
						this.$parent.alertB = true;
					}
				}, function(error) {
					this.$parent.alertT = this.$parent.alertTDefault;
					this.$parent.alertB = true;
				})
			},
			installmentContract(a) {
				//分期合同
				this.$router.push({
					path: '/contractDetail',
					query: {
						orderId: a
					}
				})
			},
			repaymentBill(a) {
				//还款账单

			},
			deleteOrder(a) {
				//删除账单
				this.confirmOrderId = a;
				this.deleteOrderBoolean = true
			},
			//返回首页
			btnClickEvent() {
				this.$router.push({path: '/',query: { /*'tempUserId':res.data.data.tempUserId*/ }});
			},
			inits() {
				this.$http({
					method: 'GET',
					url: this.$root.url + "order/get",
					params: {
						orderStatus: this.orderStatus
					},
					headers: {
						'Content-Type': 'application/json',
					}
				}).then(function(res) {
					if(res.data.ask == 0) {
						this.mainData = res.data.data
					} else {
						this.$parent.alertT = res.data.message;
						this.$parent.alertB = true;
					}
				}, function(error) {
					this.$parent.alertT = this.$parent.alertTDefault;
					this.$parent.alertB = true;
				})

			}
		},
		created: function() {

			/*if(this.way=='tci'){
			  this.getTci(this.inits())
			}else if(this.way=='login'){
			  this.$parent.alertT='您有未处理的分期订单，请优先处理';
			  this.$parent.alertB=true;
			  this.inits();
			}else{
			  this.inits();
			}*/
		},
		mounted() {
			var _this = this;
			_this.$parent.init();
//			Promise.all([_this.syncOrder()]).then(function(result) {
//				_this.inits()
//			});
		}

	}
</script>

<style scoped>
	.orderWrap {background-color: #f4f4f4;height: 100%;}
	.box{-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}
	.f-fl{float:left;}
	.f-fr{float:right;}
	.btn {
		border: 1px solid #eef2f9;
		border-radius: 3px;
		padding: 2px;
		color: #404b54;
		margin-left: 5px;
		text-align: center;
		font-size: 15px;
		/*display: inline-block;*/
		/*height:30px;*/
		/*line-height: 28px;*/}
	
	.btn.btn-blue {background: #0b92f1;color: #fff;}
	.btn.btn-red {border: 1px solid red;background: red;color: #fff;}
	
	.orderItem{margin-top: .26rem;padding-left: .3rem;background-color: #fff;font-size: .37333rem;}
	.orderItem .orderItemTitle{     position: relative;overflow: hidden;}
	.orderItem .orderItemTitle .orderId {margin-right: .2rem;height: 1.06rem;line-height: 1.06rem;display: inline-block;}
    .orderItem .orderItemTitle .deleteIcon{float: right;margin-right: .3rem;margin-top: .26rem;width: .48rem; height: .48rem; background: url(../../assets/img/delete-icon.png) no-repeat;background-size: 100%;}
    
    .listRow1{padding: .3rem 0;position: relative;overflow: hidden;border-top: 1px solid #ddd;}
    .listRow1 .goodImg{    background-color: #fff;display: flex;}
    .listRow1 .goodImg .wraper {background-color: #f4f4f4;position: relative;width: 1.8rem;height: 1.8rem;margin-right: .2rem;}
    .listRow1 .goodInfo {margin-left: .2rem;margin-top: .3rem;}
    .listRow1 .goodInfo .goodName {width: 5.3rem;font-size: .38rem;height: .56rem;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
    .listRow1 .goodInfo .goodNum {color: #666;font-size: .35rem;width: 5.3rem;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
    .listRow1 .goodStatus {margin-right: .3rem;margin-top: .3rem;min-width: 1.3rem;text-align: right;font-size:.4rem;}
    .listRow1 .goodStatus .paStatus{font-size:.35rem}
    
    
    
    
    .listRow2{padding-bottom: .22rem;position: relative;overflow: hidden;border-top: 1px solid #ddd;}
    .listRow2 .rowBtu {float: right;margin-top: .21rem;margin-right: .3rem;}
    .listRow2 .rowBtu .btuStyle{border-radius: 2px;margin-left: .3rem;float: right;vertical-align: middle;width: 2.2rem!important;text-align: center;line-height: .9rem;font-size: .37rem;border: 1px solid #0b9aff ;background-color: #0b9aff ;color: #fff;}                                                     
    
    
    
    
    
    
    
</style>
<style>
	.orderHead .vux-tab-wrap .vux-tab-container .scrollable{padding-bottom: 0px !important;}
</style>