<template>
  <div>
    <button type="button" @click="btnClickEvent" :disabled='isDisabled'>{{msg}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      msg: {
        default: '下载'
      },
      isDisabled:{
        default: false
      }
    },
    methods: {
      btnClickEvent: function(){
        this.$emit('btnClickEvent');
      }
    }
  }
</script>

<style scoped>
button{display: block;width:80%;height:45px;margin:20px auto;background-color:#2491ff;border-width: 0;color: #FFFFFF;line-height: 2.33333333;border-radius: 3px;font-size: 18px;outline: 0;}
button:active{background-color:#0a73dd;color:rgba(255, 255, 255, 0.6)}
button[disabled='disabled']{background-color:#999;}

</style>
