<template>
   <div class="no-data">
      <slot>
         <img class="n-img" src="../assets/no_data.png" alt="">
         <p class="n-txt">暂无数据</p>
      </slot>
   </div>
</template>

<script>
   export default {
      name: 'noData',
      //props: ['txt','imgSrc']
   }
</script>

<style lang="less" scoped>
   @import '~vux/src/styles/1px.less';
   @import '~vux/src/styles/center.less';

   .no-data{text-align: center;font-size: .42rem;color: #666;margin-top:50%;}
   .no-data .n-img{width: 2.66rem;height:2.66rem;margin: 0 auto;}
   .no-data .n-txt{padding: 0 15px;margin-top: .1rem;font-size:.42rem;}
</style>
