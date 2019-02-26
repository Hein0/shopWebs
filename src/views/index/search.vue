<template>
	<div class="search">
		<div class="search_top">
		    <div class="search_frame">
		    	<div class="searchBar">
		    		<div class="cancelTxtBack" @click="goBack">
			   			<p class="back_but" ></p>
			   		</div>
			   		<div class="search_frame_center">
			   			<i class="search-icon"></i>
			   			<input type="text" placeholder="请输入您想要的商品"	 v-model.trim="value"/>
			   			<span class="search-clear" @click="searchClear"></span>
			   		</div>
			   		<div class="cancelTxt" v-if="isShow">
			   			<p class="cancel_but" @click="searchs">搜索</p>
			   		</div>
		   		</div>
		    </div>
	    </div>
	    <!--点击收到到的列表显示-->
	    <div class="topHeis" v-if="results.length>0"></div>
	    <div class="searchNavWrap" v-if="results.length>0">
		  	<div class="searchNav">
		  		<div class="nav-li nav-on" data-asccode="normal" >综合</div>
		  		<div class="nav-li" data-asccode="sale_desc" >销量</div>
		  		<div class="nav-li nav-two" data-asccode="price_asc" >
		  			价格 <span class="nav-icon"></span>
		  		</div>
		    	<div class="nav-Filter">
		    		筛选<span class="icon-Filte"></span>
		    	</div>
		  	</div>
		</div>
	    <!--搜索前-->
	    <div class="search-pre" v-if="results.length<=0">
	    	<div class="search-pre-history-wrap clear">
			    <div class="search-pre-history-head">
			     	<h2>历史记录</h2>
			     	<span class="search-history-del" @click="removeItem"></span>
			    </div>
			    <ul class="clear" id="historyUl">
			    	<li v-for="(item,index) in historyList"  data-inx="index" :key="item" @click="selectList(item)">{{item}}</li>
			    </ul>
			</div>
			<div class="search-block-bk none" style="display: block;"></div>
			<div class="search-pre-host-wrap">
			    <div class="searh-pre-host-head">
			     	<h2>热门搜索</h2>
			    </div>
			    <ul class="clear" id="hotWordsUl">
			        <li  v-for="(ite,inx) in recommend" data-inx="inx.id" @click="selectList(ite.tex)">{{ite.tex}}</li>
			    </ul>
			</div>
	    </div>
	    <!--搜索到数据-->
	    <div class="search_lists" v-else>
	    	<ul class="caseContent" ref="Box">
	    		<li class="case_photo" v-for="(item,index) in results" :key="item.id" @click="gotoDetail(item.id)">
	    			<div class="imgWrap">
	    				<div class="imgCente">
	    					<img src="https://qz.bqjr.cn/uploadfile/goods/20181016/20181016145026689885516.png" alt=""> 
	    				</div>
	    				<div class="desc"></div>
	    			</div>

	    			<div class="nameTile">{{item.tex}}</div>
	    			<div class="price">
	    				<span class="priceInner" >
	    					<span class="presentPrice">
	    						<span >¥</span>
	    						<span >179</span>
	    					</span>
	    					<span class="counterPrice" >
	    						<span >¥</span>
	    						<span >279</span>
	    					</span>
	    				</span>
	    			</div>
	    		</li>
	    	</ul>
	    </div>
	    
	    
	</div>
</template>

