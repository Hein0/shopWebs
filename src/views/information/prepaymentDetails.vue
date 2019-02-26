<template>
  <div class="full-screen">
    <div class="group" v-show="show">
      <div class="tr fbox scaleblock one_px_border_b">
        <div>贷款金额</div>
        <div>{{mainData.loan_amt}}元</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>已还金额</div>
        <div>{{mainData.real_amt}}元</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>已还期数</div>
        <div class="red">{{mainData.real_term}}期</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>未还期数</div>
        <div>{{mainData.term-mainData.real_term}}期</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>到期还款日</div>
        <div>每月{{mainData.loan_pmt_due_date}}日</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>开户名</div>
        <div>{{mainData.real_name}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>银行卡号</div>
        <div>{{mainData.bank_card_no}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>开户行</div>
        <div>{{mainData.bank_name}}</div>
      </div>
      <!--<div class="tr fbox scaleblock one_px_border_b">
        <div>应还总金额</div>
        <div>{{(mainData.loan_total_amt)}}</div>
        &lt;!&ndash;<div>{{(mainData.loan_total_amt).toFixed(2)}}</div>&ndash;&gt;
      </div>-->

      <div class="tr fbox scaleblock one_px_border_b">
        <div>剩余应还本金</div>
        <div>{{mainData.loan_prin}}元</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>应还借款手续费</div>
        <div>{{mainData.loan_fee}}元</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>应还结清手续费</div>
        <div>{{mainData.loan_settle_fee}}元</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>应还利息</div>
        <div>{{mainData.loan_interest}}元</div>
      </div>
      <btn msg="确认提前结清合同" @btnClickEvent="btnClickEvent"></btn>
      <div class="tip-txt">*提醒：请保持银行余额可以代扣剩余未还金额，如果代扣不成功，恢复正常还款。</div>
    </div>



  </div>
</template>

<script>
  import btn from '../widget/buttom-1'
  export default {
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:#eef2f9')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    },
    components: {
      'btn': btn
    },
    data(){
      return {
        orderId:this.$route.query.orderId,
        mainData:'',
        show:false
      }
    },
    //实例已经创建完成之后
    created(){
      this.$parent.init();
      this._init();
      this.$emit('onShow');
		},
    methods: {
      btnClickEvent(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "loadTrail/activeSettlement",
          params: {contractNo:this.orderId},
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if(res.data.ask==0){
//            this.mainData=res.data.data
//            提前还款成功
//            returnFlag=S/F
//            S-成功/F-失败
            if(res.data.data.opFlag=='S'){
              this.$parent.alertT='提前结清申请成功！';
              this.$parent.alertB=true;
            }else if(res.data.data.opFlag=='F'){
              this.$parent.alertT='提前结清申请失败！';
              this.$parent.alertB=true;
            }
          }else{
            this.$parent.alertT=res.data.message;
            this.$parent.alertB=true;
          }
          setTimeout(function(){
            history.go(-1);
          },2000)
        }, function (error) {
          this.$parent.alertT=this.$parent.alertTDefault;
          this.$parent.alertB=true;
        })
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "loadTrail/previewSettlementCalc",
          params: {contractNo:this.orderId},
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.show=true;
            this.mainData=res.data.data
          }else{
            this.$parent.alertT=res.data.message;
            this.$parent.alertB=true;
          }
        }, function (error) {
          this.$parent.alertT=this.$parent.alertTDefault;
          this.$parent.alertB=true;
        })
      }
    }
  }
</script>

<style scoped>
  /*.full-screen{background-color:#eef2f9 ;}*/

  .fbox {
    display: flex;
    font-size: 15px;
    align-items: center;
    -webkit-align-items: center;
  }

  .d1 > div {
  }

  .d1 > div:first-child {
    font-size: 16px;
    color: #434f5d;
  }

  .d1 > div:last-child {
    font-size: 14px;
    text-align: right
  }

  .d1 > div:last-child {
    color: #434f5d;
  }

  .group {
    margin: 10px 10px 0 10px;
    padding: 10px;
    background: #fff;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    border-radius:5px;
  }
  .group:last-child{
    margin-bottom:15px;
  }
  .th >div{
    font-size: 18px;
    color: #000!important;
  }

  .th > div:first-child {
    position: relative;
    text-indent: 1em;
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

  .th > div:first-child, .tr > div:first-child {
    text-align: left;
    padding: 10px 0;
    color: #808080;
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



  .scaleblock > *:last-child {
    flex: 1
  }
  .tip-txt {
    font-size: 13px;
    color:#8ca3b5;
    text-align: center;
  }

  .pl20{padding-left:20px;}
</style>
