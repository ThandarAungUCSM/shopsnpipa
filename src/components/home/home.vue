<template>
    <div class="home" ref="home">
        <div v-title data-title="主页">主页</div>
        <home-header :userName="getData"></home-header>
        <div class="navmarketclass">
            <div class="nav">
                <div
                    v-for="(item,index) in classNav"
                    :key="index"
                    :class="{activeColor: index == 0}"
                    @click="linkTo(item.id)"
                >
                    {{item.nav_titile}}
                </div>
            </div>
        </div>
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in bannerImg" :key="item.id">
                <!--        <img class="home-banner-img" :src="URL + item.pic_url" @click="goAd(item.ad_link)" />-->
                <img class="home-banner-img" :src="URL + item.pic_url">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 快捷链接加快讯 -->
        <news-flash
                :nav="firstClass"
                :data="$store.state.home_data.announcement"
                @hit="hit"
        ></news-flash>
        <!-- 店铺街 -->
        <!--<limited-hd :text="$store.state.home_data.recommendGoods"></limited-hd>-->
        <ul class="floor">
            <li class="floor-item">
                <div class="top">
                    <div class="title fl">商家分类
                        <img class="title_padding-left" src="../../assets/padding-left.png">
                        <img class="title_padding-right" src="../../assets/padding-right.png">
                    </div>
                    <div class="title_swiper">
                        <swiper :options="swipe">
                            <swiper-slide
                                v-for="(item,index) in store_category"
                                :key="index"
                                @click.native="Classifications(item.id, item.sc_name)"
                                class="title-swiper_swiper"
                            >
                                <img class="swiper_img" :src="URL + item.pic_url" alt="">
                                <p class="swiper_text">{{item.category_name}}</p>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="home_selling">
                    <router-link to="shopHomeList">
                    <div class="home-title">
                        <!--打折购-->
                        <img class="title_img-left" src="../../assets/padding-left.png">
                        热卖推荐
                        <img class="title_img-right" src="../../assets/padding-right.png">
                    </div>
                    </router-link>
                    <div class="home_selling-card">
                        <swiper :options="selling">
                            <swiper-slide v-for="(item,index) in hotGoods" :key="index" class="selling-card_swiper">
                                <div class="selling-card_card" @click="enterDetail(item, 'default')">
                                    <img class="selling-card_img" :src="URL + item.pic_url">
                                    <div class="selling-card_price">
                                        <p class="selling-card_title">{{item.title}}</p>
                                        <span class="selling-card_market">￥{{item.price_market}}</span>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="home_week">
                    <router-link to="shopHomeList">
                    <div class="home-title">
                        <!--本周新-->
                        <img class="title_img-left" src="../../assets/padding-left.png">
                        本周新品
                        <img class="title_img-right" src="../../assets/padding-right.png">
                    </div>
                    </router-link>
                    <div class="home_week-card">
                        <swiper :options="week">
                            <swiper-slide v-for="(item,index) in weekNewGoodsList" :key="index" class="home-week_swiper">
                                <div class="selling-week_card" @click="enterDetail(item, 'default')">
                                    <img class="selling-week_img" :src="URL + item.pic_url">
                                    <div class="selling-week_price">
                                        <p class="selling-week_title">{{item.title}}</p>
                                        <!--<p class="selling-week_market">原切谷饲牛肉</p>-->
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="home_sale">
                    <div class="home-title" @click="nextauction">
                        <!--限时购-->
                        <img class="title_img-left" src="../../assets/padding-left.png">
                        现时抢购
                        <img class="title_img-right" src="../../assets/padding-right.png">
                    </div>
                    <div class="sale-time">
                        <div v-for="(item,index) in tabTimeList"
                             :key="index" class="sale-time_flex"
                             :class="{active: tabTimeIndex == index}"
                             @click="handTime(index)"
                        >
                            <div class="time_month1">{{currentTime}}</div>
                            <div class="time_hour1">{{item}}</div>
                        </div>
                        <!--<div class="sale-time_flex">-->
                            <!--<span class="sale-time_month1">{{currentTime}}</span>-->
                            <!--<span class="sale-time_hour1">14 :00</span>-->
                        <!--</div>-->
                        <!--<div class="sale-time_flex">-->
                            <!--<span class="sale-time_month1">{{currentTime}}</span>-->
                            <!--<span class="sale-time_hour1">20:00</span>-->
                        <!--</div>-->
                    </div>
                    <div class="home_sale-card">
                        <swiper :options="selling">
                            <swiper-slide v-for="(item,index) in panicGoodsList" :key="index" class="home-sale_swiper">
                                <div class="sale-card_card" @click="enterDetail(item, 'promotion')">
                                    <img class="sale-card_img" :src="URL + item.pic_url">
                                    <img class="sale-card_hot" src="../../assets/hot1.png">
                                    <div class="sale-card_price">
                                        <p class="sale-card_title">{{item.title}}</p>
                                        <span class="sale-card_market">￥{{item.panic_price}}</span>
                                        <del class="sale-card_del">￥{{item.price_market}}</del>
                                        <img class="sale-card_circle" src="../../assets/cricletext.png">
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
                <div class="home_like">
                    <div class="home-title">
                        <!--优品汇-->
                        <img class="title_img-left" src="../../assets/padding-left.png">
                        猜你喜欢
                        <img class="title_img-right" src="../../assets/padding-right.png">
                    </div>
                    <div class="home_like-card" >
                        <div class="like-card_card" v-for="(item,index) in youLikeList" :key="index">
                            <img class="like-card_img" :src="URL + item.pic_url">
                            <div class="like-card_price">
                                <p class="like-card_title">{{item.title}}</p>
                                <span class="like-card_market">￥{{item.price_market}}</span>
                                <del class="like-card_del">￥{{item.price_c}}</del>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import HomeHeader from "./children/header.vue"; //头部内容
    import NewsFlash from "./children/newsFlash"; //快捷链接加快讯
    import limitedHd from "./children/conHeader"; // 内容头
    import hotGoods from "./children/hotGoods"; // 内容列表
    import Shopsn from "@/components/page/Shopsn.vue"; //列表底部内容
    import limitedActivity from "./children/limitedActivity";
    import limitedDd from "@/components/Widget/moveCon";
    import brandMus from "./children/BrandMus";
    import lateMall from "./children/lateMall";
    import mallCon from "@/components/Widget/mallCon";
    import toTop from "@/components/page/toTop"; //回到顶部
    import {Indicator, Toast} from "mint-ui";
    import QS from "qs";

    export default {
        name: "home",
        data() {
            return {
                continuous: true,
                defaultIndex: 0,
                showIndicators: true,
                prevent: true,
                stopPropagation: true,
                data: "",
                getData: "",
                newsData: null,
                endtime: "",
                promotions: "",
                currentPage: 1,
                floorList: [],
                isBottom: false,
                adList: [],
                isEnd: false,
                floorLoading: false,
                isRepeat: false,
                classNav:[],
                bannerImg:[],
                firstClass:[],
                store_category:[],
                youLikeList:[], //猜你喜欢
                weekNewGoodsList:[], //本周新品
                panicGoodsList:[], //显示抢购
                hotGoods:[], // 热卖推荐
                tabTimeList:[
                    "08:00",
                    "14:00",
                    "20:00"
                ],
                tabTimeIndex:0,
                swipe: {
                    slidesPerView: 5,
                    spaceBetween: 25
                },
                selling: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                week: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                currentTime:"",
            };
        },
        created() {
            var userName = this.$route.params.userName;
            this.getData = userName;
        },
        mounted() {
            this.onLoad();
            this.getUserClassGoods();
        },
        methods: {
            getUserClassGoods(){
                this.$HTTP(this.$httpConfig.getUserClassGoods,{},'post').then(res=>{
                    this.hotGoods = res.data.data;
                    // console.log(res.data.data)
                }).catch(err=>{
                    console.log(err)
                })
            },
            linkTo(id){
                if (id === '26')
                {
                    this.$router.push('/')
                }
                else{
                    this.$router.push({
                        name: 'generalClass',
                        params: {id}
                    })
                }

                // location.href = link;
            },
            product(){
                this.$router.push({
                    name: 'product',
                    path: '/product/:id/:status',
                })
            },
            onLoad(){
                this.getNavMessage();
                this.getWeekNewGoods(); //获取本周新品
                this.getGuessYouLike(); //获取猜你喜欢
                var time = new Date();
                this.currentTime = time.getMonth() + 1 + "月" + time.getDate() + '日';
                this.getUserPanicGoods();
                this.getUserRecomGoods();
            },
            getUserRecomGoods(){
                this.$HTTP(this.$httpConfig.getUserRecomGoods,{},'post').then(res=>{
                    this.hotGoods = res.data.data.data.data;
                }).catch(err=>{
                    console.log(err)
                })
            },
            getUserPanicGoods(){
                this.$HTTP(this.$httpConfig.getUserPanicGoods,{time_type: this.tabTimeIndex + 1},'post').then(res=>{
                    this.panicGoodsList = res.data.data.data;
                }).catch(err=>{
                    console.log(err);
                    this.panicGoodsList = [];
                })
            },
            handTime(index){
                this.tabTimeIndex = index;
                this.getUserPanicGoods();
            },
            getGuessYouLike(){
                this.$HTTP(this.$httpConfig.guessYouLike,{page:1},"post").then(res=>{
                    this.youLikeList = res.data.data;
                }).catch(err=>{
                    console.log(err);
                })
            },
            getWeekNewGoods(){
                this.$HTTP(this.$httpConfig.weekNewGoods,{},'post').then(res=>{
                    this.weekNewGoodsList = res.data.data;
                }).catch(err=>{
                    console.log(err);
                })
            },
            getNavMessage(){
                this.axios({
                    url: this.$httpConfig.home,
                    method: "post"
                })
                    .then(res => {
                        var json_wx = JSON.parse(res.request.response);
                        Toast(res.data.message);
                        if (json_wx.status == 999) {
                            window.location.href = json_wx.msg;
                            return;
                        }
                        this.classNav = res.data.data.nav;
                        this.firstClass = res.data.data.first_class;
                        this.store_category = res.data.data.store_category;
                        this.bannerImg = res.data.data.banner;
                        this.$store.state.home_data = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            goAd(address) {
                window.open(address);
            },
            getAd() {
                this.$HTTP(
                    this.$httpConfig.getAd,
                    {page: this.currentPage - 1},
                    "post"
                ).then(res => {
                    this.adList.push(res.data.data);
                    this.floorLoading = true;
                });
            },
            more(goods) {
                this.$router.push({
                    name: "listHomeMore",
                    params: {
                        status: goods.class.id
                    }
                });
            },
            hit(id) {
                this.$router.push({
                    name: "noticeChild",
                    params: {
                        id: id
                    }
                });
            },
            enterDetail(goods, type) {
                this.$store.state.goods = goods;
                this.$store.state.type = type;

                var id;
                if(goods.goods_id){
                    id = goods.goods_id
                }else {
                    id = goods.id
                }

                // console.log(goods.id , id);
                this.$router.push({
                    name: "product",
                    params: {
                        id: id,
                        status: 1
                    }
                });
            },
            nextauction() {
                this.$router.push({
                    name: 'auction',
                    path: '/auction',
                })
            },
            product() {
                this.$router.push({
                    name: 'product',
                    path: '/product/:id/:status',
                })
            },
            Classifications(item, name){
                this.$store.state.className = name;
                this.$router.push({
                    name: 'goodsClassification',
                    params: {class_id: item}
                })
            }
        },
        destroyed() {
        },
        updated() {
            var that = this;
            setTimeout(function () {
                that.$store.state.load_wrap = false;
            }, 1000);
        },
        components: {
            HomeHeader,
            NewsFlash,
            limitedActivity,
            hotGoods,
            Shopsn,
            limitedDd,
            limitedHd,
            brandMus,
            lateMall,
            mallCon,
            toTop
        }
    };
</script>
<style>
    .home-banner-img {
        background-size: 100%;
    }

    .el-loading-spinner i {
        color: #999 !important;
    }

    .el-loading-spinner .el-loading-text {
        color: #999 !important;
    }

    .el-loading-mask {
        background: none;
        color: #999 !important;
    }
</style>

<style lang="less" scoped>
    .home {
        .to-top {
            position: fixed;
            height: 0.75rem;
            bottom: 1.6rem;
            right: 0.2rem;
        }

        .mint-swipe-indicators {
            width: 100%;
            text-align: center;
        }

        .navmarketclass {
            margin: .2rem 0 0 .2rem;

            * {
                font-size: .28rem;
            }

            a {
                text-decoration: none;
                color: #000;
            }

            .nav {
                width: 100%;
                height: .55rem;
                display: flex;
                overflow-x: auto;
                >div{
                    margin-right: .3rem;
                    flex-shrink: 0;
                }

                .activeColor {
                    color: #00C65D;
                }
            }
        }

        .floor {
            background-color: #f2f1f2;
            box-sizing: border-box;
            padding-top: .2rem;

            .floor-item {
                background-color: #f2f1f2;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                .top {
                    background-color: #ffffff;
                    width: 100%;
                    height: 2.4rem;
                    padding: 0.2rem 0 .2rem .2rem;
                    overflow: hidden;

                    .title {
                        /*border-left: 3px solid #d02629;*/
                        /*border-right: 3px solid #f1f1f1;*/
                        padding-left: 0.2rem;
                        padding-right: .2rem;
                        font-size: 0.32rem;
                        color: #000;
                        margin-left: 2rem;
                        font-weight: bold;

                        .title_padding-left {
                            width: .45rem;
                            height: .3rem;
                            float: left;
                            padding: .08rem .2rem 0 0;
                        }

                        .title_padding-right {
                            width: .45rem;
                            height: .3rem;
                            float: right;
                            padding: .08rem 0 0 0.2rem;
                        }
                    }

                    .title_swiper {
                        padding: .6rem 0 .2rem 0;
                        height: 1.8rem;
                        .title-swiper_swiper {
                            height: 1.8rem !important;
                            width: 1.1rem !important;
                            margin-right: .45rem !important;
                        }
                        .swiper_img {
                            width: .9rem;
                            height: .9rem;
                            border-radius: .9rem;
                            margin: .3rem 0 .2rem 0;
                        }

                        .swiper_text {
                            font-size: .24rem;
                            padding-left: .27rem;
                            color: #666666;
                        }
                    }

                    .more {
                        line-height: 0.4rem;
                        color: #999;
                        font-size: 0.28rem;
                        position: relative;
                        padding-right: 0.2rem;

                        em {
                            position: absolute;
                            right: 0;
                            top: 0.07rem;

                            i {
                                border-left: 6px solid #ccc;
                                border-top: 6px solid transparent;
                                border-bottom: 6px solid transparent;
                                position: absolute;
                                right: -0.04rem;
                                top: 0;
                            }

                            b {
                                border-left: 6px solid #f2f2f2;
                                border-top: 6px solid transparent;
                                border-bottom: 6px solid transparent;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }
                        }
                    }
                }

                .home_selling {
                    width: 100%;
                    height: 5.2rem;
                    background-color: #ffffff;
                    margin-top: .2rem;

                    .home_selling-title {
                        padding-left: 0.2rem;
                        padding-right: .2rem;
                        font-size: 0.32rem;
                        color: #000;
                        margin: .2rem 0 0 2.2rem;

                        .title_selling-left {
                            width: .45rem;
                            height: .3rem;
                            float: left;
                            padding: .08rem .2rem 0 0;
                        }

                        .title_selling-right {
                            width: .45rem;
                            height: .3rem;
                            float: right;
                            padding: .08rem 2.3rem 0 0.2rem;
                        }
                    }

                    .home_selling-card {
                        background-color: #FEF6F4;
                        height: 3.7rem;
                        margin-top: .2rem;
                        padding: .2rem .2rem .5rem 0.2rem;
                        .selling-card_swiper {
                            height: 3.7rem !important;
                            width: 2.246rem !important;
                            margin-right: .2rem !important;
                        }
                        .selling-card_card {
                            width: 2.2rem;
                            /*height: 3.6rem;*/
                            background: #ffffff;

                            .selling-card_img {
                                width: 2.2rem;
                                height: 2.2rem;
                            }

                            .selling-card_price {
                                padding: .15rem .1rem .1rem .15rem;

                                .selling-card_title {
                                    // height: .4rem;
                                    height:0.7rem;
                                    font-size: .26rem;
                                    color: #333333;
                                    line-height: .35rem;
                                    text-overflow: -o-ellipsis-lastline;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                }

                                .selling-card_market {
                                    font-size: .24rem;
                                    color: #FF5000;
                                    line-height: .6rem;
                                }
                            }
                        }
                    }
                }

                .home-title {
                    font-size: 0.32rem;
                    color: #000;
                    text-align: center;
                    padding: .2rem;
                    font-weight: bold;
                    .title_img-left {
                        width: .45rem;
                        height: .3rem;
                        padding: .08rem .2rem 0 0;
                    }

                    .title_img-right {
                        width: .45rem;
                        height: .3rem;
                        padding: .08rem 0 0 .2rem;
                    }
                }

                .home_week {
                    width: 100%;
                    height: 4.6rem;
                    background-color: #ffffff;
                    margin-top: .4rem;
                    .home_week-card {
                        background-color: #ffffff;
                        height: 3.1rem;
                        margin-top: .2rem;
                        padding: .2rem .2rem .5rem 0.2rem;
                        .home-week_swiper {
                            height: 3.2rem !important;
                            width: 2.246rem !important;
                            margin-right: .2rem !important;
                        }
                        .selling-week_card {
                            width: 2.2rem;
                            height: 3rem;
                            background: #FEF6F4;
                            padding-bottom: .13rem;

                            .selling-week_img {
                                width: 2.2rem;
                                height: 2.2rem;
                            }

                            .selling-week_price {
                                padding: .15rem .1rem .1rem .1rem;
                                font-weight: lighter;

                                .selling-week_title {
                                    font-size: .26rem;
                                    color: #000;
                                    text-align: center;
                                    text-overflow: -o-ellipsis-lastline;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                }

                                .selling-week_market {
                                    font-size: .24rem;
                                    color: #999999;
                                    line-height: .4rem;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }

                .home_sale {
                    width: 100%;
                    height: 6.28rem;
                    background-color: #ffffff;
                    margin-top: .4rem;
                    .sale-time {
                        padding-top: .3rem;
                        display: flex;

                        .sale-time_flex {
                            text-align: center;
                            width: 32%;
                            /*padding: .1rem .5rem;*/

                            .time_month1 {
                                font-size: .26rem;
                                /*color: #707070;*/
                                margin: 0 0 0 .2rem;
                            }

                            .time_hour1 {
                                font-size: .28rem;
                                /*color: #707070;*/
                                margin-right: -.2rem;
                                font-weight: bold;
                            }
                        }
                        .active{
                            div{
                                color: #FF5000;
                            }
                        }
                    }

                    .home_sale-card {
                        background-color: #f2f1f2;
                        height: 4rem;
                        margin-top: .2rem;
                        padding: .2rem .2rem .2rem 0.2rem;
                        .home-sale_swiper {
                            height: 4rem !important;
                            width: 2.246rem !important;
                            margin-right: .2rem !important;
                        }
                        .sale-card_card {
                            width: 2.2rem;
                            height: 4rem;
                            background: #ffffff;

                            .sale-card_img {
                                width: 2.2rem;
                                height: 2.2rem;
                            }

                            .sale-card_hot {
                                width: .5rem;
                                height: .5rem;
                                margin: -2.12rem 0 0 1.65rem;
                            }

                            .sale-card_price {
                                padding: .15rem .1rem .1rem .15rem;

                                .sale-card_title {
                                    font-size: .26rem;
                                    color: #333333;
                                    line-height: .35rem;
                                    text-overflow: -o-ellipsis-lastline;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    margin-bottom: .05rem;
                                }

                                .sale-card_market {
                                    font-size: .28rem;
                                    color: #FF5000;
                                }

                                .sale-card_del {
                                    font-size: .26rem;
                                    color: #999999;
                                    margin-right: .8rem;
                                }

                                .sale-card_circle {
                                    width: 1.2rem;
                                    height: 1.2rem;
                                    float: right;
                                    margin: -.9rem -0.3rem 0 0;
                                }
                            }
                        }
                    }
                }

                .home_like {
                    width: 100%;
                    /*height: 14rem;*/
                    background-color: #ffffff;
                    margin-top: .2rem;
                    .home_like-card {
                        background-color: #f2f1f2;
                        /*height: 12rem;*/
                        padding: .2rem 0 0 0.2rem;
                        display: flex;
                        flex-wrap: wrap;

                        .like-card_card {
                            width: 47.2%;
                            height: 5rem;
                            margin-right: .2rem;
                            border-radius: .15rem;
                            background: #ffffff;
                            margin-bottom: .2rem;

                            .like-card_img {
                                width: 3.44rem;
                                height: 3.44rem;
                                border-top-left-radius: .15rem;
                                border-top-right-radius: .15rem;
                            }

                            .like-card_price {
                                padding: .15rem .1rem .2rem .15rem;

                                .like-card_title {
                                    font-size: .27rem;
                                    color: #333333;
                                    line-height: .35rem;
                                    text-overflow: -o-ellipsis-lastline;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    margin-bottom: .1rem;
                                }

                                .like-card_market {
                                    font-size: .28rem;
                                    color: #FF5000;
                                }

                                .like-card_del {
                                    font-size: .26rem;
                                    color: #999999;
                                    padding: 0 0 .1rem .1rem;
                                }
                            }
                        }
                    }
                }

                .image-ad {
                    width: 7.45rem;
                    height: 3.5rem;
                    border: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 100%;
                        height: 100%;
                        border: none;
                    }
                }

                .goods-box {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;

                    .floor-goods {
                        margin-top: 2%;
                        background-color: #fff;
                        width: 49%;
                        float: left;
                        // border: 3px solid #F2F1F2;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        img {
                            width: 100%;
                            height: 3.5rem;
                            align-self: center;
                            border-bottom: 0.5px solid #f2f1f2;
                        }

                        .title {
                            display: -webkit-box;
                            overflow: hidden;
                            white-space: normal !important;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            color: #343434;
                            height: 40px;
                            line-height: 20px;
                            text-align: left;
                            padding: 0 0.2rem;
                            font-size: 14px;
                        }

                        .price {
                            color: #da3632;
                            font-size: 17px;
                            font-weight: bold;
                            text-align: left;
                            padding: 0 0.2rem;
                            height: 30px;
                            line-height: 25px;
                        }
                    }
                }
            }
        }

        .isEnd {
            display: flex;
            width: 100%;
            justify-content: center;
            height: 50px;
            align-items: center;
            color: #999;
        }
    }
</style>
<style lang="less" scoped>
    .home {
        .mint-swipe {
            width: 100%;
            height: 2.7rem;

            img {
                width: 94.5%;
                height: 100%;
                border-radius: .15rem;
                margin-left: .2rem;
            }

            .mint-swipe-indicators {
                .mint-swipe-indicator {
                    width: 20px;
                    height: 20px;
                }
            }
        }

        .entranch-main {
            width: 100%;
            height: 2rem;
        }

        .home-banner {
            padding: 0.2rem;

            img {
                width: 100%;
            }
        }

        .banner {
            img {
                width: 100%;
            }
        }

        .banner-3 {
            img {
                width: 7.5rem;
                height: 3.75rem;
            }
        }

        .limit-banner {
            padding: 0.2rem;

            img {
                width: 7.1rem;
                height: 1.66rem;
                border-radius: 5px;
            }
        }
    }
</style>