<script>
	import { Search} from 'vux'
	import cookie from '../../config/util/cookie' 
	export default{
		name: 'search',
    	components: {
		    Search
		},
		data () {
		    return {
		    	keyword:"",//搜索关键词
		    	historyList:[],//搜索历史
		    	recommend:[{id:1,tex:"羊绒衫"},{id:2,tex:"外套"},{id:3,tex:"连衣裙"},{id:4,tex:"口红"},{id:5,tex:"羊绒衫大太阳"},{id:6,tex:"外套干活"}],//推荐数据
		    	hotWords:[],//热门搜索
		    	results: [],//搜索到列表
		    	value:'',//搜索值
		    	isShow:true,//是否显示搜索按钮
		    	page:1,
		    	isadd:true,
		    	datas:[{id:1,tex:"羊绒衫"},{id:2,tex:"外套"},{id:3,tex:"连衣裙"},{id:4,tex:"口红"},{id:5,tex:"羊绒衫大太阳"},{id:6,tex:"外套干活"},{id:7,tex:"连衣裙都是"},{id:8,tex:"口红单方事故"}]
		    }
	    },
	    //渲染完成进路由前
	    created(){
	    	this.historyList = localStorage.getItem('historyList') ? JSON.parse(localStorage.getItem('historyList')) :[];
		},
		//实例已经创建完成之后
		mounted(){
			let _this = this;
			window.addEventListener('scroll',this.gd_add,true);

        },
	    //方法对象
	    methods:{
		    //搜索
		    searchs(){
		    	this.isShow = false
		    	if(this.value == ""){return false}
		    	this.setLocalStorge(this.value);
	    		this.$http.post(this.$root.url+"basedata/queryModels", {
	    			"keywords":this.value	
	    		}, {
			        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token}
			    }).then(function(res) {// 这里是处理正确的回调
			        var datas = res.body.data;
			        if(datas.data && res.body.ask==0 && res.body.code=="0000"){
			        	this.results = [];
			        	this.results = this.datas
			        }
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			        this.results = [];
			        this.results = this.datas;
			    });
		    	
		    },
		    //购买详情页
		    gotoDetail(id){
		    	this.$router.push({path:'/detail',query: {id:id}});
		    },
		    //保存到本地存储
		    setLocalStorge(val){
		    	if(localStorage.getItem('historyList')){
		    		var str =false;
		    		for (let i=0;i<this.historyList.length;i++) {
		    			if(this.historyList[i] === val){
		    				str = true
		    				break
		    			}
		    		}
		    		if(!str){
		    			this.historyList.push(val);
		    			localStorage.setItem('historyList',JSON.stringify(this.historyList));
		    		}
		    	}else{
		    		this.historyList.push(val);
		    		localStorage.setItem('historyList',JSON.stringify(this.historyList));
		    	}
		    },
		    //选择列表
		    selectList(tex){
		    	this.value = tex;
		    	this.isShow = false;
		    	this.searchs();
		    },
		    //返回上一层
			goBack(){
//				this.$router.push({path:'/',query: {}});
				this.$router.go(-1);
			},
			//清除输入框
			searchClear(){
				this.value = "";
				this.isShow = true;
				this.results = [];
			},
			//清除本地存储
			removeItem(){
				localStorage.removeItem("historyList");
				this.historyList = [];
			},
			//滚动加载
			gd_add(e){    
				// console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
                // console.log(document.body.scrollTop); // 滚动高度
                // console.log(document.body.offsetHeight); // 文档高度
                
            	let wrapHeight = document.body.clientHeight;  //容器的高度  可视区域高度
            	let scrollTop = e.target.scrollTop;//滚动条的scrolltop
            	let scrollHeight = document.body.offsetHeight;  //内容的高度
				let isHein = scrollHeight - scrollTop - wrapHeight;
				console.log(wrapHeight + "wrapHeight");
				console.log(scrollTop + "scrollTop");
				console.log(scrollHeight+"scrollHeight");
				if (isHein ==0) {
					if( this.isadd == true){
						this.page++;
              			this.isadd = false;
						this.$http.post(this.$root.url+"basedata/queryModels", {"keywords":this.value}, {
				        	headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token}
				    	}).then(function(res) {// 这里是处理正确的回调
				        	for(let i=0;i<res.length;i++){
		                  
		                	}
				        	this.isadd = true;
				    	}, function(error) {// 这里是处理错误的回调
				        	console.log(error)

				    	});
					}
            	}

          	},

		  	
		},
		
		//计算属性
		computed:{
        
        },
        //监听
        watch: {
		    
		},
		//销毁滚动
	    destroyed () {
		  window.removeEventListener('scroll', this.gd_add)
		},
	}

	
</script>

