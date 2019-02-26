<template>
  <div class="div-button">
    <button type="button" @click="btn1">{{msg1}}</button>
    <button class="active" type="button" @click="btn2">{{msg2}}</button>
  </div>
</template>

<script>
  export default {
    props: {
      msg1: {
        default: '0'
      },
      msg2: {
        default: '1'
      }
    },
    methods: {
      btn1: function(){
        this.$emit('btn11');
      },
      btn2: function(){
        this.$emit('btn22');
      }
    }
  }
</script>

<style scoped>
  .div-button{display: flex;}
  button{display: block;height:45px;margin:20px auto;background-color:#fff;color: #8ca3b5;border:0.5px solid #8ca3b5;line-height: 2.33333333;border-radius: 3px;font-size: 18px;outline: 0;min-width:40%;}
  button.active{background-color:#2491ff;color: #FFFFFF;border:0.5px solid #FFFFFF;}
  button:active{background-color:#0a73dd;color:rgba(255, 255, 255, 0.6)}

</style>
