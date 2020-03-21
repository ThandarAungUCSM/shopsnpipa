<template>
    <div class="coupons">
        <!--Coupon-->
        <button class="allCoupons" @click="showAllCoupons()">显示所有优惠券</button>

        <swiper>
            <swiper-slide v-for="c in cLists.list" :key="c.id">
                <el-row class="coupon">
                    <el-col :span="14">
                        <p class="money"> <span class="moneySign">￥</span> <span class="moneyValue">{{c.money}}</span></p>
                        <span>有效时间</span>
                        <p class="time">{{c.use_start_time}}  至  {{ c.use_end_time }}</p>
                    </el-col>
                    <el-col :span="10">
                        <p class="condition">立即领劵</p>
                        <p>满  {{c.condition}}</p>
                    </el-col>
                </el-row>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: "coupons",
        data(){
            return{
                cLists: []
            }
        },
        props: ['id'],
        mounted() {
            this.CouponLists();
        },
        methods: {
            CouponLists(){
                var params = { store_id: this.id };
                this.$HTTP(this.$httpConfig.myCouponLists, params, "post")
                    .then(res => {
                        this.cLists = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            showAllCoupons() {
                this.$router.push({
                    name: "allCoupons",
                    params: {
                        allCoupon: this.cLists.list
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">

    .coupons
    {
        padding-bottom: 0.2rem;
        .allCoupons
        {
            border-radius: 0.5rem;
            display: flex;
            display: -ms-flexbox;
            display: -webkit-flex;
            background-color: #d02629;
            color: #fff;
            border: none;
            padding: 0.2rem 0.4rem;
            margin-left: auto;
            margin-top: 0.2rem;
            font-size: 14px;
        }
        .swiper-container
        {
            height: 2.5rem;
            .coupon
            {
                background: url("../../assets/coupon.png") no-repeat center;
                background-size: cover;
                height: 2.5rem;
                margin: 10px;
                color: #fff;
                .el-col
                {
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    padding: 0.5rem 0.2rem;
                    .money
                    {
                        padding-bottom: 0.2rem;
                        .moneySign
                        {
                            font-size: 14px;
                            font-weight: 500;
                        }
                        .moneyValue
                        {
                            font-size: 22px;
                            font-weight: 700;
                        }
                    }
                    .time
                    {
                        padding: 0.2rem 0;
                    }
                    .condition
                    {
                        padding-bottom: 0.2rem;
                        font-size: 18px;
                        font-weight: 500;
                    }
                }
            }
        }
    }

</style>