<template>
	<div ref="package_list">
		<div v-title :data-title="$store.state.order_title" v-if="$store.state.order_title">{{$store.state.order_title}}</div>
		<order-header :text="$store.state.order_title"></order-header>
		<!--<div class="teacher-main">
			<header class="header">
				<span @click="goBack" class="btnGo"></span>
				全部订单
			</header>
		</div>-->
		<div class="nav-wrap">
			<ul class="nav">
				<li class="fl" v-for="(name,index) in datas.name" :key="name.id" :class="{active:isactive == index}" @click="addClass(index,'click')"><span>{{name}}</span></li>
			</ul>
		</div>
    <div class="detail-list">
			<div class="detail">
        <div>
					<p>支付宝</p>
					<p>待审核</p>
				</div>
				<div>
					<p>金额:<span>10</span>元</p>
					<p>2018-10-22</p>
				</div>
			</div>
			<div class="detail">
        <div>
					<p>银行卡</p>
					<p>已完成</p>
				</div>
				<div>
					<p>金额:<span>10</span>元</p>
					<p>2018-10-22</p>
				</div>
			</div>		
    </div>
    <div class="comm-null" v-if="no_data">
				<div class="con-wrap text-center">
					<img src="../../assets/null_com.png">
					<p>暂时没有数据</p>
				</div>
			</div>
		
		<div class="up-warp" v-show="load_show">
			<p class="rotate"></p>
			<p class="load-title">加载中..</p>
		</div>
		<div class="no-data" v-show="sliding_no_data">暂无更多数据~</div>
		<to-top></to-top>
		<Shopsn></Shopsn>
		<!--<div class="load" v-show="$store.state.order_load"  @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>-->
		<!--<div class="load-wrap" v-show="$store.state.order_load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>-->
	</div>
