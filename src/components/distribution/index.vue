<template>
    <div class="box">
        <div v-title data-title="分销中心">分销中心</div>
        <top-header :text = "title"></top-header>
        <div class="header-d">
            <div class="icon-wrap" @click="toLink('/seetin')">
                <img v-if="data.user_header" :src="URL+ data.user_header">
                <img v-else src="../../assets/my_user_pic.png">
                <div class="names">
                    <p>{{data.user_name}}</p>
                    <p>推荐人：总店</p>
                </div>
            </div>
            <div class="cash">
                <div class="cash-price">
                    <p>可提现佣金</p>
                    <p>0.00元</p>
                </div>
                <div class="cash-btn">提现</div>
            </div>
        </div>
        <div class="commission">
            <div class="settled">
                <p>已提现佣金</p>
                <p>0元</p>
            </div>
            <div class="unsettled">
                <p>未结算佣金</p>
                <p>0元</p>
            </div>
        </div>
        <div class="d-option">
            <div class="option" @click="toCommision">
                <div class="top">
                    <img src="../../assets/images/fenxiaoyongjin.png"/>
                    分销佣金
                </div>
                <div><span class="price">0.00</span>元</div>
            </div>
            <div class="option" @click="toOrder()">
                <div class="top">
                    <img src="../../assets/images/fenxiaodingdan.png"/>
                    分销订单
                </div>
                <div><span class="price">0</span>元</div>
            </div>
            <div class="option" @click="toPersentationDetail">
                <div class="top">
                    <img src="../../assets/images/tixianmingxi.png"/>
                    提现明细
                </div>
                <div><span class="price">0</span>元</div>
            </div>
            <div class="option" @click="toMyTeam()">
                <div class="top">
                    <img src="../../assets/images/wodetuandui.png"/>
                    我的团队
                </div>
                <div><span class="price">0</span>元</div>
            </div>
<!--            <div class="option"><div class="top">-->
<!--                <img src="../../assets/images/tuiguangerweima.png"/>-->
<!--                推广二维码-->
<!--            </div>-->
<!--            </div>-->
            <div class="option" >
                <div class="page-popup-wrapper">
                    <mt-button class="btn-imt" @click.native="popupVisible1 = true" ref="button">
                        <img src="../../assets/images/tuiguangerweima.png"/>
                        <p class="text">推广二维码</p>
                    </mt-button>
                </div>

                <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="mint-popup-1">
                    <div class="qrcode-box">
<!--                        <p>QRCODE SCAN</p>-->
                        <qr-code text="Text to encode"></qr-code>
                    </div>
                </mt-popup>
            </div>
        </div>
    </div>
</template>
<script>
    import topHeader from '@/components/page/children/header.vue';
    import { MessageBox } from 'mint-ui'
    import VueQRCodeComponent from 'vue-qrcode-component'
    export default {
        data () {
            return {
                title:'分销中心',
                data:'',
                popupVisible1: false,
            }
        },
        mounted(){
            this.axios.post(
                this.$httpConfig.userinfo
            ).then((res) => {
                if(res.data.status==10001){
                    this.$router.push('/LogIn');
                } else{
                    this.data = res.data.data;
                    let ua = window.navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                        this.$store.state.user_Imag=res.data.data.weixheader
                    } else {
                        this.$store.state.user_Imag=res.data.data.user_header
                    }

                }
            }).catch((err) => {
                console.log(err)
            });
        },
        methods:{
            toMyTeam(){
                this.$router.push('/myTeam');
            },
            toOrder(){
                this.$router.push({
                    name:'distributionOrder',
                    params:{id:0}
                });
            },
            toCommision(){
                this.$router.push('/commission');
            },
            toPersentationDetail(){
                this.$router.push('/presentationDetail')
            },
            // codeMsg() {
            //     MessageBox({
            //         title: '和田余元分店',
            //         showConfirmButton: false,
            //         cancelButtonClass: false,
            //         message: `
            //         <p>
            //         <img style="width:5.6rem; height:5.6rem; margin-bottom:.3rem;"  src="http://a.hiphotos.baidu.com/image/pic/item/500fd9f9d72a6059f550a1832334349b023bbae3.jpg"></img>
            //         </p>
            //         <p>邀请好友来�?一�?分享店铺给TA</p>
            //         <p>
            //           <qr-code text="Text to encode"></qr-code>
            //         </p>
            //         `,
            //     })
            // },
        },
        components:{
            topHeader
        }
    }
</script>

<style lang="less" scoped>
    .box{
        .price{
            color:#ff0000;
        }
        .header-d{
            background: #d02629;
            .icon-wrap{
                img{
                    width:1rem;
                    height: 1rem;
                }
                width: 90%;
                margin: 0 auto;
                display: flex;
                padding: 0.32rem 0;
                align-items: center;
                border-bottom: 1px solid #cab27c;
                .names{
                    color:#fff;
                    display: flex;
                    margin-left:0.36rem;
                    flex-direction: column;
                    justify-content: space-around;
                    height: 1.2rem;
                    p{
                        font-size: .27rem;
                        font-weight: normal;
                        font-family: "微软雅黑";
                    }
                }
            }
            .cash{
                width: 90%;
                margin: 0 auto;
                padding: 0.32rem 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .cash-price{
                    color:#fff;
                    display: flex;
                    margin-left:0.36rem;
                    flex-direction: column;
                    justify-content: space-around;
                    height: 1.2rem;
                    p{
                        font-size: .27rem;
                        font-weight: normal;
                        font-family: "微软雅黑";
                    }
                }
                .cash-btn{
                    width: .7rem;
                    height: .5rem;
                    text-align: center;
                    line-height: .5rem;
                    color:#fff;
                    border: 1px solid #e8c9c8;
                    font-size: .2rem;
                    letter-spacing: .05rem;
                    border-radius: .1rem;
                }
            }
        }
        .commission{
            display: flex;
            background: #fefffe;
            padding:.57rem 0;
            >div{
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-direction: column;
                height: 1.43rem;
                color:#000;
                width: 50%;
                box-sizing: border-box;
                p{
                    font-size: .33rem;
                }
            }
            .settled{
                border-right: 1px solid #f7f7f7;
                p:nth-child(1){
                    color:#19ac0f;
                }
            }
            .unsettled{
                border-right: 1px solid #f7f7f7;
                p:nth-child(1){
                    color:#ff8b0f;
                }
            }
        }
        .d-option{
            display: flex;
            flex-wrap: wrap;
            background: #fefffe;
            margin-top: .2rem;
            text-align: center;
            >div{
                width: 33.3%;
                box-sizing: border-box;
                border-bottom: 1px solid #e8e8e8;
                border-right: 1px solid #e8e8e8;
                height: 2rem;
                img{
                    display:inline-block;
                    width:0.75rem;
                    height: 0.75rem;
                    margin-bottom: 0.05rem;
                }
            }
            .option{
                .top{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 1.4rem;
                }
                .page-popup-wrapper{
                    .btn-imt{
                        border: none;
                        height: 2rem;
                        width: 2.5rem;
                        background: #fff;
                        img{
                            margin-top: -0.7rem;
                            width: 1rem;
                            height: .9rem;
                        }
                        .text{
                            font-size: .2rem;
                            color: black;
                            padding: -.3rem 0 0 0;
                        }
                    }
                }
            }
        }
        .qrcode-box{
            padding: .5rem;
        }
    }
</style>
