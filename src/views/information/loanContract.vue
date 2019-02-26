<template>
  <div class="full-screen">
    <noData v-if="mainData.contract_count==0">
      <img class="n-img" src="../../assets/nocontract.png" alt="">
      <p class="n-txt">暂无合同</p>
      <!--<btn msg="返回首页" @btnClickEvent="btnClickEvent"></btn>-->
    </noData>
    <div v-else class="d1">
      <div v-for="item of mainData.contract_list" class="fbox scaleblock one_px_border_b">
        <div>合同号:{{item.contract_no}}</div>
        <div @click="go(item.contract_no)"><span>查看</span></div>
        <!--<a :href="item.image_url" target="_blank"><span>查看</span></a>-->
        <!--<router-link :to="{path:'/contractDetail',query: {orderId:}}">注册新用户</router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
  import noData from '../../components/noData'
  export default {
    components: {
      noData:noData,
    },
    data(){
      return {
        mainData:''
      }
    },
		created(){
			this.$parent.init();
		},
    methods: {
      go(contractCode){
        this.$router.push({path:'/contractDetail',query: {contractCode:contractCode}})
      },
      _init(){
        this.$http({
          method: 'GET',
          url: this.$root.url + "loadTrail/listContract",
          params: {},
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
      this._init()
    }
  }
</script>

<style scoped>
  /*.full-screen{background-color:#eef2f9 ;}*/
  .d1 {
    background: #fff;
    padding:10px;
  }
  .full-screen>.d1:first-child{margin-top:10px;}
  .d1 > div {
    padding:10px 0;
  }
  .fbox {
    display: flex;
    font-size: 13px;
    align-items: center;
  }
  .fbox.scaleblock > *:last-child {
    flex: 1;
    text-align: right;

  }
  .fbox.scaleblock > *:last-child>span{
    font-size: 14px;
    border: 1px solid #0b92f1;
    color: #0b92f1;
    border-radius: 3px;
    padding: 4px 8px;
  }
  .fbox.one_px_border_b:last-child:after{
    border-bottom: none;
  }
  /*.cols > div {
    width: 100%;
    text-align: right;
    padding: 10px 0;
    color: #7990a2;
  }*/

</style>
