<template>
    <div class="product vdsxzf">
        <div v-title data-title="商品详情">商品详情</div>
        <pr-header :text="title"></pr-header>
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="item in images" :key="item.id">
                <img :src="URL + item.pic_url" />
            </mt-swipe-item>
        </mt-swipe>
        <div class="describe" v-if="$store.state.commodity_data">
            <p class="fn">{{ $store.state.commodity_data.goods.title }}</p>
            <p class="price">
        <span style="color:red;font-size:20px">
          ￥
          {{ $store.state.commodity_data.goods.price_member }}
        </span>
                <span class="new">
          原价 ：￥
          <s>{{ $store.state.commodity_data.goods.price_market }}</s>
        </span>
                <span>
          销量
          <span v-if="$store.state.commodity_data.goods.sales_sum < 9999">
            {{$store.state.commodity_data.goods.sales_sum}}
          </span>
          <span v-else>
            {{$store.state.commodity_data.goods.sales_sum}} 万
          </span>
        </span>
            </p>
        </div>
        <!-- 已选 -->
        <div class="selected" @click="theSon">
            <span class="title">规格</span>
            <span style="float:right">请选择商品规格</span>
            <span
                    v-if="item"
                    v-for="(item, index) in $store.state.guigeidname"
                    :key="index"
                    class="number"
            >{{ $store.state.guigeName[index] }}&nbsp;{{ item }}</span
            >
            <span class="btn-right"></span>
        </div>
        <div class="fenge"></div>
        <!-- 店铺 -->
        <shop-infor
                :shopData="shopData"
                :data="$store.state.commodity_data"
        ></shop-infor>

        <coupons ></coupons>
        <!-- 搭配套餐推荐 -->
        <pr-list
                v-show="$store.state.matchGood"
                :conItem="conItemRe"
                :storeId="shopData.id"
                :val="1"
                :data="$store.state.matchGood"
        ></pr-list>
        <!-- 猜你喜欢 -->
        <pr-list
                v-if="$store.state.dataLeave.length != 0 || $store.state.dataLeave.length"
                :conItem="conItem"
                :val="2"
                :data="$store.state.dataLeave"
        ></pr-list>

        <div class="prompt" @click="toTab">点击查看更多商品信息</div>
        <detail-option
                @recommend="matchGood($store.state.commodity_data.goods.id)"
                v-if="guige"
                :data="$store.state.commodity_data"
        ></detail-option>
        <Shopsn></Shopsn>
        <foot-btn
                :storeid="store__id"
                :state="sonState"
                :Number="$store.state.commodity_val"
                :data="$store.state.commodity_data"
                @reduce="reduce"
                @plus="plus"
                :money="this.$route.params.money"
        ></foot-btn>
        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent>
            <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
        </div>
    </div>
</template>

