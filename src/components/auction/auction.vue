<template>
    <div>
        <div v-title data-title="抢购">抢购</div>
        <!--        <home-header :userName="title"></home-header>-->
        <header class="auction-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">限时抢购</div>
        </header>
        <!--        <mt-swipe :auto="4000">-->
        <!--            <mt-swipe-item v-for="item in imgs" :key="item.id">-->
        <!--                <img v-lazy="item">-->
        <!--            </mt-swipe-item>-->
        <!--        </mt-swipe>-->
        <div class="swipe-img">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="n in 3" :key="n">
                    <img src="../../assets/auction-logo.png">
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <div class="datetime-format">
            <div class="datetime-show" v-for="(item,index) in tabTimeList" :key="index" :class="{active: tabTimeIndex ==index}" @click="handTime(index)">
                <div class="date">{{currentTime}}</div>
                <div class="time">{{item}}</div>
            </div>
        </div>

        <ul class="content">
            <li v-for="(item,index) in GoodsList" :key="index" @click="enterDetail(item)">
                <img :src="URL + item.pic_url" alt="">
                <div class="listChild">
                    <p class="title">{{item.title}}</p>
                    <div class="item-last">
                        <button>仅剩255 件</button>
                    </div>
                    <div>
                        <div>
                            <!--                            <h4 v-if="(item.start_time*1000) <= currentTimeStamp">抢购中</h4>-->
                            <!--                            <h4 v-else class="redTxt">{{formatTime(item.start_time)}}开始抢购</h4>-->
                            <h5>￥{{item.panic_price}}</h5>
                            <!--                            <h6>￥{{item.price_market}}</h6>-->
                        </div>
                        <div>
                            <!--                            <button v-if="(item.start_time*1000) <= currentTimeStamp"  @click="chase(item.goods_id)">马上抢购</button>-->
                            <button>马上抢购</button>
                            <!--                            <p><span>{{item.already_num}}</span> 人已购买</p>-->
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import HomeHeader from '@/components/home/children/header.vue'; //头部内容
    import qs from 'qs';

    export default {
        data() {
            return {
                notice: "提醒我",
                title: '',
                shopImg: require("@/assets/con23.jpg"),
                panicList: [],
                currentTimeStamp:'',
                GoodsList:[],
                tabTimeList:[
                    "08:00",
                    "14:00",
                    "20:00"
                ],
                tabTimeIndex:0,
            }
        },
        created() {
            this.getData();
        },
        mounted(){
            this.onLoad();
        },
        methods: {
            onLoad(){
                var time = new Date();
                this.currentTime = time.getMonth() + "月" + time.getDate() + '日';
                this.getUserPanicGoods();

            },
            btnGo(){
                this.$router.go(-1);
            },
            getData() {
                this.axios.post(this.$httpConfig.getPanicGoods).then((res) => {
                    if (res.data.status == 1) {
                        this.panicList = res.data.data.data;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            getUserPanicGoods(){
                this.$HTTP(this.$httpConfig.getUserPanicGoods,{time_type: this.tabTimeIndex + 1},'post')
                    .then(res=>{
                        this.GoodsList = res.data.data.data;
                    }).catch(err=>{
                    console.log(err);
                    this.GoodsList = [];
                })
            },
            handTime(index){
                this.tabTimeIndex = index;
                this.getUserPanicGoods();
            },
            // 格式化日期，如月、日、时、分、秒保证为2位数
            formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n;
            },
            // 参数number为毫秒时间戳，format为需要转换成的日期格式
            formatTime(number) {
                let time = new Date(number*1000)
                var month = this.formatNumber(time.getMonth() + 1);
                var date = this.formatNumber(time.getDate());
                var h = this.formatNumber(time.getHours());
                var m = this.formatNumber(time.getMinutes());
                var format = month + "." + date  + ' ' + h + ":" + m
                return format;
            },
            chase(id) {
                this.$router.push({
                    name:'auctionList',
                    params:{
                        goods_id:id
                    }
                })
            },
            notices() {
                this.notice = "已提醒"
            },
            enterDetail(GoodsList) {
                this.$router.push({
                    name: "product",
                    params: {
                        id: GoodsList.goods_id,
                        status: 1
                    }
                });
            },
        },
        components: {
            HomeHeader
        }
    }
</script>
<style lang="less" scoped>
    .auction-header {
        height: .8rem;
        display: flex;
        padding: .1rem .1rem 0 .1rem;
        background: #ffffff;
        .btnGo {
            position: absolute;
            margin: .15rem;
            width: .30rem;
            height: .46rem;
            background: url(../../assets/backauction.png) no-repeat;
            background-size: 100% 100%;
        }
        .header-text {
            font-size: .45rem;
            padding: 0 1rem 0 2.8rem;
            color: #333333;
        }
    }
    .swipe-img{
        background: #ffffff;
        margin: .03rem 0 0 0;
        .mint-swipe {
            padding: .2rem .1rem 0 .17rem;
            width: 95%;
            height: 3rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .datetime-format{
        display: flex;
        background: #fff;
        margin: .01rem 0 .2rem 0;
        .datetime-show{
            padding: .5rem .2rem .3rem .2rem;
            margin: 0 .2rem 0 .5rem;
            .date{
                font-size: .3rem;
            }
            .time{
                font-size: .3rem;
                padding: .1rem;
            }
        }
        .active{
            div{
                color: #FF5000;
            }
        }
    }

    .content {
        width: 100%;
        li {
            padding: .1rem .3rem;
            height: 2.55rem;
            background-color: #fff;
            display: flex;
            border-bottom: .2rem solid #F1F1F1;
            align-items: center;

            img {
                width: 2.2rem;
                height: 2.2rem;
            }

            .listChild {
                flex: 1;
                padding-left: .3rem;

                .title {
                    font-size: .28rem;
                    line-height: .4rem;
                    /*text-overflow: -o-ellipsis-lastline;*/
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .item-last{
                    button{
                        color: #ff5000;
                        width: 2rem;
                        height: .5rem;
                        border-radius: .3rem;
                        margin: .2rem 0 .1rem 0;
                        background: #FDDDCE;
                        border: .01rem solid #ff5000;
                    }
                }

                div {
                    display: flex;
                    justify-content: space-between;

                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        h4 {
                            width: 100%;
                            font-size: .28rem;
                            color: #FF5000;
                        }

                        h5 {
                            width: 100%;
                            font-size: .35rem;
                            color: #FF5000;
                            padding: .1rem 0 0 0;
                        }

                        h6 {
                            width: 100%;
                            font-size: .24rem;
                            color: #969696;
                            text-decoration: line-through;
                        }

                        button {
                            width: 1.5rem;
                            font-size: .25rem;
                            height: .65rem;
                            border: 0;
                            margin-bottom: .1rem;
                            background-color: #FF5000;
                            color: #fff;
                            border-radius: .1rem;
                        }

                        p {
                            width: 100%;
                            text-align: right;
                            font-size: .24rem;
                        }

                        span {
                            color: #FF5000;
                        }

                        .redTxt {
                            color: #FF5000;
                        }

                        .greenBg {
                            font-size: 0.3rem;
                            background-color: #72BE52;
                        }
                    }
                }
            }
        }
    }
</style>
