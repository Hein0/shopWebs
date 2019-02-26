<template>
	<div class="account">
		<div class="account_bg" v-if="showAccount">
		    <div class="account_title">个人代扣银行卡账号</div>
		    <div class="account_list">
				<cell :title="'账号'" :value="bankAccount" ></cell>
			    <cell :title="'开户行'" :value="bankName"></cell>
			    <cell :title="'开户名'" :value="bankAccountName"></cell>
		    </div>
		    <div class="accountBut" v-if="openFlag==1">
			    <x-button type="primary" action-type="button" @click.native="accountbut">申请变更代扣账号</x-button>
		    </div>
		    <div class="remind" v-if="openFlag==1">
		    	<span>提醒：</span>
		    	<p>1、如果申请成功，今晚生效。</p>
		    	<p style="margin-bottom:10px;color:#ff3c00;">请记得将还款金额存入新的代扣账号中。</p>
		    	<p>2、如果你有多笔合同，将会统一变更为新代扣账号。</p>
		    </div>
	    </div>
	    <div  v-if="showNoData">
	    	<no-data>
				<img class="n-img" :src="noDataImgSrc" alt="">
	         	<p class="n-txt">{{noDataTxt}}</p>
			</no-data>
	    </div>
	</div>

</template>

<script>
import { Cell,XButton } from 'vux'
import cookie from '../../config/util/cookie'
import noData from '../../components/noData'
/*组件*/
export default {
  	name: 'account',
    components: {
	    Cell,
	    XButton,
	    noData
  	},
    data () {
	    return {
	       url:"",
	       bankAccount:"",
	       bankName:"",
	       bankAccountName:"",
	       openFlag:-1,//是否开户
	       token:'',//获取token
	       noDataTxt:'暂无还款账号',
		   noDataImgSrc:require('../../assets/no_bankcar.png'),
		   showAccount:false,
		   showNoData:false,
	    }
	},
	//实例已经创建完成之后
    created(){
       this.$parent.init();
	},
	//组件写入dom结构之前
	mounted(){
		this.token = cookie.Cookie.get("token")?cookie.Cookie.get("token"):'';

		this.$http.post(this.$root.url+"basedata/bankCardQuery", {
		}, {
	        headers: {'Content-Type': 'application/json;charset=UTF-8',"token":this.token},
	    }).then(function(data) {// 这里是处理正确的回调
	        var datas = data.body.data;
	        if(data.body.ask==0&&datas){
	        	if(datas.bankAccount){
	        		this.bankAccount = datas.bankAccount;
	        		this.bankName = datas.bankName;
	        		this.bankAccountName = datas.bankAccountName;
	        		this.openFlag = datas.openFlag;
	        		this.showAccount = true;
	        	}else{
					this.showNoData = true;
	        	}
    		}else{
    			this.showNoData = true;
    		}
	    }, function(error) {// 这里是处理错误的回调
	        console.log(error)
	    });
	},
	//方法
    methods:{
	  	accountbut(){
            this.$router.push({path:'/applyModify',query: {}})//其中login是你定义的一个路由模块
	  	}
	}

}

</script>

<style scoped>
	.account{padding:15px 15px 25px;}
	.account .account_bg{background:#fff;border-radius:5px;}
	.account_title{padding:10px 10px 15px 30px;position:relative;font-size:18px;color:#2591ff}
	.account_title:before{content: " ";height:40%;width:3px;position:absolute;left:10px;top:30%;color:#2591FF;bottom:0;background:#2591FF;}
    .account_list{background:#fff;}
    .accountBut{width:80%;margin:auto;padding:25px 0 20px}
    .remind{color:#8CA3B5;padding:15px 10px;font-size:14px;}

</style>
<style>
	.account_list .vux-label{color:#7990a2;}
	.account_list .weui-cell{padding:15px 10px;}
	.account_list .weui-cell__ft{color:#434f5d}
	.account_list .weui-cell:after,.account_title:after{content: " ";position: absolute;bottom: 0;right: 10px;height: 1px;
    border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;
    transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);left: 10px;}
	.account_list .weui-cell:before{border-top:none}
	.accountBut .weui-btn_primary {background-color: #2491ff !important;}
</style>
