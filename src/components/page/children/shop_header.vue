<template>
    <div class="teacher-main">
        <header class="header">
            <span @click="btnGo" class="btnGo"></span>
            <!--{{text}}-->
            <div class="left">
                <span class="title" :class=" hdType == 1 ? 'titleActive':''" @click="product">
                    商品
                </span>
                <span class="title" :class=" hdType == 2 ? 'titleActive':''" @click="comm">
                    评价
                </span>
                <span class="title" :class=" hdType == 3 ? 'titleActive':''" @click="shopDetails">
                    详情
                </span>
            </div>
            <img class="right" src="../../../assets/share.png" alt="Share PNG">
        </header>
<!--        <div class="hd-active"></div>-->
    </div>
</template>
<script>
    import qs from 'qs';

    export default {
        name : 'shop-header',
        data(){
            return {
                sta:false,
                ruleCon:null,
                hdType:0
               
            }
        },
        props:{
            text:null,
            store_id: null,
            // number:null,
            btn:null,
            search:null,
            rule:null,
            btnDel:null,
            sea:null,
            set:null,
            title:'',
            id:'',
            delData:null,
            fooptStatus:null,
            checklist:'',
            projectId:''
        },
        mounted(){
            this.getData();
        },
        methods:{
            btnGo(){
                this.$router.go(-1);
                // this.$router.replace('/Home')
            },
            product(){
                this.$router.push({
                    name: "product",
                    params: {
                        params: {
                            id: this.$route.params.id,
                            status: this.$route.params.status
                        }
                    }
                })
            },
            comm(){
                this.$router.push({
                    name: "comment",
                    path: '/comment/:id/:status',
                    params: {
                        id: this.$route.params.id,
                        status: this.$route.params.status
                    }
                })
            },
            shopDetails()
            {
                // this.$router.push({
                //     name: "shopDetails",
                //     params: {
                //         id: this.$route.params.id,
                //         status: this.$route.params.status
                //     }
                // })
                // 不在商品页面时
                
                console.log(document.getElementById("detailsSite"));
                if(!document.getElementById("detailsSite")){
                    console.log("no")
                    this.$router.push({
                    name: "product",
                    params: {
                        params: {
                            id: this.$route.params.id,
                            status: this.$route.params.status
                        }
                    }
                    
                })
                setTimeout(function(){
                let czval = $("#detailsSite").offset().top;
                document.querySelector("body").scroll(0,czval-40); 
                },500)
                }else{
                    console.log("off")
                let czval = $("#detailsSite").offset().top;
                document.querySelector("body").scroll(0,czval-40); 
                }

                
            },
            getData(){
                this.hdType = this.projectId;
                // console.log(this.hdType);
                // console.log("id="+this.$route.params.id+"status: "+this.$route.params.status);
            }

        }
        
    }
