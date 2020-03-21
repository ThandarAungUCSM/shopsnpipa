<template>
    <div class="bestfruit">
        <header class="bestfruit-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">{{$store.state.class_name}}</div>
        </header>

        <div class="fruit-image">
            <img :src="URL + $store.state.pic_url">
            <div class="fruit-information">
                <swiper :options="swipefruit">
                    <swiper-slide
                        class="fruit-detail"
                        v-for="sub in subCat.class_two"
                        :key="sub.id"
                        :id="sub.id"
                        @click.native="getUserClassGoods(sub.id)"
                    >
                        <img :src="URL + sub.pic_url">
                        <p class="text">{{sub.class_name}}</p>
                    </swiper-slide>
                    <!--<swiper-slide class="fruit-detail">
                        <img src="../../../assets/fruit1.png">
                        <p class="text">苹果</p>
                    </swiper-slide>
                    <swiper-slide class="fruit-detail">
                        <img src="../../../assets/fruit2.png">
                        <p class="text">梨</p>
                    </swiper-slide>
                    <swiper-slide class="fruit-detail">
                        <img src="../../../assets/fruit3.png">
                        <p class="text">柿子</p>
                    </swiper-slide>
                    <swiper-slide class="fruit-detail">
                        <img src="../../../assets/fruit4.png">
                        <p class="text">山楂</p>
                    </swiper-slide>
                    <swiper-slide class="fruit-detail">
                        <img src="../../../assets/fruit5.png">
                        <p class="text">石榴</p>
                    </swiper-slide>-->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>

        <div class="selling-title">热卖推荐</div>

<!--        <div class="best-selling">-->
<!--            <div class="add-selling" v-for="subGoods in subCateGoods">-->
<!--                <div class="image">-->
<!--                    <img class="add-image" src="../../../assets/add-selling.png">-->
<!--                    <img class="under-image" src="../../../assets/selling.png">-->
<!--&lt;!&ndash;                    <img class="up-image" src="../../../assets/1.png">&ndash;&gt;-->
<!--                </div>-->
<!--                <div class="text">之灵越南进口红心火龙果 3个装</div>-->
<!--                <span class="price">￥ 15.90</span>-->
<!--            </div>-->
<!--        </div>-->
        <div class="best-selling">
            <div class="add-selling"
                 v-for="subGoods in subCateGoods"
                 :key="subGoods.id"
                 :id="subGoods.id"
                 @click="enterDetail(subGoods, 'default')">
                    <img v-if="subGoods.img" class="add-image" :src="URL + subGoods.img">
                    <p class="rank">{{subGoods.rank}}</p>
                    <img class="under-image" :src="URL + subGoods.pic_url">
                  <!--  <img class="up-image" src="../../../assets/1.png">-->
                <div class="text">{{subGoods.title}}</div>
                <span class="price">￥{{subGoods.price_market}}</span>

            </div>
        </div>

        <div class="cart-title">猜你喜欢</div>

        <div class="selling-cart">
            <div class="display-cart" v-for="item in guessFruits" :key="item.id" :id="item.id">
                <div class="image">
                    <img class="under-image" :src="URL + item.pic_url">
                </div>
                <p class="text">{{item.title}}</p>
                <span class="price">￥ {{item.price_market}}</span>
                <span class="discount-price"><strike>￥ {{item.price_member}}</strike></span>
            </div>
        </div>
    </div>
</template>

