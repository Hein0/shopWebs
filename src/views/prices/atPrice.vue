<template>
  <div class="full-screen">
    <div class="div1">
      <img class="full-size" src="../../assets/atprice.png">
    </div>
    <div class="div2">
      <div class="txt">保险公司为您计算中，约需一分钟</div>
    </div>
    <btn msg="刷新" @btnClickEvent="btnClickEvent"></btn>
  </div>
</template>

<script>
  import Btn from '../widget/buttom-1'
  export default {
    name: 'atPrice',
    components: {
      'btn': Btn
    },
    methods: {
      btnClickEvent:function(){
        location.href='#/companySelect'
      }
    },
    data () {
      return {

      }
    },
    created(){
    }
  }
</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  .full-screen{background-color:#fff;height:100%}
  .div1{width:70%;margin:0 auto;padding:50px 0 20px;}
  .div2{width:100%;margin:0 auto 60px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;font-weight: bold;padding:0 15px}
</style>
