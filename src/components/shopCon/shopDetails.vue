<template>
    <div class="detailsBox">
        <div v-title data-title="商品列表">商品列表</div>
        <!--        <shop-header :text="text"></shop-header>-->
         <div class="shop-header">
            <p class="shop-header_title">店铺详情</p>
            <span class="shop-header_img" @click="remove"></span>
        </div>

         <!-- 头部 -->
<!--    <pr-header :text="title" :projectId="hdType"></pr-header>-->
        <!-- 店铺信息 -->
        <div class="shopTitle">
            <div>
                                <img v-show="data.store_logo" :src="URL+data.store_logo" alt="">
                                <p>{{data.shop_name}}</p>
<!--                <img src="../../assets/camera1.png">-->
<!--                <p>绿叶水果专营店</p>-->
            </div>
            <div>
                                <p>{{data.storeFans}}万<br><span>粉丝数</span></p>
<!--                <p>51.5万<br><span>粉丝数</span></p>-->
                <div @click="attenAjax(0)" class="btn" v-show="atten == 1">已关注</div>
                <div @click="attenAjax(1)" class="btn" v-show="atten == 0">关注</div>
<!--                <div class="btn" @click="guanzhu">关注</div>-->
            </div>
        </div>
        <!-- tab切换 -->
        <!--        <title-tab :sortData="sortData" v-on:sortCon="sortindex" :tabdata="-1"></title-tab>-->
        <ul class="tab-header">
            <li>
                <a @click="tabActive('live')"
                   class="tab-header_1"
                   href="#live"
                   :class="list === 'live' ? 'green':''">在线直播</a>
            </li>
            <li>
                <a @click="tabActive('certificate')"
                   class="tab-header_1"
                   href="#certificate"
                   :class="list === 'certificate' ? 'green':''">资质证照</a>
            </li>
            <li>
                <a @click="tabActive('shop')"
                   class="tab-header_1"
                   href="#shop"
                   :class="list === 'shop' ? 'green':''">商家信息</a>
            </li>
            <li>
                <a @click="tabActive('des')"
                   class="tab-header_1"
                   href="#des"
                   :class="list === 'des' ? 'green':''">用户评价</a>
            </li>
        </ul>
        <!-- live -->
        <div id="live" class="shop-live">
            <div class="shop-live_title" @click="open">
                <img class="shop-live_img" src="../../assets/monitor.png">
                <p class="shop-live_text">选择摄像头</p>
                <img class="shop-live_img1" src="../../assets/fanhui1.png">
            </div>
            <!--<video id="myPlayer" muted controls playsInline webkit-playsinline autoplay>-->
                <!--<source :src="playSrc" type=""/>-->
            <!--</video>-->
            <iframe
                    :src="playSrc"
                    width=99%
                    height="200"
                    id="ysopen"
                    allowfullscreen
            >
            </iframe>
        </div>
        <!-- broadcast -->
        <div id="certificate" class="shop-broadcast">
            <div class="shop-broadcast_head">资质证照</div>
            <div class="shop-broadcast_body">
                <div class="broadcast-body_div">
                    <button class="broadcast-body_btn">证</button>
                    <p class="broadcast-body_text">资质证照</p>
<!--                    <img class="broadcast-body_img" src="../../assets/certificate.png">-->
<!--                    <img class="broadcast-body_img1" src="../../assets/certificate.png">-->
                    <img class="broadcast-body_img" :src="URL+certificate.account_car" alt="">
                    <img class="broadcast-body_img1" :src="URL+certificate.organization_electronic" alt="">
                    <img class="broadcast-body_img" :src="URL+certificate.ours_bs" alt="">
                    <img class="broadcast-body_img1" :src="URL+certificate.taxpayer_certificate" alt="">
                </div>