<script>
    import bestFruit from '@/components/distribution/bestFruit.vue';

    export default {
        name: 'subCategories',
        data(){
            return{
                swipefruit: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },
                subCat: [],
                guessFruits: [],
                subCateGoods: []
            }
        },
        components:{
            bestFruit,
        },
        mounted(){
            this.secondClass();
            this.getGuessYouLike();
            this.getUserClassGoods();
        },
        methods:{
            btnGo(){
                this.$router.go(-1);
            },
            secondClass(){
                this.axios({ url: this.$httpConfig.secondClass,
                        method: 'get',
                        params: {class_id : this.$route.params.class_id}
                    })
                    .then(res => {
                        this.subCat = res.data.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getGuessYouLike(){
                this.$HTTP(this.$httpConfig.guessYouLike,{page:1},"post").then(res=>{
                    this.guessFruits = res.data.data;
                }).catch(err=>{
                    console.log(err);
                })
            },
            getUserClassGoods(class_id){
                this.axios({
                    url: this.$httpConfig.getUserClassGoods,
                    method: 'get',
                    params: {
                        // page: 1,
                        class_two: class_id,
                        // sort_field: 'sales_sum'
                        id : this.$route.params.id,
                        goods_id: this.$route.params.goods_id,
                    }
                })
                    .then(res => {
                        this.subCateGoods = res.data.data;
                    })
                    .catch(e => {
                        console.log(e)
                    })
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
        },
    }

</script>

<style scoped lang="less">
    .bestfruit{
        background: #F1F1F1;
        .bestfruit-header {
            height: .8rem;
            display: flex;
            padding: .1rem .1rem 0 .1rem;
            background: #ffffff;
            .btnGo {
                position: absolute;
                margin: .15rem;
                width: .28rem;
                height: .42rem;
                background: url(../../../assets/backfruit.png) no-repeat;
                background-size: 100% 100%;
            }

            .header-text {
                font-size: .45rem;
                padding: 0 1rem 0 2.8rem;
                color: #333333;
            }
        }
        .fruit-image{
            background: #ffffff;
            margin: .04rem 0 0 0;
            img{
                width: 95%;
                height: 20%;
                margin: .2rem .18rem .2rem .18rem;
            }
            .fruit-information{
                height: 2rem;
                margin: 0 .1rem 0 0;
                img{
                    width: 1rem;
                    height: 1rem;
                }
                .text{
                    font-size: .26rem;
                    text-align: center;
                }
            }
        }

        .selling-title{
            font-size: .4rem;
            background: #fff;
            margin: .2rem 0;
            height: .5rem;
            padding: .3rem .2rem;
        }

        .best-selling{

            .add-selling{
                background: #ffffff;
                margin: .15rem 0 .15rem .15rem;
                padding: .1rem;
                width: 28%;
                display: inline-block;

                    .under-image{
                        width: 2rem;
                        height: 1.9rem;
                        padding-bottom: .1rem;
                        /*margin: .6rem 0 0 0;*/
                    }
                    .add-image{
                        width: .5rem;

                    }
                    .up-image{
                        width: .13rem;
                        margin: -2.5rem 1.5rem 0 0.19rem;
                    }
                    .rank{
                        height: .7rem;
                        margin: -0.43rem 0 0 0.18rem;
                        color: white;
                    }

                .text{
                    font-size: .28rem;
                    height: .75rem;
                    overflow: hidden;
                }
                .price{
                    font-size: .28rem;
                    color: red;
                    line-height: .7rem;
                }
            }
        }

        /*.selling{*/
        /*    display: flex;*/
        /*    margin: .2rem 0 0 0;*/
        /*    .add-selling{*/
        /*        background: #ffffff;*/
        /*        margin: 0 .15rem;*/
        /*        padding: .1rem;*/
        /*        width: 3rem;*/
        /*        .image{*/
        /*            height: 2.3rem;*/
        /*            .under-image{*/
        /*                width: 2rem;*/
        /*                height: 1.9rem;*/
        /*                margin: .2rem 0 0 0;*/
        /*            }*/
        /*        }*/
        /*        .text{*/
        /*            font-size: .28rem;*/
        /*        }*/
        /*        .price{*/
        /*            font-size: .28rem;*/
        /*            color: red;*/
        /*            line-height: .7rem;*/
        /*        }*/
        /*    }*/
        /*}*/

        .cart-title{
            font-size: .4rem;
            background: #fff;
            margin: .2rem 0;
            height: .5rem;
            padding: .3rem .2rem;
        }

        .selling-cart{
            display: flex;
            .display-cart{
                background: #ffffff;
                /*width: 5rem;*/
                width: 46%;
                height: 5.5rem;
                border-radius: .15rem;
                margin: .1rem .2rem .1rem .2rem;
                img{
                    width: 3.445rem;
                }
                .text{
                    font-size: .28rem;
                    padding: .2rem;
                    line-height: .4rem;
                }
                .price{
                    font-size: .33rem;
                    color: red;
                    padding: .2rem;
                }
                .discount-price{
                    font-size: .2rem;
                    color: #888888;
                }
            }
        }
    }
</style>
