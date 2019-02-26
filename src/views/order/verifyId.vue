<template>
  <div class="full-screen">
    <div class="d3">
      <div class="tr one_px_border_b">
        <div>身份证号码</div>
        <div><input type="text" v-model="idCard" class="" placeholder="请输入身份证号码"></div>
      </div>
      <div class="tr one_px_border_b">
        <div>手机号码</div>
        <div><input type="text" v-model="phoneNumber" class="" placeholder="请输入手机号码"></div>
      </div>
      <div class="tr one_px_border_b">
        <div>验证码</div>
        <div><input type="text" v-model="challenge" class="receive" placeholder="请输入验证码"><span class="btn-receive" @click="getChallengeCode">发送验证码</span></div>
      </div>

      <btn msg="确定" @btnClickEvent="btnClickEvent"></btn>
    </div>
  </div>
</template>

<script>
  import Btn from '../widget/buttom-1'
  import {Confirm, Alert } from 'vux'
  export default {

    components: {
      Confirm,
      Alert,
      'btn': Btn,
    },
    data () {
      return {
        idCard:'',
        phoneNumber:'',
        challenge:''
      }
    },
    methods: {
      btnClickEvent(){

      },
      getChallengeCode(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "ca/getChallengeCode",
          params: {
            'certId':this.mainData.idCard,
            'phoneNum':this.mainData.phoneNo,
            'customerName':this.mainData.vehicleName,
            'contract':this.mainData.contractNo,
//            'contractType':'01'
          },
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
        }).then(function (res) {
          if(res.data.ask==0){
            this.checkData.transId=res.data.data.transID;
          }

        }, function (error) {
          console.log(2)
        })
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "order/get",
          params: {orderStatus:this.orderStatus},
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(function (res) {
          if(res.data.ask==0){
            this.mainData=res.data.data
          }
        }, function (error) {
          console.log(2)
        })

      }
    },
    created:function(){
      this.$parent.init();
//      this._init();
    }

  }
</script>

<style scoped>
  /*.full-screen{height: 100%;}*/
  .d3{padding:10px;background: #fff;}
  .tr{display: flex;font-size:16px;}
  .tr>*{padding:10px 0;}
  .tr>*:first-child{text-align: left;color:#8ca3b5;}
  .tr>*:last-child{flex:1;text-align: right;color:#434f5d;}


  input{outline: 0;border: 0;text-align: right;font-size:16px;}
  select{font-size:16px;}

  .receive{width:50%;text-align: left}
  .btn-receive{border-radius: 3px;border: 1px solid #0b92f1;background: #fff;padding: 4px;color: #0b92f1;margin-left:5px;font-size:14px;}

</style>

