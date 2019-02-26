import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    name:'132xxx',
    showTabbar:{
        flag:false, //是否显示底部菜单
        index:0, //选中
        topbar:false,//顶部返回菜单
    },
    loginBackUrl:{
        path:'/',
        query: {}
    },
    recommenderCode:'',
    identutyFlag:false,//展示身份证信息
    bankInfoFlag:false,//展示银行卡信息
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    UPDATE_PAGE(state,payload) {
        state.name = payload.name
    },
    setShowTabbar(state,obj){//跳转菜单路由
        state.showTabbar = obj;
    },
    setLoginBackUrl(state,urlObj){//登录成功 回调url
        state.loginBackUrl = urlObj;
    },
    //设置邀请码
    SET_RECOMMENDER_CODE(state,flag){
      state.recommenderCode = flag;
    },
    setIdentutyFlag(state,flag){//展示身份证信息
        state.identutyFlag = flag;
    },
    setBankInfoFlag(state,flag){//展示银行卡信息
        state.bankInfoFlag = flag;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
