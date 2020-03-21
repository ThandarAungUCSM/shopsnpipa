<template>
    <div class="find-page">
        <header class="find-header">
            <div class="header-text">发现</div>
        </header>

        <div class="swipe-img">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="n in 3" :key="n">
                    <img src="../../assets/find-logo.png">
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <div class="nav">
            <div
                    @click="active = 'something'; classActive(9)"
                    class="search-title"
                    :class="active_color === 9 ? 'green' : ''"
            >
                新闻资讯
            </div>
            <div
                    v-for="(item, index) in searchData"
                    @click="callPage(item.config_value); active = item.id; classActive(index)"
                    class="search-title"
                    :class="active_color === index ? 'green' : ''"
            >
                {{item.title}}
            </div>
        </div>

        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
            <mt-tab-container-item id="something">
                <div>
                    <div class="interest-information" v-for="(item,index) in cartlist" :key="item.id">
                        <span class="title-name" @click="nextinformation(item.id)">{{item.name}}</span>
                        <div class="feedback">
                            <div class="cart">
                                <img src="../../assets/comment-information.png">
                                <div class="cart-information">
                                    <div class="text">华为Mate 30再见！荣耀V30：你好， 价格更吃香</div>
                                    <div class="date">19 /03 /18</div>
                                </div>
                            </div>
                            <div class="all-detail">
                                <div class="detail">.平民一样玩AJ！盘点新款AJ1：颜值到位，价格亲民</div>
                                <div class="detail">.CBA新赛季本土球员五个位置得分王都是谁？他们能真</div>
                                <div class="detail">.AJ跳票王要回归了！玩家已经做好准备，静待入手</div>
                                <div class="detail">.平民一样玩AJ！盘点新款AJ1：颜值到位，价格亲民</div>
                                <div class="detail">.CBA新赛季本土球员五个位置得分王都是谁？他们能真</div>
                                <div class="detail">.AJ跳票王要回归了！玩家已经做好准备，静待入手</div>
                            </div>
                        </div>
                    </div>
                </div>

            </mt-tab-container-item>
            <mt-tab-container-item
                    v-for="search in searchData"
                    :id="search.id"
                    :key="search.id"
            >
                <div class="full-height" v-html="tabContent"></div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        data(){
            return{
                searchData: [],
                active: 'something',
                announcement: [],
                cartlist:[],
                tabContent: '',
                active_color: 9,
            }
        },
        components:{

        },
        mounted(){
            this.discoverLinks();
            this.announce();
            this.categoryLists();
        },
        methods:{
            classActive(index){
                this.active_color = index
            },
            btnGo(){
                this.$router.go(-1);
            },
            // HomeIndex/discoverLinks
            discoverLinks(){
                this.axios.post(this.$httpConfig.discoverLinks)
                    .then(res => {
                        this.searchData = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            categoryLists(){
                this.axios.get(this.$httpConfig.categoryLists)
                    .then(res => {
                        this.cartlist = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            announce(){
                this.axios.post(this.$httpConfig.home)
                    .then(res => {
                        this.announcement = res.data.data.announcement;
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            callPage(link){
                this.tabContent = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true" src="'+link+'"></iframe>';
            },
            nextinformation(id){
                this.$router.push({
                    name:'InterestInformation',
                    params:{id:id}
                })
            }
        },
    }
</script>

<style scoped lang="less">
    .green{
        color: #00C65D;
        border-bottom: 2px solid #00C65D;
    }
    .mint-tab-container-wrap {
        padding: .2rem;
        border-top: .1rem solid #E1E1e1;
        background: #fff;
    }
    .find-page{
        .find-header {
            background: #ffffff;
            .header-text {
                font-size: .45rem;
                padding: .15rem 0;
                text-align: center;
                color: #333333;
                border-bottom: .03rem solid #f1f1f1;
            }
        }
        .swipe-img{
            background: #ffffff;
            border-bottom: .25rem solid #f1f1f1;
            height: 3rem;
            .mint-swipe {
                padding: .2rem .1rem 0 .17rem;
                width: 95%;
                height: 2.6rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .nav{
            display: flex;
            background: #ffffff;
            padding: .1rem .2rem 0 .2rem;
            /*margin: .2rem;*/
            .search-title {
                padding: .2rem .2rem .3rem .2rem;
                width: 22%;
                display: inline-block;
                font-size: .28rem;
                text-align: center;
                font-weight: 500;
            }
            .active{
                color: #00C65D;
                border-bottom: .05rem solid #00C65D;
            }
        }
        .full-height{
            height: 100vh;
        }
        .interest-information{
            margin-top: .3rem;
            font-size: .35rem;
            background: #f1f1f1;
            .title-name{
                padding: 0 0 0 .4rem;
                font-size: .35rem;
            }
        }
        .feedback{
            background: #ffffff;
            margin-top: .3rem;
            .cart{
                display: flex;
                padding: .4rem .2rem .4rem .1rem;
                border-bottom: .02rem solid #f1f1f1;
                margin: 0 .1rem;
                img{
                    width: 2.2rem;
                }
                .cart-information{
                    padding: .2rem 0 0 .4rem;
                    .text{
                        font-size: .3rem;
                        padding: 0 0 .4rem 0;
                        line-height: .5rem;
                    }
                    .date{
                        font-size: .28rem;
                        color: #888888;
                    }
                }
            }
            .all-detail{
                padding: .3rem .1rem .5rem .2rem;
                .detail{
                    font-size: .30rem;
                    line-height: .5rem;
                }
            }
        }
        .add{
            padding: .3rem .5rem;
            font-size: .35rem;
        }
    }
</style>