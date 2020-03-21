<template>
  <div class="box">
    <div class="header" >
        <img v-show="shopData.store_logo" :src="URL+shopData.store_logo" alt="">
            <h4>{{shopData.shop_name}}</h4>
            <h6 class="description">{{shopData.description}}</h6>
    </div>
    <ul class="cotent">
        <li>
            <h4>{{shopData.goodsNumber}}</h4>
            <p>全部宝贝</p>
        </li>
         <li>
            <h4>{{shopData.store_collect}}</h4>
            <p>关注人数</p>
        </li>
         <li>
            <p>描述相符: <span>{{shopDetailData.deliverycredit}}</span></p>
            <p>服务态度: <span>{{shopDetailData.desccredit}}</span></p>
            <p>发货速度: <span>{{shopDetailData.servicecredit}}</span></p>
        </li>
    </ul>
    <div class="footer">
        <div @click="toShopList">查看分类</div>
        <div @click="toShop">进店逛逛</div>
    </div>
      <div class="for-view">
          <span>用户评价 （{{dataItem.length}}）</span>
          <span class="for-right" @click="comm">查看全部</span>
          <span class="btn-right" @click="comm"></span>
      </div>
    
      <div class="part-postBox">
      
      <div v-if="dataItem.length == 0" class="center">暂无评论</div>
      <div v-else class="card-post" v-for="item in dataItem" :key="item.id">
           <div class="part-post">
               <img class="for-cute" src="../../../assets/user-d.jpg" alt="">
               <!-- <img class="for-cute" src="../../../assets/images/cute-img.png" alt=""> -->
               <span>{{item.user_name}}</span>
               <span class="fRight">
                        <i v-for = 'n in parseInt(item.score)' :key = 'n' class="el-icon-star-on"></i>
                        <i v-for = 'n in 5-parseInt(item.score)' :key ='n' class="el-icon-star-off"></i>      
                   <!-- &lt;!&ndash;<img v-if="item.score != 0" v-for="sco in item.score" src="../../assets/images/sh@2x.png" alt/>&ndash;&gt;

                    &lt;!&ndash;<img v-if="item.score != 5" v-for="score in (5 - item.score)" src="../../assets/images/kx@2x.png" alt/>&ndash;&gt;
                   <span v-if="star">
                        <i  v-if="star != 0" v-for="n in 5" class="el-icon-star-on"></i>
                   </span>
                   <i v-else v-for="n in 5" class="el-icon-star-off"></i> -->

               </span>
               <!-- <img class="for-star" src="../../../assets/images/star.png" alt=""> -->
           </div>

          <div class="for-num1">
              <span>{{timeConvert(item.create_time,'Y/M/D h:m:s')}}
                  <!-- <span class="for-1kg">1kg装</span> -->
              </span>
              <p>{{item.content}}</p>
              <img :src="URL + items.path" v-for="items in item.img" :key="items.id">
          </div>

        </div>
    </div>
          <!-- 模板 -->
<div class="card-post" >
          <!-- <div class="part-post-sec">
              <img class="for-cute" src="../../../assets/images/yello.png" alt="">
              <span>心***界</span>
              <span class="fRight">
                   <i class="el-icon-star-on"></i>
                   <i class="el-icon-star-off"></i>
                   <i class="el-icon-star-off"></i>
                   <i class="el-icon-star-off"></i>
                   <i class="el-icon-star-off"></i>
               </span>
          </div>
          <div class="for-num1">
              <span>2019.3.23.09:13
                  <span class="for-1kg">1kg装</span>
              </span>
              <el-row :gutter="20">
                  <el-col :span="6">
                      <div class="grid-content bg-purple">
                          <p>草莓没得说，</p>
                          <img src="../../../assets/images/second-png.png" alt="">
                      </div>
                  </el-col>
                  <el-col :span="6">
                      <div class="grid-content bg-purple">
                          <p>味道很不错，</p>
                          <img src="../../../assets/images/third-png.png" alt="">
                      </div>
                  </el-col>
                  <el-col :span="6">
                      <div class="grid-content bg-purple">
                          <p>酸酸甜甜的，</p>
                      </div>
                  </el-col>
                  <el-col :span="6">
                      <div class="grid-content bg-purple">
                          <p>女票很喜欢！</p>
                      </div>
                  </el-col>
              </el-row>
          </div> -->
          <div class="for-text" id="detailsSite">
              <span @click="active = 'tab-container1'" :class="this.active == 'tab-container1' ? 'textActive':''">商品介绍</span>
