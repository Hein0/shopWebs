<template>
  <div class="full-screen">
    <div class="group">
      <div class="tr fbox scaleblock one_px_border_b">
        <div>服务类型</div>
        <div>{{mainData.serviceType}}</div>
      </div>
      <!--<div class="tr fbox scaleblock one_px_border_b">
        <div>保险公司</div>
        <div>{{mainData.insuranceCompanyName}}</div>
      </div>-->
      <div class="tr fbox scaleblock one_px_border_b">
        <div>服务有效期</div>
        <div>{{mainData.commercialEffectiveDate | formatDate}}~{{mainData.commercialEffectiveEndDate | formatDate}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>申请人</div>
        <div>{{mainData.insurancePersonName}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>申请分期金额</div>
        <div class="red">￥{{mainData.loadAmount}}</div>
      </div>
      <div class="tr fbox scaleblock one_px_border_b">
        <div>分期期数</div>
        <div class="red">{{mainData.numberPeriod}}期</div>
      </div>
      <!--<div class="contract">
        <span class="bi" @click="isAgree">
          <icon v-show="!iconType" type="circle"></icon><icon v-show="iconType" type="success"></icon>
          <span>本人阅读并同意</span>
        </span>
        <span class="red">《佰仟车险分期服务用户协议》</span>
      </div>-->
      <btn msg="确定" :isDisabled="!iconType" @btnClickEvent="btnClickEvent"></btn>
    </div>

    <alert v-model="alertB" title="提示" :content="alertT" @on-hide="close"></alert>
  </div>
</template>

<script>
  import Btn from '../widget/buttom-1'
  import {formatDate} from '../../config/util/formatDate'
  import {Popup,Icon,Alert } from 'vux'
  export default {
    name: 'installmentInfo',
    props: {

    },
    components: {
      Popup,
      Icon,
      Alert,
      'btn': Btn
    },
    data () {
      return {
        alertB:false,
        alertT:'',
        iconType: true,
        installmentId:this.$route.query.installmentId,
        mainData:{
          serviceType:'',
          insuranceCompanyName:'',
          insurancePersonName:'',
          loadAmount:'',
          numberPeriod:'',
          commercialEffectiveDate:''
        },
        time0:''
      }
    },
    computed:{

    },
    filters: {
      formatDate(time) {
        return time.substr(0,10);
        /*var date = new Date(Date.parse(new Date(time)));
        return formatDate(date, 'yyyy-MM-dd');*/
      }
    },
    methods:{
      close(){
        this.alertB=false;
        this.$router.push({path:'/',query: {}})
      },
      btnClickEvent(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/loadConfirm",
          params: {'orderNo':this.mainData.orderId},
          headers: {'Content-Type': 'application/json'}
        }).then(function (res) {
          if(res.data.ask==0){
            this.$router.push({path:'/signContract',query: {installmentId:this.installmentId}})
          }else{
            if(res.data.code==1034){
              //1034 不跳转
              this.$parent.alertT=res.data.message;
              this.$parent.alertB=true;
            }else{
              //其它错误 跳转到首页
              this.alertT=res.data.message;
              this.alertB=true;
              /*setTimeout(function(){
                _this.$router.push({path:'/',query: {}})
              },2000)*/
            }
          }
        }, function (error) {
          this.$parent.alertT=this.$parent.alertTDefault;
          this.$parent.alertB=true;
        })

      },
      isAgree(){
        this.iconType=!this.iconType;
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/getInsuranceStages",
          params: {'installmentId':this.installmentId},
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(function (res) {
          if(res.data.ask==0){
            this.mainData=res.data.data;
          }
        }, function (error) {
          this.$parent.alertT=this.$parent.alertTDefault;
          this.$parent.alertB=true;
        })
      }
    },
    created:function(){
      this.$parent.init();
      this._init();


    }
  }


</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  /*.full-screen{background-color:#eef2f9 ;height:100%;}*/
  .fbox{display: flex;font-size:16px;align-items: center;-webkit-align-items: center;}
  .group{margin: 10px 10px;padding:10px;background: #fff;border-radius: 5px;}
  .th>div:first-child,.tr>div:first-child{text-align: left;padding:10px 0;color:#7990a2;}
  .th>div:last-child,.tr>div:last-child{flex:1;text-align: right;color:#434f5d;}
  .th>div:last-child,.tr>div:last-child.red{color:red;}

  .small-box{border:1px solid #999;margin-left:10px;padding:2px 5px;font-size:13px;color:#999;border-radius: 3px;}
  .small-box:active{border-color:#000;color:#000;}



  .contract{margin:20px 10px 10px;text-align: center}
  .contract>*:first-child{font-size:14px;color:#434f5d;}
  .contract>*:first-child+*{font-size:14px;color:red;}
  .weui-icon-success{color:#2491ff}

  .bi{letter-spacing: -0.315em}
  .bi>*{letter-spacing: normal;display: inline-block;vertical-align: middle;}
</style>

