<template>
    <div class="search-bar">
        <div class="search" @click="gotoSearch">
            <span class="search-icon icon iconfont icon-search"></span>
            <span class="search-text">请输入您想要的商品</span>
        </div>
    </div>
</template>
    
<script>
export default {
  	name: "search-bar",
  	props: {},
  	data() {
    	return {
      		goodsCount: 9872
    	};
  	},
  	components: {
  		
  	},
  	methods: {
  		//搜索页
        gotoSearch(){
        	this.$router.push({path:'/search',query: {}});
        },
  	}
};
</script>
    
<style scoped>

.search-bar{width: 9.2rem;height: 0.74rem;padding: 0.21rem 0.4rem;display: flex;align-items: center;}
.search-bar .logo{margin-right: 0.26rem;height: 0.45rem;}
.search-bar .logo img{height: 100%}
.search{background-color: #ededed;width: 100%;
        height: 100%;border-radius: 0.1rem;display: flex;justify-content: center;align-items: center;}
.search .search-icon{margin-right: 0.13rem;}
.search:before{font-size: 0.37rem;height: 1em;line-height: 1em;}
.search .iconfont{display: inline-block;width:0.42rem; height: 0.42rem;line-height: 0.42rem;background:url(../assets/search.png) no-repeat center center;background-size:cover;}
.search .search-text{font-size:  0.37rem;font-family: PingFangSC-Light,helvetica,'Heiti SC';color: #666;}
    
</style>