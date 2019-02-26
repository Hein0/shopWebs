<template>
	<div class="iframe-wrap">
		<iframe :src="pingAnURL" frameborder="0"></iframe>
	</div>
</template>

<script>
    export default {
    	data () {
		    return {
		    	tempUserId:'',
		    	pingAnURL: '',
		    }
		},
		created(){
			this.tempUserId = this.$route.query.tempUserId ? this.$route.query.tempUserId : '';
			let type = this.$route.query.type ? this.$route.query.type : '';
			if(type==1){
				this.pingAnURL = this.$root.pingAnURL_VCI + '?userId=' + this.tempUserId;
			}else if(type==2){
				this.pingAnURL = '#/pinganViewTest' + '?userId=' + this.tempUserId;
			}
		},
	    mounted(){

		},
   }
</script>

<style lang="less" scoped>
    .iframe-wrap {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		top: 0;
		-webkit-overflow-scrolling: touch;
		overflow-y: scroll;
	}
	.iframe-wrap iframe {
		height: 100%;
		width: 100%;
	}
</style>
