<template>
	<div class="activity">
	    <noData v-if="1">
	  		<img class="n-img" src="../../assets/img/gwc-icon.png" alt="">
	      	<p class="n-txt">去添加点什么吧</p>
          <span class="gotoGw" @click="gotoGw">去购物</span>
	    </noData>
	</div>
</template>

<script>
	import { Cell, CellBox } from 'vux'
  import noData from '../../components/noData'

	export default {
		name:"guide",
    props: {

    },
    components: {
      Cell,
      CellBox,
      noData:noData
    },
    data () {
        return {
          token:"",//token
        }
    },
    //实例已经创建完成之后
    created(){
        this.$parent.init();
    },
    //初始化数据
    init(){
      this.token = cookie.Cookie.get("token") ? cookie.Cookie.get("token") : '';
    },
		//监视
		watch:{

		},
		//组件写入dom结构之前
		mounted(){

		},
		//方法对象
    methods:{
      
      //去购买
      gotoGw(){
        this.$router.push({path:'/',query:{}})
      }

    }
	}
</script>

<style scoped="">
	.activity {
      font-size: 20px;
      text-align: center;
      color: rgb(192, 204, 218);
  }
  .gotoGw{
    width: 100px;
    display: inline-block;
    margin-top: 20px;
    padding:5px;
    background:#999999;
  }
</style>
