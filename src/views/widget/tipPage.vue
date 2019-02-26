<template>
  <div class="full-screen">
    <template v-for="item of mainInfo">
      <template v-if="item.id==n">

      <div class="div1">
        <img class="full-size" :src="item.imgSrc">
      </div>
      <div style="height:20px"></div>
      <div>
        <div class="div2">
          <div class="txt">{{item.t1}}</div>
          <div class="txt-small">{{item.t2}}</div>
        </div>
        <btn :msg="item.b1" @btnClickEvent="go"></btn>
        <div class="div3">
          <div class="txt">{{item.t3}}</div>
        </div>
      </div>

      </template>
    </template>
  </div>
</template>

<script>
  import Btn from './buttom-1'
  import Btn2 from './buttom-2'
  export default {
    components: {
      'btn': Btn,
      'btn2': Btn2
    },
    data () {
      return {
        //提示页参数说明：
        //0 已支付商业险，按钮：支付交强险
        //1 已支付交强险，按钮：查看投保订单  未使用
        //5 身份信息与手机号不一致   未使用
        n:+this.$route.query.tip,

        mainInfo:[
          {
            id:0,
            t1:'恭喜您！商业险分期服务申请成功',
            t2:'您可通过“我的”查询订单相关信息，点击“下一步”继续完成服务操作。分期服务问题请拨打佰仟客服热线 400-998-7101',
            t3:'交强险和车船税为国家强制要求，请您确保购买和缴纳。',
            b1:'下一步',
            imgSrc:require('../../assets/hasprice2.png'),
            url:{path:'/pinganTCI',query: {tempUserId:this.$route.query.tempUserId}}
          },
          {
            id:1,
            t1:'恭喜您，交强险保单已出，现在即可享受商业险和交强险理赔服务理赔请联系保险公司99999',
            t2:'',
            b1:'查看投保订单',
            imgSrc:require('../../assets/hasprice2.png'),
            url:{path:'/',query: {}}
          },
          {
            id:5,
            t1:'您的身份信息与手机号不一致',
            t2:'',
            b1:'返回首页',
            url:{path:'/',query: {}}
          },
          {
            id:100,
            t1:'你的订单创建不成功，请稍后再试',
            t2:'',
            b1:'返回首页',
            imgSrc:require('../../assets/hasprice2.png'),
            url:{path:'/',query: {}}
          },
          {
            id:101,
            t1:'抱歉！您的保费大于1万元，无法分期支付',
            t2:'',
            b1:'返回首页',
            imgSrc:require('../../assets/hasprice2.png'),
            url:{path:'/',query: {}}
          }
        ]
      }
    },
    methods: {
      go(){
        for(var i in this.mainInfo){
          if(this.mainInfo[i].id==this.n){
            this.$router.push(this.mainInfo[i].url)
          }
        }
      }
    },
    computed:{
    },
    created:function(){
    }
  }

</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  /*.full-screen{background-color:#fff;height:100%;}*/
  .img-wrap{max-width:640px;margin:auto;}
  .div1{width:95%;max-width:640px;margin:0 auto;padding:20px 0 0;text-align: center}
  .div1>img{max-width:640px;}
  .div2{width:100%;margin:0 auto 50px;padding-top:40px;}
  .div2 .txt{font-size:16px;text-align:center;color:#333;font-weight: bold;padding:0 15px}
  .div2 .txt-small { font-size: 14px; text-align: center; color: #666; padding: 0 15px; }
  .div3 { font-size: 14px; text-align: left; color: #666; padding: 0 15px }
  .div3 .txt{text-align:center;}
</style>

