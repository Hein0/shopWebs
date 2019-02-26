<template>
    <div class="sectionLmuen">
    	<div class="sectionTouch">
    		<ul >
    			<li class="heo actives" v-for="item in leftDatas">
                	<router-link :to="{path:'/category',query:{id:item.id}}">
                	{{item.category_name}}
                	</router-link>
                </li>
			</ul>
    	</div>
    </div>    
</template>
<script>
export default{
	data(){
		return{
			leftDatas:[],
			a:[{ id:"621",category_name:"咖啡"},
					{ id:"627" ,category_name:"饮食"},
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
	mounted(){
		this.getLeftDatas();
	},
	methods:{
		getLeftDatas(){
			let _this = this;
			_this.leftDatas = _this.a;

		},
	}
}
</script>
<style scoped>
	.sectionLmuen {position: fixed;left: 0; top: 1.15rem;bottom: 1.48rem;z-index: 2;box-sizing: border-box;width: 2.21rem;overflow: auto;border-right: 1px solid #ccc;} 
    .sectionLmuen::-webkit-scrollbar {display:none}
    .sectionLmuen .sectionTouch{touch-action: none;} 
	.sectionLmuen>div {height: 100%;}  
	.sectionLmuen ul {width: 2.2rem;}
	.sectionLmuen li {width: 2.16rem; height: 1.2rem;line-height: 1.2rem; border-left: .04rem solid transparent;font-size: .38rem;color: #333;text-align: center;}  
	.heo {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}  
	.sectionLmuen .sectionTouch ul li.actives {color: #0b9aff;border-left: .04rem solid #0b9aff;}  
	  
	  
	  
</style>






