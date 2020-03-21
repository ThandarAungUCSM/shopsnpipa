<template>
    <div class="flash-wrap">
         <!-- 快讯 -->
        <div class="index_flash">
            <div class="index_flash_logo">
<!--                <span class="i_f_l_text" id="title_name">{{title_name}}</span>-->
<!--                <span class="i_f_l_img"></span>    -->
                <p class="i_f_l_p">生鲜</p>
                <p class="i_f_l_p2">头条</p>
                <button class="i_f_l_btn">热门</button>
            </div>
            <div class="box-wrap">
                <ul class="scroll_box" ref="scroll_box" >
                   <li  v-for="item in data" :key="item.id" @click="hit(item.id)">{{item.title}}</li>
                </ul>
            </div>
        </div>
           <!-- 快捷链接 -->
        <div class="main">
            <div class="title fl">商品分类
                <img class="title_padding-left" src="../../../assets/padding-left.png">
                <img class="title_padding-right" src="../../../assets/padding-right.png">
            </div>
            <div class="index_Ctrl">
                <swiper :options="swiper_valuegoods">
                    <swiper-slide
                        v-for="(item,index) in nav"
                        :key="index"
                        v-on:click.native="subCate(item.id, item.class_name, item.pic_url)"
                        class="index_swiper"
                    >
                        <img class="swiper_img" :src="URL + item.pic_url" alt="">
                        <p class="swiper_text">{{item.class_name}}</p>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs"
    export default {
        name: 'newsflash',
        data() {
            return {
                title_name: this.$constant.mainName,
                link: null,
                swiper_valuegoods: {
                    slidesPerView: 5,
                    spaceBetween:25
                },
            }
        },
        props:{
            data:null,
            nav:null
        },
        mounted(){
            this.scroll_box();
        },
        methods: {
            linkTo(link,index){
                this.link = link.substring(link.lastIndexOf('/'));
                location.href = "http://localhost:8087" + this.link;
                // location.href = link;
            },
            subCate(class_id, class_name, pic_url){
                this.$store.state.class_name = class_name;
                this.$store.state.pic_url = pic_url;
                // console.log(this.$store.state.class_name );
                this.$router.push({
                    name: 'subCategories',
                    params: {class_id}
                })
            },

            scroll_box(){
                var count = 0,
                    clear = null;
                clear = setInterval(() => {
                    count ++;

                    if(this.$store.state.home_data.announcement && count >= this.$store.state.home_data.announcement.length){
                        count = 0;
                    }
                    if(this.$refs.scroll_box){
                        this.$refs.scroll_box.style.top = -count * 0.55 +'rem';
                    }
                },2000);
            },
            hit(id){
            	this.$emit('hit',id)
            },

        }
    }