<style scoped>
	input,textarea{-webkit-appearance: none;outline: none;}
	.search_top,.topHeis{height:1.2rem;}
	.search_top .search_frame{height:1.2rem;position:fixed;z-index: 9;width:100%;margin:0 auto;top:0;left: 0;right:0; background:#fff;}
    .search_top .search_frame .searchBar{z-index: 1;position: relative;border-bottom: #e4e4e4 solid .015rem;display: -webkit-box;display: flex;}
    .search_top .search_frame .searchBar .search_frame_center{width:8.3rem;height:0.85rem;display:inline-block;line-height:0.425rem;position:relative;padding:0.15rem .1rem;border-radius:3px;}
    .search_top .search_frame .searchBar .search_frame_center .search-icon{width:0.75rem;position:absolute;display: inline-block;height:0.85rem;text-align: center;background:url(../../assets/search.png) no-repeat center center;background-size:0.42rem;}                                                          
    .search_top .search_frame .searchBar .search_frame_center input{width:100%;height:0.85rem;line-height:0.425rem;border:none;background:#ededed;text-indent:0.75rem;border-radius:3px;}
    .search_top .search_frame .searchBar .cancelTxt{width:1.2rem;display:inline-block;height:0.85rem;text-align: center;font-size:0.38rem;line-height:0.85rem;padding:0.15rem .1rem;}
    .search_top .search_frame .searchBar .cancelTxtBack{width:1rem;display:inline-block;height:0.85rem;text-align: center;line-height:0.85rem;padding:0.15rem 0 ;}
    .search_top .search_frame .searchBar .cancelTxtBack .back_but{height:0.85rem;text-align: center;border-radius:3px;font-size:0.42rem;background: url(../../assets/left_icon.png) no-repeat center;background-size:0.6rem 0.6rem}
    .search_top .search_frame .searchBar .cancelTxt .cancel_but{height:0.85rem;text-align: center;border-radius:3px;font-size:0.42rem;color:#FFFFFF;background:#0b9aff;}
    .clear::after {content: "";clear: both;display: block;width: 0;}
    .search-clear{position: absolute;top: .42rem;width: .4rem;height: .4rem;right: .2rem;background: #f2f2f2 url(../../assets/p7.png) no-repeat center; background-size: 50%;}
    /*搜索前*/
   	.search-pre{background-color: #f4f4f4;position: relative;z-index: 1;}
   	.search-pre-history-wrap,.search-pre-host-wrap{width: 9.6rem;padding: 0rem .2rem;background:#fff;}
 	.search-pre-history-head, .searh-pre-host-head {display: -webkit-box;display: flex; padding: .15rem 0rem;}
    .search-pre-history-head h2, .search-pre-host-wrap h2 { width: 8.8rem;height: .65rem;display: -webkit-box;display: flex;line-height: .65rem; font-size: .35rem;color:#666;}
    .search-pre-history-head span {width: .8rem;height: .65rem;background: url(../../assets/icon_delete.png) no-repeat center;background-size: 55% 55%;}
    .search-pre-history-wrap ul, .search-pre-host-wrap ul {clear: both;}
    .search-pre-history-wrap ul li, .search-pre-host-wrap ul li {font-size:0.37rem; float: left; height: .44rem;line-height: .46rem; border: #e4e4e4 solid .015rem;margin-right: .3rem; margin-bottom: .3rem;padding:.1rem;border-radius: .07rem;}
    .search-block-bk {width: 100%;background: #f2f2f2;height: .2rem;}


    
    /*搜索到数据*/
    .search_lists{width: 9.4rem;padding: .26rem .3rem 0rem;background:#fff;z-index: 1;position: relative;}
    .caseContent{column-count: 2;column-gap: .6rem;}
    .caseContent .case_photo { margin-bottom: 0.4rem;/* width: 4.4476rem; */border-radius: .21rem;
    /* height: 5.12rem; */-moz-page-break-inside: avoid;break-inside: avoid;background: #fff;}
    .caseContent .case_photo .imgWrap{width:100%;position: relative;border-radius: .05rem; background-color: #f4f4f4;}
    .caseContent .case_photo .imgWrap .imgCente{width:100%;}
    .caseContent .case_photo .imgWrap .imgCente img{width:4.4267rem;/*height:4.4267rem;*/border:none;display:block;border-radius: .05rem .05rem 0 0;background-color: #f4f4f4;}
   	.caseContent .case_photo .nameTile {margin-top: .21333rem;line-height: .53333rem;font-size: .37333rem;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;color: #333;}
    .caseContent .case_photo .price {font-size: .42667rem;line-height: .64rem;color: #b4282d;}
    .caseContent .case_photo .price .priceInner {display: -webkit-box;display: -webkit-flex; display: -moz-flex;display: -ms-flexbox;display: flex;
    -webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;-moz-align-items: center;align-items: center;}
    .caseContent .case_photo .price .priceInner .counterPrice {margin-left: .10667rem; font-size: .32rem; color: #999;line-height: .48rem;text-decoration: line-through;}
    
    
    /*tab筛选*/
    .searchNavWrap {display: block;position: fixed;left: 0;top: 1.2rem;right:0;z-index: 1000;}
    .searchNav{display: flex;justify-content: space-around;-webkit-flex-flow: row nowrap; -moz-flex-flow: row nowrap;-ms-flex-flow: row nowrap;border-bottom: .015rem solid #f4f4f4;background: #FFF;}
    .searchNav div {-webkit-box-flex: 1;-webkit-flex-grow: 1; -moz-flex-grow: 1;-ms-flex-positive: 1;flex-grow: 1;padding: .26rem 0;text-align: center;font-size: .37rem;color: #666;letter-spacing: 0;}
    .searchNav div.nav-on {color: #0b9aff;}
    .nav-icon {width: .2rem;height: .25rem;display: inline-block;margin-left: .05rem;background: url(../../assets/Price-off@2x.png) no-repeat top;}
    .nav-li span {background-size: 100% 100%;}
    .icon-Filte {width: .29rem; height: .3rem;display: inline-block; background: url(../../assets/screen-off@2x.png) no-repeat top;margin-left: .05rem;background-size: 100%;}
    
    
    
    
</style>