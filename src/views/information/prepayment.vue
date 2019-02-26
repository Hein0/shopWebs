<template>
  <div v-show="pageShow" class="billist">
    <noData v-if="mainData.contract_count==0">
      <img class="n-img" src="../../assets/hasprice4.png" alt="">
      <p class="n-txt">暂无数据，建议您在当前无欠款且距离还款日至少提前满15天的条件下查询。</p>
      <!--<btn msg="回到首页" @btnClickEvent="btnClickEvent"></btn>-->
    </noData>
    <template v-else>
      <div class="bill_title">
        <h3>{{mainData.contract_count}}</h3>
        <p>我办理过的分期(笔)</p>
      </div>
      <div class="billist_centen">
        <div v-for="item of mainData.contract_list" class="billist_item">
          <div @click="goDetails(item.contract_no)">
            <div class="billist_tl one_px_border_b right-arrow">合同号：{{item.contract_no}}</div>
            <div class="billist_bd one_px_border_b">
              <div class="text_left">贷款本金：{{item.loan_amt}}元</div>
              <div class="text_right">还款日期：每月{{item.repay_date}}号</div>
            </div>
            <div class="billist_bp">
              <div v-if="item.status_desc=='放款成功'" class="text_left">还款状态：还款中</div>
              <div v-else class="text_left">还款状态：{{item.status_desc}}</div>
              <div class="text_right">未还期数：{{+item.term-item.repay_term}}期</div>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>

</template>

<script>
  import { XButton} from 'vux'
  import Btn from '../widget/buttom-1'
  import noData from '../../components/noData'
  export default {
    //name: 'cardModfy',
    props: {
    },
    components: {
      XButton,
      noData:noData,
      'btn': Btn
    },
    data () {
      return {
        mainData:'',
        pageShow:false,
        listContract:this.$route.query.listContract
      }
    },
    computed:{
    },
    //实例已经创建完成之后
    created(){
      this.$parent.init();
      this._init();
    },
    methods:{
      goDetails(orderId){
        //先判断是否报错
        this.$http({
          method: 'GET',
          url: this.$root.url + "loadTrail/previewSettlementCalc",
          params: {contractNo:orderId},
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.$router.push({path:'/prepaymentDetails',query: {'orderId':orderId}});
          }else{
            //当不满足条件
            this.$parent.alertT=res.data.message;
            this.$parent.alertB=true;
          }
        }, function (error) {
          this.$parent.alertT=this.$parent.alertTDefault;
          this.$parent.alertB=true;
        })
      },
      btnClickEvent(){
        this.$router.push({path:'/',query: {}})
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "loadTrail/listMyContract",
          params: {contractStatus:'M101'},
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.mainData=res.data.data;
            this.pageShow=true;
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
  }
</script>

<style scoped>
  .bill_title{height:120px;width:100%;text-align:center;color:#fff;background:url(../../assets/bill_bg.png) no-repeat center center;background-size:cover}
  .bill_title h3{text-align: center;padding-top:20px;font-size:36px;line-height: 1.3;}
  .bill_title p{text-align: center;font-size:14px;}

  .billist_item{margin-top:15px;padding:0 10px;background:#fff;}
  .billist_item .billist_tl{padding:10px 0px 10px 30px;font-size:13px;color:#1b1b1b;background:url(../../assets/chexian_icon.png) no-repeat left center;background-size:25px 25px;}
  .billist_item .billist_bd,.billist_item .billist_bp{padding:10px 0;color:#a5a5a5;position:relative;display: -webkit-box;display: -ms-flexbox;display: flex;font-size: 15px;}
  .billist_item .billist_bd .text_left{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: left;color: #a5a5a5;}
  .billist_item .billist_bp .text_right{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;text-align: right;color: #a5a5a5;}


</style>
