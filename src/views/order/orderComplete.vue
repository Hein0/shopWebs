<template>
  <div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>保险期限</div>
          <div></div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>交强险保障生效期</div>
          <div>2017-06-06</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>商业险保障生效期</div>
          <div>2017-06-06</div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>交强险报价</div>
          <div>保费(元)</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>交强险</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车船税代缴</div>
          <div>￥500.00</div>
        </div>
        <div class="fbox cols">
          <div>交强险总计保费：<span class="red">￥1000.00</span></div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>商业险报价(保额)</div>
          <div>保费(元)</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车辆损失险(20万)</div>
          <div>￥1000.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>商业第三者责任险(50万)</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>司机座位责任险(5万)</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车身划痕损失险</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>全车盗抢险</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>不计免赔(车身划痕损失险)</div>
          <div>￥500.00</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>不计免赔(商业第三者责任险)</div>
          <div>￥500.00</div>
        </div>
        <div class="fbox cols">
          <div>交强险总计保费：<span class="red">￥1000.00</span></div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>投保信息</div>
          <div></div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保公司</div>
          <div>安盛天平</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保城市</div>
          <div>广东省深圳市</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车辆信息</div>
          <div>奥迪A4</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>被保人</div>
          <div>同车主
            <icon type="success"></icon>
          </div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保人</div>
          <div>同被保人
            <icon type="success"></icon>
          </div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>车主身份证号码</div>
          <div>342201198612121000</div>
        </div>
      </div>

      <div class="group">
        <div class="th fbox scaleblock one_px_border_b">
          <div>收件人信息</div>
          <div></div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>收件人</div>
          <div>张三,13333333333,广东省深圳市福田区莲花村3号</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>递送日期</div>
          <div>2017-5-12</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>是否需要发票</div>
          <div>需要电子发票</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>发票抬头</div>
          <div>个人</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>订单编号</div>
          <div>100000000012</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>投保时间</div>
          <div>2017-05-01 12:12:12</div>
        </div>
        <div class="tr fbox scaleblock one_px_border_b">
          <div>备注</div>
          <div>xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxx</div>
        </div>
        <div class="fbox cols">
          <div class="tip1">注意：商业险分期保单寄送到佰仟，用户可查看电子保单照片。</div>
        </div>
      </div>
  </div>
</template>


<script>
  import { Icon} from 'vux'
  import btn3 from '../widget/buttom-3'
  export default {
    components: {
      Icon,
      'btn3': btn3
    },
    data () {
      return {
        step1: 1,
        step2: 0
      }
    },
    methods: {
      nextStep () {
        this.step2 ++
      }
    },
    created () {
      this.$parent.init();
    }
  }
</script>

<style scoped>
  .div0{background: #fff;}
  .div1{width:70%;margin:0 auto;padding:30px 0 20px;}
  .div2{width:100%;margin:0 auto 10px;padding-bottom: 20px;}
  .txt{font-size:16px;text-align:center;color:#3c444d;padding:0 15px}
  .red{font-size:17px;}

  .fbox {
    display: flex;
    font-size: 15px;
    align-items: center;
    -webkit-align-items: center;
  }
  .fbox.scaleblock>div:last-child{
    flex: 1;
  }
  .group {
    margin: 10px 10px 0 10px;
    padding: 0 10px 10px 10px;
    background: #fff;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .1);
  }
  .group:last-child{margin-bottom: 15px;}

  .th {
    font-size: 18px;

  }

  .th > div:first-child {
    position: relative;
    text-indent: 1em;
    color: #0b92f1!important;
  }
  .th > div:first-child:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 15px;
    width: .2em;
    height: 1em;
    background: #0b92f1;
  }
  .th > div:last-child {
    color: #0b92f1!important;
  }
  .th > div:first-child, .tr > div:first-child {
    text-align: left;
    padding: 10px 0;
    color: #7990a2;
  }

  .th > div:last-child, .tr > div:last-child {
    text-align: right;
    color: #434f5d;
  }
  .cols > div {
    width: 100%;
    text-align: right;
    padding: 10px 0;
    color: #7990a2;
  }
  .tip1{font-size:13px;text-align: left!important;color:red!important;}
  .weui-icon-success {
    color: #2491ff
  }
</style>
