<template>
  <div v-show="show" class="full-screen">
    <div class="d1 fbox scaleblock">
      <div>合同号</div>
      <div><span>{{contractNo}}</span></div>
    </div>

    <div v-for="item of mainData.plan_LIST" class="group">
      <div class="th fbox scaleblock one_px_border_b">
        <div>第{{item.term}}期</div>
        <div v-if="item.loan_STATUS=='N'">正常未到期</div>
        <div v-if="item.loan_STATUS=='O'">逾期未还款</div>
        <div v-if="item.loan_STATUS=='NR'">正常还款成功</div>
        <div v-if="item.loan_STATUS=='OR'">逾期还款成功</div>
        <div v-if="item.loan_STATUS=='PR'">结清还款成功</div>
      </div>
      <div class="repay-wrap">
        <div>
          <div class="red">应还:<span class="fw">{{item.loan_TOTAL_AMT}}</span>元</div>
        </div>
        <!--N && O 则不显示-->
        <div v-if="item.loan_STATUS!='N'&&item.loan_STATUS!='O'">
          <div class="blue-light">实还:<span class="fw">{{item.repay_AMT}}</span>元</div>
          <div>应还日期：{{item.loan_TIME|dateFormat}}</div>
          <div>还款方式：代扣</div>
          <div>银行卡：{{item.bank_CARD_NO}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background:#eef2f9')
    },
    beforeDestroy () {
      document.querySelector('body').setAttribute('style', '')
    },
    components: {
    },
    data(){
      return {
        show:false,
        mainData:'',
        contractNo:this.$route.query.orderId
      }
    },
    //实例已经创建完成之后
	    created(){
			  this.$parent.init();
        this._init()
		},
    methods: {
      _init(){
        this.$http.post(this.$root.url+"order/repaymentPlan", JSON.stringify({contractNo:this.contractNo}), {
          headers: {'Content-Type': 'application/json'}
        }).then(function(res) {
          if(res.data.ask==0){
            this.mainData=res.data.data;
            this.show=true;
          }else{
            this.$parent.alertT=res.data.message;
            this.$parent.alertB=true;
          }
        }, function(error) {
          this.$parent.alertT=this.$parent.alertTDefault;
          this.$parent.alertB=true;
        });


      }
    },
    filters:{
      dateFormat(date){
        return date.substr(0,4)+'-'+date.substr(4,2)+'-'+date.substr(6,2)
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

  .d1 {
    background: #fff;
    padding: 15px;
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
    border-radius: 5px;
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
    color: #808080;
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


  .repay-wrap{padding:5px 0;display: flex;font-size:15px;color:#808080;}
  .repay-wrap>div:first-child{border-right:1px solid #eef2f9;width: 50%;}
  .repay-wrap>div:last-child{padding-left:5px;width: 50%;}
  .fw{font-size:20px;font-weight: bold;}
</style>
