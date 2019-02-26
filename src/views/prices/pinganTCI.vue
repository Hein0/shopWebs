<template>
  <div class="iframe-wrap">
    <!--<iframe :src="pingAnURL" frameborder="0"></iframe>-->
  </div>
</template>

<script>
  import cookie from '../../config/util/cookie'
  export default {
    data () {
      return {
        pingAnURL: '',
        tempUserId:this.$route.query.tempUserId
      }
    },
    computed:{
      /*tempUserId: function() {
        return cookie.Cookie.get("tempUserId");
      }*/
    },
    created(){
      if(this.tempUserId){
        var origin=window.location.origin+'/bilWeb/dist/index.html#/';
        var domain=window.location.host.substr(0,9)=='localhost'?'http://localhost:8080/#/':origin;
        this.pingAnURL = this.$root.pingAnURL + 'ebusiness/newUpingan/index.html#index?userId=' + this.tempUserId+'&systemId=0052&isSpecialCity=true&mediaSource=ICP-BQJR-FORCE0001&orderBackUrl='+domain+'order';
//        this.pingAnURL = this.$root.pingAnURL + 'ebusiness/newUpingan/index.html#index?userId=' + this.tempUserId+'&systemId=0052&isSpecialCity=true&mediaSource=ICP-BQJR-FORCE0001&orderBackUrl=http://www.baidu.com/';
        console.log(this.pingAnURL);
        alert(this.pingAnURL)
        location.href=this.pingAnURL;
      }else{
        this.$parent.alertT='tempUserId为空，无法投保';
        this.$parent.alertB=true;
      }
    },
    mounted(){
    }
  }
</script>

<!-- 添加 "scoped" 将CSS限制为该组件的属性 -->
<style scoped>
  .iframe-wrap {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
  }
  .iframe-wrap iframe {
    height: 100%;
    width: 100%;
  }
</style>
