<template>
	<div class="about">
    <!--头部导航-->
    <headBack :fH="true" :msg="msgTitle"></headBack>
		<div class="about_centent" >
			<img class="a-img" src="../../assets/about-1.png" alt="">
			<p class="a-txt"> 仟度金融成立于2013年12月，总部设立在深圳，为全国客户提供消费金融和汽车金融服务。作为哈尔滨银行和众安保险的战略合作伙伴，未来将进一步开拓相关业务领域，提供综合金融解决方案。</p>
			<p class="a-txt"> 仟度金融秉持着承担、学习、诚信、创新、服务5大文化方针，力求为您提供及时贴心有温度的服务。</p>
			<p class="a-txt">为更好满足广大有车一族的需求，仟度金融携手平安车险共同打造车险分期产品，方便快捷在线投保，享受6期0息0费起，任何问题请您详询400-998-7101仟度金融，点滴信用，助力平凡梦想!</p>
		</div>
	</div>
</template>

<script>
	import { CheckIcon  } from 'vux'
  import headBack from '../../components/head-back'
	export default {
		name:'about',
	    props: {

	    },
	    components: {
	    	CheckIcon,
        headBack,//头部返回
	    },
	    data () {
      		return {
            msgTitle:this.$route.meta.title,//路由标题
      		}
	    },
	    //实例已经创建完成之后
	  	created(){
      		this.$parent.init();
		},
		//监视
		watch:{

		},
		//组件写入dom结构之前
		mounted(){

		},
		//方法对象
    methods:{

    }
	}
</script>

<style scoped>
	.about{background:#eef2f9;min-height: 100%;}
	.about_centent{padding:1px 5.3125%;line-height:24px;font-size:14px;color:#000}
	.about_centent .a-img{width: 63.125%;display: block;margin: 13.125% auto 10%;}
	.about_centent .a-txt{text-indent: 28px;text-align: justify;}
</style>
