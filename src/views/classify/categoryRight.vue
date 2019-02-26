<template>
	<div class="sectionRlist">
		<div class="touch-action">
			<div class="category_banner">
                <a href="#">
                    <img src="../../assets/about-1.png" alt="">
                </a>
            </div>
            <div class="category_detail">
                <div class="list-hd">咖啡</div>
                <ul>
                    <li class="category_detail_item" v-for="item in cateGoodsData">
                        <router-link :to="{path:'/pagelist', query:{id:item.id}}" class="category_detail_item_link">
                        	<div class="cateImg">
                        		<img src="../../assets/qa-7.png" alt="" class="category_detail_item_pic">
                        	</div>
                            <div class="category_name">{{item.category_name}}</div>
                        </router-link>
                    </li>
                
                </ul>
            </div>
        </div>
   </div>
</template>
<script>
export default{
		mounted(){
			this.fetchData(this.$route.params.id);
		},
		data(){
			return {
				cateGoodsData:[],
				bb:[{ id:"627" ,category_name:"饮食"},
					{ id:"279" ,category_name:"男装"},
					{ id:"294" ,category_name:"女装"},
					{ id:"122" ,category_name:"眼镜"},
					{ id:"339" ,category_name:"内衣配饰"},
					{ id:"391" ,category_name:"母婴"},
					{ id:"35" ,category_name:"鞋靴"},
					{ id:"39" ,category_name:"运动"},
					{ id:"153" ,category_name:"箱包"},
					{ id:"119" ,category_name:"美妆个护"},
					{ id:"355" ,category_name:"家纺"},
					{ id:"51" ,category_name:"餐厨"},
					{ id:"334" ,category_name:"电器"},
					{ id:"369" ,category_name:"家装"},
					{ id:"10" ,category_name:"家具"},
					{ id:"223" ,category_name:"数码"},
					{ id:"429" ,category_name:"汽配"},
					{ id:"546" ,category_name:"健康保健"},
					{ id:"433" ,category_name:"定制"}]
			}
		},
		watch:{
			$route(to){
				//console.log(to);
				var reg=/category\/\d+/;
				if(reg.test(to.path)){
					var categotyId=this.$route.params.id || 0;
					this.fetchData(categotyId);
				}
			}
		},
		methods:{
			fetchData(id){
				var _this=this;
				_this.cateGoodsData = _this.bb;
				
			}
		}
	}
</script>
<style scoped>
	.sectionRlist {position: fixed;left: 2.21rem; top: 1.15rem;bottom:1.48rem;z-index: 2;box-sizing: border-box;width: 7.79rem;overflow: auto;padding:.1rem;} 
    .sectionRlist::-webkit-scrollbar {display:none}
    .sectionLmuen .sectionTouch{touch-action: none;position: relative;width: 100%;height: 100%;overflow: hidden; background-color: #fff;} 
	.category_banner{}
	.category_banner>a {display: block;}
	.category_banner>a img{width: 100%;height: 2.4rem;}
	
	.category_detail{margin-top: .4rem; padding: 0 .2rem;}
	.category_detail .list-hd {height: .8rem; position: relative;line-height: .8rem;text-align: center; font-size: .42rem;color: #333;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
	.category_detail .list-hd:before { content: "";position: absolute; height: .026667rem;top: 50%;margin-top: -.0133335rem;margin-left: -.906667rem;width: .64rem; background: #ccc;}  
	.category_detail .list-hd:after {content: "";position: absolute;height: .026667rem;top: 50%;margin-top: -.0133335rem;margin-left: .266667rem;width: .64rem;background: #ccc;}
	.category_detail ul .category_detail_item { display: inline-block;margin-right: .595rem;font-size: 0;width: 2rem;vertical-align: top;}
	.category_detail ul .category_detail_item:nth-child(3n) {margin-right: -.13333rem;}
	.category_detail ul .category_detail_item .cateImg{    width: 1.8rem;height: 1.8rem;border-radius: .03rem;margin: 0 auto;padding:.1rem 0;}
	.category_detail ul .category_detail_item .cateImg img{display: inline-block;border:none;width:1.8rem;}
	.category_detail ul .category_detail_item .category_name {margin: .2rem 0;color: #333;font-size: .24rem;word-break: break-all;text-align: center;}
  
	  
	  
	  
</style>