</script>
<style lang="less" scoped>
    .flash-wrap{
        background:#f2f2f2;
        .flash-dt{
            width:100%;
            height:.59rem;
            padding:.1rem 0;
            border-bottom:1px solid #eaf0f4;
            background:#fff;
            .flash-news{
                width:1.3rem;
                height:100%;
                position:relative;
                border-right:2px dotted #ccc;
                line-height: .59rem;
                font-size:.32rem;
                color:#111;
            }
            .flash-content{
                position: relative;
                width:4.8rem;
                height:100%;
                padding:0 .2rem;
                line-height:.59rem;
                font-size:.28rem;
                color:#333;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                border-right:1px dotted #ccc;
                em{
                    display:inline-block;
                    width: .28rem;
                    height: .28rem;
                    background:url(../../../assets/icon1.png) no-repeat;
                    background-size:100% 100%;
                    margin-right:.2rem;
                    margin-top: .16rem;
                }
                .scroll_box{
                    width: 4.5rem;
                    height: .59rem;
                    position: absolute;
                    left:.7rem;
                    top:-.1rem;
                    transition: 1s all ease;
                    li{
                        font-size: .2rem;
                        line-height: .59rem;
                    }
                }
            }
            .flash-more{
                width:.8rem;
                height:.59rem;
                text-align:center;
                line-height:.59rem;
                font-size:.28rem;
                color:#797979;
            }
        }
        .flash-dd{
            width:100%;
            padding-top:.27rem;
            background:#fff;
            border-bottom:1px solid #eaf0f4;
            li{
                width:25%;
                text-align:center;
                img{
                    width:1.26rem;
                    height:1.26rem;
                }
                p{
                    font-size:.28rem;
                    color:#333;
                    padding:.2rem 0;
                    line-height:100%;
                    font-weight:400;
                    font-size:.28rem;
                    color:#333;
                }
            }
        }
        .container-main{
            width:100%;
            height:2.33rem;
            background:#fff;
        }
    }
    .main{
        background-color: #ffffff;
        width: 97%;
        height: 2.4rem;
        padding: 0.2rem 0 .2rem .2rem;
        overflow: hidden;

    .title {
        /*border-left: 3px solid #d02629;*/
        /*border-right: 3px solid #f1f1f1;*/
        padding-left: 0.2rem;
        padding-right: .2rem;
        font-size: 0.32rem;
        color: #000;
        margin-left: 2rem;
        font-weight: bold;

        .title_padding-left {
            width: .45rem;
            height: .3rem;
            float: left;
            padding: .08rem .2rem 0 0;
        }

        .title_padding-right {
            width: .45rem;
            height: .3rem;
            float: right;
            padding: .08rem 0 0 0.2rem;
        }
    }
         .index_Ctrl{
           /*width: 100%;*/
             padding: .6rem 0 .2rem 0;
             height: 1.8rem;
         .index_swiper {
             height: 1.8rem !important;
             width: 1.1rem !important;
             margin-right: .45rem !important;
             }
           .swiper_img {
               width: .9rem;
               height: .9rem;
               border-radius: .9rem;
               margin: .3rem 0 .2rem 0;
           }
           .swiper_text {
               font-size: .24rem;
               color: #666666;
           }
        }
    }
    .index_flash{
        /*width: 100%;*/
        height: 0.8rem;
        background-color: #fff;
        overflow: hidden;
        margin: .2rem;
        border-radius: .15rem;
        .index_flash_logo{
            width: 2rem;
            height: 0.55rem;
            /*border-right:1px dashed #DEDEDE;*/
            margin-top: 0.1rem;
            float: left;
            margin-left: 0.2rem
        }
        .i_f_l_text{
            width: 1rem;
            height: 0.55rem;
            display: block;
            float: left;
            font-size: 0.3rem;
            line-height: 0.55rem;
        }
        .i_f_l_img{
            width: 0.87rem;
            height: 0.45rem;
            display: block;
            float: left;
            margin-top: 0.05rem;
            background-image: url("../../../assets/images/jj@3x.png");
            background-size: 100% 100%;
            text-indent: 0.24rem;
            font-size: 0.27rem;
            color: #fff;
            line-height: 0.43rem;
        }
        .i_f_l_p {
            font-size: .3rem;
            color: #00C65D;
            margin: 0.16rem 0 0 0;
            font-weight: 500;
        }
        .i_f_l_p2 {
            font-size: .3rem;
            color: #000;
            margin: -0.3rem 0 0 0.6rem;
            font-weight: bold;
        }
        .i_f_l_btn {
            width: .5rem;
            height: .3rem;
            background: #FFF1F1;
            border: none;
            font-size: .2rem;
            color: #FF4900;
            margin: -.3rem 0 0 1.3rem;
            border-radius: .08rem;
        }
        .box-wrap{
            position: relative;
            width: 4.05rem;
            height: 0.55rem;
            margin-top: 0.12rem;
            float: left;
            margin-left: 0.2rem;
            overflow: hidden;
            .scroll_box{
                position: absolute;
                left:0;
                top:0;
                transition: 1s all ease;
            }
        }
        .scroll_box li{
            width: 4.05rem;
            height: 0.55rem;
            line-height: 0.55rem;
            font-size: 0.26rem;
            color: #666666;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            display: block;
            cursor: pointer;
        }
        .More{
            width: 0.75rem;
            height: 0.55rem;
            display: block;
            float: right;
            margin-top: 0.12rem;
            border-left:1px dashed #DEDEDE;
            text-align: right;
            line-height: 0.55rem;
            color:#797979;
            font-size: 0.28rem;
            margin-right: 0.2rem
        }
    }
</style>
