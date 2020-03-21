<template>
	<div ref="search_list">
		<div v-title data-title="商品列表">商品列表</div>
		<list-header :sea="search" v-on:child-say="submit"></list-header>
		<!-- <div class="tabbaby">
	            <div v-for="(item, index) in tabName" :key="index" @click="activeClick(index)" :class="{active:index == num}"> {{item}}</div>
	        </div> -->
		<ul class="sort-wrap clearfix text-center">
			<li class="fl" :class="{active:sortField == 'sales_sum'}" @click="sort('xl')">销量
				<span class="icon">
						<em class="bottom" :class="{active:sort_id == 1}"></em><br>
						<em class="top" :class="{active:sort_id == 2}"></em>
					</span>
			</li>
			<li class="fl" :class="{active:sortField == 'price_member'}" @click="sort('jg')">价格
				<span class="icon">
						<em class="top" :class="{active:sort_id == 3}"></em><br>
						<em class="bottom" :class="{active:sort_id == 4}"></em>
					</span>
			</li>
			<!--			<li class="fl" @click="sort('rq')" :class="{active:sortField == 5}">人气</li>-->
			<!--			<li class="fl" @click="sort('dp')" :class="{active:sortField == 6}">店铺</li>-->
			<li class="fl">标示
				<img class="sort_img" :src="sortTop" @click="addTransition" v-show="!sta">
				<img class="sort_img" :src="sortActiveBottom" @click="addTransition" v-show="sta">
			</li>
		</ul>

		<transition name="transition">
			<div class="transition_div" v-show="sta">
				<div class="transition_text">
					<img  class="transition_img" src="../../assets/check.png">
<!--					<p v-for="d in dabType" @click="addClass('', d.id)">-->
<!--						{{d.type}}-->
<!--					</p>-->
					<p class="organic">有机</p>
					<p class="inorganic">无机</p>
				</div>
				<div class="transition_btn">
					<span class="transition_btn1">重置</span>
					<span class="transition_btn2">确定</span>
				</div>
			</div>
		</transition>

		<!--		<div class="category">-->
		<!--			<swiper :options="swiper_category">-->
		<!--				<swiper-slide v-for="(item,index) in nav" :key="index"-->
		<!--							  @click.native="active = item.id; classActive(index)"-->
		<!--							  class="title"-->
		<!--							  :class="active_color === index ? 'green' : ''"-->
		<!--				>-->
		<!--					{{item.title}}-->
		<!--					<img class="sort-bottom" v-if="active_color === index ? 'green' : ''" :src="sortTop" alt="" v-show="show">-->
		<!--					<img class="sort-bottom" v-else :src="sortBottom">-->
		<!--					<img class="sort-bottom" v-if="active_color === index ? 'green' : ''" :src="sortBottom" alt="" v-show="!show">-->
		<!--				</swiper-slide>-->
		<!--			</swiper>-->
		<!--		</div>-->

		<mt-tab-container class="tab-container" v-model="active" v-show="show">
			<mt-tab-container-item
			>
				<!--				<div class="select-category">{{item.title}}</div>-->

				<div class="inputGroup" v-for="(item,i) in choice" :key="i">
					<input :id="item.id" name="radio" type="radio"/>
					<label :for="item.id">
						<div class="fl pull-right">
							<h6 class="title">{{item.name}}</h6>
						</div>
					</label>
				</div>
				<div class="save-btn">
					<button class="calcle">重置</button>
					<button class="save">确认</button>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>

		<ul class="list-wrap" v-if="sortField != 6">
			<li class="clearfix" v-for="(item,index) in search_data" :key="index" @click="tolink(item.id)">
				<img :src="URL + item.pic_url" class="fl">
				<div class="list-text fl">
					<p class="text">{{item.title}}</p>
					<p class="new-price">
						<button class="btn-orgnic">有机</button>
						<span>￥{{item.goods_price || item.price_market|| item.price_member}}</span>
						<img src="../../assets/bascked.png" class="basked-img">
					</p>
					<p class="status">
						<span>已有{{item.comment_member}}条评论</span>
						<span>{{item.sales_sum}}笔交易成功</span>
					</p>
				</div>
			</li>
		</ul>
		<shop-list v-if="sortField == 6 && search_type != 'goods'" :shoplist="search_data"></shop-list>
		<div v-show="search_data.length ==0 && sortField != 6" class="comm-null">
			<div class="con-wrap text-center">
				<img src="../../assets/null_com.png">
				<p>暂无商品</p>
			</div>
		</div>
		<div v-show="search_type != 'store' && sortField == 6" class="comm-null">
			<div class="con-wrap text-center">
				<img src="../../assets/null_com.png">
				<p>没有搜索到店铺哦，请搜索商品看看~</p>
			</div>
		</div>
		<Shopsn></Shopsn>
		<to-top></to-top>
		<div class="load" v-show="load" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>

		<div class="load-wrap" v-show="load_wrap" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>
	</div>
