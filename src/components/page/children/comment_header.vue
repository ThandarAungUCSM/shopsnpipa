<template>
    <div class="container aaaa">
        <div class="header_comment">
            <span @click="btnGo" class="btnGo"></span>
            评价
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            title: '评论'
        }
    },
    methods: {
        btnGo() {
            this.$router.go(-1);
        }
    }
}
</script>
<style>
.header_comment {
        width: 100%;
        height: .62rem;
        border-bottom: 1px solid #f1f1f1;
        padding: .16rem 0;
        text-align:center;
        color: black;
        font-size:.36rem;
        line-height:.62rem;
        /*position:fixed;*/
        top:0;
        left:0;
        z-index:1;
        /*background: #fff;*/
    }
    .btnGo{
        position:absolute;
        left:.2rem;
        /* margin-top: .15rem; */
        margin-top: 0.13rem;
        width: 0.26rem;
        height: 0.36rem;
        background:url(../../../assets/btn-return.png) no-repeat;
        background-size:100% 100%;
    }
</style>