<!--                <div class="broadcast-body_div">-->
<!--                    <button class="broadcast-body_btn">食</button>-->
<!--                    <p class="broadcast-body_text">食品安全</p>-->
<!--                    <img class="broadcast-body_img" src="../../assets/certificate.png">-->
<!--                    <img class="broadcast-body_img1" src="../../assets/certificate.png">-->
<!--                </div>-->
<!--                <div class="broadcast-body_div">-->
<!--                    <button class="broadcast-body_btn">源</button>-->
<!--                    <p class="broadcast-body_text">供应来源</p>-->
<!--                    <img class="broadcast-body_img" src="../../assets/certificate.png">-->
<!--                    <img class="broadcast-body_img1" src="../../assets/certificate.png">-->
<!--                </div>-->
            </div>
        </div>
        <ul id="shop" class="aboutShop">
            <li>
                <p class="title">商家信息</p>
            </li>
            <li>
                <p>联系客服</p>
                <img :src="aboutShopImg" alt="">
            </li>
            <li @click="phoneMsg">
                <p>商家电话<span>{{data.mobile}}</span></p>
                <img :src="phoneimg" alt="">
            </li>
            <li @click="codeMsg">
                <p>店铺二维码</p>
                <img :src="codeImg" alt="">
            </li>
            <li @click="paperwork">
                <p>店铺简介<span>{{data.description}}</span></p>
                <!--                <img :src="paperworkImg" alt="">-->
            </li>
        </ul>
        <ul class="aboutShop1">
            <!-- <li>
                      <p>店铺简介<span>15年用心，常遭您的美丽王国</span></p>
                </li> -->
            <li>
                <p>所在地区<span>{{data.address}}</span></p>
            </li>

            <li>
                <p>开店时间<span>{{data.update_time}}</span></p>
            </li>
        </ul>
        <!-- 描述 -->
        <div id="des" class="description">
            <p class="description_text">用户评价</p>
<!--            <p><span>描述相符</span> <span>{{data.description}}分</span><span></span></p>-->
            <p><span>描述相符</span> <span>{{data.deliverycredit}}分</span><span>{{data.deliverycredit_discraption}}</span>
            </p>
            <p><span>服务态度</span> <span>{{data.desccredit}}分</span><span>{{data.desccredit_discraption}}</span>
            </p>
            <p><span>物流服务</span> <span>{{data.servicecredit}}分</span><span>{{data.servicecredit_discraption}}</span>
            </p>
        </div>
        <selectCamera v-if="cameraFlag" :list="cameraLocationList" @trigger="selectCamera" @closeSelect="closeSelect" ></selectCamera>
    </div>
