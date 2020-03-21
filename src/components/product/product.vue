<template>
  <div class="product asd">
    <div v-title data-title="商品详情">商品详情</div>
    <!-- 头部 -->
    <pr-header :text="title" :projectId="hdType"></pr-header>

    <mt-swipe :auto="0">
      <mt-swipe-item v-for="item in images" :key="item.id">
        <img :src="URL + item.pic_url" />
      </mt-swipe-item>
    </mt-swipe>

    <!--<div class="describe">-->

        <div class="describe" v-if="$store.state.type === 'promotion'">
            <div class="diamond">
              <div class="bg_gra">
                <span class="box">
                  <span> 限时 </span>
                  <span> 抢购 </span>
                </span>
                <span class="price">
                  <span> ￥ {{ $store.state.goods.panic_price }} </span>
                  <span> <s style="color: #F1F1F1;">￥ {{ $store.state.goods.price_market }}</s> </span>
                </span>
              </div>
              <div class="end_time" v-show="day">
                <p>距结束还剩：{{ day }}天</p>
                <div>
                <span class="bg_org">{{ hour }}</span> <span>:</span>
                <span class="bg_org">{{ Minute }}</span> <span>:</span>
                <span class="bg_org">{{ second }}</span>
                </div>

              </div>

            </div>
            <p class="fn price">
                <span class="">{{ $store.state.goods.title }}</span>
                <span>
                       <img class="for-fav-img1" @click="addCol" v-if="this.CtType==2" src="../../assets/images/favoriate.png" alt="">
                        <img class="for-fav-img1" @click="addCol" v-if="this.CtType==1" src="../../assets/images/xu_xinxin.png" alt="">
                    <span class="for_favorite1">收藏</span>
                </span>
            </p>
        </div>
        <div class="describe" v-else-if="$store.state.type === 'default'">
          <p class="price">
            <span class="for-p">
              ￥
              {{ $store.state.goods.price_market }}
            </span>
            <span v-if="$store.state.commodity_data.can_trade_price" class="for-p-sign">起批价</span>
            <span>
              <img class="for-fav-img" @click="addCol" v-if="this.CtType==2" src="../../assets/images/favoriate.png" alt="">
              <img class="for-fav-img" @click="addCol" v-if="this.CtType==1" src="../../assets/images/xu_xinxin.png" alt="">

              
              <span class="for_favorite" >收藏</span>
            </span>
          </p>
          <p class="fn">{{ $store.state.goods.title }}</p>
        </div>

        <!--<div v-else v-show="$store.state.commodity_data">
            <p class="price">
          <span class="for-p">
            ￥
            {{ $store.state.commodity_data.goods.price_market }}
          </span>
              &lt;!&ndash;<span class="new">
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
              </span>&ndash;&gt;
              <span>
            <img class="for-fav-img" src="../../assets/images/favoriate.png" alt="">
            <span class="for_favorite">收藏</span>
          </span>
            </p>
            <p class="fn">{{ $store.state.commodity_data.goods.title }}</p>
        </div>-->
    <!--</div>-->


<!--    <div class="wholesale-describe" v-else v-show="wholesale">
      <div class="wholesale-detail">
        <div class="detail">
          <p class="price">￥15.00</p>
          <p class="item-number">5000瓶起批</p>
        </div>
        <div class="detail">
          <p class="price">￥14.80</p>
          <p class="item-number">10000-19999瓶</p>
        </div>
        <div class="detail">
          <p class="price">￥14.80</p>
          <p class="item-number">≥20000瓶</p>
        </div>
        <div class="detail">
          <p class="price"><img src="../../assets/star-img.png"></p>
          <p class="item-number">收藏</p>
        </div>
      </div>
      <div class="describe">爱媛38号橘子当季新鲜柑橘 净重8斤装 生鲜新鲜 水果</div>
    </div>-->
    <!-- 已选 -->
    <div class="selected" @click="theSon">

        <div v-if="spec" class="specifications">
            <p>{{spec}}   * {{$store.state.commodity_val}}</p>
        </div>
        <span v-else>请选择商品规格</span>
        <span
              v-if="item"
              v-for="(item, index) in $store.state.guigeidname"
              :key="index"
              class="number"
        >
            {{ $store.state.guigeName[index] }}&nbsp;{{ item }}
        </span>
        <span class="btn-right"></span>
    </div>

    <div class="for-discount" @click="showCoupon">
      <span>优惠</span>
        <span
                class="coupon_img"
                v-for="(item,index) in couponList.slice(0,3)"
                :key="index.id">
         {{item.name}}
     </span>
