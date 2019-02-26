<template>
  <div>
    <alert v-model="alertB" title="提示" :content="alertT" @on-hide="go"></alert>
  </div>
</template>

<script>
  import {Alert} from 'vux'
  export default {
    components: {
      Alert
    },
    data () {
      return {
        alertB:true,
        //提示页参数说明：
        //0 商业险支付完成，跳转到后台，再跳转到前端    有未完成的订单
        //
        n:+this.$route.query.type,
        mainInfo:[
          {
            id:0,
            t1:'您有未处理的分期订单，请优先处理',
            url:{path:'/order',query: {orderStatus:0}}
          },
          /*{
            id:1,
            t1:'',
            url:''
          }*/
        ]
      }
    },
    computed:{
      alertT(){
        return this.mainInfo[this.n].t1;
      }
    },
    methods: {
      go(){
        this.$router.push(this.mainInfo[this.n].url)
      }
    },
    created(){
    }
  }
</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  .full-screen{background-color:#fff;height:100%;}
  .div1{width:95%;max-width:640px;margin:0 auto;padding:20px 0 0;text-align: center}
  .div1>img{max-width:640px;}
  .div2{width:100%;margin:0 auto 50px;padding-top:40px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;font-weight: bold;padding:0 15px}
  .txt-small{font-size:14px;text-align:center;color:#3c444d;padding:0 15px}
</style>
