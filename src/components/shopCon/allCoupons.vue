<template>
    <div>
        <list-header :set="true" :text="text"></list-header>
        <el-row class="coupon" v-for="c in allCoupons" :key="c.id">
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
    </div>
</template>




<script>
    import listHeader from '@/components/page/children/header.vue'; //头部
    export default {
        name: "allCoupons",
        data(){
            return {
                text: "优惠券",
                allCoupons: this.$route.params.allCoupon
            }
        },
        components: {
            listHeader
        }
    }
</script>

<style scoped lang="less">
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
</style>