</template>
<script>
    import PrHeader from "@/components/page/children/shop_header.vue"; // 头部
    import qs from 'qs';
    import selectCamera from './child/selectCamera';

    import {
        MessageBox
    } from 'mint-ui'

    export default {
        data() {
            return {
                aboutShopImg: require("@/assets/message-green.png"),
                codeImg: require("@/assets/images/code_icon.png"),
                phoneimg: require("@/assets/images/phone_icon.png"),
                paperworkImg: require("@/assets/images/paperwork_icon.png"),
                text: '店铺详情',
                sortData: ['店铺首页', '全部宝贝', '店铺动态'],
                atten: 0,
                data: [],
                cameraLocationList:[],
                playSrc:"",
                cameraFlag: false,
                shopData: [],
                hdType:3,
                list: 'live',
                certificate: []
            }
        },
        components: {
            selectCamera,
            PrHeader
            // shopHeader,
            // titleTab
        },
        created() {
            this.axios.post(this.$httpConfig.shopDetails, qs.stringify({
                    id: parseFloat(this.$route.params.id)
                })
            ).then(res => {
                this.data = res.data.data;
            })
        },
        mounted() {
            // this.$nextTick(() => {
            //     this.player = new EZUIPlayer('myPlayer');
            // });
            this.getShopCameraUrl();
            // this.shopDetails();
            this.storeCertificate();
        },
        beforeRouteLeave(to, from, next) {
            MessageBox.close(false);
            next();
        },

        methods: {
            storeCertificate(){
            this.axios.post(this.$httpConfig.storeCertificate, qs.stringify({
                id: this.$route.params.id
            })
            ).then(res => {
                this.certificate = res.data.data;
            })
            },
            tabActive(tab){
                console.log(tab)
                this.list = tab;
            },
            open(){
                this.cameraFlag = true;
            },
            selectCamera(index){
                console.log(index);
                this.playSrc = this.cameraLocationList[index].hls_hd_url;
               // this.playSrc = 'http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.hd.m3u8';
                this.cameraFlag = false;
                // this.player = new EZUIPlayer('myPlayer');
                // this.player.play();
            },
            closeSelect(){
                this.cameraFlag = false;
            },
            getShopCameraUrl(){
                this.$HTTP(this.$httpConfig.getShopCameraUrl,{id:2},'post').then(res=>{
                    this.cameraLocationList = res.data.data;
                    this.playSrc = this.cameraLocationList[0].hls_hd_url;
                }).catch(err=>{
                    console.log(err)
                })
            },
            /*shopDetails() {
                this.axios({
                    url: this.$httpConfig.shopDetails,
                    method: "get",
                    params: {
                        id: this.$route.params.id
                    }
                })
                    .then(res => {
                        this.shopData = res.data.data;
                    })
            },*/
            guanzhu(){
                this.player.play();
            },
            sortindex(index) {
                this.$router.push({
                    name: "shopHome",
                    params: {
                        id: this.$route.params.id,
                        index: index
                    }
                })
            },
            remove() {
                this.$router.go(-1);
            },
            // 拨打电话
            phoneMsg() {
                MessageBox({
                    title: '',
                    message: this.data.mobile,
                    confirmButtonText: '呼叫',
                    showCancelButton: true
                }).then(action => {
                    if (action == "confirm") window.location.href = "tel:111111111"
                })
            },
            //   店铺二维码
            codeMsg() {
                MessageBox({
                    title: '和田余元分店',
                    showConfirmButton: false,
                    cancelButtonClass: false,
                    message: `<p><img style="width:5.6rem; height:5.6rem; margin-bottom:.3rem;"  src="http://a.hiphotos.baidu.com/image/pic/item/500fd9f9d72a6059f550a1832334349b023bbae3.jpg"></img></p><p>邀请好友来扫一扫分享店铺给TA</p>`,
                })
            },
            //   证照信息
            paperwork() {
                this.$router.push({
                    name: "paperwork",
                    params: {
                        id: this.$route.params.id
                    }
                })
            },
            //关注店铺
            attenAjax(index) {
                this.atten = index;
                let urls = ""
                if (index == 1) {
                    urls = this.$httpConfig.attenStore;
                } else {
                    urls = this.$httpConfig.cancelAttenStore;
                }
                this.axios({
                    method: 'post',
                    url: urls,
                    data: qs.stringify({
                        store_id: parseFloat(this.$route.params.id)
                    })
                }).then(res => {
                    console.log(res)
                })
            },
        }
    }
</script>

