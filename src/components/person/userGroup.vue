<template>
    <div>
        <top-header :text="title"></top-header>
        <dl class="content-wrap">
            <dd @click="">
                选择店铺
                <div class="icon-btn"></div>
            </dd>
            <dd @click="Success">
                查看绑定进度
                <div class="icon-btn"></div>
            </dd>
        </dl>
    </div>
</template>

<script>
    import topHeader from '@/components/page/children/header.vue';
    export default {
        name: "userGroup",
        data(){
            return{
                title: '社区团'
            }
        },
        components: {
            topHeader
        }
    }
</script>

<style lang="less" scoped>
    .content-wrap{
        background:#fff;
        dt{
            padding:.2rem;
            height:1.14rem;
            position:relative;
            border-bottom:1px solid #e7e7e7;
            img{
                width:1.14rem;
                height:1.14rem;
                border-radius:100%;
                box-sizing:border-box;
            }
            .user{
                padding-left:.3rem;
                .userId{
                    font-size:.32rem;
                    color:#333;
                    padding-top:.1rem;
                }
                .userName{
                    padding-top:.2rem;
                    font-size:.26rem;
                    color:#999;
                }
            }
            .icon-btn{
                position:absolute;
                top:50%;
                right:.2rem;
                margin-top:-.12rem;
                width:.14rem;
                height:.24rem;
                background:url(../../assets/btn-right.png) no-repeat;
                background-size:100% 100%;
            }
        }
        dd{
            height:.9rem;
            border-bottom:1px solid #e7e7e7;
            position:relative;
            font-size:.32rem;
            color:#3d4245;
            line-height:.9rem;
            padding:0 .2rem;
            .icon-btn{
                position:absolute;
                top:50%;
                right:.2rem;
                margin-top:-.12rem;
                width:.14rem;
                height:.24rem;
                background:url(../../assets/btn-right.png) no-repeat;
                background-size:100% 100%;
            }

        }
        .toPass{
            height:15/100rem;
            background-color: #f1f1f1;
            border: 0;
        }
    }
    .footer{
        height:.9rem;
        position:fixed;
        left:0;
        bottom:0;
        text-align:center;
        line-height:.9rem;
        background: #00c65d;
        color:#fff;
        width:100%;
        font-size:.32rem;
    }
    .footer:active{
        box-shadow: 0 -5px 5px #ccc;
    }
    .mint-popup {
        font-size: 0.28rem;
        background: none;
    }
    .password-wrap {
        width: 7.5rem;
        text-align: center;
        li {
            height: 0.8rem;
            line-height: 0.8rem;
            border-top: 1px solid #ccc;
            box-sizing: border-box;
            color: #26a2ff;
            font-size: 0.3rem;
            background: #fff;
        }
        li:nth-child(3) {
            margin-top: 0.2rem;
        }
    }
</style>
