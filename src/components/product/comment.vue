<template>
    <div class="container">
        <!-- <Cheader></Cheader> -->
<!-- 头部 -->
<!-- <Prheader></Prheader> -->
        <div v-title data-title="商品详情" >>商品详情</div>
    <!-- 头部 -->
        <pr-header :text="title" :projectId="hdType"></pr-header>
            <div class="pr-tab-wrap">
                <div class="comment-wrap">
<!--                    <ul>-->
<!--                        <li @click="conActiveClick(index)" v-for="(item,index) in conName" :key="index" :class="{conActive: index== comIndex}">-->
<!--                            <span>{{item}}</span>-->
<!--                            <p v-if="index ==0">{{commenData.allcount}}</p>-->
<!--                            <p v-if="index ==1">{{commenData.nice}}</p>-->
<!--                            <p v-if="index ==2">{{commenData.height}}</p>-->
<!--                            <p v-if="index ==3">{{commenData.bad}}</p>-->
<!--                            <p v-if="index ==4">{{commenData.image}}</p>-->
<!--                        </li>-->
<!--                    </ul>-->
                    <div v-if="dataItem.length == 0" class="center">暂无评论</div>
                    <div v-else class="list-wrap" v-for="item in dataItem" :key="item.id">
                        <div class="list-hd clearfix">
                            <div class="pull-left fl">
                                <!-- <img src="../../../assets/user-d.jpg"> -->
                                <img src="../../assets/user-d.jpg" alt="">
                                <span >{{item.user_name}}</span>
                            </div>
                            <div class="pull-right fr">
                                <img v-for = 'n in parseInt(item.score)' :key = 'n' :src="imgYes">
                                <img v-for = 'n in 5-parseInt(item.score)' :key ='n' :src="imgNo">
                            </div>
                        </div> 
                        <div class="list-purTimer Pt0" style="heighjt:100px;">{{timeConvert(item.create_time,'Y/M/D h:m:s')}}</div>

                        <div class="list-com">{{item.content}}</div>
                        <div class="list-img-main clearfix" >
                            <img :class="{'active':isChoose}"  @click="imgScc" :src="URL + items.path" class="fl" v-for="items in item.img" :key="items.id">
                        </div> 
                           
                        <!-- <div class="list-purTimer">{{item.goods_apace[0].speName}}&nbsp;&nbsp;&nbsp;{{item.goods_apace[0].item }} &nbsp;&nbsp;&nbsp;{{Number(item.create_time)|formatDate}}</div> -->
                    </div>
                </div>
            </div>

        <!-- <div class="comment_section" v-if="true">
            <div class="comment_body" v-for="(user,index) in users" :key="index"> 
                <div class="user_account">
                    <img src="../../assets/user-d.jpg" class="profile" alt="profile">
                    <span class="user_name">{{user_name}}</span>
                    <div class="collect">
                        <img :src="imgsNo" alt class="rating"/>
                        <img :src="imgsNo" alt class="rating"/>
                        <img :src="imgsNo" alt class="rating"/>
                        <img :src="imgsNo" alt class="rating"/>
                        <img :src="imgsNo" alt class="rating"/>
                    </div>
                </div>
                <div class="comment">
                    <span class="comment_date">2019.3.23.09:13</span>
                    <span class="product_amount">1kg 装</span>
                    <div class="comment_text">
                        颜色是我想象中的颜色，非常完美。
                    </div>
                    <div class="comment_items">
                        <img src="../../assets/jade.jpg" alt="">
                    </div>
                    <div class="comment_items">
                        <img src="../../assets/jade.jpg" alt="">
                    </div>
                    <div class="comment_items">
                        <img src="../../assets/jade.jpg" alt="">
                    </div>
                </div> 

            </div> 
       </div>
        <div class="no-comment" v-else>
            <div class="text">{{data.message}}</div>
        </div> -->
    </div>
</template>
<script>
// import Cheader from "@/components/page/children/comment_header.vue"; // 头部

import PrHeader from "@/components/page/children/shop_header.vue";    //头部
import { Toast } from 'mint-ui';

