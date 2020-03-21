<template>
    <div class="interest-detail">
        <header class="header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">公益信息</div>
        </header>

        <div class="detail" v-for="(item,index) in articleinfo" :key="item.id">
            <h2 class="title">{{item.intro}}</h2>
            <p class="date">{{item.create_time}}</p>
            <p class="text">{{item.content}}</p>
            <img class="apple" src="../../assets/apple_phone.png">
            <p class="remain">袁天雄54岁了，在中建商品混凝土有限公司一家工厂任厂长，春节快到了，工地还有很多事要等他收尾，手术太耽搁时间。</p>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        name: 'InterestDetail',
        data () {
            return {
                articleinfo:[],
            }
        },
        mounted(){
            this.articleInfo();
        },
        methods: {
            btnGo() {
                this.$router.go(-1);
            },
            articleInfo(){
                this.axios.post(this.$httpConfig.articleInfo,qs.stringify({
                    id:this.$route.params.id
                }))
                    .then(res =>{
                        this.articleinfo = res.data.data;
                    })
                    .catch(err =>{
                        console.log(err);
                    })
            },
        }
    }
</script>

<style scoped lang="less">
    .interest-detail {
        background: #ffffff;
        width: 100%;
        height: auto;
        .header {
            background: #ffffff;
            height: .8rem;
            .btnGo {
                position: absolute;
                margin: .25rem 0 0 .2rem;
                width: .26rem;
                height: .4rem;
                background: url(../../assets/backfind.png) no-repeat;
                background-size: 100% 100%;
            }
            .header-text {
                font-size: .45rem;
                padding: .2rem 0;
                text-align: center;
                color: #333333;
                border-bottom: .03rem solid #f1f1f1;
            }
        }
        .detail {
            margin: .3rem .2rem;
            .title {
                font-size: .4rem;
                padding: .3rem 0;
            }
            .date {
                font-size: .24rem;
                color: #888888;
                padding-bottom: .3rem;
            }
            .text {
                padding-top: .3rem;
                border-top: 1px solid #f1f1f1;
                font-size: .3rem;
                line-height: .6rem;
                color: #666666;
            }
            .apple {
                width: 100%;
                height: 5rem;
                padding: .2rem 0;
            }
            .remain {
                font-size: .3rem;
                line-height: .6rem;
                color: #666666;
                padding-bottom: .3rem;
            }
        }
    }
</style>