</template>

<script>
	import listHeader from '@/components/page/children/header.vue';
	import shopList from '@/components/shopCon/child/shoplist.vue'; //店铺列表样式
	import { Tabbar, TabItem } from 'mint-ui';
	import qs from 'qs';
	import {
		Toast
	} from 'mint-ui';
	import toTop from '@/components/page/toTop.vue';
	import Shopsn from '@/components/page/Shopsn.vue';
	import sortBottom from '../../assets/sort-bottom.png';
	import sortTop from '../../assets/sort-top.png'
	import sortActiveBottom from '../../assets/sort-bottom-active.png'
	export default {
		name: 'list',
		data() {
			return {
				sta:false,
				sortBottom: sortBottom,
				sortTop: sortTop,
				sortActiveBottom: sortActiveBottom,
				nav:[
					{title: '物流'},
					{title: '新品'},
					{title: '品牌'},
					{title: '新品'},
					{title: '物流'},
				],
				choice:[
					{id:1, name:'支付宝'},
					{id:2, name:'微信支付'},
					{id:3, name:'支付宝'},
					{id:4, name:'微信支付'},
					{id:5, name:'支付宝'},
					{id:6, name:'微信支付'},
					{id:7, name:'微信支付'},
					{id:8, name:'支付宝'},
					{id:9, name:'微信支付'},
					{id:10, name:'支付宝'},
				],
				tabName: ["宝贝", "店铺"],
				logoImg: require('@/assets/btn-return.png'),
				status: [true, false, false],
				search: true,
				sort_id: 1,
				sort_status: null,
				load: false,
				scrollWatch: true,
				load_wrap: true,
				search_data: [],
				active: '',
				msg: '',
				api_url: '',
				num: 0,
				sortField: 'sales_sum',
				search_type: 'goods',
				currentPage: 1,
				isBottom: false,
				isEnd: false,
				type:null,//判断是否为二级分类
				swiper_category: {
					slidesPerView: 4,
					spaceBetween:18
				},
				active_color: null,
				show: false,
				index: null
			}
		},
		created() {
			this.type = this.$route.query.type;
			console.log(this.type);
			this.$store.state.search_value = '';
			if (this.$route.params.status == 'search') {
				this.api_url = this.$httpConfig.keyWordSearch;
			} else {
				this.api_url = this.$httpConfig.getAllGoods;
			}
			this.sort();
		},
		mounted() {
			var that = this;
			$(window).scroll(function() {
				if (!that.$refs.search_list) return;
				var bot = document.body.clientHeight;
				if (that.isBottom == false && bot + $(window).scrollTop() >= $(".list-wrap")[0].clientHeight) {
					that.isBottom = true;
					if (that.isEnd) {
						that.currentPage++;
						that.sort();
					}
				}
			});
		},
		methods: {
			addTransition(){
				this.sta = !this.sta;
			},
			classActive(index){
				this.active_color = index
				if (index === this.index){
					this.show = !this.show
				}
				else{
					this.index = index
					this.show = true
				}
			},
			submit(search_data) {
				this.sortField = 'sales_sum';
				this.isBottom = false;
				this.isEnd = true;
				this.sort_id = 1;
				this.currentPage = 1;
				this.search_data = search_data;
			},
			activeClick(index) {
				this.num = index
			},
			toback: function() {
				this.$router.go(-1);
			},
			addClass: function(index) {
				for (var i = 0; i < this.status.length; i++) {
					this.$set(this.status, i, false);
				}
				this.$set(this.status, index, true);
			},
			sort(index) {
				this.isEnd = true;
				switch (index) {
					case 'xl':
						this.currentPage = 1;
						this.search_data = [];
						this.sortField = 'sales_sum';
						if (this.sort_id != 1) {
							this.sort_id = 1;
							this.sort_status = "asc";
						} else {
							this.sort_id = 2;
							this.sort_status = 'desc';
						}
						this.load = true;
						break;
					case 'jg':
						this.currentPage = 1;
						this.search_data = [];
						this.sortField = 'price_member';
						if (this.sort_id != 3) {
							this.sort_id = 3;
							this.sort_status = "asc";
						} else {
							this.sort_id = 4;
							this.sort_status = 'desc';
						}
						this.load = true;
						break;
					case 'rq':
						this.currentPage = 1;
						this.search_data = [];
						// if(this.sortField == 5) return;
						this.sortField = 5;
						this.sort_status = '';
						this.load = true;
						break;
					case 'dp':
						this.currentPage = 1;
						this.search_data = [];
						if (this.sortField == 6) return;
						this.sortField = 6;
						break;
				}
				if (!this.$store.state.search_value == '' || this.$route.params.status == 'search') {
					this.api_url = this.$httpConfig.keyWordSearch;
					let value = '';
					if (this.$store.state.search_value) {
						value = this.$store.state.search_value;
					} else {
						value = this.$route.params.id;
					}
					this.axios.get(this.api_url, {
						params: {
							keyword: value,
							sort: this.sort_id,
							page: this.currentPage
						}
					}).then((res) => {
						if (res.data.status) {
							if (res.data.msg === '没有找到此商品') {
								this.msg = res.data.msg;
							}
							if (res.data.data.flag == 'store') {
								this.search_type = 'store';
								this.sort('dp');
							} else {
								this.search_type = 'goods';
							}
							var list = res.data.data.data;
							for (var i in list) {
								this.search_data.push(list[i]);
							}

							this.isEnd = true;
						} else {
							this.isEnd = false;
						}
						this.isBottom = false;
						this.load = false;
						this.load_wrap = false;
					}).catch((err) => {
						console.info('FailtrueErr', err);
					});
				} else if(this.type!=undefined){//二级分类查询
					console.log('二级分类');
					this.axios.get(this.api_url, {
						params: {
							page: this.currentPage,
							class_two: this.$route.params.status,
							sort_type: this.sort_status,
							sort_field: this.sortField
						}
					}).then((res) => {
						if (res.data.status != 1) {
							this.isEnd = false;
							this.msg = res.data.message;
						} else {
							var list = res.data.data.records;
							for (var i in list) {
								this.search_data.push(list[i]);
							}
							this.isEnd = true;
						}
						this.isBottom = false;
						this.load = false;
						this.load_wrap = false;
					}).catch((err) => {
						console.log(err);
					});
				} else {
					//分类进来,三级分类查询
					this.axios.get(this.api_url, {
						params: {
							page: this.currentPage,
							class_three: this.$route.params.status,
							sort_type: this.sort_status,
							sort_field: this.sortField
						}
					}).then((res) => {
						if (res.data.status != 1) {
							this.isEnd = false;
							this.msg = res.data.message;
						} else {
							var list = res.data.data.records;
							for (var i in list) {
								this.search_data.push(list[i]);
							}
							this.isEnd = true;
						}
						this.isBottom = false;
						this.load = false;
						this.load_wrap = false;
					}).catch((err) => {
						console.log(err);
					});
				}
				console.log(this.isEnd)
			},
			tolink(id) {
				this.$router.push({
					name: 'AddtoCart',
					params: {
						id: id,
						status: 1
					}
				});
			},
		},
		components: {
			listHeader,
			Shopsn,
			toTop,
			shopList
		}
	}
