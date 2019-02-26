<template>
	<div v-if="list.length>0">
		<!-- <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :use-pullup=false> -->
			<div class="qcode-recode">
				<div class="r-item" v-for="item in list">
		      		<div class="r-left"><img class="r-icon" :src="item.icon" alt=""></div>
		      		<div class="r-right">
		            	<p class="r-info">您已成功邀请好友{{item.phone}}注册</p>
		            	<p class="r-date">{{item.date}}</p>
		            </div>
		      	</div>
			</div>
	  	<!-- </scroller> -->
  	</div>
  	<div v-else>
		<no-data>
			<img class="n-img" :src="noDataImgSrc" alt="">
         	<p class="n-txt">{{noDataTxt}}</p>
		</no-data>
	</div>
</template>

<script>
import { Cell, Scroller, LoadMore  } from 'vux'
import noData from '../../components/noData'

/*组件*/
export default {
  	name: 'inviteRecode',
    components: {
	    Cell,
	    Scroller,
	    LoadMore,
	    noData
  	},
    data () {
	    return {
			onFetching: false,
			list:[],
			noDataTxt:'暂无邀请记录',
			noDataImgSrc:require('../../assets/no_data.png'),
			avatarUrlDefault:require("../../assets/user-1.png"),//默认头像地址
	    }
	},
	//实例已经创建完成之后
	created(){
		this.$parent.init();
	},
    mounted () {
	    this.$http.post(this.$root.url+"userCenter/getInviterList",{
           emulateJSON: true
        }).then(function(res) {//success
           console.log('res',res);
           if(res.ok&&res.body.ask==0&&res.body.data){
	           	for(var i=0;i<res.body.data.length;i++){
	           		var phone = res.body.data[i].phoneNo;
	           		console.log('phone',phone);
					this.list.push({
						icon:res.body.data[i].avatarUrl?res.body.data[i].avatarUrl:this.avatarUrlDefault,
						phone:phone.substring(0,3)+'****'+phone.substring(7),
						date:res.body.data[i].registerDate
					});
	           	}
           }else{
                this.showTips = true;
                this.showTipsMsg = res.body.message;
           }
        }, function(res) {// fail
           this.showTips = true;
           this.showTipsMsg = res.statusText;
        });
    },
    methods: {
	    onScrollBottom () {
	      /*if (this.onFetching) {
	        // do nothing
	      } else {
	        this.onFetching = true
	        setTimeout(() => {
	          this.list.push({
				icon:'../../assets/inviteUser.png',
				phone:'134****12345',
				date:'2017/01/01-12:12:12'
			});
	          this.$nextTick(() => {
	            this.$refs.scrollerBottom.reset()
	          })
	          this.onFetching = false
	        }, 2000)
	      }*/
	    }
    }
}
</script>

<style scoped>
    .qcode-recode{position: relative;padding: 1px 0 53px;}
    .qcode-recode .r-item{padding: 10px 10px 15px;position: relative;background-color: #fff;overflow: auto;}
    .qcode-recode .r-item:after{content: " ";position: absolute;left: 0;bottom: 0;right:15px;height: 1px;border-top: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);left: 15px;}
    .qcode-recode .r-item:last-child:after{display: none;}
    .qcode-recode .r-item .r-left{font-size: 0;float: left;width: 42px;height: 42px;}
    .qcode-recode .r-item .r-left .r-icon{width: 100%;height: 100%;border-radius: 50%;}
    .qcode-recode .r-item .r-right{padding-left:54px;}
    .qcode-recode .r-item .r-right .r-info{color: #434f5d;font-size: 12px;line-height: 22px;}
    .qcode-recode .r-item .r-right .r-date{color: #8ca3b5;font-size: 10px;}
</style>