<style lang="less" scoped>
.detailsBox{
    /*padding-top:0.937rem;*/
}
    /*// 标题*/
    .shop-header {
        height: 0.937rem;
        background: #ffffff;
        border-bottom: 1px solid #f1f1f1;

        .shop-header_title {
            font-size: .36rem;
            color: #333333;
            text-align: center;
            padding: .3rem 0 .3rem 0;
        }

        .shop-header_img {
            position: absolute;
            width: 0.22rem;
        height: 0.34rem;
            margin: -0.6rem 0 0 0.2rem;
            // background: url(../../assets/fanhui.png) no-repeat;
            background:url(../../assets/backfind.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .shopTitle {
        //   color: #fff;
        overflow: hidden;
        padding: 20/100rem;
        height: 125/100rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;

        div {
            display: flex;
            align-items: center;
        }

        img {
            width: 80/100rem;
            height: 80/100rem;
            margin-right: 20/100rem;
        }

        p {
            font-size: 26/100rem;
            color: #333333;
        }

        span {
            font-size: 20/100rem
        }

        .btn {
            margin-left: 15/100rem;
            width: 120/100rem;
            height: 50/100rem;
            border-radius: 50/100rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background-color: #FF6700;
        }
    }

    .tab-header {
        height: .7rem;
        background: #ffffff;
        display: flex;
        padding-top: .3rem;

        .tab-header_1 {
            font-size: .28rem;
            padding-bottom: .3rem;
            margin: 0 .45rem 0 .3rem;
        }
        .green {
            color: #00C65D;
            border-bottom: 2px solid #00C65D;
        }
    }

    .shop-live {
        background: #ffffff;
        margin-top: .2rem;
        #myPlayer{
            width: 100%;
            height: 4rem;
        }

        .shop-live_title {
            display: flex;
            padding: .25rem .2rem .25rem .2rem;

            .shop-live_img {
                width: .38rem;
                height: .42rem;
                padding-right: .3rem;
            }

            .shop-live_text {
                font-size: .3rem;
                color: #666666;
                padding-top: .1rem;
            }

            .shop-live_img1 {
                width: .2rem;
                height: .32rem;
                padding: 0.06rem 0 0 4.7rem;
            }
        }

        .shop-live_kiwi {
            width: 7.5rem;
            height: 4.6rem;
        }

        .shop-live_overlap {
            width: 7.5rem;
            height: 4.6rem;
            margin-top: -4.6rem;
        }
    }

    .shop-broadcast {
        background: #ffffff;
        /*margin-top: .2rem;*/

        .shop-broadcast_head {
            font-size: .32rem;
            padding: .3rem 0 .3rem .2rem;
            font-weight: bold;
            border-bottom: 1px solid #DFDFDD;
        }

        .shop-broadcast_body {
            padding: .4rem .2rem .4rem .2rem;

            .broadcast-body_div {
                padding-bottom: .25rem;

                .broadcast-body_btn {
                    width: .5rem;
                    height: .5rem;
                    border-radius: .3rem;
                    border: 1px solid #f1f1f1;
                    background: #fff;
                    font-size: .24rem;
                    color: #999999;
                }

                .broadcast-body_text {
                    font-size: .28rem;
                    color: #333333;
                    float: right;
                    margin: .12rem 5.3rem 0 0;
                }

                .broadcast-body_img {
                    width: 2.5rem;
                    height: 2rem;
                    padding: .2rem 0 0 .62rem;
                }

                .broadcast-body_img1 {
                    width: 2.5rem;
                    height: 2rem;
                    padding: .2rem 0 0 .2rem;
                }
            }
        }
    }

    .description {
        background-color: #fff;
        padding: .1rem .2rem;
        margin-top: .2rem;
        margin-bottom: .2rem;

        .description_text {
            font-size: .3rem;
            border-bottom: 1px solid #DFDFDD;
            padding: .15rem 0 .15rem 0;
            font-weight: bold;
        }

        p {
            line-height: .7rem;

            span {
                font-size: 28/100rem;

                &:nth-child(1) {
                    margin-right: .7rem;
                }

                &:nth-child(2) {
                    color: #CF7171;
                    margin-right: .35rem
                }

                &:nth-child(3) {
                    color: #CF7171;
                }
            }
        }
    }

    .aboutShop {
        /*border-top: .01rem solid #D1D1D1;*/
        margin-top: .2rem;
        background-color: #fff;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;
            border-bottom: .01rem solid #D1D1D1;
            height: 1.1rem;

            p {
                float: left;
                font-size: .28rem;
            }

            .title{
                float: left;
                font-size: .32rem;
                font-weight: bold;
            }

            img {
                float: right;
                width: .45rem;
                height: .45rem;
            }

            span {
                font-size: .28rem;
                margin-left: .25rem;
                color: #686868;
            }
        }
    }

    .aboutShop1 {
        /*border-top: .01rem solid #D1D1D1;*/
        /*margin-top: .2rem;*/
        background-color: #fff;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;
            border-bottom: .01rem solid #D1D1D1;
            height: 1.1rem;

            p {
                float: left;
                font-size: .28rem;
            }

            span {
                font-size: .28rem;
                margin-left: .25rem;
                color: #686868;
                line-height: .4rem;
            }
        }
    }
</style>
