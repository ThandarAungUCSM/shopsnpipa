<template>
    <div class="box">
        <!--		<div v-title data-title="店铺">店铺</div>-->
        <!--		<list-header :set="true" :text="text"></list-header>-->
        <div class="shopHome-header">
            <span class="shopHome_back"  @click="remove"></span>
            <!--<span class="shopHome_ser"></span>
            <input class="shopHome_search" type="search" placeholder="搜索商品..."></input>-->
            <router-link to = "/myNews">
                <img class="shopHome_msg" src="../../assets/msg.png">
            </router-link>
        </div>
        <!--<div class="location">
            <ul class="title">区域地点 :</ul>
            <swiper :options="swiperaddress">
                <swiper-slide v-for="(item,index) in address" :key="item.id" :class="active === item.id ? 'activeColor' : ''" @click.native.prevent="active = item.id">
                    {{item.name}}
                </swiper-slide>
            </swiper>
        </div>
        <div class="head">
            <ul class="title">店铺分类 :</ul>
            <ul :style="{width:titleData.length * 2+'rem'}" class="headers fl" ref="headers">
                <li :class="{avtive:titleIndex == index}" class="fl" @click="proTab(index,item.id)" v-for="(item, index) in titleData" :key="index">
                    {{item.sc_name}}
                </li>
            </ul>
        </div>-->
        <!-- 排序切换 -->
        <!--<title-header :sortData = "sortData" v-on:sortCon = "titleTab"  :tabdata ="tabIndex"></title-header>-->
        <ul class="content">
            <li
                    :class="{active: sortHead === index}"
                    v-for="(item, index) in sortData"
                    :key="index"
                    @click="proSort(index)"
            >
                {{item}}
                <div>
                    <img class="content_img2" :src="sortTop" :key="index"
                         @click="proSort(index)" v-if="(index === 1) || (index === 2)" v-show="!sta">
                    <img class="content_img2" :src="sortBottom" :key="index"
                         @click="proSort(index)" v-if="(index === 1)">
                    <!--					<img class="content_img2" :src="sortActiveTop" :key="index"-->
                    <!--						 @click="proSort(index)" v-if="(index === 1 && sortHead === 1)">-->
                    <img class="content_img2" :src="sortActiveBottom" :key="index"
                         @click="proSort(index)" v-if="(index === 2 && sortHead === 2)" v-show="sta">
                </div>
            </li>
            <!--<li class="content_title1">按销量</li>
            <li class="content_title2">
                价格<img class="content_img1" src="../../assets/arrow_bottom.png">
            </li>
            <li class="content_title3">
                标示
                <img class="content_img2" src="../../assets/down-arrow.png" :key="index"
                    @click="proSort(index)" v-if="sta">
                <img class="content_img2" src="../../assets/sort-top.png" :key="index"
                    @click="proSort(index)" v-else="sta">
            </li>-->
        </ul>

        <transition name="transition">
            <div class="transition_div" v-show="sta">
                <div class="transition_text">
                    <img  class="transition_img" src="../../assets/check.png">
                    <p class="transition_text1">有机</p>
                    <p class="transition_text2">无机</p>
                </div>
                <div class="transition_btn">
                    <span class="transition_btn1">重置</span>
                    <span class="transition_btn2">确定</span>
                </div>
            </div>
        </transition>

        <div class="category"  @click="product">
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
                sortData: ['按销量', '价格', '标示'],
                sortType: ['store_sort', 'store_sales', 'grade_id '],
                page: 1,
                shoplist: [],
                sort_types:'store_sort',
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
            }
        },
        created() {
            this.$store.state.class_load = false;
            this.getStoreListAjax();
        },
        mounted(){
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
                            _this.page++;
                            _this.getStoreListAjax();
                        }
                    }
                }
            })
        },
        methods: {
            addClass(){
                this.sta = !this.sta
            },
            remove() {
                this.$router.go(-1);
            },
            product() {
                this.$router.push({
                    name: 'product'
                })
            },
            //  首页店铺列表请求 默认综合排序
            getStoreListAjax() {
                //避免重复请求
                if(this.flag === true){return};
                this.flag = true;
                this.axios.post(this.$httpConfig.getStoreList, qs.stringify({
                    page:this.page,
                    sort_types:this.sort_types,
                    class_id: this.$route.params.class_id
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
                    this.getStoreListAjax();

                }else if(this.sortHead===1){
                    this.sort_types = 'store_sales';
                    this.sortTop = sortTop;
                    this.getStoreListAjax();

                }else if(this.sortHead===2){
                    this.sort_types = 'grade_id';
                    this.sortTop = sortTop;
                    this.sta = !this.sta;
                    this.getStoreListAjax();
                }
            },

            enterDetail(storeList) {
                this.$router.push({
                    name: "product",
                    params: {
                        id: storeList.id,
                        status: 1
                    }
                });
            }
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
        .transition_text {
            background: #F2F2F2;
            display: flex;
            padding: .5rem;
        }
        .transition_img {
            width: .4rem;
            height: .3rem;
            padding: 0 .8rem 0 .2rem;
        }
        .transition_text1 {
            font-size: .28rem;
            color: #000;
        }
        .transition_text2 {
            font-size: .28rem;
            color: #000;
            padding-left: 2.6rem;
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

    .content {
        background-color: #fff;
        display: flex;
        padding: .35rem .5rem;
        /*border-bottom: 1/100rem solid #CBCBCB;*/
        li {
            display: flex;
            font-size: .28rem;
            height: 50/100rem;
            /*margin: 20/100rem 0;*/
            justify-content: center;
            align-items: center;
            flex: 1;
            &:last-child {
                border: 0
            }

            div{
                padding-left: .1rem;
                img.content_img2 {
                    display: flex;
                    flex-direction: column;
                    padding-bottom: .05rem;
                }
            }
        }
        .content_title1 {
            font-size: .28rem;
            color: #FF5000;
        }
        .content_title2 {
            font-size: .28rem;
            color: #666666;
            padding-left: 1.6rem;
            .content_img1 {
                width: .15rem;
                height: .2rem;
                padding: .1rem 0 0 .1rem;
            }
        }
        .content_title3 {
            font-size: .28rem;
            color: #666666;
            padding-left: 1.6rem;
            .content_img2 {
                width: .15rem;
                height: .1rem;
                padding: .12rem;
            }
        }
        .active {
            color: #FF5000;
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
