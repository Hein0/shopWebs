<template>
   <div>
      <tab :line-width=2 active-color='#2491ff' v-model="activeIndex" animate>
        <tab-item class="vux-center" :selected="activeIndex === item.typeNo" v-for="(item, index) in tabList" @click="" @on-item-click="onItemClick" :key="index">{{item.name}}</tab-item>
      </tab>
      <div class="center_list">
     	   <!--强险以及商业险-->
         <div class="group_switch">
            <div  class="vux-x-switch weui-cell weui-cell_switch">
        			<div class="weui-cell__bd">
        				<label class="weui-label">交强险<i @click="tips(1)"><img src="../assets/question.png"/></i></label> 
        			</div> 
        			<div class="weui-cell__ft"><input type="checkbox" class="weui-switch" v-model="TCI" @on-change="!TCI"></div>
        		</div>
	         <datetime v-model="TCIDate" v-show="TCI" placeholder="请选择起保日期" :start-date="TCIStartDate" required :title="'交强险保障生效期'" confirm-text="完成" cancel-text="取消" @on-change="TCIDateChange"></datetime>
            <cell title="交强险终保时间" :value="TCIEndDate"></cell>
            <div  class="vux-x-switch weui-cell weui-cell_switch">
            	<div class="weui-cell__bd">
            		<label class="weui-label">商业险<i @click="tips(2)"><img src="../assets/question.png"/></i></label>
            	</div> 
            	<div class="weui-cell__ft"><input type="checkbox" class="weui-switch" v-model="VCI" @on-change="!VCI"></div>
            </div>
            <datetime v-model="VCIDate" v-show="VCI" placeholder="请选择起保日期" :start-date="VCIStartDate" required :title="'商业险保障生效期'" confirm-text="完成" cancel-text="取消" @on-change="VCIDateChange"></datetime>
            <cell title="商业险终保时间" :value="VCIEndDate"></cell>
         </div>
         <!--主险、附加险-->
         <div class="alLists" >
            <!--主险-->
            <div class="checklist" v-show="VCI" >
	          	<div class="planlist_title zx">主险<span class="float_rigt">保额(元)</span></div>
	          	<div class="vux_list_item" v-for="(insur,index) in mainInsurance">
	          		<div class="list_item_bd"><label>{{insur.name}}</label></div>
	          		<div class="list_item_inp" v-if="insur.isNoDeductible&&insur.value!==comTxt.unInsured">
                     <div class="checkbox-wrap">
                        <label :for="'main'+index">
                           <input type="checkbox" v-model="insur.deductibleValue" class="weui-check" name="checkbox1" :id="'main'+index">
                           <i v-if="insur.deductibleValue" class="weui-icon weui_icon_success weui-icon-success"></i>
                           <i v-else class="weui-icon weui_icon_circle weui-icon-circle"></i>
                           <span>不计免赔</span>
                        </label>
                     </div>
                  </div>
	          		<div class="list_item_sele"> 
	          			<selector :options="insur.lib" v-model="insur.value" :readonly="insur.readonly" @on-change="dropDownChange('main',index)">
	          			</selector>
	          		</div>
	          	</div>
            </div>
            <!--附加险-->
            <div class="checklist" v-show="VCI" >
	          	<div class="planlist_title fjx">附加险<span class="float_rigt">保额(元)</span></div>
	          	<div class="vux_list_item" v-for="(insur,index) in additionalInsurance">
	          		<div class="list_item_bd"><label>{{insur.name}}</label></div>
	          		<div class="list_item_inp" v-if="insur.isNoDeductible&&insur.value!==comTxt.unInsured">
                     <div class="checkbox-wrap">
                        <label :for="'add'+index">
                           <input type="checkbox" v-model="insur.deductibleValue" class="weui-check" name="checkbox1" :id="'add'+index">
                           <i v-if="insur.deductibleValue" class="weui-icon weui_icon_success weui-icon-success"></i>
                           <i v-else class="weui-icon weui_icon_circle weui-icon-circle"></i>
                           <span>不计免赔</span>
                        </label>
                     </div>
                  </div>
                  <div class="list_item_sele"> 
                     <selector :options="insur.lib" v-model="insur.value" :readonly="insur.readonly" @on-change="dropDownChange('add',index)">
                     </selector>
                  </div>
	          	</div>
            </div>
         </div>
         <div class="offerBut">
            <x-button type="primary" action-type="button" @click.native="saveOrUpdatePlan">立即报价</x-button>
         </div>
      </div>

      <x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="true">
         <div class="txt-box" v-if="alertOptoion==1">
            <p class="txt-p1">交强险：国家强制购买，赔偿额度较低机动车交通事故责任强制保险简称“交强险”，是由保险公司对被保险机动车发生道路交通事故造成受害人（不包括本车人员和被保险人）的人身伤亡、财产损失，在责任限额内予以赔偿的强制性责任保险。根据《交强险条例》的规定，在中华人民共和国境内道路上行驶的机动车的所有人或者管理人都应当投保交强险，未按照规定投保交强险的，公安机关交通管理部门有权扣留机动车，通知机动车所有人、管理人依照规定投保，并处应缴纳的保险费的2倍罚款。</p>
            <p class="txt-p1">机动车在道路交通事故中有责任的赔偿限额</p>
            <p class="txt-p2">■死亡伤残赔偿限额：110,000元人民币</p>
            <p class="txt-p2">■医疗费用赔偿限额：10,000元人民币</p>
            <p class="txt-p2">■财产损失赔偿限额：2,000元人民币</p>
            <p class="txt-p1">机动车在道路交通事故中无责任的赔偿限额</p>
            <p class="txt-p2">■死亡伤残赔偿限额：11,000元人民币</p>
            <p class="txt-p2">■医疗费用赔偿限额：1,000元人民币</p>
            <p class="txt-p2">■财产损失赔偿限额：100元人民币</p>
         </div>
         <div v-else-if="alertOptoion==2" class="swiper-box">
            <swiper height="210px">
               <swiper-item class="black" v-for="(item,index) in VCITipsList" :key="index">
                  <div class="s-txt-box">
                     <p class="s-txt-p1">{{item.title}}：<span>{{item.mark}}</span></p>
                     <p class="s-txt-p2">{{item.detail}}</p>
                  </div>
               </swiper-item>
             </swiper>
         </div>
         <div @click="showNoScroll=false" class="txt-bot">
            <span class="vux-close">关闭</span>
         </div>
      </x-dialog>

      <toast v-model="showTips" type="text" :time="1000" is-show-mask :text="showTipsMsg" position="default"></toast>

      <div class="alerts">
         <alert v-model="alertShowFlag" button-text="我知道了">
            <p>商业保险可以选择分期支付</p>
            <p>交强险不支持分期支付</p>
         </alert>
      </div>
  </div>