export default {
    data() {
        return  {
            user_name:'小小',
            users: [1,2,3,4,5],
            imgsNo: require("@/assets/images/xu_xinxin.png"),
            imgsYes: require("@/assets/images/star_angle.png"),
            // data:[],
            hdType:2,        //1商品 2评价 3详情
            page:1,
            // conName:['全部评价', '好评', '中评', '差评', "有图"],

                imgNo:require('@/assets/images/xinxin.png'),
                imgYes:require('@/assets/images/xu_xinxin.png'),
                selected:"1",
                title:'商品详情',
                number:'0',
                data:'',
                commenData:'',
                dataItem:'',
                scrollWatch:true,
                page:1,
                comIndex :0,
                conName:['全部评价', '好评', '中评', '差评', "有图"],
                comId:1,
                product:'',
                problem:'',
                load:false,
                load_wrap:true,
                attrData:'',
                imgText:'',
                text:'',
                sonState:false,
                specData:'',
                isChoose:false
        }
    },
    components: {
        PrHeader
        // Cheader
    
    },
    mounted(){



    
   this.comContent();
        // this.getcomment();
        // this.load_wrap =false;
            
            // document.body.scrollTop = 0;
            // this.imgTextAjax()

     

    },
    methods:{
        getcomment(){
            // this.axios.post(this.$httpConfig.getGoodsCommentContent)
              this.axios({
                    url:this.$httpConfig.getGoodsCommentContent,
                    method:'POST',
                    params:{
                        goods_id:this.$route.params.id,
                        // status:1,
                        // status:4,
                        page:this.page
                    }
                })
                .then(res => {
                    if(res.data.data === null){
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    }
                    else{
                        this.data = res.data.data;
                    }
                })
                .catch(e => {console.log(e)})
        },


        lookMore(id){
                this.$router.push({
                    name:'answerDetails',
                    params:{
                        id:1
                    }
                })
            },
            formatTime(t){
                var time = new Date(Number(t) * 1000);
                var Y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                return (Y + "-" + m + "-" + d);
            },
            imgScc(){
                this.isChoose = !this.isChoose  
            },  
            // 提交咨询
            proSubmit(){
                if(!this.problem){
                     Toast({
                        message: '请输入咨询内容',
                        position: 'bottom',
                        duration: 1000
                    });
                    return;
                }
                this.axios.post(this.$httpConfig.userCommitProblem,QS.stringify({
                    goods_id:this.$route.params.id,
                    content:this.problem
                })).then((res) => {
                     Toast({
                        message:res.data.message,
                        position: 'bottom',
                        duration: 1000
                    });
                    if(res.data.status == 1){
                        this.problem=''
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
             // 图文详情请求
            imgTextAjax(){
//              this.load = true;
                this.axios.post(this.$httpConfig.getGoodsDetail,
                   QS.stringify({
                        goods_id:this.$route.params.id,
                    })
                ).then((res) => {
                    this.load = false;
                    if(res.data.status == 1){
                        this.imgText = this.intoHtml(res.data.data)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 咨询列表
            productAjax(){
                this.load = true;
                this.axios({
                    url:this.$httpConfig.goodsProblems,
                    method:'get',
                    params:{
                        goods_id:this.$route.params.id,
                        p:this.page
                    }
                }).then((res) => {
                    this.load = false;
                    if(res.data.status == 1){
                        this.product = res.data.data.records;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 规格参数getGoodsAttr
            GoodsAttr(){
//              this.load = true;
                this.axios.post(this.$httpConfig.getGoodInfo,
                	QS.stringify({
                		 id:this.$route.params.id,
                	})
                ).then((res) => {
                    this.load = false;
                    if(res.data.status == 1){
                        this.attrData = res.data.data;
//                      this.specData = res.data.data.spec;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // tab切换
            conActiveClick(index){
                if(index == this.comIndex)return
                this.comIndex = index
                switch(this.comIndex){
                     case 0:
                        this.comId = 4;
                        this.load = true;
                        break;
                    case 1:
                        this.comId = 3;
                        this.load = true;
                        break;
                    case 2:
                        this.comId = 2;
                        break;
                    case 3:
                        this.comId = 1;
                        break;
                    case 4:
                        this.comId = 5;
                        break;
                    }
                    this.comContent()
            },
            //评论
            comContent(){
                console.log("获取评论")
                this.load = true;
                 this.axios({
                    url:this.$httpConfig.getAllCommentContent,
                    method:'get',
                    params:{
                        goods_id:this.$route.params.id,
                        status:4,
                        page:this.page
                    }
                }).then((res) => {
                    this.load = false
                    if(res.data.status==1){
                    	 this.dataItem= res.data.data.records;
                    }
                   
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 评价数量
            commentAjax(){
                this.axios({
                    url:this.$httpConfig.getAllCommentsCount,
                    method:'get',
                    params:{
                        goods_id:this.$route.params.id,
                        page:1
                    }
                }).then((res) => {
                    this.load = false
                    this.commenData = res.data.data;

                }).catch((err) => {
                    console.log(err);
                });
            },
            intoHtml(str) {
                var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
                return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
            },

          formatNumber(n){        //数据转化  
                  n = n.toString()  
                return n[1] ? n : '0' + n  
            },
            timeConvert(number,format){
                console.log("时间转换")
                // let time = val;

                var formateArr  = ['Y','M','D','h','m','s'];  
                var returnArr   = [];  
                
                var date = new Date(number * 1000);  
                returnArr.push(date.getFullYear());  
                returnArr.push(this.formatNumber(date.getMonth() + 1));  
                returnArr.push(this.formatNumber(date.getDate()));  
                
                returnArr.push(this.formatNumber(date.getHours()));  
                returnArr.push(this.formatNumber(date.getMinutes()));  
                returnArr.push(this.formatNumber(date.getSeconds()));  
                
                for (var i in returnArr)  
                {  
                    format = format.replace(formateArr[i], returnArr[i]);  
                }  
               
                console.log(format) 
                 return format; 


            }
          
        },
         destroyed(){
            this.scrollWatch = false;
        },
        watch: {
            selected:function(){
                switch(this.selected){
                    case '1':
                        this.imgTextAjax()
                        break;
                    case '2':
                        this.GoodsAttr();
                        break;
                    case '3':
                        this.commentAjax()
                        this.comContent()
                        break;
                    case '4':
                        this.productAjax()
                        break;
                    }
            }
    }
}
</script>


<style lang="less">
    .container {
        background: #fff;
        padding-top:0.937rem;
    }
.comment_section{
    border:1px solid;
    /*margin-top: 1rem;*/
    .comment_body {
        margin: .5rem 0.2rem 0 .2rem;
        align-items: center;
    .user_account {
        align-items: center;
        display: flex;
        .user_name{
            flex: 1;
            margin-left: .1rem;
        }
        .collect {
            /*margin-right: .3rem;*/
            .rating{
                width: .3rem;
                height: .3rem;
                padding-right: .05rem;
            }
        }
    }
    .comment {
        margin-top: .1rem;
        color: #999;
        padding-bottom: .2rem;
        border-bottom: 1px solid #f1f1f1;
        .product_amount{
            padding: .1rem;
            margin-left: .2rem;
        }
        .comment_text{
            padding-top: .1rem;
            color: #000;
            font-size: .3rem;
            margin-bottom: .1rem;
        }
    }
}
}


.profile{
    border-radius: 50%;
}
.comment_items{
    display:inline-block;
	height:80px;
	width:80px;
    img{
        display:inline-block;
        margin-top:5px;
        width: 100%;
        border-radius: 10%;
    }
}
    .no-comment{
        padding-top:2.55rem;
        padding-bottom:1rem;
        background:#f1f1f1;
        img{
            width: 3.5rem;
            height: 2.68rem;
            margin: 0 0 0 2.3rem;
        }
        .text{
            padding-top:.4rem;
            font-size:.4rem;
            color:#666;
            margin: 0 0 0 2.7rem;
        }
    }

</style>
<style lang="less">
    .pr-tab-wrap{
        background:#f1f1f1;
        .list-main{
            padding-top:.1rem;
        }
        #pic_article  img {
            width: 100%;
        }
        .mint-tab-item{
            .mint-tab-item-label{
                color:#333;
                font-size:.3rem;
                line-height:.75rem;
            }
        }
        .mint-tab-item.is-selected{
            .mint-tab-item-label{
                color:#333;
            }
        }
        .mint-navbar{
            height:.75rem;
            background:#fff;
            line-height:.75rem;
            .mint-tab-item{
                height:100%;
                padding:0;
                border-color:#d02629;
                line-height:.75rem;
            }
        }
        .center{
            text-align: center;
            line-height: 10rem;
            font-size: .5rem;
        }
        .list-wrap{
            padding-top:.2rem;
            li{
                padding:.25rem .2rem;
                border-bottom:1px solid #e7e7e7;
                background:#fff;
                .title{
                    width:2.28rem;
                    font-size:.28rem;
                    color:#696969;
                }
                .con{
                    width:4.8rem;
                    font-size:.26rem;
                    color:#333;
                    line-height:.36rem;
                    text-align: right;
                }
                .pTitle{
                	width: 2rem;
                	/*height: 1rem;*/
                	float: left;
                	font-size: .25rem;
                	color: rgb(123,123,123);
                }
                span{
                	display: block;
                	width: 4.5rem;
                	float: left;
                	line-height: 150%;
                	font-size: .25rem;
                	color: #333333;
                }
            }
            .list-com{
                padding-top:0.1rem;
                height:1rem;
                font-size:.32rem;
                display: -webkit-box;
                overflow: hidden;
                white-space: normal!important;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
        .comment-wrap{
            ul{
                height: 105/100rem;
                display: flex;
                li{
                    width: 20%;
                    height: 100/100rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    span{
                        color:#B9B9B9;
                        font-size: 32/100rem;
                        margin-bottom:10/100rem;
                    }
                    p{
                        font-size: 28/100rem;
                    }
                }
                .conActive{
                    border-bottom: 5/100rem solid #d02629;
                }
            }
            h2{
                padding:0 .2rem;
                height:.88rem;
                font-size:.32rem;
                line-height:.88rem;
                background:none;
                color:#333;
                span{
                    font-size:.32rem;
                    color:#f9781e;
                }
            }
            .list-wrap{
                width:7.1rem;
                padding:0 .2rem;
                min-height:3.5rem;
                background:#fff;
                margin-bottom:.1rem;
                .list-hd{
                    padding:.2rem 0;
                    line-height:.32rem;
                    height:.3rem;
                    .pull-left{
                        padding-left:.46rem;
                        font-size:.2rem;
                        color:#b0b0b0;
                        position:relative;
                        img{
                            width:.68rem;
                            height:.68rem;
                            position:absolute;
                            left:0;
                            top:0;
                        }
                        span{
                            margin-left: 0.4rem;
                            padding-top: 0.13rem;
                            display: inline-block;
                            color:#000;
                            font-size: .3rem;
                        }
                    }
                    .pull-right{
                        color:#999;
                        font-size:.26rem;
                        padding-top:0.1rem;
                        img{
                            width: 30/100rem
                        }
                    }
                }
                .list-img-main{
                    position:relative;
                    padding-bottom:0.2rem;
                    // height:1rem;
                    img{
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 10%;
                        margin-right:.2rem;
                        transform: scale(1);            /*图片原始大小1倍*/
                        transition: all ease 0.5s;      /*图片放大所用时间*/
                    }
                    img.active {     
                        transform: scale(3);          /*图片需要放大3倍*/
                        position: absolute;           /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
                        z-index: 100;
                        left:calc(40%-0.1rem);
                        top:calc(10%-0.1rem);
                        
                    } 
                }
                .list-purTimer{
                    padding-top:.25rem;
                    font-size:.25rem;
                    color:#999;
                    .Pt0{
                        padding-top:0;
                    }
                }
            }
        }
        .list-img-wrap{
            background:#fff;
            margin-top:.2rem;
            img{
                width:100%;
            }
        }
    }
</style>
 <style lang="less" scoped>
     .product{
        margin-top:20/100rem;
        margin-bottom: 1.2rem;
        li{
            background-color: #fff;
            padding:10/100rem 20/100rem;
            margin-bottom: .2rem;
            .use_area_head{
                margin-bottom: .18rem;
                height: .7rem;
                line-height: .7rem;
                color: #666;
                font-size: .24rem;
                em{
                    font-style: normal;
                }
                .g_ask_time{
                    color:#666;
                    font-size:.24rem;
                }
            }
            .pro{
                font-weight: 700;
                margin-bottom:.05rem;
                span{
                    background-color: #CA9B27;
                    
                }
            }
            .color_grey{
                color: #999;
            }
            p{
                color: #333;
                font-size: .32rem;
                margin-bottom:.1rem;
                font-size: 32/100rem;
                line-height: 65/100rem;
            }
            .g_icon{
                font-size: 28/100rem;
                padding: 6/100rem;
                border-radius: 5/100rem;
                color:#fff;
                background-color: #97CD93;
            }
            .g_look_more{
                font-size:.24rem;
                color:#3985ff;
                text-align:right;
            }
            .g_look_more::after {
                content: "";
                display: block;
                width: 8px;
                height: 8px;
                border-top: 1px solid #3985ff;
                border-left: 1px solid #3985ff;
                -webkit-transform-origin: 50%;
                transform-origin: 50%;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
                margin: -2px 0 0 5px;
                display: inline-block;
                vertical-align: middle;
            }
        }
        
    }
    .btm{
        width:100%;
        height:100/100rem;
        background-color: #fff;
        display: flex;
        padding:15/100rem;
        box-sizing: border-box;
        position: fixed;
        bottom:0;
        input{
            border-radius: 15/100rem;
            width: 615/100rem;
            height: 70/100rem;
            background-color:#F1F1F1;
            order: 0;
            outline: none; 
            margin-right:20/100rem;
            padding:20/100rem;
            font-size: 24/100rem;
        }
        h6{
            font-size: 36/100rem;
            line-height: 60/100rem;
            color: #D77649;
        }
    }
</style>

