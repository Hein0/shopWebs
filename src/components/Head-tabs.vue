<template>
    <div class="head-tabs">
        <tab :line-width="lineWidth" :custom-bar-width="custombarwidth" class="head-tabs-list">
            <tab-item class="head-tabs-item" v-for="(tab,index) in tabs" :key="tab" :selected="index==0">{{tab}}</tab-item>
        </tab>
    </div>
</template>
    
<script>
import { Tab, TabItem } from "vux";
export default {
  	name: "Headtabs",
  	props: {},
  	data() {
    	return {
      		tabs: [
        	"推荐",
    		"居家",
        	"配件",
        	"服装",
        	"电器",
        	"洗护",
        	"饮食",
        	"餐厨",
        	"童婴"
      		],
      		lineWidth: 2,
      		custombarwidth: "45px"
    	};
  	},
  	components: { Tab, TabItem },
  	methods: {
  		
  	},
  	created() {
  		
  	},
  	mounted() {
  		
  	}
};
</script>
    
<style scoped>
	.head-tabs{height: 0.8rem;width: 10rem;padding: 0 0.4rem;}
	.head-tabs .head-tabs-list{}
	.head-tabs .head-tabs-list .head-tabs-item{font-size: 0.37rem;font-family: PingFangSC-Light,helvetica,'Heiti SC';}    
           
</style>
<style>
	.head-tabs .head-tabs-list .vux-tab-container{height:0.8rem !important;}
	.head-tabs .scrollable .vux-tab-item{height: 0.8rem !important;line-height: 0.8rem !important;}
	.head-tabs .vux-tab .vux-tab-item.vux-tab-selected {color: #0b9aff ; border-bottom: 3px solid #0b9aff ;}

</style>