</script>
<style lang="less" scoped>
.teacher-main{
    height: 0.937rem;
    border-bottom: 1px solid #f1f1f1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    background: #fff;
}
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .hd-active{
        width: 100%;
        height: .62rem;
        padding: .16rem 0;
    }
    .header {
        width: 100%;
        height: .62rem;
        padding: .16rem 0;
        text-align:center;
        position:relative;
        color:#000;
        font-size:.36rem;
        line-height:.62rem;
        /*position:fixed;*/
        top:0;
        left:0;
        z-index:1;

        .left{
            display: inline-block;
                border: 1px solid #d6d6d6;
                    border-radius: .1rem;
                    overflow: hidden;
            .title
            {
                // background: #787878;
                padding: 0.1rem 0.3rem;
                font-weight: 400;
                font-size: .36rem;
            }
            // .title:first-child
            // {
                // color: #ffff;
                // background: #787878;
                // border-top-left-radius: .1rem;
                // border-bottom-left-radius: .1rem;
            // }
            .titleActive{
                color: #ffff;
                background: #787878;
            }
            // .title:nth-child(2)
            // {
                // border-top-right-radius: .1rem;
                // border-bottom-right-radius: .1rem;
            // }
            // .title:last-child{
                // background: none;
            // }
        }

        img{
            display: inline-block;
    // float: right;
    position:absolute;
    right: .2rem;
    width: 0.5rem;
    height: 0.5rem;
    margin-top: 0.05rem;
        }

        .integral-title{
            font-size: .32rem;
            color:#fff;
            .icon{
                display:inline-block;
                width: .27rem;
                height: .16rem;
                background:url(../../../assets/bottom-btn-icon.png) no-repeat;
                background-size:100% 100%;
                margin-left:.1rem;
            }
        }
        .input-main {
            width: 5.4rem;
            height: 100%;
            border-radius: 100px;
            background: rgba(255, 255, 255, .3) url(../../../assets/search1.png) no-repeat .24rem center;
            background-size: .26rem .27rem;
            line-height:100%;
            margin-left:1rem;
            input {
                height: 100%;
                width: 100%;
                border: none;
                background: none;
                text-indent: .7rem;
                font-size: .26rem;
                color: #fff;
                outline: none;
            }
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
                color: #fff;
            }
            input:-moz-placeholder, textarea:-moz-placeholder {
                color: #fff;
            }
            input::-moz-placeholder, textarea::-moz-placeholder {
                color: #fff;
            }
            input:-ms-input-placeholder, textarea:-ms-input-placeholder {
                color: #fff;
            }
        }
        .rule{
            position:absolute;
            right:1rem;
            top:0;
            height: 100%;
            line-height:1rem;
            font-size:.28rem;
        }
        .rule:active{
            text-shadow: 0 0 5px #ccc;
        }
        .box-wrap{
            position:fixed;
            width: 100%;
            height: 100%;
            left:0;
            top:0;
            z-index:99;
            .box-bg{
                position:absolute;
                left:0;
                top:0;
                width: 100%;
                height: 100%;
                z-index:1;
            }
            .bomb-box{
                background:#535353;
                padding:.11rem;
                box-sizing: border-box;
                position: absolute;
                right:.15rem;
                top:.8rem;
                border-radius:5px;
                z-index:99999;
                .polygon{
                    width: .4rem;
                    height: .4rem;
                    position:absolute;
                    top:0;
                    left:.8rem;
                    transform: rotate(45deg);
                    background:#535353;
                }
                .btn:nth-child(2){
                    border-bottom:1px solid #666;
                    .icon{
                        i{
                            width: .24rem;
                            height: .24rem;
                            background:url(../../../assets/home.png) no-repeat;
                            background-size:100% 100%;
                        }
                    }
                }
                .btn:nth-child(3){
                    border-top:1px solid #444;
                    .icon{
                        i{
                            width: .24rem;
                            height: .24rem;
                            background:url(../../../assets/news1.png) no-repeat;
                            background-size:100% 100%;
                        }
                    }
                }
                .btn{
                    width: 1.1rem;
                    height: .56rem;
                    box-sizing: border-box;
                    text-align:center;
                    line-height: .56rem;
                    position:relative;
                    padding-left:.5rem;
                    font-size:.24rem;
                    .icon{
                        position:absolute;
                        left:0;
                        top:0;
                        width: .56rem;
                        height: 100%;
                        margin:0;
                        border:none;
                        background:none;
                        i{
                            position:absolute;
                            left:0%;
                            top:0%;
                            bottom:0;
                            right:0;
                            margin:auto;
                        }
                    }
                }
            }
        }
       .for_img {
           width: 3rem;
           margin-top: .1rem;
       }
        .btnGo{
            position:absolute;
            left:.2rem;
            top:50%;
            margin-top:-0.15rem;
            // width:.3rem;
            // height:.46rem;
            width: 0.26rem;
    height: 0.36rem;
            background:url(../../../assets/backauction.png) no-repeat;
            background-size:100% 100%;
        }
        .cartBtn{
            position:absolute;
            right:1.2rem;
            top:50%;
            margin-top:-.23rem;
            width:.6rem;
            height:.46rem;
            background:url(../../../assets/cart.btn.png) no-repeat;
            background-size:100% 100%;
            em{
                position:absolute;
                right:-.1rem;
                top:-.05rem;
                background:#ff883f;
                color:#fff;
                font-size:.21rem;
                font-style:normal;
                height:.33rem;
                line-height:.23rem;
                padding:.05rem;
                border-radius:100%;
                box-sizing:border-box;
                min-width:.33rem;
            }
        }
        .service{
            line-height:.62rem;
            position:absolute;
            top:50%;
            right:.2rem;
            margin-top:-.31rem;
            font-size:.2rem;
            color:#fff;
        }
        .btn-ng{
            position:absolute;
            top:0;
            right:.2rem;
            height: 100%;
            span{
                display:block;
                width:.12rem;
                height:.12rem;
                border:.06rem solid #fff;
                border-radius:50%;
                box-sizing:border-box;
                margin-left:.1rem;
                margin-top:.44rem;
            }
        }
        .btn-search{
            width:.44rem;
            height:.45rem;
            position:absolute;
            top:50%;
            right:1rem;
            background:url(../../../assets/search.png) no-repeat;
            background-size:100% 100%;
            margin-top:-.225rem;
        }
        .btn-delete{
            position:absolute;
            top:50%;
            right:.2rem;
            margin-top:-.205rem;
            width: .41rem;
            height: .41rem;
            background:url(../../../assets/delete.png) no-repeat;
            background-size:100% 100%;
        }
        .btn-del{
            position:absolute;
            top:50%;
            right:1rem;
            margin-top:-.205rem;
            width: .41rem;
            height: .41rem;
            background:url(../../../assets/delete.png) no-repeat;
            background-size:100% 100%;
        }
        .btn-del.active{
            background:none;
            width: .6rem;
            margin-top:-.3rem;
        }
    }
</style>