<!--      <img src="../../assets/images/coupn-img.png" alt="">-->
<!--      <img src="../../assets/images/coupn-img.png" alt="">-->
<!--        v-if="Id === item.id"-->
<!--            <div-->
<!--                    class="coupon_img"-->
<!--                    v-for="(item,index) in couponList"-->
<!--                    :key="index.id">-->
<!--                {{item.name}}-->
<!--            </div>-->
<!--            <span class="btn-right"></span>-->
<!--        </div>-->
<!--        <div class="for-security">-->
<!--            <button>合格证明</button>-->
<!--            <img :src="URL + newgood.pic_qualified" />-->
<!--            <span class="btn-right"></span>-->
<!--        </div>-->
        <div class="for-security">
            <button>产地证明</button>
<!--            <img :src="URL + newgood.pic_place" />-->
            <span>{{newgood.source_code}}</span>
            <span class="btn-right"></span>
        </div>
        <div class="for-security">
            <button>朔源码</button>
            <span>{{newgood.source_code}}</span>
        </div>

    </div>

      <transition  name="fade">
          <div class="coupon_box" v-if="sta">
              <div class="box_main">
                  <div class="box_header">
                      <p class="box_text">领券</p>
                      <span class="box_cross" @click="showCoupon">×</span>
                  </div>
                  <div class="box">
                      <div class="box_body" v-for="(item,index) in couponList" :key="item.id" @click="couponReceive(item.id)">
                          <div class="body_left">
                              <span class="left_money">￥{{item.money}}</span>
                              <span class="left_name">{{item.name}}</span>
<!--                              <p class="left_time">有效期 {{new Date(item.use_start_time * 1000).getFullYear()+'.'+(new Date(Number(item.use_start_time * 1000)).getMonth()+1)+'.'+new Date(Number(item.use_start_time * 1000)).getDate()}} - {{new Date(item.use_end_time * 1000).getFullYear()+'.'+(new Date(Number(item.use_end_time * 1000)).getMonth()+1)+'.'+new Date(Number(item.use_end_time * 1000)).getDate()}}</p>-->
                              <p class="left_time">有效期 {{item.use_start_time}} - {{item.use_end_time}}</p>
                              <span class="body_circle"></span>
                              <span class="body_circle1"></span>
                          </div>
                          <div class="body_right">立即领取</div>
                      </div>
                  </div>
              </div>
          </div>
      </transition>

    <!-- <div class="delevery">
        <p>配送</p>
        <div class="fortwo">
            <span>上海市闵行区浦江镇江凯路199号蕾特</span>
            <span class="btn-right"></span>
        </div>
    </div> -->
    <!-- <div class="freight">
      <p>运费</p>
      <span>在线支付免运费</span>
    </div> -->
    <div class="fenge"></div>
    <!--店铺 -->
    <shop-infor :shopData="shopData" :data="$store.state.commodity_data"></shop-infor>

    <!--    <coupons ></coupons>-->
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
            :panic_price="$store.state.goods.panic_price"
            @sendValue="sendValue"
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
    <!--<div class="load-wrap" v-show="load_wrap" @touchmove.prevent>
      <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
    </div>-->
  </div>
