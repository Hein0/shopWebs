<template>
  <div>
    <div v-show="show">
      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>订单信息</div>
          <div></div>
        </div>
        <!--<div class="tr fbox scaleblock one_px_border_b">
          <div>订单编号</div>
          <div>{{mainData.insuranceInfo.policyOrderNo}}</div>
        </div>-->
        <div class="tr fbox scaleblock one_px_border_b">
          <template>
            <div>订单编号</div>
            <div>{{mainData.insuranceInfo.policyOrderNo}}</div>
          </template>
          <!--<template v-else>
            <div>订单编号</div>
            &lt;!&ndash;<div v-if="mainData.order.compositeType=='vci'">订单编号</div>
            <div v-if="mainData.order.compositeType=='tci'">交强险投保单号</div>&ndash;&gt;
            <div>{{mainData.insuranceInfo.policyProposalNo}}</div>
          </template>-->
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>订单创建日期</div>
          <div>{{mainData.order.orderCreateTime | formatDate}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车牌号</div>
          <div>{{mainData.order.vehicleNo}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>申请人</div>
          <div>{{mainData.order.memberName}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>订单总金额</div>
          <div class="red">￥{{mainData.insuranceInfo.amount}}</div>
        </div>
        <!--<div class="tr fbox scaleblock one_px_border_b">
          <div>订单状态</div>
          <div v-if="mainData.order.orderStatus==1">已支付</div>
          <div v-else>未支付</div>
        </div>-->
        <div class="tr fbox scaleblock one_px_border_b">
          <div>交强险投保单号</div>
          <div>{{mainData.insuranceInfo.policyProposalNo}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div v-if="mainData.order.compositeType=='vci'">商业险保费</div>
          <div v-if="mainData.order.compositeType=='tci'">交强险保费</div>
          <div>￥{{mainData.insuranceInfo.premium}}</div>
        </div>
        <div v-if="mainData.order.compositeType=='tci'" class="tr fbox scaleblock one_px_border_b">
          <div>车船税</div>
          <div>￥{{mainData.insuranceInfo.taxAmount}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div v-if="mainData.order.compositeType=='vci'">订单状态</div>
          <div v-if="mainData.order.compositeType=='tci'">交强险保单状态</div>
          <!--未完成 && 当前时间>起保时间 则自定义此状态-->
          <div v-if="mainData.order.orderStatus==0&&new Date().getTime()>new Date(mainData.insuranceInfo.insuranceBeginTime).getTime()">超时</div>
          <div v-else>{{mainData.insuranceInfo.policyStatusLable}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div v-if="mainData.order.compositeType=='vci'">服务有效期</div>
          <div v-if="mainData.order.compositeType=='tci'">交强险有效期</div>
          <div>{{mainData.insuranceInfo.insuranceBeginTime | formatDate}}~{{mainData.insuranceInfo.insuranceEndTime | formatDate}}</div>
        </div>
      </div>

      <div v-if="mainData.order.compositeType=='vci'" class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>分期信息</div>
          <div></div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>服务类型</div>
          <div>{{mainData.installmentInfo.serviceType }}</div>
        </div>
        <!--<div class="tr fbox scaleblock one_px_border_b">
          <div>保险公司</div>
          <div>{{mainData.order.companyName}}</div>
        </div>-->
        <div class="tr fbox scaleblock one_px_border_b">
          <div>申请人</div>
          <div>{{mainData.order.memberName}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>申请分期金额</div>
          <div class="red">￥{{mainData.insuranceInfo.amount}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>分期期数</div>
          <div>{{mainData.installmentInfo.installmentPeriods}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>贷款合同状态</div>
          <div>{{mainData.installmentInfo.contractStatusLabel}}</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>贷款合同号</div>
          <div>{{mainData.installmentInfo.contractNo}}</div>
        </div>
      </div>
      <!--<template v-if="mainData.orderResult.orderStatus==0">
        <btn3 msg1="取消分期申请" msg2="分期合同签署" @btn111="btn111" @btn222="btn222"></btn3>
      </template>-->

    </div>
  </div>
</template>


<script>
  import { Icon} from 'vux'
  import btn3 from '../widget/buttom-3'
  import {formatDate} from '../../config/util/formatDate'
  export default {
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:#eef2f9')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    },
    components: {
      Icon,
      'btn3': btn3
    },
    data () {
      return {
        show:false,
        step1: 1,
        step2: 0,
        orderId:this.$route.query.orderId,
        mainData:{
          installmentInfo:{

          },
          insuranceInfo:{
            policyOrderNo:'',
            insuranceBeginTime:'',
            insuranceEndTime:'',
            amount:'',
            taxAmount:'',
            policyNo:'',
            policyStatus:''
          },
          order:{
            orderCreateTime:''
          }
        }
      }
    },
    filters: {
      formatDate(time) {
        return time.substr(0,10);
        /*var date = new Date(Date.parse(new Date(time)));
        return formatDate(date, 'yyyy-MM-dd');*/
      }
    },
    computed:{

    },
    methods: {
      btn111:function(){
//        alert(11)
      },
      btn222:function(){
        this.$router.push({path:'/installmentInfo',query: {orderId:this.orderId}})
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/getOrderInfoAll",
          params: {orderId:this.orderId},
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.mainData=res.data.data;
            this.show=true;
          }else{
            this.$parent.alertT=res.data.message;
            this.$parent.alertB=true;
          }
        }, function (error) {
          this.$parent.alertT=this.$parent.alertTDefault;
          this.$parent.alertB=true;
        })
      }
    },
    created:function(){
      this.$parent.init();
      this._init()
    }
  }
</script>

<style scoped>
  .div0{background: #fff;}
  .div1{width:70%;margin:0 auto;padding:30px 0 20px;}
  .div2{width:100%;margin:0 auto 10px;padding-bottom: 20px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;padding:0 15px}
  .red{font-size:17px;}

  .fbox {
    display: flex;
    font-size: 15px;
    align-items: center;
    -webkit-align-items: center;
  }
  .fbox.scaleblock>div:last-child{
    flex: 1;
  }
  .group {
    margin: 10px 10px 0 10px;
    padding: 0 10px 10px 10px;
    background: #fff;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    border-radius: 5px;
  }
  .group:last-child{margin-bottom: 15px;}
  .th {
    font-size: 18px;

  }

  .th > div:first-child {
    position: relative;
    text-indent: 1em;
    color: #0b92f1!important;
  }
  .th > div:first-child:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 15px;
    width: .2em;
    height: 1em;
    background: #0b92f1;
  }
  .th > div:last-child {
    color: #0b92f1!important;
  }
  .th > div:first-child, .tr > div:first-child {
    text-align: left;
    padding: 10px 0;
    color: #7990a2;
  }

  .th > div:last-child, .tr > div:last-child {
    text-align: right;
    color: #434f5d;
  }
  .cols > div {
    width: 100%;
    text-align: right;
    padding: 10px 0;
    color: #7990a2;
  }
  .tip1{font-size:13px;text-align: left!important;color:red!important;}
  .weui-icon-success {
    color: #2491ff
  }
  .tr.one_px_border_b:last-child:after{
    border:none;
  }
</style>
