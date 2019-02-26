<template>
	<div class="myloan">

	    <div class="myloan_link">
			<cell :title="'还款账号'" is-link link="/account">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/hkzh_icon.png">
		    </cell>
		    <cell :title="'贷款记录'" is-link link="/billist">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/wdbd2_icon.png">
		    </cell>
		    <cell :title="'贷款合同'" is-link link="/loanContract">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/dkht_icon.png">
		    </cell>
		    <cell :title="'提前结清'" is-link link="/prepayment">
		        <img slot="icon" width="28" style="display:block;margin-right:10px;" src="../../assets/tqhk_icon.png">
		    </cell>
	    </div>


	</div>

</template>

<script>
import { Cell } from 'vux'
/*组件*/
export default {
  	name: 'myloan',
    components: {
	    Cell
  	},
    data () {
	    return {
	       url:""
	    }
	},
	//实例已经创建完成之后
	created(){
		this.$parent.init();
	},
	//方法
    methods:{

	}

}

</script>

<style scoped>
    .myloan_link{background:#fff;margin:10px;border-radius: 5px;}
</style>
<style>
	.myloan_link .weui-cell{padding:10px 15px;}
</style>