</script>

<style lang="less" scoped>
	.green{
		color: #d02629;
	}
	// tab切换
	.tabbaby {
		background: #fff;
		height: .85rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1/100rem solid #cbcbcb;
		div {
			font-size: 30/100rem;
			width: 275/100rem;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 50/100rem;
		}
		.active {
			border-bottom: 3/100rem solid #d02629;
			color: #d02629;
		}
	}

	.comm-null {
		padding-top: .5rem;
		p {
			font-size: .28rem;
			color: #666;
			padding-top: .2rem;
		}
	}

	.sort-wrap {
		height: .9rem;
		background: #fff;
		box-sizing: border-box;
		padding: .2rem 0;
		margin-bottom: .2rem;
		/*border-bottom: 1px solid #cbcbcb;*/
		line-height: .5rem;
		li {
			/*border-right: 1px solid #cbcbcb;*/
			box-sizing: border-box;
			width: 33%;
			font-size: .3rem;
			color: #666;
			position: relative;
			.sort_img {
				width: .14rem;
				height: .08rem;
				padding: .16rem 0 0 .05rem;
			}
			.icon {
				position: absolute;
				left: 1.6rem;
				top: 0;
				height: 100%;
				.top {
					position: absolute;
					left: 0;
					top: .17rem;
					width: .12rem;
					height: .06rem;
					background: url(../../assets/sort-top.png);
					background-size: 100% 100%;
				}
				.top.active {
					background: url(../../assets/sort-top-active.png);
					background-size: 100% 100%;
				}
				.bottom {
					position: absolute;
					left: 0;
					bottom: .17rem;
					width: .12rem;
					height: .06rem;
					background: url(../../assets/sort-bottom.png);
					background-size: 100% 100%;
				}
				.bottom.active {
					background: url(../../assets/sort-bottom-active.png);
					background-size: 100% 100%;
				}
			}
		}
		li:nth-child(4) {
			border-right: 0;
		}
		li.active {
			color: #d02629;
		}
	}

	.transition_div {
		width: 100%;
		height: 115%;
		background: #101010ba;
		position: absolute;
		top: 2rem;
		.transition_text {
			background: #F2F2F2;
			display: flex;
			padding: .5rem;
			img {
				width: .4rem;
				height: .3rem;
				padding: 0 .4rem 0 .2rem;
			}
			.organic {
				padding: 0 .4rem;
				font-size: .28rem;
				color: #000;
			}
			.inorganic{
				padding: 0 .4rem;
				font-size: .28rem;
				color: #000;
				margin: 0 0 0 2rem;
			}
		}

	}
	.transition_btn {
		display: flex;
		.transition_btn1 {
			background: #fff;
			font-size: .3rem;
			color: #000;
			text-align: center;
			padding: .4rem 1.575rem;
			border-bottom-left-radius: .25rem;
		}
		.transition_btn2 {
			background-image: linear-gradient(to right, #ff9000, #ff8200, #ff7300, #ff6300, #ff5000);
			font-size: .3rem;
			color: #fff;
			text-align: center;
			padding: .4rem 1.575rem;
			border-bottom-right-radius: .25rem;
		}
	}

	.list-wrap {
		background: #fff;
		li {
			padding: .13rem;
			border-bottom: 1px solid #cbcbcb;
			img {
				width: 2.2rem;
				height: 2.2rem;
			}
			.list-text {
				width: 4.7rem;
				padding-left: .25rem;
				.text {
					font-size: .32rem;
					color: #333;
					line-height: .45rem;
					padding-top: .1rem;
					height: .9rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.new-price {
					font-size: .32rem;
					color: #f23030;
					padding-top: .3rem;
					.btn-orgnic{
						font-size: .3rem;
						color: #00C65D;
						background-color: #ffffff;
						border: .02rem solid #00C65D;
						padding: 0 .15rem .03rem .15rem;
						border-radius: .1rem;
					}
					span {
						font-size: .35rem;
						margin-left: .1rem;
					}
					.basked-img{
						width: .8rem;
						height: .8rem;
						margin: -.15rem 0 0 .7rem;
					}
				}
				.status {
					color: #BBBBBB;
					padding: .1rem 1rem .2rem 0;
					width: 3.7rem;
					span {
						font-size: .28rem;
					}
					span:nth-child(2) {
						padding-left: .3rem;
					}
				}
			}
		}
	}

	.category{
		height: 1rem;
		background: #fff;
		.title{
			/*font-size: .3rem;*/
			/*margin: .2rem;*/
			font-size: .3rem;
			margin: .2rem;
			width: 2rem;
			height: .6rem;
			background-color: #f1f1f1;
			text-align: center;
			padding-top: .1rem;
		}
		.sort-bottom {
			width: .2rem;
			height: .12rem;
			margin-top: .15rem;
		}
	}
	.tab-container{
		/*background-color: #fff;*/
		position: absolute;
		background: #101010ba;
		height: 100%;

		.mint-tab-container-item {
			background: #fff;
		}

		.inputGroup {
			display: block;
			position: relative;
			border-top: .03rem solid #f1f1f1;
			/*padding: .15rem;*/
			padding: .05rem .15rem .2rem .15rem;
			width: 46%;
			float: left;

			label {
				padding: 0;
				width: 100%;
				display: block;
				/*text-align: left;*/
				color: #3C454C;
				/*background: red;*/
				cursor: pointer;
				position: relative;
				z-index: 2;
				transition: color 200ms ease-in;
				overflow: hidden;
				margin-top: .08rem;

				&:before {
					width: 1rem;
					height: 1rem;
					margin: .9rem;
					content: '';
					background-color: red;
					/*position: absolute;*/

					transform: translate(-50%, -50%) scale3d(1, 1, 1);
					transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
					opacity: 0;
					/*z-index: -1;*/
				}

				&:after {
					width: .4rem;
					height: .4rem;
					content: '';
					border: 0.04rem solid #D1D7DC;
					background-color: #fff;
					background-image: url("data:image/svg+xml,%3Csvg width='20%' height='20%' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
					background-repeat: no-repeat;
					background-position: 0.04rem 0.06rem;
					border-radius: 50%;
					z-index: 2;
					position: absolute;
					left: 0.1rem;
					top: .2rem;
					transform: translateY(-50%);
					cursor: pointer;
					transition: all 200ms ease-in;
					margin: .2rem 0 0 0;
				}
			}

			input:checked ~ label {
				color: #fff;

				&:before {
					transform: translate(-50%, -50%) scale3d(56, 56, 1);
					opacity: 1;
				}

				&:after {
					background-color: #d02629;
					border-color: #d02629;
				}
			}

			input {
				order: 1;
				z-index: 2;
				transform: translateY(-50%);
				cursor: pointer;
				visibility: hidden;
			}
			.pull-right {
				padding: .15rem .3rem .2rem 1rem;
				.title {
					font-size: .28rem;
					color: #333;
				}

			}
		}
		.save-btn{
			font-size: .3rem;
			border-bottom: .03rem solid #f1f1f1;
			.calcle{
				font-size: .36rem;
				width: 49%;
				color: red;
				background: #fff;
				padding: .3rem;
				border: none;
				border-top: .03rem solid #f1f1f1;
			}
			.save{
				font-size: .36rem;
				width: 49%;
				color: #fff;
				background: red;
				padding: .3rem;
				border: none;
			}
		}
	}
	.status {
		background: #fff;
		text-align: center;
		padding-bottom: .2rem;
		font-size: .3rem;
		color: #333;
	}
</style>

<style lang="less">
	.load {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999999;
	}

	.load .mint-spinner-triple-bounce {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		top: 50%;
	}
</style>