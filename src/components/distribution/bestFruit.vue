<template>
<div class="bestfruit">
    <header class="bestfruit-header">
        <span @click="btnGo" class="btnGo"></span>
        <div class="header-text">时令水果</div>
    </header>

    <div class="fruit-image">
        <img src="../../assets/fruit-logo.png">
        <div class="fruit-information">
            <swiper :options="swipefruit">
                <swiper-slide class="fruit-detail">
                    <img src="../../assets/fruit1.png">
                    <p class="text">苹果</p>
                </swiper-slide>
                <swiper-slide class="fruit-detail">
                    <img src="../../assets/fruit2.png">
                    <p class="text">梨</p>
                </swiper-slide>
                <swiper-slide class="fruit-detail">
                    <img src="../../assets/fruit3.png">
                    <p class="text">柿子</p>
                </swiper-slide>
                <swiper-slide class="fruit-detail">
                    <img src="../../assets/fruit4.png">
                    <p class="text">山楂</p>
                </swiper-slide>
                <swiper-slide class="fruit-detail">
                    <img src="../../assets/fruit5.png">
                    <p class="text">石榴</p>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>

    <div class="selling-title">热卖推荐</div>

    <div class="best-selling">
        <div class="add-selling">
            <div class="image">
            <img class="under-image" src="../../assets/selling.png">
            <img class="add-image" src="../../assets/add-selling.png">
            <img class="up-image" src="../../assets/1.png">
            </div>
            <div class="text">之灵越南进口红心火龙果 3个装</div>
            <span class="price">￥ 15.90</span>
        </div>
        <div class="add-selling">
            <div class="image">
            <img class="under-image" src="../../assets/selling2.png">
            <img class="add-image" src="../../assets/add-selling2.png">
            <img class="up-image" src="../../assets/2.png">
            </div>
            <div class="text">陕西徐香绿心猕猴桃 5斤装 </div>
            <span class="price">￥ 38.80</span>
        </div>
        <div class="add-selling">
            <div class="image">
            <img class="under-image" src="../../assets/selling3.png">
            <img class="add-image" src="../../assets/add-selling3.png">
            <img class="up-image" src="../../assets/3.png">
            </div>
            <div class="text">优仙果 越南青芒果3斤 玉芒 </div>
            <span class="price">￥ 35.00</span>
        </div>
    </div>

    <div class="selling">
        <div class="add-selling">
            <div class="image">
                <img class="under-image" src="../../assets/selling.png">
            </div>
            <div class="text">之灵越南进口红心火龙果 3个装</div>
            <span class="price">￥ 15.90</span>
        </div>
        <div class="add-selling">
            <div class="image">
                <img class="under-image" src="../../assets/selling2.png">
            </div>
            <div class="text">陕西徐香绿心猕猴桃 5斤装 </div>
            <span class="price">￥ 38.80</span>
        </div>
        <div class="add-selling">
            <div class="image">
                <img class="under-image" src="../../assets/selling3.png">
            </div>
            <div class="text">优仙果 越南青芒果3斤 玉芒 </div>
            <span class="price">￥ 35.00</span>
        </div>
    </div>

    <div class="cart-title">猜你喜欢</div>

    <div class="selling-cart" v-for="n in 3">
        <div class="display-cart">
            <div class="image">
                <img class="under-image" src="../../assets/sell-cart.png">
            </div>
            <p class="text">越南进口红心火龙果 4个装 单果约330-420g</p>
            <span class="price">￥66</span>
            <span class="discount-price"><strike>￥99</strike></span>
        </div>
        <div class="display-cart">
            <div class="image">
                <img class="under-image" src="../../assets/sell-cart1.png">
            </div>
            <p class="text">水果 蒲江猕猴桃奇异果 金果黄心猕猴桃 10粒装</p>
            <span class="price">￥19</span>
            <span class="discount-price"><strike>￥99</strike></span>
        </div>
    </div>
</div>
</template>

<script>
import bestFruit from '@/components/distribution/bestFruit.vue';

export default {
    name: 'bestFruit',
    data(){
        return{
            swipefruit: {
                slidesPerView: 5,
                spaceBetween: 15,
                pagination: {
                    el: '.swiper-pagination',
                }
            },
        }
    },
    components:{
        bestFruit,
    },
    methods:{
        btnGo(){
            this.$router.go(-1);
        }
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
            width: .30rem;
            height: .46rem;
            background: url(../../assets/backfruit.png) no-repeat;
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
            height: 23%;
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
        display: flex;
        .add-selling{
            background: #ffffff;
            margin: 0 .15rem;
            padding: .1rem;
            width: 3rem;
            .image{
                height: 2.3rem;
                .under-image{
                    width: 2rem;
                    height: 1.9rem;
                    margin: .2rem 0 0 0;
                }
                .add-image{
                    width: .55rem;
                    margin: -2.15rem 0 0 0;
                }
                .up-image{
                    width: .15rem;
                    margin: -2.15rem 1.5rem 0 .2rem;
                }
            }
            .text{
                font-size: .28rem;
            }
            .price{
                font-size: .28rem;
                color: red;
                line-height: .7rem;
            }
        }
    }

    .selling{
        display: flex;
        margin: .2rem 0 0 0;
        .add-selling{
            background: #ffffff;
            margin: 0 .15rem;
            padding: .1rem;
            width: 3rem;
            .image{
                height: 2.3rem;
                .under-image{
                    width: 2rem;
                    height: 1.9rem;
                    margin: .2rem 0 0 0;
                }
            }
            .text{
                font-size: .28rem;
            }
            .price{
                font-size: .28rem;
                color: red;
                line-height: .7rem;
            }
        }
    }

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
            width: 5rem;
            height: 5.2rem;
            margin: .1rem .2rem .1rem .2rem;
            img{
                width: 3.35rem;
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