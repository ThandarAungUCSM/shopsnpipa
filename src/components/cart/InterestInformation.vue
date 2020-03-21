<template>
    <div class="interest-information">
        <header class="information-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">公益信息</div>
        </header>
        <div class="cart" @click="detail(item.id)" v-for="(item,index) in articlelist" :key="item.id">
            <img src="../../assets/interested1.png">
            <div class="cart-information">
                <div class="text">{{item.intro}}</div>
                <div class="date">{{item.create_time}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        name: 'InterestInformation',
        data(){
            return{
                articlelist:[],
            }
        },
        components:{

        },
        mounted(){
            this.articleLists();
        },
        methods:{
            btnGo(){
                this.$router.go(-1);
            },
            articleLists(){
                this.axios.post(this.$httpConfig.articleLists,qs.stringify({
                    id:this.$route.params.id
                }))
                    .then(res => {
                        this.articlelist = res.data.data.records;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            detail(id){
                this.$router.push({
                    name:'InterestDetail',
                    params:{id:id}
                })
            },
        }
    }
</script>

<style lang="less">
    .interest-information{
        background: #ffffff;
        .information-header{
            .btnGo {
                position: absolute;
                margin: .3rem .2rem;
                width: .28rem;
                height: .42rem;
                background: url(../../assets/interest-information.png) no-repeat;
                background-size: 100% 100%;
            }
            .header-text {
                font-size: .40rem;
                padding: .2rem 0;
                text-align: center;
                color: #333333;
                border-bottom: .03rem solid #f1f1f1;
            }
        }
        .cart{
            display: flex;
            padding: .2rem .2rem .2rem .1rem;
            border-bottom: .025rem solid #f1f1f1;
            margin: 0 .1rem;
            img{
                width: 2rem;
            }
            .cart-information{
                padding: .15rem 0 0 .4rem;
                .text{
                    font-size: .3rem;
                    padding: 0 0 .25rem 0;
                    line-height: .5rem;
                }
                .date{
                    font-size: .28rem;
                    color: #888888;
                }
            }
        }
    }
</style>