<!--              <span @click="active = 'tab-container2'" :class="this.active == 'tab-container2' ? 'textActive':''">规格参数</span>-->
<!--              <span @click="active = 'tab-container3'" class="for-last" :class="this.active == 'tab-container3' ? 'textActive':''">包装售后</span>-->
          </div>
          <mt-tab-container class="page-tabbar-tab-container" v-model="active">  <!--swipeable-->
              <mt-tab-container-item id="tab-container1">
                  <div v-html="goodsDetail" class="goods-detail"></div>
                  <!-- <div class="for-screen"> -->
                      <!--              <img style="width: 7.6rem;" src="../../../assets/images/orange.png" alt="">-->
                      <!-- <h1>Hello</h1> -->
                  <!-- </div> -->
                  <!-- <div class="for-big_orange">
                      <el-row>
                          <el-col :span="12">
                              <div class="grid-content">
                                  <img src="../../../assets/images/big-orange.png" alt="">
                              </div>
                          </el-col>
                          <el-col :span="12">
                              <div class="grid-content1">
                                  <div>note: polite</div>
                                  <div>note: politertyuijhgftf</div>
                                  <div>note: politertyuijhgftf</div>
                                  <div>note: politertyuijhgftf</div>
                              </div>
                          </el-col>
                      </el-row>
                  </div>
                  <div class="four-piece">
                      <div>home <span>/</span> </div>
                      <div>about <span>/</span> </div>
                      <div>contact <span>/</span> </div>
                      <div>phone <span>/</span> </div>
                  </div>
                  <div class="for-three-img">
                      <h3>orange image</h3>
                      <div class="for-img">
                          <div class="one-img">
                              <img src="../../../assets/images/oran1.png" alt="">
                              <button>orange</button>
                          </div>
                          <div class="one-img">
                              <img src="../../../assets/images/oran2.png" alt="">
                              <button>orange</button>
                          </div>
                          <div class="one-img">
                              <img src="../../../assets/images/oran3.png" alt="">
                              <button>orange</button>
                          </div>
                      </div>
                  </div>
                  <div class="next-orange">
                      <h3>orange image</h3>
                      <img src="../../../assets/images/oran4.png" alt="">
                  </div>
                  <div class="border-image">
                      <img src="../../../assets/images/oran5.png" alt="">
                  </div>
                  <div class="straight-img">
                      <h3>three orange</h3>
                      <img src="../../../assets/images/nnnn.png" alt="">
                      <img src="../../../assets/images/oran7.png" alt="">
                      <img src="../../../assets/images/oran8.png" alt="">

                  </div> -->
              </mt-tab-container-item>
              <mt-tab-container-item id="tab-container2">
                  <table class="content-wrap">
                      <tr>
                          <td class="t_width">商品编号</td>
                          <td></td>
                      </tr>
                      <tr>
                          <td colspan="2">主体</td>
                      </tr>
                      <tr>
                          <td class="t_width">货存条件</td>
                          <td></td>
                      </tr>
                      <tr>
                          <td class="t_width">数量</td>
                          <td></td>
                      </tr>
                      <tr>
                          <td class="t_width">单位</td>
                          <td></td>
                      </tr>
                      <tr>
                          <td class="t_width">净含量</td>
                          <td>{{ specGoods.weight }}</td>
                      </tr>
                      <tr>
                          <td class="t_width">保质期</td>
                          <td></td>
                      </tr>
                  </table>
              </mt-tab-container-item>
              <mt-tab-container-item id="tab-container3">
                  <mt-cell v-for="n in 2" title="tab-container 1" :key = "n"></mt-cell>
              </mt-tab-container-item>
          </mt-tab-container>

      </div>

  </div>
</template>
<script>
    import qs from 'qs'