<script>
    import PrHeader from "@/components/page/children/shop_header.vue"; // 头部
    import prList from "@/components/page/children/list.vue"; //猜你喜欢和搭配套餐
    import FootBtn from "@/components/page/children/footBtn.vue"; // 底部按钮
    import PageOption from "@/components/page/children/pageOption.vue";
    import shopInfor from "@/components/page/children/shopInfor.vue"; // 店铺信息
    import detailOption from "@/components/page/children/detailOptions.vue"; // 立即购买 || 加入购物车 弹框
    import Shopsn from "@/components/page/Shopsn.vue";
    import coupons from '@/components/page/coupons';
    import qs from "qs";
    import { Popup } from "mint-ui";
    import CountDown from "vue2-countdown";
    export default {
        name: "productDetail",
        data() {
            return {
                //是否显示状态条
                showIndicators: true,
                //初始轮播切换索引
                defaultIndex: 0,
                //轮播是否循环播放
                continuous: true,
                number: 1,
                conItem: {
                    title: "猜你喜欢"
                },
                conItemRe: {
                    title: "搭配套餐推荐"
                },
                scrollWatch: true,
                topStatus: "",
                loadTop: {},
                sonState: false,
                data: "",
                title: "商品详情",
                dataLeave: "",
                load_wrap: true,
                link_id: this.$route.params.id,
                guige: false,
                shopData: "",
                popupVisible: false,
                endday: "",
                end: "",
                brand: "",
                finish: false,
                images: [],
                page: 1,
                p_id: 0,
                store__id: 0
            };
        },
        created() {
            this.$store.state.const_join = false;
            this.$store.state.catr_number = 0;
            this.$store.state.goods_id = "";
            this.$store.state.matchGood = "";
            this.$store.state.scanID = this.$route.params.id;
            this.$store.state.scanGoodsType = this.$route.query.type;
        },
        methods: {
            countDown() {
                this.finish = true;
            },
            toTab() {
                this.$router.push({
                    name: "tab",
                    params: {
                        id: this.$route.params.id,
                        p_id: this.p_id
                    }
                });
            },
            theSon() {
                this.$store.state.const_join = true;
            },
            myLove() {
                this.axios
                    .post(this.$httpConfig.guessLove, qs.stringify({ page: this.page }))
                    .then(res => {
                        this.$store.state.dataLeave = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //属性
            spec() {},
            matchGood(id) {
                this.axios
                    .post(
                        this.$httpConfig.matchGood,
                        qs.stringify({
                            goods_id: id
                        })
                    )
                    .then(res => {
                        this.$store.state.matchGood = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            shopInfo() {
                this.axios({
                    url: this.$httpConfig.shopInfo,
                    method: "get",
                    params: {
                        id: this.$store.state.commodity_data.goods.store_id
                    }
                })
                    .then(res => {
                        this.shopData = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //商品详情
            ax() {
                this.axios({
                    url: this.$httpConfig.goodInfo,
                    method: "get",

                    params: {
                        id: this.$route.params.id
                    }
                })
                    .then(res => {
                        if (res.data.data.cart_count) {
                            this.$store.state.catr_number = parseInt(res.data.data.cart_count);
                        }
                        this.brand = res.data.data.brand_id;
                        this.images = res.data.data.images;
                        this.brand = res.data.data.brand_id;
                        this.$store.state.commodity_data = res.data.data;
                        this.$store.state.commodity_val = 1;
                        this.matchGood(this.$store.state.commodity_data.id);
                        this.shopInfo();
                        this.guige = true;
                        this.load_wrap = false;
                        this.p_id = res.data.data.goods.p_id;
                        this.store__id = res.data.data.goods.store_id;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            reduce() {
                if (this.number <= 1) return;
                this.number--;
            },
            plus() {
                if (this.number >= this.data.minStock) return;
                this.number++;
            },
            fenxiang() {
                this.popupVisible = !this.popupVisible;
            },
            off() {
                this.popupVisible = false;
            }
        },
        mounted() {
            this.ax();
            this.myLove();
            this.spec();
            $("html,body").animate(
                {
                    scrollTop: "0px"
                },
                100
            );
        },
        destroyed() {
            this.scrollWatch = false;
        },
        components: {
            PrHeader,
            Shopsn,
            prList,
            FootBtn,
            shopInfor,
            PageOption,
            detailOption,
            coupons,
            CountDown
        }
    };
</script>

<style lang="less" scoped>
    .Promotions {
        display: flex;
        padding: 15/100rem 20/100rem;
        h4 {
            color: #a2a2a2;
            font-size: 32/100rem;
            margin-right: 20/100rem;
        }
        .promotionsDiv {
            display: flex;
            padding: 10/100rem;
            align-items: center;
            span {
                padding: 8/100rem;
                color: #e2252b;
                border: 1/100rem solid #e2252b;
                font-size: 24/100rem;
                // width: 100/100rem ;
                height: 25/100rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            p {
                margin-left: 20/100rem;
                font-size: 24/100rem;
                color: #656565;
            }
        }
    }

    .fenge {
        height: 20/100rem;
        background-color: #f1f1f1;
    }

    .product {
        background: #fff;
    }

    .describe {
        padding: 0 0.2rem 0.35rem 0.2rem;
        position: relative;
        background-color: #f1f1f1;
        .fn {
            font-size: 0.36rem;
            color: #333;
            padding-top: 0.3rem;
            line-height: 0.5rem;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .timer {
            font-size: 0.25rem;
            color: #e02828;
            padding: 0.3rem 0;
            .newPos {
                color: #f1302b;
            }
        }
        .price.active {
            .orc {
                line-height: 0.4rem;
                padding-bottom: 0.2rem;
                .icon {
                    width: 0.4rem;
                    height: 0.4rem;
                    background: url(../../assets/integral.png) no-repeat;
                    background-size: 100% 100%;
                    margin-right: 0.2rem;
                }
            }
            .new {
                padding: 0;
            }
        }
        .price {
            padding-top: 0.2rem;
            .orc {
                color: #e02828;
                font-size: 0.32rem;
                em {
                    font-style: normal;
                    font-size: 0.48rem;
                }
            }
            .new {
                color: #757575;
                font-size: 0.25rem;
                padding-left: 0.2rem;
                s {
                    font-size: 0.24rem;
                }
            }
            .comment {
                font-size: .28rem;
                color: #757575;
                float: right;
                padding-top: .02rem;
                s {
                    font-size: 0.28rem;
                }
            }
        }
        .share {
            position: absolute;
            right: 0.2rem;
            top: 0.3rem;
            text-align: center;
            .icon {
                display: block;
                width: 0.39rem;
                height: 0.42rem;
                background: url(../../assets/share.png) no-repeat;
                background-size: 100% 100%;
            }
            p {
                font-size: 0.24rem;
                color: #555;
                line-height: 0.5rem;
            }
            ul {
                position: absolute;
                top: 45px;
                left: -225%;
                li {
                    width: 0.4rem;
                    height: 0.4rem;
                    float: left;
                    margin: 3px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .selected {
        padding: 0 0.5rem 0 0.2rem;
        min-height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #777;
        position: relative;
        background: #fff;
        border-top: 1px solid #f1f1f1;
        .number {
            font-size: 0.28rem;
            color: #333;
            padding-left: 0.55rem;
        }
        .btn-right {
            position: absolute;
            right: 0.3rem;
            top: 50%;
            margin-top: -0.12rem;
            width: 0.14rem;
            height: 0.24rem;
            background: url(../../assets/btn-right.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .mint-swipe {
        height: 6.22rem;
        .mint-swipe-items-wrap {
            div {
                width: 100%;
                height: 6.22rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .prompt {
        width: 100%;
        height: 0.9rem;
        background: #f1f1f1;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.26rem;
        color: #999;
    }

    #popup {
        width: 7rem;
        padding: 0.5rem 0.5rem 0.2rem;
        background: rgba(0, 0, 0, 0.5);
        ul {
            overflow: hidden;
            border-bottom: 1px solid #dfe3e4;
            background: #fff;
            border-radius: 0.6rem;
            padding: 0.2rem;
            li {
                float: left;
                margin: 0.1rem;
                width: 0.8rem;
                text-align: center;
            }
            img {
                width: 0.8rem;
                height: 0.8rem;
            }
        }
        button {
            display: block;
            width: 100%;
            text-align: center;
            margin-top: 0.2rem;
            background: #fff;
            line-height: 0.8rem;
            border-radius: 0.6rem;
            border: none;
        }
    }
</style>