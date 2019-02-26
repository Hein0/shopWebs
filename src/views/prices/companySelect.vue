<template>
  <div class="full-screen">
    <div class="div0">
      <div class="div1">
        <img class="full-size" src="../../assets/hasprice2.png">
      </div>
      <div class="div2">
        <div class="txt">{{info1}}</div>
      </div>
    </div>
    <div class="company-wrap">
      <div v-for="item of company" class="bi one_px_border_b">
        <div>{{item.com}}</div>
        <div>{{item.prise}}</div>
        <div><span :class="item.class" @click="goto(item.prise)">查看保障</span></div>
      </div>
      <!--<div class="bi one_px_border_b">
        <div>平安车险</div>
        <div>￥1000.00</div>
        <div><span class="on" @click="abc">查看保障</span></div>
      </div>
      <div class="bi one_px_border_b">
        <div>平安车险</div>
        <div>￥1000.00</div>
        <div><span class="on" @click="abc">查看保障</span></div>
      </div>
      <div class="bi one_px_border_b">
        <div>平安车险</div>
        <div>请勿重复投保</div>
        <div><span>查看保障</span></div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import Btn from '../widget/buttom-1'
  import noData from '../../components/noData'
  export default {
    components: {
      'btn': Btn,
      'no-data':noData
    },
    data () {
      return {
        info1:'',
        company:[],
        orderGet:[],
        insuranceCode:[]
      }
    },
    computed:{
    },
    methods: {
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "insurace/queryInsurers",
          params: {/*ids: 1*/},
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.orderGet=res.data.data;
            for(var a in this.orderGet){
              this.company.push({
                com:this.orderGet[a].insuranceName,
                prise:'正在报价',
                insuranceCode:this.orderGet[a].insuranceCode,
                class:''
              })
              this._query(this.company[a].insuranceCode,a);
            }
          }

        }, function (error) {
          console.log(2)
        })

      },
      goto(a){
        if(a!='暂无报价'){
          this.$router.push({path:'/securityList',query: {'insuranceCode':this.company[0].insuranceCode}})
        }
      },
      _query(i,a){
        this.$http({
          method: 'GET',
          url: this.$root.url + "quotation/queryByCompany",
          params: {selectedInsuranceCode:i},
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.insuranceCode=res.data.data;
            if(this.insuranceCode.quotationSucessFlag=='true'){
              this.company[a].prise='￥'+this.insuranceCode.totalFee;
              this.company[a].class='on';
            }else{
              this.company[a].prise=this.insuranceCode.remark;
            }
          }

        }, function (error) {
          console.log(2)
        })

      },
      _co(){
        console.log(_this.company)
      }
    },

    created:function(){
      this.$parent.init();
      this._init()


    }
  }
</script>

<style scoped>
  .full-screen{background-color:#eef2f9 ;height:100%}
  .div0{background-color:#fff; }
  .div1{width:70%;padding:30px 0 20px;margin:0 auto;}
  .div2{width:100%;margin:0 auto;padding-bottom:20px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;font-weight: bold;padding:0 15px}

  .company-wrap{margin:10px;padding:10px;background: #fff}
  .company-wrap>.one_px_border_b:last-child:after{border-bottom:none;}

  .bi{letter-spacing: -0.315em;font-size:15px;}
  .bi>div{letter-spacing: normal;padding:10px 0;display: inline-block;width:33%}
  .bi>div:first-child{text-align: left;color:#434f5d}
  .bi>div:first-child+div{text-align: center;color:#7990a2;}
  .bi>div:last-child{text-align: right;vertical-align: middle;padding:5px 0;font-size:14px;}
  .bi>div:last-child span{border:1px solid #eef2f9;border-radius:3px;padding:4px 8px;color:#404b54;}
  .bi>div:last-child span.on{border:1px solid #0b92f1;background:#0b92f1;color:#fff;}
</style>