</template>
<script>
    import PrHeader from "@/components/page/children/shop_header.vue"; // 头部
    import prList from "@/components/page/children/list.vue"; //猜你喜欢和搭配套餐
    import FootBtn from "@/components/page/children/footBtn"; // 底部按钮
    import PageOption from "@/components/page/children/pageOption.vue";
    import shopInfor from "@/components/page/children/shopInfor.vue"; // 店铺信息
    import detailOption from "@/components/page/children/detailOptions.vue"; // 立即购买 || 加入购物车 弹框
    import Shopsn from "@/components/page/Shopsn.vue";
    import coupons from '@/components/page/coupons';
    import qs from "qs";
    import {Indicator, Toast} from "mint-ui";
    import { Popup } from "mint-ui";
    import CountDownComponent from "vue2-countdown";
    export default {
        name: "product",
        data() {
            return {
                sta:false,
                couponList: [],
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
                shopData: {},
                popupVisible: false,
                endday: "",
                end: "",
                brand: "",
                finish: false,
                images: [],
                page: 1,
                p_id: 0,
                store__id: 0,
                spec: null,
                newgood:[],
                hdType:1,       //1商品 2评价 3详情
                CtType:0,
                imgsNo: require("@/assets/images/xu_xinxin.png"),
                imgsYes:require("@/assets/images/footer_dianpu.png"),//收藏图标
                day: "",
                hour: "",
                Minute: "",
                second: "",
                sendlist:[]
            };
        },
        created() {
            this.$store.state.const_join = false;
            this.$store.state.catr_number = 0;
            this.$store.state.goods_id = "";
            this.$store.state.matchGood = "";
            this.$store.state.scanID = this.$route.params.id;
            this.$store.state.scanGoodsType = this.$route.query.type;
            this.getDetail();
            this.couponSendList();
        
        },
        methods: {
            showCoupon() {
                this.sta = !this.sta;
            },
            sendValue(spec, id){
                this.spec = spec
                // console.log(this.spec)
            },
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
                this.$store.state.selected = true;
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
                        this.newgood = res.data.data.goods;
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
            myCouponLists() {
                this.axios({
                    url: this.$httpConfig.myCouponLists,
                    method: "get",
                    params: {
                        page: 1,
                        id: this.$route.params.id
                    }
                })
                    .then(res => {
                        this.couponList = res.data.data.records;
                        this.Id = this.$route.params.id;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
           /* couponSendList(){
                this.axios.post(this.$httpConfig.couponSendList,qs.stringify({
                    id: this.$route.params.id
                })).then(res => {
                    this.sendlist = res.data.data;
                }).catch((err =>{
                    console.log(err);
                }))
            },*/
            couponReceive(id) {
                /*let selectedId = this.couponList[id]*/
                this.axios({
                    url: this.$httpConfig.couponReceiveBehavior,
                    method: "get",
                    params: {
                        /*id: selectedId.id*/
                        id:id
                    }
                })
                    .then(res => {
                        Toast({
                            message: res.data.message,
                            position: "bottom",
                            duration: 3000
                        });
                        return;
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
            },

      addCol() {
      //收藏
      if (this.CtType == 2) {            
        this.CtType = 1;
      } else {
        this.CtType = 2;
      }
      this.axios
        .post(
          this.$httpConfig.addCollection,
          qs.stringify({
            goods_id: this.$route.params.id,
            type: this.CtType
          })
        )
        .then(res => {
          if (res.data.status == 10001) {
            this.$router.push("/LogIn");
          } else {
            Toast({
              message: res.data.message,
              position: "bottom",
              duration: 800
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
        },

        // 秒杀
getDetail() {
    /*console.log("秒杀:"+this.$route.params.id);*/
    

      this.axios
        .post(
          this.$httpConfig.panicGoodsDetail,
          qs.stringify({
            // goods_id: this.$route.params.goods_id
            goods_id: this.$route.params.id
          })
        )
        .then(res => {
          if (res.data.status == 1) {
            this.datas = res.data.data.img;
            this.detail = res.data.data;
           /* console.log(res.data.data.end_time)*/
            this.computationTime(res.data.data.end_time);
            this.shopInfo(res.data.data.store_id);
          }
        });
    },
    //计算倒计时或已开抢时间
    computationTime(timestamp) {
      let self = this;
      this.timer = setInterval(function() {
        let t = null;
        var now = new Date();
        var now_Time = now.getTime();
      /*  console.log(timestamp);
        console.log(now_Time);*/
        t = timestamp * 1000 - now_Time;
        let day = Math.floor(t / 86400000);
        let hour = Math.floor(t / 3600000) % 24;
        let min = Math.floor((t / 60000) % 60);
        let sec = Math.floor((t / 1000) % 60);
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        self.day = `${day}`;
        self.hour = `${hour}`;
        self.Minute = `${min}`;
        self.second = `${sec}`;
        if(t<0){
　　　　　　　location.reload();
        }
      }, 1000);
    },



    
    postCollect() {
      this.axios({
        url: this.$httpConfig.myCollection,
        method: "get",
        params: {}
      })
        .then(res => {
          if (res.data.data == "") {    //没有收藏时为空
            this.CtType = 1;              //取消收藏
          } else {
            this.dataCol = res.data.data.goods;
            let cols = this.dataCol;
            for (var i in cols) {
              if (cols[i].goods_id == this.$route.params.id) {
                this.isCol = true;
                this.CtType = 1; 
                break;
              } else {
                this.isCol = false;
                this.CtType = 2;
              }
            }
          }
          this.load = false;
          this.load_wrap = false;
        })
        .catch(err => {
          console.log(err);
        });
        }

        },
        mounted() {
            this.ax();
            this.myLove();
            this.postCollect();
            this.myCouponLists();
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
            CountDownComponent
        }
    };
</script>
<style lang="less" scoped>

  *{
    font-size: 0.3rem;
  }

  .star{
    .el-row
    {
      padding: 0.3rem 0.2rem;
      * {
        font-size: 0.3rem;
      }
      .right{
        /*float: right;*/
        display: block;
      }
    }
  }

  .wholesale-describe{
    background: #ffffff;
    .wholesale-detail{
      display: flex;
      padding: .3rem 0 .1rem .1rem;
      .detail{
        margin: .1rem;
        .price{
          font-size: .5rem;
          color: #FF5000;
          img{
            width: .5rem;
            margin: 0 0 0 .1rem;
          }
        }
        .item-number{
          font-size: .3rem;
          padding: .2rem .11rem 0 0;
          color: #666666;
        }
      }
    }
    .describe{
      font-size: .35rem;
    }

  }

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
    padding-top:0.94rem;
  }

  .describe {
    position: relative;
    /*padding: 0.2rem;*/

    .fn {
      font-size: 0.36rem;
      /*padding-left: .1rem;*/
      color: #333;
      /*width: 7.2rem;*/
      /*padding-top: 0.3rem;*/
      margin: .3rem .2rem .2rem .2rem;
      line-height: 0.5rem;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      span:first-child{
        width: 86%;
          /*padding: .1rem;*/
      }
      span{
        display: inline-block;
      }
      span:last-child{
        line-height: .3rem;
      }
        .for-fav-img1 {
            width: .42rem;
            float: right;
            margin: -1.28rem -0.4rem 0 0.2rem;
        }
        .for_favorite1 {
            float: right;
            margin: -.7rem -.45rem;
        }
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
      font-size: .26rem;
        margin: .5rem 0 0 0;
      .for-p {
        color: #ff5000;
        font-size: 0.47rem;
        padding-left: .2rem;padding-left: .2rem;

      }
      .for-p-sign{
          color: #ff5000;
          font-size: 0.27rem;
      }
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
      .for-fav-img {
          width: .4rem;
          float: right;
          margin-top: -.2rem;
          margin-right:0.3rem;
      }
      .for_favorite {
          float: right;
          margin-top: .28rem;
          margin-right: -.45rem;
          font-size: .24rem;
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

  .diamond{
    background: #fae2cb;
    .bg_gra{
      /*background: linear-gradient(to right, #ff9000, #ff5000);*/
      background: url("../../assets/rec-diamond.png") no-repeat center;
      background-size: cover;
      padding: .1rem .2rem 0.1rem .2rem;
      width: 54%;
      display: inline-block;
      vertical-align: middle;
      .box{
        background: #D25C07;
        display: inline-block;
        border-radius: 0.2rem;
        span:first-child
        {
          padding-bottom: 0;
        }

        span
        {
            width: .8rem;
            padding: 0.1rem;
            color: #fff;
            display: block;
            text-align: center;
            font-size: 0.24rem;
        }
      }
      .price
      {
        display: inline-block;
        span:first-child
        {
          font-size: .36rem;
        }
        span{
          display: block;
          color: #fff;
        }
      }
    }

    .end_time{
      display: inline-block;
    //   padding: 0.4rem 0;
      vertical-align:middle;
        padding-left: .4rem;
      *{
        color: #FF6B00;
      }
      p{
        font-size: 0.26rem;
        padding-bottom: 0.1rem;
      }
      .dayVal{
          text-align:center;
      }
      .bg_org{
          padding: 0.05rem;
          background: #ff6b00;
          color: #fff;
          border-radius: .1rem;
          display: inline-block;
          font-size: .24rem;
      }
    }

  }

  .bg_img
  {
    padding: 0 0.1rem;
    span{
      color: #fff;
      background: url("../../assets/coupon.png") no-repeat center;
      background-size: contain;
      padding: 0.3rem;
      display: inline-block;
    }
  }

  .security, .info
  {
    padding: 0.1rem;
    margin-bottom: 0.1rem;
    span:first-child{
      background: #FAE9E6;
      color: #DC4703;
      padding: 0.05rem;
    }
  }


  .store
  {
    padding: 0.2rem 0.1rem;

    .el-row
    {
      margin-bottom: 0.2rem;
      .img_border
      {
        text-align: center;
        border: 1px solid #e6e6e6;
      }
    }

    .full-width
    {
      width: 100%;
      height: .9rem;
      .division
      {
        width: 31%;
        display: block;
        float: left;
        height: .9rem;
        span
        {
          color: #00C65D;
        }
      }
    }

    .border_left
    {
      padding-left: 2%;
      border-left: 1px solid gray;
    }

    .g_color{
      color: #00C65D;
      border-radius: 1.5rem;
      border: 1px solid #00C65D;
      padding: 0.1rem 0.2rem;
      display: inline-block;
      margin-right: 0.2rem;
    }
  }

  .reviews
  {
    *
    {
      font-size: .3rem;
    }

    .mint-cell-title {
      -webkit-box-flex: 0;
      -ms-flex: 1;
      flex: 0;
    }

    .user_img
    {
      width: 1.2rem;
    }

    .star_img
    {
      width: .5rem;
      height: .5rem;
      float: right;
    }

    .review_user
    {
      padding: 0.2rem 0;
      p{
        margin: 0.2rem 0;
      }
      .review_img
      {
        margin-top: 0.2rem;
        img {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
    }
  }


  .selected {
    span {
      font-size: .3rem;
      color: black;
    }
    border-bottom: .01rem solid #f1f1f1;
    padding: .1rem 0.5rem .1rem 0.2rem;
    min-height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #777;
    position: relative;
    background: #fff;
    border-top: .3rem solid #f1f1f1;
    .number {
      font-size: 0.3rem;
      color: #333;
      padding-left: 0.55rem;
    }
    .btn-right {
      position: absolute;
      right: 0.3rem;
      top: 50%;
      margin-top: -0.15rem;
      width: 0.22rem;
      height: 0.32rem;
    //   background: url(../../assets/btn-right.png) no-repeat;
        background: url(../../assets/security-nextbtn.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .specifications {
      padding: 0.2rem;
      p{
          color: #ff5000;
      }
  }

  .for-discount {
      margin: .3rem .2rem;
    /*margin: .2rem;*/
    /*border-bottom: .01rem solid #F1F1F1;*/
    /*padding-bottom: 0.2rem;*/
    span {
      font-size: .3rem;
      vertical-align: middle;
    }
      .coupon_img {
          background: url("../../assets/coupon.png") no-repeat;
          background-size: 100% 100%;
          width: 2.2rem;
          height: .46rem;
          font-size: .26rem;
          color: #ffffff;
          text-align: center;
          padding-top: .07rem;
          margin: -.46rem 0 0 .8rem;
      }
    .btn-right {
      position: absolute;
      right: 0.3rem;
      /* top: 50%; */
      margin-top: -0.45rem;
      width: 0.22rem;
      height: 0.32rem;
      background: url(../../assets/security-nextbtn.png) no-repeat;
      background-size: 100% 100%;
    }
    img {
      width: 2rem;
      height:0.5rem;
      padding-left: .2rem;
    }
    .for-security {
      margin: .2rem;
        button {
        background: #FAE9E6;
        color: #DC4703;
        border: none;
        width: 1.3rem;
        height: 0.4rem;
        font-size: .26rem;
        margin: 0.07rem 0 0 .6rem;
        border-radius: .05rem;
        }
        img {
        width: 2.7rem;
        // height: 1rem;
        height:0.6rem;
        margin: 0 0 0 .7rem;
          }
        span{
            font-size: .3rem;
            margin: 0 0 0 2.3rem;
        }
        .btn-right {
            width: 0.22rem;
            height: 0.32rem;
            /*margin: .15rem 0 0 0;*/
            margin-top: -.6rem;
            background: url(../../assets/security-nextbtn.png) no-repeat;
            background-size: 100% 100%;
          }
    }
  }

  .coupon_box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
      .box_main {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          background: #fff;
          .box_header {
              padding: .4rem .3rem;
              text-align: center;
              border-bottom: 1px solid #f1f1f1;
              .box_text  {
                  font-size: .34rem;
                  color: #333;
              }
              .box_cross {
                  position: absolute;
                  right: 3%;
                  top: 0.38rem;
                  width: 0.4rem;
                  line-height: 0.34rem;
                  height: 0.4rem;
                  border: 1px solid #bfbfbf;
                  text-align: center;
                  font-size: 0.4rem;
                  color: #bfbfbf;
                  border-radius: 100%;
              }
          }
          .box {
              padding: 0 0 .3rem 0;
              height: 7rem;
              overflow-y: scroll;
              position: relative;
              }
              .box_body {
                  padding: .3rem;
                  margin-bottom: 1.5rem;
                  color: #dc7676;
                  .body_left {
                      background: url(../../assets/background1.png) no-repeat;
                      background-size: 100% 100%;
                      width: 4.57rem;
                      height: 1.8rem;
                      left: 3%;
                      position: absolute;
                      border-right: 2px dotted #dc7676;
                  }
                  .left_money {
                      font-size: .42rem;
                      margin: .2rem;
                      line-height: 1.1rem;
                  }
                  .left_name {
                      font-size: .3rem;
                  }
                  .left_time {
                      font-size: .26rem;
                      margin-left: .26rem;
                  }
                  .body_circle {
                      background: url(../../assets/circle.png) no-repeat;
                      background-size: 100% 100%;
                      position: absolute;
                      width: .3rem;
                      height: .3rem;
                      top: -7%;
                      left: 96.2%;
                      z-index: 1;
                  }
                  .body_circle1 {
                      background: url(../../assets/circle.png) no-repeat;
                      background-size: 100% 100%;
                      position: absolute;
                      width: .3rem;
                      height: .3rem;
                      top: 91%;
                      right: -2.7%;
                      z-index: 1;
                  }
                  .body_right {
                      background: url(../../assets/background2.png) no-repeat;
                      background-size: 100% 100%;
                      width: 2.5rem;
                      height: 1.8rem;
                      right: 3%;
                      position: absolute;
                      font-size: .3rem;
                      color: #dc7676;
                      text-align: center;
                      line-height: 1.8rem;
                  }
              }
          }
      }

.delevery {
  margin: .2rem;
  padding-bottom: .2rem;
  border-bottom: .01rem solid #F1F1F1;
  p {
    font-size: .3rem;
    display: inline-block;
  }
    .fortwo{
            display: inline-block;
    width: 6.4rem;
          span {
            font-size: .35rem;
              width: 5.4rem;
            //   margin: 0 0 0 .8rem;
              display: inline-block;
    vertical-align: middle;
          }
          span:first-child{
              padding-left: 0.3rem;
          }
        .btn-right {
            width: 0.22rem;
            height: 0.32rem;
            // background: url(../../assets/btn-right.png) no-repeat;
            background: url(../../assets/security-nextbtn.png) no-repeat;
            background-size: contain;
            margin-left: 0.25rem;
        }
    }
  }
  .freight {
    margin: .2rem;
    // padding-bottom: .2rem;
    /*border-bottom: .5rem solid #F1F1F1;*/
    p {
      font-size: .3rem;
      display:inline-block;
      vertical-align: middle;
    }
    span {
      font-size: .35rem;
      padding-left: 0.3rem;
      display: inline-block;
    vertical-align: middle;
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
    display: none;
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