</template>

<script>

   import { Tab, TabItem, XButton, Swiper, SwiperItem , XSwitch, Group, Datetime, Alert, Confirm, Selector, XDialog, Toast, CheckIcon, Cell} from 'vux'
   import cookie from '../config/util/cookie' 
   export default {
   	name: 'plan',
      created () {
         this.$parent.init();
      },
      mounted () {
         var code = this.$route.query.code?this.$route.query.code:'';
         this.getDataByCode(code);
      },
      components: {
         Tab,
         TabItem,
         XButton,
         Swiper,
         SwiperItem,
         XSwitch,
         Group,
         Datetime,
         Alert,
         Confirm,
         Selector,
         XDialog,
         Toast,
         CheckIcon,
         Cell,
      },
      data () {
         return {
            alertShowFlag:true,
            comTxt:{
               insured:'投保',
               unInsured:'不投保'
            },
            planCode:'',
            tabList: [],
            activeIndex: 0,
            
            TCI:true,//交强险
            TCIDate: this.formateDate(new Date()),
            TCIStartDate:this.formateDate(new Date()),//设置开始时间
            TCIEndDate:this.getDateAfterYear(this.formateDate(new Date()),1),//结束时间
            VCI:false,//商业险
            VCIDate: this.getDateAfterNum(14),
            VCIStartDate:this.getDateAfterNum(14),//设置开始时间
            VCIEndDate:this.getDateAfterYear(this.getDateAfterNum(14),1),//结束时间

            allInsurance:[],
            mainInsurance:[], // 主险
            additionalInsurance:[], // 附加险

            showTips:false,
            showTipsMsg:'系统繁忙',
            showNoScroll: false,//交强险、商业险 提示
            alertOptoion:'',
            VCITipsList:[{
               title:'商业险',
               mark:'',
               detail:'汽车商业险是指对机动车辆由于自然灾害或意外事故所造成的人身伤亡或财产损失负赔偿责任的一种商业保险。汽车商业保险基本包括：车上人员责任险、第三者责任险、车辆损失险、全车盗抢险、车身划痕险、自燃险、发动机涉水损失险、玻璃单独破碎险、不计免赔险。商业险是非强制险种，客户可根据自己的需求选择项目进行投保。'
            },{
               title:'车上人员责任险',
               mark:'保障自己车上的人',
               detail:'车上人员责任险是车辆商业险的主要保险，分司机座位和乘客座位，赔偿车辆因交通事故造成的车内人员的伤亡的保险。保障司机和乘客由于交通事故造成伤亡的保险，经常有朋友搭车的推荐购买。已经投保了人身意外险不需重复购买。'
            },{
               title:'第三者责任险',
               mark:'保障车外的人和车',
               detail:'在事故当中，造成除本车驾驶员及乘客之外的其他人人身伤亡或财产直接损毁的，由保险公司按规定进行赔偿。由于事故造成别人受伤或者他人车辆受损，不用自己赔付。现在涉及到人伤亡，豪车受损的赔付通常是百万以上，建议一二线城市购买50万以上保额。'
            },{
               title:'车辆损失险',
               mark:'保障自己的车',
               detail:'主要负责赔偿由于自然灾害或意外事故造成的车辆自身的损失。不用花自己的钱维修爱车，新车特别是价格不菲的车型必买。'
            },{
               title:'全车盗抢险',
               mark:'保障自己的车',
               detail:'保险车辆全车被盗窃、被抢夺，经公安刑侦部门立案证实，满三个月未查明下落，或保险车辆在被盗窃、被抢劫、被抢夺期间受到损坏，或车上零部件及附属设备丢失需要修复的合理费用，保险公司负责赔偿。全车盗抢险在下列情况下对赔付额有影响：非全车遭盗抢，仅车上零部件或附属设备被盗抢，不赔付;原厂配置外的部件损失，不赔付;丢一个证件赔付金额减少0.5%，包括行驶证、发票和购置税凭证;原配车钥匙丢失，赔付金额减少5%.'
            },{
               title:'车身划痕险',
               mark:'没有专属停车位容易被刮擦的推荐购买',
               detail:'家庭自用非营业车辆可投保。保险车辆发生无明显碰撞痕迹的车身表面油漆单独划伤，保险公司按实际损失负责赔偿。划痕险是车辆损失险的附加险，即需要在投保了车辆损失险的情况下方可投保，不可单独投保。'
            },{
               title:'自燃险',
               mark:'5年以上车辆推荐购买',
               detail:'车损险的一个附加险种，机动车辆在使用过程中，因本车电路、线路、供油系统发生故障及运载货物自身起火燃烧，造成保险车辆的损失，保险公司负责赔偿。车子在质保期内厂家负责赔付，不需要购买，5年以上的车辆推荐购买。'
            },{
               title:'发动机涉水损失险',
               mark:'暴雨易积水地区推荐购买',
               detail:'车辆浸水后车损险可以赔付除发动机以外车辆损坏的部分，发动机损坏只有涉水险有可能赔。发现车辆泡水，不要启动发动机，不要启动发动机，不要启动发动机，否则不赔付。'
            },{
               title:'玻璃单独破碎险',
               mark:'针对风挡玻璃和车窗玻璃发生单独破碎的保障',
               detail:'在玻璃单独破碎时，不属于车损险保障范围，而属于玻璃险，需投保该险种保险公司才能赔付。车辆的各类车镜和灯具的玻璃破碎不在责任范围内。进口车可以选择进口玻璃险或者国产玻璃险，而国产汽车通常只能选择国产玻璃险。'
            },{
               title:'不计免赔险',
               mark:'把本应自己负责的赔偿责任转回保险公司',
               detail:'不计免赔险属于附加险，在同时投保了车辆损失险和第三者责任险基础上方可投保。如果不购买此险种，保险公司对车损险和第三者责任险不是全额100%赔付，自己要承担一部分，投保了这个险种，就能把本应由自己负责的5%到20%的赔偿责任再转嫁给保险公司，例如某人撞了一辆豪车，全责，修理费用40万，如果购买三者险的保额是50万，按照全责的免赔率20%计算，需要个人承担8万，保险公司赔付32万，如果购买了不计免赔险，全部的40万都由保险公司赔付。'
            }]
         }
      },
      methods: {
         getDateAfterNum(num){ //返回当前日期后num天日期
            var curDate = new Date();
            return this.formateDate(new Date(curDate.setDate(curDate.getDate()+num)));
         },
         getDateAfterYear(date,num){ //返回当前日期后num天日期
            var tmpDate = new Date(date);
            tmpDate = new Date(tmpDate.setFullYear(tmpDate.getFullYear()+num));
            tmpDate = new Date(tmpDate.setDate(tmpDate.getDate()-1));
            return this.formateDate(tmpDate);
         },
         formateDate(date){ //日期格式化
            return date.getFullYear()+'-'+(date.getMonth()>8?(date.getMonth()+1):('0'+(date.getMonth()+1)))+'-'+(date.getDate()>9?date.getDate():('0'+date.getDate()));
         },
         TCIDateChange (value) {
            //console.log('TCIDateChange', value)
            this.TCIEndDate = this.getDateAfterYear(value,1);//结束时间
         },
         VCIDateChange (value) {
            //console.log('VCIDateChange', value)
            this.VCIEndDate = this.getDateAfterYear(value,1);//结束时间
         },
         getDataByCode (code){
            var vm = this,
               token = cookie.Cookie.get("token");
            vm.clearData();
            vm.$http.get(this.$root.url+"insurace/queryInsurance?code="+code,{
               headers: {token:token}
            }).then(function(res) {//success
               //console.log('res',res);
               if(res.ok&&res.body.ask==0&&res.body.data){
                  var data = res.body.data;

                  //vm.planCode = data.planCode;
                  for(var j=0;j<data.plans.length;j++){
                     if(data.planCode){
                        if(data.plans[j].code==data.planCode){
                           vm.activeIndex = j;
                        }
                     }else{
                        if(data.plans[j].code==code){
                           vm.activeIndex = j;
                        }
                     }
                  }
                  vm.tabList = data.plans;//方案类型

                  vm.TCI = data.hasJq==1?data.hasJq:false;//交强险
                  vm.VCI = data.hasSy==1?data.hasSy:false;//商业险
                  //console.log('data.jqStartTime',data.jqStartTime);
                  //console.log('data.jqStartTime',vm.formateDate(new Date(data.jqStartTime)));
                  if(data.jqStartTime){//交强险生效时间
                     vm.TCIDate = vm.formateDate(new Date(data.jqStartTime));
                  }
                  vm.TCIEndDate = this.getDateAfterYear(vm.TCIDate,1);//结束时间
                  if(data.syStartTime){//商业险生效时间
                     vm.VCIDate = vm.formateDate(new Date(data.syStartTime));
                  }
                  vm.VCIEndDate = this.getDateAfterYear(vm.VCIDate,1);//结束时间
                  for(var i=0;i<data.plan.mainItems.length;i++){//主险
                     var obj = {};
                     obj.code = data.plan.mainItems[i].code;
                     obj.name = data.plan.mainItems[i].name;
                     obj.flag = data.plan.mainItems[i].flag;
                     obj.lib = data.plan.mainItems[i].lib;
                     obj.widgetType = data.plan.mainItems[i].widgetType;//widgetType selectValue,selectInput,cbox
                     obj.value = data.plan.mainItems[i].value;
                     if(data.plan.mainItems[i].widgetType=='selectValue'){
                        obj.value = data.plan.mainItems[i].value?data.plan.mainItems[i].value:data.plan.mainItems[i].defaultValue;
                     }else if(data.plan.mainItems[i].widgetType=='cbox'){
                        obj.value = data.plan.mainItems[i].flag?this.comTxt.insured:this.comTxt.unInsured;
                     }else if(data.plan.mainItems[i].widgetType=='ext'){
                        obj.value = data.plan.mainItems[i].value?data.plan.mainItems[i].value:data.plan.mainItems[i].defaultValue;
                     }

                     obj.isNoDeductible = data.plan.mainItems[i].isNoDeductible; //是否有不计免赔
                     obj.deductibleValue = data.plan.mainItems[i].deductibleValue=='true'?true:false; //不计免赔 value
                     obj.deductibleCode = data.plan.mainItems[i].deductibleCode; //不计免赔 险种code

                     obj.relativeCode = data.plan.mainItems[i].relativeCode;//险种依赖
                     obj.readonly = false//readonly
                     vm.mainInsurance.push(obj);
                  }
                  for(var i=0;i<data.plan.extItems.length;i++){//附加险
                     var obj = {};
                     obj.code = data.plan.extItems[i].code;
                     obj.name = data.plan.extItems[i].name;
                     obj.flag = data.plan.extItems[i].flag;
                     obj.lib = data.plan.extItems[i].lib;
                     obj.widgetType = data.plan.extItems[i].widgetType;//widgetType selectValue,selectInput,cbox
                     obj.value = data.plan.extItems[i].value;
                     if(data.plan.extItems[i].widgetType=='selectValue'){
                        obj.value = data.plan.extItems[i].value?data.plan.extItems[i].value:data.plan.extItems[i].defaultValue;
                     }else if(data.plan.extItems[i].widgetType=='cbox'){
                        obj.value = data.plan.extItems[i].flag?this.comTxt.insured:this.comTxt.unInsured;
                     }else if(data.plan.extItems[i].widgetType=='ext'){
                        obj.value = data.plan.extItems[i].value?data.plan.extItems[i].value:data.plan.extItems[i].defaultValue;
                     }

                     obj.isNoDeductible = data.plan.extItems[i].isNoDeductible; //是否有不计免赔
                     obj.deductibleValue = data.plan.extItems[i].deductibleValue=='true'?true:false; //不计免赔 value
                     obj.deductibleCode = data.plan.extItems[i].deductibleCode; //不计免赔 险种code

                     obj.relativeCode = data.plan.extItems[i].relativeCode;//险种依赖
                     obj.readonly = false//readonly
                     vm.additionalInsurance.push(obj);
                  }
                  console.log('mainInsurance',JSON.stringify(vm.mainInsurance));
                  console.log('additionalInsurance',JSON.stringify(vm.additionalInsurance));
               }else{
                  this.showTips = true;
                  this.showTipsMsg = res.body.message;
               }
            }, function(res) {// fail
               this.showTips = true;
               this.showTipsMsg = res.statusText;
            }); //获取方案数据
         },
         clearData(){
            this.tabList =  [];
            this.TCI = true;//交强险
            this.TCIDate =  this.formateDate(new Date());
            this.TCIStartDate = this.formateDate(new Date());//设置开始时间
            this.VCI = false;//商业险
            this.VCIDate =  this.getDateAfterNum(14);
            this.VCIStartDate = this.getDateAfterNum(14);//设置开始时间
            this.allInsurance = [];
            this.mainInsurance = []; // 主险
            this.additionalInsurance = []; // 附加险
         },
         onItemClick (index) {
            this.activeIndex = index;
            this.planCode = this.tabList[index].code;
            this.getDataByCode(this.planCode);
         },
         tips(val){ //提示
            /*this.alertShowFlag = true*/
            this.alertOptoion = val;
            this.showNoScroll = true
         },
         dropDownChange(type,index){
            if(type=='main'){
               var mainCode = this.mainInsurance[index].code,
                  mainValue = this.mainInsurance[index].value;
               if(mainValue==this.comTxt.unInsured){
                  this.changeAddInsurance(mainCode,this.comTxt.unInsured);
                  if(this.mainInsurance[index].isNoDeductible){//不计免赔
                     this.mainInsurance[index].deductibleValue = false;
                  }
               }else{
                  this.changeAddInsurance(mainCode,'');
                  /*if(this.mainInsurance[index].isNoDeductible){//不计免赔
                     this.mainInsurance[index].deductibleValue = true;
                  }*/
               }
            }
            if(type=='add'){
               var addValue = this.additionalInsurance[index].value;
               if(this.additionalInsurance[index].isNoDeductible){//不计免赔
                  if(addValue==this.comTxt.unInsured){
                     this.additionalInsurance[index].deductibleValue = false;
                  }
                  /*else{
                     this.additionalInsurance[index].deductibleValue = true;
                  }*/
               }
            }
            this.$set(this.mainInsurance,0,this.mainInsurance[0]);
         },
         changeAddInsurance(relativeCode,val){
            //console.log('relativeCode',relativeCode);
            for(var i=0;i<this.additionalInsurance.length;i++){
               if(relativeCode==this.additionalInsurance[i].relativeCode){
                  if(val){
                     this.additionalInsurance[i].value = val;
                     this.additionalInsurance[i].readonly = true;
                  }else{
                     this.additionalInsurance[i].readonly = false;
                  }
               }
            }
         },
         generateSaveDate(){//整理保存数据
            var parmas = {};
            parmas.planCode = this.tabList.length>0?this.tabList[this.activeIndex].code:'';
            parmas.hasJq = this.TCI?1:0;
            parmas.hasSy = this.VCI?1:0;
            parmas.jqStartTime = this.TCIDate + " 00:00:00";
            parmas.syStartTime = this.VCIDate + " 00:00:00";
            parmas.jqEndTime = this.TCIEndDate + " 23:59:59";
            parmas.syEndTime = this.VCIEndDate + " 23:59:59";

            var plan = {
               main:[],
               ext:[]
            };
            if(parmas.hasSy){
               //console.log('this.mainInsurance',this.mainInsurance);
               for(var i=0;i<this.mainInsurance.length;i++){
                  var tmp = {
                     code:this.mainInsurance[i].code,
                     name:this.mainInsurance[i].name
                  }
                  tmp.widgetType = this.mainInsurance[i].widgetType;
                  if(this.mainInsurance[i].widgetType=='selectValue'){
                     tmp.value = this.mainInsurance[i].value;
                     tmp.flag = tmp.value!=this.comTxt.unInsured?true:false;
                  }else if(this.mainInsurance[i].widgetType=='cbox'){
                     tmp.value = this.mainInsurance[i].value;
                     tmp.flag = tmp.value!=this.comTxt.unInsured?true:false;
                  }else if(this.mainInsurance[i].widgetType=='ext'){
                     tmp.value = this.mainInsurance[i].value;
                     tmp.flag = tmp.value!=this.comTxt.unInsured?true:false;
                  }
                  tmp.isNoDeductible = this.mainInsurance[i].isNoDeductible;
                  tmp.deductibleCode = this.mainInsurance[i].deductibleCode;
                  tmp.deductibleValue = this.mainInsurance[i].deductibleValue;
                  plan.main.push(tmp);
               }
               for(var i=0;i<this.additionalInsurance.length;i++){
                  var tmp = {
                     code:this.additionalInsurance[i].code,
                     name:this.additionalInsurance[i].name
                  }
                  tmp.widgetType = this.additionalInsurance[i].widgetType;
                  if(this.additionalInsurance[i].widgetType=='selectValue'){
                     tmp.value = this.additionalInsurance[i].value;
                     tmp.flag = tmp.value!=this.comTxt.unInsured?true:false;
                  }else if(this.additionalInsurance[i].widgetType=='cbox'){
                     tmp.value = this.additionalInsurance[i].value;
                     tmp.flag = tmp.value!=this.comTxt.unInsured?true:false;
                  }else if(this.additionalInsurance[i].widgetType=='ext'){
                     tmp.value = this.additionalInsurance[i].value;
                     tmp.flag = tmp.value!=this.comTxt.unInsured?true:false;
                  }
                  tmp.isNoDeductible = this.additionalInsurance[i].isNoDeductible;
                  tmp.deductibleCode = this.additionalInsurance[i].deductibleCode;
                  tmp.deductibleValue = this.additionalInsurance[i].deductibleValue;
                  plan.ext.push(tmp);
               }
            }
            
            parmas.planJson = JSON.stringify(plan);
            //console.log('planJson',parmas.planJson);
            return parmas;
         },
         saveOrUpdatePlan(){//保存
            var parmas = this.generateSaveDate();
            console.log('parmas',JSON.stringify(parmas));
            if(parmas.hasJq!=1&&parmas.hasSy!=1){
               this.showTips = true;
               this.showTipsMsg = '请选择交强险或者商业险';
               return;
            }
            var vm = this;
            //this.isWokDay(parmas.syStartTime,function(){
               //console.log('parmas',parmas);
               //console.log('parmas',JSON.stringify(parmas));
               vm.$http.post(vm.$root.url+"insurace/saveOrUpdateInsurance",parmas).then(function(res) {// success
                  //console.log('res',res);
                  if(res.ok&&res.body.ask==0&&res.body.data){
                     vm.$router.push({path:'/companySelect',query: {}})
                  }else{
                     vm.showTips = true;
                     vm.showTipsMsg = res.body.message;
                  }
               }, function(res) {// fail
                  vm.showTips = true;
                  vm.showTipsMsg = res.statusText;
               });
            //})
         },
         isWokDay(dateStr,callback){
            this.$http.get(this.$root.url+"basedata/isWokDay?day="+dateStr).then(function(res) {// success
               //console.log('res',res);
               if(res.ok&&res.body.ask==0&&res.body.data){
                  callback();
               }else{
                  this.showTips = true;
                  this.showTipsMsg = '商业险生效日期为非工作日';
               }
            }, function(res) {// fail
               this.showTips = true;
               this.showTipsMsg = res.statusText;
            });
         }
      }
   }
