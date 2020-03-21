<template>
    <div>
<!--        <div v-title :data-title="title">{{title}}</div>-->
<!--        <newHeader :text="title" :set="true"></newHeader>-->
        <header class="header">
            <span @click="btnGo" class="btnGo"></span>
            <p class="title">{{title}}</p>
        </header>
        <list></list>

        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import newHeader from '@/components/page/children/header.vue';
    import list from '@/components/page/children/news_list.vue';
    import qs from 'qs';
    export default {
        name : 'news_list',
        data(){
            return {
                title:'我的消息',
                load_wrap:true
            }
        },
        components:{
            newHeader,
            list
        },
        methods: {
            btnGo(){
                this.$router.go(-1);
            }
        },
        mounted(){
            this.axios.post(this.$httpConfig.Newslist,qs.stringify({
                page:1
            }))
            .then((res) => {
                if(res.data.status==10001){
                    this.$router.push('/LogIn');
                }else{
                    this.load_wrap = false;
                    if(res.data.status == 1){
                        this.$store.state.news_data = res.data.data.records;
                        this.load_wrap = false;
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
</script>
<style scoped lang="less">
    .header {
        height: .95rem;
        background: #00c65d;
        .btnGo {
            position: absolute;
            left: .2rem;
            top: 3%;
            margin-top: -.15rem;
            width: .28rem;
            height: .42rem;
            background: url(../../assets/backauction.png) no-repeat;
            background-size: 100% 100%;
        }
        .title {
            font-size: .32rem;
            color: #ffffff;
            text-align: center;
            padding-top: .3rem;
        }
    }

</style>