export default {
    data () {
        return {
            shopDetailData: '',
            specGoods: [],
            shopdetail:[],
            active: 'tab-container1',
            goodsDetail: '',
            dataItem:'',
            imgNo:require('@/assets/images/xinxin.png'),
            imgYes:require('@/assets/images/xu_xinxin.png'),
            page:1,
        }
    },
    props:{
        shopData: Object,
        data:''
    },
    updated(){
        $('.goods-detail').find('img').css('width', '100%');
    },
    mounted(){
        this.getGoodsSpec();
        this.getGoodsDetail();
        this.comContent();


    },
    created() {
            this.axios.post(this.$httpConfig.shopDetails, qs.stringify({
                    id: parseFloat(2)
                })
            ).then(res => {
                this.shopDetailData = res.data.data;
            })
    },
    methods: {
        getGoodsDetail(){
            this.axios.post(this.$httpConfig.getGoodsDetail, qs.stringify({
                goods_id: this.$route.params.id
            }))
                .then(res => {
                    this.goodsDetail = res.data.data;
                    // console.log(res.data.data)
                })
                .catch(e => {console.log(e)})
        },
        toShopList(){
          event.stopPropagation();
          this.$router.push({path:'/shoplist/1'})
        },
        toShop(){
            this.$router.push({
                name:"shopHome",
                params:{
                id:this.data.goods.store_id,
                index:0
            }})
        },
        getGoodsSpec(){
            this.axios.post(this.$httpConfig.getGoodsSpec, qs.stringify({
                id: this.$route.params.id
            }))
                .then(res => {
                this.specGoods = res.data.data
                })
                .catch(e => { console.log(e) })
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
    }
}
</script>
<style lang="less" scoped>
    .mint-tab-container
    {
        /*padding-bottom:.1rem;*/
        width: 100%;
        .goods-detail{
            margin-top: -.4rem;
        }
        .goods-detail img{
            width: 100%;
            /deep/ p{
                /deep/ img{
                    width: 100% !important;
                }
            }
        }
    }


    .fRight{
        float: right;
    }

    .box{
        .header{
            height: 1.2rem;
            display: flex;
            border-top:1/100rem solid #F1F1F1;
            padding:25/100rem 0 0 0;
            position: relative;
            img{
                margin: 0 25/100rem 0 20/100rem;
                width: 95/100rem;
                height: 95/100rem;
                border:1/100rem solid #F1F1F1;
            }
            h4{
                font-size: 36/100rem;
                margin-bottom: 10/100rem;
            }
            h6.description{
                margin: .6rem 0 0 -1.4rem;
                color:#989898;
                font-size: .24rem;
                display: -webkit-box;
								overflow: hidden;
								white-space: normal!important;
								text-overflow: ellipsis;
								word-wrap: break-word;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
            }
        }
        .cotent{
            display: flex;
           li{
                width: 254/100rem;
                height: 115/100rem;
                border-right: 1/100rem solid #F1F1F1;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
           }
           h4{
               font-size: 32/100rem;
               margin-bottom:7/100rem;
           }
           p{
           		margin: 3px 0;
               font-size: 18/100rem;
               color:#989898;
               line-height: 30/100rem;
           }
            span{
                color:#00C65D;
                font-size: .24rem;
            }
        }
        .footer{
                padding: 50/100rem 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: .2rem solid #f1f1f1;
            div{
                font-size: .24rem;
                margin: 0 30/100rem;
                width: 150/100rem;
                height: 50/100rem;
                // border:1/100rem solid #00C65D;
                border:1px solid #00C65D;
                color: #00C65D;
                border-radius: 50/100rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .for-view {
            margin: .3rem;
            padding-bottom: .3rem;
            border-bottom: .01rem solid #F1F1F1;
            span {
                font-size: .24rem;
            }
            .for-right {
                float: right;
                margin-right: .5rem;
                color:#666;
            }
            .btn-right {
                position: absolute;
                right: 0.3rem;
                /*top: 50%;*/
                /*margin-top: -0.12rem;*/
                    margin-top: 0.02rem;
                width: 0.24rem;
                height: 0.34rem;
                // background: url(../../../assets/btn-right.png) no-repeat;
                background: url(../../../assets/security-nextbtn.png) no-repeat;
                background-size: 100% 100%;
            }
        }
       .part-postBox{
           max-height: 11.9rem;
           overflow: hidden;
           .center{
               text-align: center;
                height: 3rem;
                line-height: 3rem;
                font-size: .3rem;
               border-bottom: .2rem solid #f1f1f1;
           }
       }
        .card-post {
            /*padding-top:10px;*/
                // border-bottom:.2rem solid #F1F1F1;
            .part-post {
                padding: .3rem;
                .for-star {
                    width: 1.5rem;
                    float: right;
                    margin-right: .3rem;
                }
                .for-cute {
                    width: 1rem;
                    margin-top: -.3rem;
                }
                span {
                    padding: .2rem;
                    font-size: .27rem;
                }
            }
            .part-post-sec {
                padding: .3rem;
                margin-top: .3rem;
                .for-star {
                    width: 1.5rem;
                    float: right;
                    margin-right: .3rem;
                }
                .for-cute {
                    width: 1rem;
                    margin-top: -.3rem;
                }
                span {
                    padding: .2rem;
                    font-size: .27rem;
                }
            }
            .for-num {
                padding: 0 .3rem .3rem .3rem;
                border-bottom: .01rem solid #F1F1F1;
                span {
                    font-size: .3rem;
                    color: #888888;
                }
                .for-1kg {
                    padding-left: .5rem;
                }
                p {
                    font-size: .3rem;
                    padding-top: .3rem;
                }
                img {
                    padding-top: .3rem;
                    border: none;
                    width: 2rem;
                    height: 2.3rem;
                }
            }
            .for-num1 {
                padding: 0 .3rem .3rem .3rem;
                border-bottom: .2rem solid #F1F1F1;
                span {
                    font-size: .24rem;
                    color: #888888;
                }
                .for-1kg {
                    padding-left: .5rem;
                }
                p {
                    width: 1.7rem;
                    font-size: .27rem;
                    padding-top: .3rem;
                }
                img {
                    padding-top: .3rem;
                    border: none;
                    width: 1.5rem;
                }
            }
            .for-text {
                padding: .3rem .3rem .3rem .5rem;
                text-align: center;
                span {
                    padding-left: .5rem;
                    padding-right: .5rem;
                    font-size: .3rem;
                    /*font-size: .26rem;*/
                    /*border-right: .01rem solid #DFDFDD;*/
                }
                .for-last {
                    border: none;
                }
            }
            .for-screen {
                margin-right: 2.5rem;
                margin-left: 2.5rem;
                border-bottom: .05rem solid #FF5000;
                /*padding-bottom: .2rem;*/

                h1 {
                    font-weight: bold;
                    font-size: .5rem;
                    text-align: center;
                }
            }
            .for-big_orange {
                img {
                    width: 3.5rem;
                    padding-left: .15rem;
                }
                .grid-content1 {
                    div {
                        border-bottom: .02rem dotted #9da0a0;
                        margin: .3rem;
                        font-size: .24rem
                    }
                }
            }
            .four-piece {
                padding-left: .5rem;
                display: flex;
                margin: .3rem;
                span {
                    font-size: .4rem;
                    font-weight: bold;
                }
                div {
                    font-size: .37rem;
                    font-weight: bold;
                }
            }
            .for-three-img {
                /*padding-left: 2.5rem;*/
                h3 {
                    text-align: center;
                    font-size: .4rem;
                    font-weight: bold;
                }
                .for-img {
                    display: flex;
                    .one-img {
                        button {
                            border-radius: .1rem;
                            /* width: 1rem; */
                            padding: .05rem;
                            border: none;
                            background-color: white;
                            border: .01rem dotted red;
                            margin-left: 1rem;
                        }
                    }
                    img {
                        width: 2rem;
                        padding: .15rem;
                        margin-left: .17rem;
                    }
                }
            }
            .next-orange {
                margin-right: 1.9rem;
                margin-left: 1.9rem;
                img  {
                    width: 4.5rem;
                    margin-top: 0.04rem;
                    margin-left: -.19rem;
                }

                h3 {
                    border-bottom: .02rem solid #FF5000;
                    font-weight: bold;
                    font-size: .5rem;
                    text-align: center;
                }
            }
            .border-image {
                img {
                    margin-top: .1rem;
                    width: 6rem;
                    margin-left: .5rem;
                    padding: .2rem;
                    border: .01rem dotted red;
                    border-radius: .2rem;
                }
            }
            .straight-img {
                margin-right: 1.9rem;
                margin-left: 1.9rem;
                margin-bottom: .7rem;
                h3 {
                    border-bottom: .02rem solid #FF5000;
                    font-weight: bold;
                    font-size: .5rem;
                    text-align: center;
                }
                img  {
                    width: 6rem;
                    margin-top: 0.07rem;
                    margin-left: -1rem;
                }
            }
            .content-wrap {
                margin: 0 .2rem 1rem .2rem;
                width: 95%;
                tr{
                    height:.6rem;
                    line-height:.6rem;
                    padding:0 .2rem;
                    td{
                        color: #3d4245;
                        border: .01rem solid #3d4245 !important;
                        width: 70%;
                        padding: .2rem;
                        font-size: .3rem;
                    }
                    .t_width{
                        width: 30%;
                    }
                }
            }
        }

    }
/*.textActive{*/
/*    color:#fc6d2d;*/
/*}*/
.el-icon-star-off:before{
        content: "\E797";
    color: #eee;
    font-size: 0.3rem;
}
.el-icon-star-on:before{
        content: "\E797";
    color: #ff4f03;
    font-size: 0.3rem;
}
    
    
</style>