</script>

<style lang="less" scoped>
   @import '~vux/src/styles/1px.less';
   @import '~vux/src/styles/center.less';
   input, textarea {-webkit-appearance: none;outline: none;}
   .center_list{margin:auto 3.125% 3.125%;}
   .checklist,.group_switch{margin-top:20px;background:#fff;}
   .checklist .planlist_title{padding:10px 15px 10px 40px;color:#2491FF}
   .checklist .planlist_title .float_rigt{float:right;}
   .checklist .planlist_title:after{clear:both;content: '';display: block;}
   .checklist .planlist_title.xuanze{background:url(../assets/xuanze_icon.png) no-repeat 15px center;background-size:20px 24px;}
   .checklist .planlist_title.fjx{background:url(../assets/fujiaxian_icon.png) no-repeat 15px center;background-size:20px 24px;}
   .checklist .planlist_title.zx{background:url(../assets/zhuxian_icon.png) no-repeat 15px center;background-size:20px 24px;}
   .weui-label i{width:20px;height:20px;display: inline-block;vertical-align: middle;margin-top: -4px;margin-left: 8px;}
   .weui-label i img{width:18px;height:18px;line-height: 20px;;}
   .offerBut{width:60%;margin:auto;padding:25px 0 20px}
   .offerBut .weui-btn_primary {background-color: #2491ff !important;}
   /*主险、商业险自定义*/
   .vux_list_item{padding: 10px 15px;position: relative;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}
   .vux_list_item_txt{padding: 10px 15px;position: relative;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;} 
   .vux_list_item:before,.vux_list_item_txt:before{content:" ";position:absolute;left:15px;top:0;right:0;height:1px;border-top:1px solid #D9D9D9;color:#D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
   .list_item_bd{-webkit-box-flex: 1.5;-ms-flex: 1.5;flex: 1.5;color:#7990a2}
   .list_item_inp{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;color:#7990a2;margin-right:5px;font-size: 0;}
   .list_item_inp input{width:100%;height:25px;border:none;font-size: 14px;color: #434f5d;}
   .list_item_sele{text-align: right;color:#7990a2;}
   .list_item_sele select{width:70px;height:30px;text-align: center;}
   .list_item_sele select option{text-align: center;}
   .list_item_sele .weui-cell:after{display: none;}
   .list_item_text{color: #434f5d;padding-right: 13px;padding-left: 15px;width: 80px;position: relative;}
   .list_item_text:after {content: " ";display: inline-block;height: 6px;width: 6px;border-width: 2px 2px 0 0;border-color: #C8C8CD;border-style: solid;-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);position: relative;top: -2px;position: absolute;top: 50%;right: 2px;margin-top: -4px;}

   .txt-box{font-size: 14px;color: #7990a2;text-align: justify;word-break: break-all;padding: 8px 10px;max-height: 360px;overflow-y: auto;border-bottom: 1px solid #eee;}
   .txt-box .txt-p1{text-indent: 1rem;}
   .txt-box .txt-p2{text-indent: 1.4rem;}
   .swiper-box{font-size: 14px;color: #7990a2;text-align: justify;word-break: break-all;padding: 8px 10px;max-height: 360px;overflow-y: auto;border-bottom: 1px solid #eee;}
   .swiper-box p{color: #7990a2;}
   .swiper-box .s-txt-box{height: 190px;overflow-y:auto;}
   .swiper-box .s-txt-p1{font-size: 14px;color: #2491ff;font-weight: bold;}
   .swiper-box .s-txt-p1 span{font-weight: normal;font-size: 14px;}
   .swiper-box .s-txt-p2{text-indent: 1rem;}

   .checkbox-wrap{-webkit-box-flex: 1;-ms-flex: 1;flex: 1;}
   .checkbox-wrap .weui-check{}
   .checkbox-wrap .weui-icon-success{color: #2491ff;}
   .checkbox-wrap span{font-size: 14px;vertical-align: middle;color: #434f5d;}
</style>
<style>
	.switchs .weui-switch:checked{border-color: #2491ff; background-color: #2491ff;}
	.checklist .weui-cell:before{border-top:none;}
   .checklist .weui-cell:after{content: " ";position: absolute; left: 15px;bottom: 0;right: 15px;height: 1px;border-bottom: 1px solid #D9D9D9;color: #D9D9D9;-webkit-transform-origin: 0 0;transform-origin: 0 0; -webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
	.switchs .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {color: #2491ff;}
	.checklist .weui-cells:before{left:15px;right:15px;}
	.checklist .weui-cells:after{border-bottom:none;}
   .checklist .weui-cell{padding-top: 0;padding-bottom:0; }
	.alerts .weui-dialog__btn_primary{color: #2491ff;}
	.confm .weui-dialog__bd{max-height:250px;overflow:scroll;padding: 0 0.8em 0.8em}
	.confm .weui-cells:before,.confm .weui-cells:after{border:none;}
   .weui-cells{font-size: 14px;}
   .weui-cells_checkbox > label > .weui-cell__bd > p{text-align: left;font-size: 16px;}
   .weui-cells_checkbox .weui-icon-checked:before{font-size: 18px;}
   .list_item_sele .weui-select{height: auto;line-height:1;color: #434f5d;padding-right: 13px;padding-left: 0;}
   .list_item_sele .weui-cell__bd:after{right: 2px;}
   .vux-datetime p{color: #7990a2;}
   .vux-datetime-value{color: #434f5d;}
   .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{border-color: #2491ff;background-color: #2491ff;}
   .swiper-box .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{right: 0;bottom: 0;}
   .swiper-box+.txt-bot,.txt-box+.txt-bot{padding: 4px 0;font-size: 16px;}
   .swiper-box a > .vux-icon-dot.active{background-color: #2491ff !important;}

   .alLists{font-size: 15px;}
   .alLists .weui-icon-circle{font-size: 15px;margin-right: 2px;}
   .alLists .weui-icon-success{font-size: 15px;margin-right: 2px;}
   .alLists [class^="weui-icon-"]:before,.alLists [class*=" weui-icon-"]:before{margin:0;}
   .alLists .vux-check-icon > .weui-icon-success:before,.alLists .vux-check-icon > .weui-icon-success-circle:before{color: #2491ff;}
   .alLists .vux-check-icon span{font-size: 14px;vertical-align: middle;color: #434f5d;}
   .center_list .vux-label{color: #7990a2;}
</style>