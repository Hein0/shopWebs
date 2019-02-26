<template>
	<div class="" style="padding:0 15px 20px;">
		<group>
	      <x-textarea class="jsonArea" :max="2000" :rows="16" v-model="textarea"  @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
	    </group>
		<div class="preview">
			{{textarea}}
		</div>
		<br/>
		<x-button type="primary" @click.native="fenqi">分期</x-button>
	</div>
</template>

<script>
	import { XButton, XTextarea, Group } from 'vux'
    export default {  
    	components: {
		    XTextarea,
		    Group,
		    XButton
		},
        data () {
	        return {
	        	tempUserId:'',
	        	textarea:'{"NAME":"肖海宁","GENDER":"0","ID_NO":"6217995200172423383","CELLPHONE":"13000000003","COMMERCIAL_INSURANCE_PROVINCE":"湖北省","COMMERCIAL_INSURANCE_CITY":"黄冈市","CAR_ON_CARD_TYPE":"N","CAR_NUMBER":"粤B45678","CAR_BRAND_MODEL":"132564","CAR_TRANSFER_TYPE":"N","CAR_REGISTRATION_DATE":"2017-08-07 18:28:08","CAR_BRANDED_BRAND_MODEL":"","CAR_BRANDED_TRANSFER_TYPE":"N","POLICY_DELIVERY_PROVINCE":"湖北省","POLICY_DELIVERY_CITY":"黄冈市","POLICY_DELIVERY_DETAIL_ADDRESS":"湖北省黄冈市蕲春县支行","INSURED_INSURANCE_COMPANY_NAME":"平安保险","INSURANCE_SUBJECT":"FHDSJAIUFERG","INSURANCE_TOTAL_AMOUNT":"5000","APPLY_POLICY_NO":"132456789","INSURANCE_BEGIN_TIME":"2017-08-07 18:28:08","INSURANCE_END_TIME":"2018-08-07 18:28:08","PAY_ORDER_ID":"543758437296","ORDER_ID":"145648978","USER_ID":"132456"}',
	        }
	    },
	    //实例已经创建完成之后
		created(){
			this.tempUserId = this.$route.query.userId ? this.$route.query.userId : '';
			//console.log(this.$route.query);
			let tmp = JSON.parse(this.textarea);
			tmp.USER_ID = this.tempUserId;
			this.textarea = JSON.stringify(tmp);
		},
	    methods: {
		    onEvent (event) {
		      //console.log('on', event)
		    },
		    fenqi(){
		    	
				/*let params = JSON.parse(this.textarea),
					paramsStr = '';

				for(let i in params){
					paramsStr += i +'='+ params[i] + '&';
				}
				paramsStr = paramsStr.substring(0,paramsStr.length-1);

				console.log(this.$root.url+'order/sy?'+paramsStr);

				window.top.location.href = this.$root.url+'order/sy?'+paramsStr;*/

				window.top.location.href = this.$root.url+'order/testOrder?tempUserId='+this.tempUserId;
				//location.href = this.$root.url+'order/testOrder?tempUserId='+this.tempUserId;

				/*this.$http.post(this.$root.url+"order/sy", params , {
			        //headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',"token":this.token},
			        emulateJSON:true
			    }).then(function(data) {// 这里是处理正确的回调
			        var datas=data.body.data;
			        if(data.body.ask == 0){
		        		
		    		}
			    }, function(error) {// 这里是处理错误的回调
			        console.log(error)
			    });*/
		    }
		}
    }
</script>

<style lang="less" scoped>
	.preview{word-break:break-all;padding:10px;font-size:10px;}
	.jsonArea{font-size:10px;}
</style>