</template>
<script>
	import orderHeader from '@/components/page/children/header.vue';
	import { MessageBox, Toast } from 'mint-ui';
	import Shopsn from '@/components/page/Shopsn.vue';
	import toTop from '@/components/page/toTop.vue';
	import qs from 'qs';
	export default {
		name: 'orderNav',
		data() {
			return {
				datas: {
					name: ['全部','待审核','待打款','已打款','无效']
				},
				slide_switch: false, //避免多次下拉
				load_show:false, //滚动动画
				roll_switch:true, //触发下拉加载开关
				no_data:false, //第一次没数据时的样式
				sliding_no_data:false, //下拉没数据时的样式
				isactive: '',
				order: [],
				page:1,
				order_status:['全部','待审核','待打款','已打款','无效']
			}
		},
		components: {
			orderHeader,
			Shopsn,
			toTop
		},
		mounted() {
			this.$store.state.order_title = '提现明细';
			let _this = this;
			window.addEventListener('scroll',function(){ 
				if(!_this.$refs.package_list) return;
				if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) { 
					//如果第一次请求没数据或数据没达到每页个数就不会再请求数据
					if(_this.roll_switch == false){
						return;
					}
					if(_this.slide_switch == true){
						_this.slide_switch = false;
						_this.page++;
					}
				}
			})
		},
		methods: {
			//请求成功后的操作
      returnOperation(data){
				if(data.length < 10 && this.page == 1){ //第一次请求成功如果数据没达到每页页数就禁止下拉
					this.load_show = false; //动画隐藏
					this.roll_switch = false; //禁止下拉加载
				}
				for (let index = 0; index < data.length; index++) {
                    this.order.push(data[index]);
				}
				this.slide_switch = true;
			},
			//请求后返回不同状态时的处理
			stateHandling(status,data){
				this.sw = true;
				if(status == 10001) {
					this.$router.push('/LogIn');
				}else if(status == 1){ //成功后的处理
					this.returnOperation(data);
				}else if(status == 0 && this.page == 1) { //第一次请求失败时
					this.no_data = true; //无数据时的样式
					this.load_show = false; //动画隐藏
					this.roll_switch = false; //禁止下拉加载
				}else{ //第二次或更多次无数据时
					this.sliding_no_data = true; //无数据时的样式
					this.load_show = false; //动画隐藏
					this.roll_switch = false; //禁止下拉加载
				}
			},
			addClass(index,trigger) {
				if(trigger == 'click'){
					this.order = [];
					this.load_show = true
					this.page = 1;
					this.no_data = false;
					this.sliding_no_data = false;
				}
				if(this.sw == true){
					this.sw = false;
				}else{
					return;
				}
				this.roll_switch = true;
				this.isactive = index;
				if(index == 0) {
					this.$store.state.order_title = '分销全部订单'; +
							this.axios.post(this.$httpConfig.orderListAll, qs.stringify({
								page:this.page
							})).then((res) => {
								this.stateHandling(res.data.status,res.data.data.list);
							}).catch((err) => {
								console.log(err);
							});
				} else if(index == 1) {
					this.$store.state.order_title = '分销待付款订单';
					this.axios.post(this.$httpConfig.pendingPayment,qs.stringify({
						page:this.page
					})).then((res) => {
						this.stateHandling(res.data.status,res.data.data.list);
					}).catch((err) => {
						console.log(err);
					});
				} else if(index == 2) {
					this.$store.state.order_title = '分销待发货订单';
					this.axios.post(this.$httpConfig.pendingDelivery,qs.stringify({
						page:this.page
					})).then((res) => {
						this.stateHandling(res.data.status,res.data.data.list);
					}).catch((err) => {
						console.log(err);
					});
				} else if(index == 3) {
					this.$store.state.order_title = '分销待收货订单';
					this.axios.post(this.$httpConfig.goodsToBeReceived,qs.stringify({
						page:this.page
					})).then((res) => {
						this.stateHandling(res.data.status,res.data.data.list);
					}).catch((err) => {
						console.log(err);
					});
				} else if(index == 4) {
					this.$store.state.order_title = '分销已完成订单';
					this.axios.post(this.$httpConfig.completed,qs.stringify({
						page:this.page
					})).then((res) => {
						this.stateHandling(res.data.status,res.data.data.list);
					}).catch((err) => {
						console.log(err);
					});
				} else if(index == 5) {
					this.$store.state.order_title = '分销已取消订单';
					this.axios.post(this.$httpConfig.haveBeenCancelled,qs.stringify({
						page:this.page
					})).then((res) => {
						this.stateHandling(res.data.status,res.data.data.list);
					}).catch((err) => {
						console.log(err);
					});
				} else if(index == 6) {
					this.$store.state.order_title = '分销待评论订单';
					this.axios.post(this.$httpConfig.toBeEvaluated,qs.stringify({
						page:this.page
					})).then((res) => {
						this.stateHandling(res.data.status,res.data.data.list);
					}).catch((err) => {
						console.log(err);
					});
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.teacher-main {
		.header {
			width: 100%;
			height: .62rem;
			background: #d02629;
			padding: .16rem 0;
			text-align: center;
			position: relative;
			color: #fff;
			font-size: .36rem;
			font-weight: bold;
			line-height: .62rem;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1;
			.btnGo {
				position: absolute;
				left: .2rem;
				top: 50%;
				margin-top: -0.23rem;
				width: .46rem;
				height: .46rem;
				background: url('../../assets/btn-return.png') no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.detail-list {
		background: #fff;
		.detail{
			padding:.2rem;
			border-bottom:1px solid #e3e3e3;
			>div{
				display: flex;
				justify-content: space-between;
			}
			>div:nth-child(1){
				margin-bottom: .15rem;
				>p{
					font-size: .33rem;
				}
				>p:nth-child(2){
					color:#d02629;
				}
			}
			>div:nth-child(2){
				>p{
					font-size: .3rem;
					span{
						color:#ff0000;
						font-size: .3rem;
					}
				}
				>p:nth-child(2){
					color:#999;
					font-size: .2rem;
				}
			}
		}	
	}
	.nav-wrap {
		width: 100%;
		overflow-x: auto;
		background: #fff;
		.nav {
			width: 8.85rem;
			height: .94rem;
			border-bottom: 1px solid #dfdfdd;
			li {
				width: 1.77rem;
				height: 100%;
				text-align: center;
				overflow: hidden;
				box-sizing: border-box;
				span {
					display: block;
					color: #676767;
					font-size: .3rem;
					line-height: .54rem;
					height: .54rem;
					margin: .2rem 0;
					border-right: 1px solid #dfdfdd;
				}
			}
			li:last-child span {
				border-right: 0;
			}
			li.active {
				border-bottom: 3px solid #fd4f4b;
				span {
					color: #ff781a;
				}
			}
		}
  }
	.up-warp{
        height:.5rem;
		padding: .3rem 0;
		text-align: center;
		p{
			display: inline-block;
			vertical-align: middle;
		}
		.rotate{
			width: 16px;
			height: 16px;
			border-radius: 50%;
			border: 1px solid gray;
			margin-right: 6px;
			border-bottom-color: transparent;
		}
		.rotate{
			-webkit-animation:rotate .6s linear infinite;
			animation:rotate .6s linear infinite
		}
		.comm-null{
			padding-top:.5rem;
		}
		@-webkit-keyframes rotate{
			0%{
				-webkit-transform:rotate(0deg)
				}
			100%{
				-webkit-transform:rotate(360deg)
				}
			}
		@keyframes rotate{
			0%{
				transform:rotate(0deg)
			}
			100%{
				transform:rotate(360deg)
			}
		}
		.load-title{
			font-size: 12px;
    		color: gray;
		}
	}
	.no-data{
        background-color:#fff;
        height: .5rem;
        padding: .3rem 0;
        text-align: center;
        font-size: 12px;
        color: gray;
		}
		.comm-null{
			padding-top: .5rem;
		}
	
</style>