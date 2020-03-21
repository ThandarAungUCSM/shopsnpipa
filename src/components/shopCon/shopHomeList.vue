<template>
	<div class="box">
		<header class="bestfruit-header">
			<span @click="btnGo" class="btnGo"></span>
			<div class="header-text">{{$store.state.className}}</div>
		</header>

		<!--		<el-row class="search-wrapper content" :gutter="10">-->
		<!--			<el-col-->
		<!--				:lg="6" :md="6" :sm="6" :xs="24"-->
		<!--				v-for="(item, index) in sortData"-->
		<!--				:key="index"-->
		<!--				:id="index"-->
		<!--			>-->
		<!--				<span @click="sortGoods(item.type, 'descend')">-->
		<!--					{{item.title}}-->
		<!--				</span>-->
		<!--				<div>-->
		<!--					<img-->
		<!--						v-show="index === 1"-->
		<!--						class="sort_img"-->
		<!--						@click="sortGoods(item.type, 'ascend')"-->
		<!--						:src="sortTop" alt=""-->
		<!--					>-->
		<!--					<img-->
		<!--						@click="sortGoods(item.type, 'descend')"-->
		<!--						v-show="index === 1"-->
		<!--						class="sort_img"-->
		<!--						:src="sortBottom" alt=""-->
		<!--					>-->
		<!--					<img-->
		<!--						v-show="index === 2"-->
		<!--						class="sort_img"-->
		<!--						@click="addClass(item.type, '')"-->
		<!--						:src="sta === true ? sortActiveBottom : sortTop" alt=""-->
		<!--					>-->
		<!--				</div>-->
		<!--			</el-col>-->
		<!--		</el-row>-->


		<!--<el-row :gutter="10">
            <div class="category"">
                <div class="category_div" v-for="(item,index) in shoplist" :key="index" @click="enterDetail(item)">
                    <img class="category_img" :src="URL + item.store_logo">
                    <div class="category_body">
                        <p class="category_title">{{item.shop_name}}</p>
                        <button class="category_btn">有机</button>
                        <p class="category_price">￥<span>{{item.store_sales}}</span></p>
                        <img class="category_cart" src="../../assets/addcart.png">
                        <p class="category_comment">已有 {{item.good_number}}条评论</p>
                        <p class="category_payment">1.3万人付款</p>
                    </div>
                </div>
            </div>
        </el-row>-->

		<ul class="content">
			<li :class="{active: sortHead == index}"
				v-for="(item, index) in sortData"
				:key="index"
				@click="proSort(index)">{{item}}</li>
			<li @click="drawer = true">筛选</li>
			<el-drawer :with-header="false" :visible.sync="drawer" size="75%;overflow-y: auto">
				<div class="title">店铺类型</div>
                <button class="click-btn"@click="alllist">全部</button>
				<button class="click-btn" v-for="(item,index) in category" :key="item.id" @click="categorystorelist(item.id)">
					{{item.sc_name}}
				</button>
			</el-drawer>
		</ul>

		<!--		<el-row :gutter="10">-->
		<!--			<div class="category">-->
		<!--				<div class="category_div" v-for="(item,index) in shoplist" :key="index" @click="enterDetail(item.id, index)">-->
		<!--					<img class="category_img" :src="URL + item.store_logo">-->
		<!--					<div class="category_body">-->
		<!--						<p class="category_title">{{item.shop_name}}</p>-->
		<!--						<button class="category_btn">有机</button>-->
		<!--						<p class="category_price">￥<span>{{item.store_sales}}</span></p>-->
		<!--						<img class="category_cart" src="../../assets/addcart.png">-->
		<!--						<p class="category_comment">已有 {{item.good_number}}条评论</p>-->
		<!--						<p class="category_payment">1.3万人付款</p>-->
		<!--					</div>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</el-row>-->

		<shop-list :shoplist="shoplist" :category="category"></shop-list>

		<!--		<transition name="transition">-->
		<!--			<div class="transition_div" v-show="sta">-->
		<!--				<div class="transition_text">-->
		<!--					<img  class="transition_img" src="../../assets/check.png">-->
		<!--					<p v-for="d in dabType" @click="addClass('', d.id)">-->
		<!--						{{d.type}}-->
		<!--					</p>-->
		<!--				</div>-->
		<!--				<div class="transition_btn">-->
		<!--					<span class="transition_btn1">重置</span>-->
		<!--					<span class="transition_btn2">确定</span>-->
		<!--				</div>-->
		<!--			</div>-->
		<!--		</transition>-->

		<!-- 列表展示 -->
		<!--		<shop-list :shoplist="shoplist"></shop-list>-->
		<div class="up-warp" v-show="load_show">
			<p class="rotate"></p>
			<p class="load-title">加载中..</p>
		</div>
		<div class="no-data" v-show="no_data">暂无相关数据~</div>
		<div class="load" v-show="load" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>
		<div class="load-wrap" v-show="$store.state.class_load" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	//import titleHeader from './child/tabHeader.vue'; //tab切换
	import shopList from './child/shoplist.vue'; //店铺列表
	import listHeader from '@/components/page/children/header.vue'; //头部
	import sortBottom from '../../assets/sort-bottom.png'
	import sortTop from '../../assets/sort-top.png'
	import sortActiveBottom from '../../assets/sort-bottom-active.png'
	import sortActiveTop from '../../assets/sort-top-active.png'
	export default {
		data() {
			return {
				players: [
					{
						id: "1",
						shop_name: "我的自营",
						store_sales: "183",
						store_logo: "/Uploads/goods/2019-08-20/5d5b9b9e62fd8.png",
						good_number: "0",
						store_goods: []
					},
					{
						id: "2",
						shop_name: "我的自营",
						store_sales: "184",
						store_logo: "/Uploads/goods/2019-08-20/5d5b9b9e62fd8.png",
						good_number: "0",
						store_goods: []
					},
					{
						id: "3",
						shop_name: "我的自营",
						store_sales: "185",
						store_logo: "/Uploads/goods/2019-08-20/5d5b9b9e62fd8.png",
						good_number: "0",
						store_goods: []
					},
					{
						id: "4",
						shop_name: "我的自营",
						store_sales: "186",
						store_logo: "/Uploads/goods/2019-08-20/5d5b9b9e62fd8.png",
						good_number: "0",
						store_goods: []
					},

				],
				sort: '',
				sortTop: sortTop,
				sortBottom: sortBottom,
				sortActiveBottom: sortActiveBottom,
				sortActiveTop: sortActiveTop,
				storeList:[], // 热卖推荐
				sta:false,
				headerWidth: '',
				titleIndex: -1,
				sortHead: 0,
				index: 0,
				text: "店铺",
				titleData: [],
				address: [],
				// sortData: [
				// 	{title : '按销量', type: 'store_sort'},
				// 	{title : '价格', type: 'store_sales'},
				// 	{title : '标示', type: 'grade_id'}
				// ],
				sortData: ['综合排序', '销量优先', '按信誉'],
				page: 1,
				shoplist: [],
				sort_types:'store_sort',
				sortType: ['store_sort', 'store_sales', 'grade_id '],
				load: false,
				tabIndex: -1,
				sw:true,
				state:true,
				flag:false,
				no_data:false,
				load_show:true,
				swiperaddress: {
					slidesPerView: 4,
					spaceBetween: 12,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				},
				active : 1,
				dabType: [],
				ascendBtn: false,
				descendBtn: false,
				drawer: false,
				category:[],
				store:[]
			}
		},
		created() {
			this.$store.state.class_load = false;
			/*this.getStoreListAjax();*/
			this.getStoreCategory();
			this.categorystorelist();
		},
		mounted(){
			this.getDabType();

			document.body.scrollTop = 0;
			let _this = this;
			// 注册scroll事件并监听
			window.addEventListener('scroll',function(){
				if($("#list-shop").length){
					if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
						//没有数据时不在再请求
						if(_this.state == false){
							return;
						}else{
							_this.load_show = true;
						};
						//限制重复滑动
						if(_this.sw == true){
							_this.sw = false;
							_this.page;
							_this.categorystorelist();
						}
					}
				}
			})
		},
		methods: {
			sortGoods(sort, order) {
				console.log(sort, order);

				if (sort === 'store_sales' && order === 'ascend') {
					console.log(order);
					return this.players.sort(function(a, b) {
						return b.store_sales - a.store_sales;
					});
				}
				else {
					console.log('blah')
					return this.players.sort(function(a, b) {
						return a.store_sales - b.store_sales;
					});
				}

			},
			/*descending(){
				this.descendBtn = !this.descendBtn;
			},*/
			addClass(sort_type, mark_id){
				this.sta = !this.sta;
				this.sortGoods(sort_type, mark_id);
			},
			btnGo(){
				this.$router.go(-1);
			},
			remove() {
				this.$router.go(-1);
			},
			// product() {
			// 	this.$router.push({
			// 		name: "shopHome",
			// 		params: {
			// 			id: this.$route.params.class_id,
			// 			status: 1
			// 		}
			// 	})
			// },
			//  首页店铺列表请求 默认综合排序
			categorystorelist(id) {
				//避免重复请求
                this.shoplist = [];
				if(this.flag === true){return};
				this.flag = true;
				this.axios.post(this.$httpConfig.getStoreShopList, qs.stringify({
					page:this.page,
					sort_types:this.sort_types,
					class_id: id
				})).then((res) => {
					this.sw = true;
					this.flag = false;
					this.load_show = false;
					//第一次获取数据如果数据没铺满屏幕 不再触发滚动
					if(res.data.data.records.length <10 && this.page === 1){
						this.load_show = false;
						this.state = false;
					}else if(res.data.data.records.length === 0){
						this.no_data = true;
						this.state = false;
						return;
					}
					console.log(res.data.data.records)
					for(let key in res.data.data.records) {
						this.shoplist.push(res.data.data.records[key])
					}
				}).catch((err) => {
					console.log(err)
				});
			},
            alllist() {
                //避免重复请求
                this.shoplist = [];
                if(this.flag === true){return};
                this.flag = true;
                this.axios.post(this.$httpConfig.getStoreShopList, qs.stringify({
                    page:this.page,
                    sort_types:this.sort_types,
                })).then((res) => {
                    this.sw = true;
                    this.flag = false;
                    this.load_show = false;
                    //第一次获取数据如果数据没铺满屏幕 不再触发滚动
                    if(res.data.data.records.length <10 && this.page === 1){
                        this.load_show = false;
                        this.state = false;
                    }else if(res.data.data.records.length === 0){
                        this.no_data = true;
                        this.state = false;
                        return;
                    }
                    console.log(res.data.data.records)
                    for(let key in res.data.data.records) {
                        this.shoplist.push(res.data.data.records[key])
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
			//筛选切换
			proSort(index){
				//打开加载动画
				this.load_show = true;
				//避免重复请求
				if(this.flag === true) return;
				//初始化无数据时的条件
				this.state = true;
				//隐藏无数据时的样式
				this.no_data = false;
				//初始化page
				this.page = 1;
				//清空数据列表
				this.shoplist = [];
				this.sortHead = index;
				if(this.sortHead===0){
					this.sort_types = 'store_sort';
					this.categorystorelist();

				}else if(this.sortHead===1){
					this.sort_types = 'store_sales';
					this.sortTop = sortTop;
					this.categorystorelist();

				}else if(this.sortHead===2){
					this.sort_types = 'grade_id';
					this.sortTop = sortTop;
					this.sta = !this.sta;
					this.categorystorelist();
				}
			},

			enterDetail(id, i) {
				this.$router.push({
					name: "shopHome",
					params: {
						id: id,
						index: i
					}
				});
			},
			getDabType(){
				this.axios.post(this.$httpConfig.getDabType)
						.then(res => {
							this.dabType = res.data.data
						})
						.catch(e => {console.log(e)})
			},
			getStoreCategory(){
				this.axios.post(this.$httpConfig.getStoreCategory, qs.stringify({
					fid: this.$route.params.class_id
				})).then(res => {
					this.category = res.data.data
				}).catch(e => {
					console.log(err)
				})
			},
			/*categorystorelist(){
				this.axios.post(this.$httpConfig.getStoreShopList, qs.stringify({

				})).then(res => {
					this.store = res.data.data
				}).catch(e => {
					console.log(err)
				})
			},*/
		},
		components: {
			listHeader,
			shopList,
			//titleHeader
		}
	}
</script>
<style lang="less" scoped>

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
			p {
				padding: 0 .4rem;
				font-size: .28rem;
				color: #000;
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

	.bestfruit-header {
		/*background: #fff;*/
		background: #00C65D;
		height: 1rem;
		line-height: 1rem;
		display: flex;
		/*padding: .1rem .1rem 0 .1rem;*/

		.btnGo {
			position: absolute;
			margin: .3rem .15rem 0 .15rem;
			width: .30rem;
			height: .46rem;
			background: url(../../assets/backauction.png) no-repeat;
			background-size: 100% 100%;
		}

		.header-text {
			font-size: .45rem;
			padding: 0 1rem 0 3.3rem;
			/*color: #333333;*/
			color: #fff;
		}
	}

	.shopHome-header {
		height: 1.1rem;
		background: #ffffff;
		border-bottom: 1px solid #E1E1E1;
		.shopHome_back {
			position: absolute;
			width: .2rem;
			height: .4rem;
			margin: 0.4rem 0 0 0.2rem;
			background: url(../../assets/fanhui.png) no-repeat;
			background-size: 100% 100%;
		}
		.shopHome_ser {
			position: absolute;
			width: .3rem;
			height: .3rem;
			margin: 0.42rem 0 0 1.3rem;
			background: url(../../assets/search2.png) no-repeat;
			background-size: 100% 100%;
		}
		.shopHome_search {
			width: 5.2rem;
			height: .75rem;
			border-radius: .5rem;
			border: none;
			background: #F0F0F0;
			font-size: .28rem;
			color: #999999;
			padding: 0 0 0 .8rem;
			margin: .2rem 0 0 1rem;
		}
		.shopHome_msg {
			width: .55rem;
			height: .55rem;
			float: right;
			margin: .3rem .2rem 0 0;
		}
	}

	.location{
		background: #fff;
		width: 100%;
		overflow-x: auto;
		height: 90/100rem;
		border-bottom: .01rem solid #CBCBCB;
		display: flex;
		.title{
			padding: .1rem;
			width: 2.2rem;
			margin: .17rem 0 0 0;
			font-size: .26rem;
			color: #999999;
		}
		.swiper-container{
			padding: 0 0 0 .4rem;
			line-height: .9rem;
			color: black;
		}
		.activeColor{
			color: red;
		}
	}
	.head {
		background: #fff;
		width: 100%;
		overflow-x: auto;
		height: 90/100rem;
		border-bottom: .01rem solid #CBCBCB;
		display: flex;
		.title{
			padding: .1rem;
			width: 1.7rem;
			margin: .17rem 0 0 0;
			font-size: .26rem;
			color: #999999;
		}
		.headers {
			// background-color: #fff;
			height: 100%;
			li {
				font-size: .26rem;
				width: 1.5rem;
				height: .9rem;
				text-align: center;
				line-height: .9rem;
				box-sizing: border-box;
				padding:0 .2rem;
			}
			.avtive {
				color: #d02629;
				/*<!--border-bottom: 4/100rem solid #C19D07;-->*/
			}
		}
	}

	/*.content {*/
	/*	background-color: #fff;*/
	/*	display: flex;*/
	/*	padding: .35rem .5rem;*/
	/*	line-height: .5rem;*/
	/*	!*border-bottom: 1/100rem solid #CBCBCB;*!*/
	/*	!*padding-left: .1rem;*!*/
	/*	.el-col{*/
	/*		text-align: center;*/
	/*		div{*/
	/*			display: inline-block;*/
	/*			padding-left: .2rem;*/
	/*			margin-bottom: -.1rem;*/
	/*			img:first-child{*/
	/*				margin-bottom: .03rem;*/
	/*			}*/
	/*		}*/
	/*	}*/
	/*	div{*/
	/*		padding-left: .1rem;*/
	/*		img.sort_img {*/
	/*			display: flex;*/
	/*			flex-direction: column;*/
	/*			padding-bottom: .05rem;*/
	/*		}*/
	/*	}*/


	/*	.content_title1 {*/
	/*		font-size: .28rem;*/
	/*		color: #FF5000;*/
	/*	}*/
	/*	.content_title2 {*/
	/*		font-size: .28rem;*/
	/*		color: #666666;*/
	/*		padding-left: 1.6rem;*/
	/*		.content_img1 {*/
	/*			width: .15rem;*/
	/*			height: .2rem;*/
	/*			padding: .1rem 0 0 .1rem;*/
	/*		}*/
	/*	}*/
	/*	.content_title3 {*/
	/*		font-size: .28rem;*/
	/*		color: #666666;*/
	/*		padding-left: 1.6rem;*/
	/*		.sort_img {*/
	/*			width: .15rem;*/
	/*			height: .1rem;*/
	/*			padding: .12rem;*/
	/*		}*/
	/*	}*/
	/*	.active {*/
	/*		color: #FF5000;*/
	/*	}*/
	/*	.sortAscend{*/
	/*		color: #ff5000;*/
	/*	}*/
	/*}*/
	.content {
		background-color: #fff;
		display: flex;
		border-bottom: 1/100rem solid #CBCBCB;
		li {
			display: flex;
			height: 50/100rem;
			margin: 20/100rem 0;
			justify-content: center;
			align-items: center;
			flex: 1;
			border-right: 1/100rem solid #CBCBCB;
			&:last-child {
				border: 0
			}
		}
		.active {
			color: #00C65D;
		}
		.title{
			font-size: .38rem;
			margin: .5rem 0 0 .3rem;
		}
		.click-btn{
			margin: .3rem .5rem 0 .3rem;
			width: 2rem;
			height: .6rem;
			border: none;
		}
	}
	.category {
		margin-top: .2rem;
		background: #ffffff;
		.category_div {
			padding: .2rem .2rem 0 .2rem;
			display: flex;
			.category_img {
				/*position: relative;*/
				/*width: 2.6rem;*/
				height: 2.6rem;
				border-radius: .2rem;
			}
			.category_body {
				width: 4.25rem;
				padding: .05rem 0 .05rem .2rem;
				border-bottom: 1px solid #f1f1f1;
				.category_title {
					height: 1rem;
					overflow: hidden;
					font-size: .3rem;
					color: #333333;
					line-height: .5rem;
					/*padding-bottom: .32rem;*/
				}
				.category_btn {
					padding: .04rem;
					font-size: .2rem;
					border: 1px solid #00C65D;
					background: #fff;
					color: #00C65D;
					border-radius: .1rem;
					margin-top: .2rem;
				}
				.category_price {
					font-size: .35rem;
					color: #FF5000;
					margin: -.3rem 0 0 1rem;
					span {
						font-size: .28rem;
						color: #FF5000;
					}
				}
				.category_cart {
					width: .7rem;
					height: .7rem;
					float: right;
					margin-top: -.64rem;
				}
				.category_comment {
					font-size: .24rem;
					color: #BBBBBB;
					margin-top: .18rem;
				}
				.category_payment {
					font-size: .24rem;
					color: #BBBBBB;
					float: right;
					margin: -.23rem .8rem 0 0;
				}
			}
		}
	}
	.up-warp{
		height: .5rem;
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
		height: .5rem;
		padding: .3rem 0;
		text-align: center;
		font-size: 12px;
		color: gray;
	}
</style>
