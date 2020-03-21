<template>
    <div class="detailsBox">
        <div>
            <video ref="video" id="video" width="640" height="480" autoplay v-model="live_video"></video>
            <button @click="save()">Save Video</button>
        </div>
        <div>
            <button id="snap" v-on:click="capture()">Snap Photo</button>
        </div>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
        <ul>
            <li v-for="c in captures">
                <img v-bind:src="c" height="50" />
            </li>
        </ul>
    </div>
</template>
<script>
    import PrHeader from "@/components/page/children/shop_header.vue"; // 头部
    import qs from 'qs';
    import selectCamera from './child/selectCamera';

    import {
        MessageBox
    } from 'mint-ui'

    export default {
        data() {
            return {
                live_video: null,
                video: {},
                canvas: {},
                captures: []
            }
        },
        created() {
            this.axios.post(this.$httpConfig.shopDetails, qs.stringify({
                    id: parseFloat(this.$route.params.id)
                })
            ).then(res => {
                this.data = res.data.data;
            })
        },
        mounted() {
            this.video = this.$refs.video;
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                    this.video.srcObject = stream;
                    this.video.play();
                });
            }
        },
        methods: {
            save(){

            },
            capture() {
                this.canvas = this.$refs.canvas;
                var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
                this.captures.push(canvas.toDataURL("image/png"));
            },
        }
    }
</script>

<style lang="less" scoped>
.detailsBox{
    /*padding-top:0.937rem;*/
}
    /*// 标题*/
    .shop-header {
        height: 0.937rem;
        background: #ffffff;
        border-bottom: 1px solid #f1f1f1;

        .shop-header_title {
            font-size: .36rem;
            color: #333333;
            text-align: center;
            padding: .3rem 0 .3rem 0;
        }

        .shop-header_img {
            position: absolute;
            width: 0.26rem;
        height: 0.36rem;
            margin: -0.66rem 0 0 0.2rem;
            // background: url(../../assets/fanhui.png) no-repeat;
            background:url(../../assets/btn-return.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .shopTitle {
        //   color: #fff;
        overflow: hidden;
        padding: 20/100rem;
        height: 125/100rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;

        div {
            display: flex;
            align-items: center;
        }

        img {
            width: 80/100rem;
            height: 80/100rem;
            margin-right: 20/100rem;
        }

        p {
            font-size: 26/100rem;
            color: #333333;
        }

        span {
            font-size: 20/100rem
        }

        .btn {
            margin-left: 15/100rem;
            width: 120/100rem;
            height: 50/100rem;
            border-radius: 50/100rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background-color: #FF6700;
        }
    }

    .tab-header {
        height: .7rem;
        background: #ffffff;
        display: flex;
        padding-top: .3rem;

        .tab-header_1 {
            font-size: .28rem;
            padding-bottom: .3rem;
            margin: 0 .45rem 0 .3rem;
        }
        .green {
            color: #00C65D;
            border-bottom: 2px solid #00C65D;
        }
    }

    .shop-live {
        background: #ffffff;
        margin-top: .2rem;
        #myPlayer{
            width: 100%;
            height: 4rem;
        }

        .shop-live_title {
            display: flex;
            padding: .3rem .2rem .3rem .2rem;

            .shop-live_img {
                width: .4rem;
                height: .45rem;
                padding-right: .3rem;
            }

            .shop-live_text {
                font-size: .3rem;
                color: #666666;
                padding-top: .1rem;
            }

            .shop-live_img1 {
                width: .2rem;
                height: .32rem;
                padding: 0.1rem 0 0 4.7rem;
            }
        }

        .shop-live_kiwi {
            width: 7.5rem;
            height: 4.6rem;
        }

        .shop-live_overlap {
            width: 7.5rem;
            height: 4.6rem;
            margin-top: -4.6rem;
        }
    }

    .shop-broadcast {
        background: #ffffff;
        margin-top: .2rem;

        .shop-broadcast_head {
            font-size: .32rem;
            padding: .3rem 0 .3rem .2rem;
            color: #333333;
            border-bottom: 1px solid #DFDFDD;
        }

        .shop-broadcast_body {
            padding: .4rem .2rem .4rem .2rem;

            .broadcast-body_div {
                padding-bottom: .25rem;

                .broadcast-body_btn {
                    width: .5rem;
                    height: .5rem;
                    border-radius: .3rem;
                    border: 1px solid #f1f1f1;
                    background: #fff;
                    font-size: .24rem;
                    color: #999999;
                }

                .broadcast-body_text {
                    font-size: .28rem;
                    color: #333333;
                    float: right;
                    margin: .12rem 5.3rem 0 0;
                }

                .broadcast-body_img {
                    width: 2.5rem;
                    height: 2rem;
                    padding: .2rem 0 0 .62rem;
                }

                .broadcast-body_img1 {
                    width: 2.5rem;
                    height: 2rem;
                    padding: .2rem 0 0 .2rem;
                }
            }
        }
    }

    .description {
        background-color: #fff;
        padding: .1rem .2rem;
        margin-top: .2rem;

        .description_text {
            font-size: .3rem;
            border-bottom: 1px solid #DFDFDD;
            padding: .15rem 0 .15rem 0;
        }

        p {
            line-height: .7rem;

            span {
                font-size: 28/100rem;

                &:nth-child(1) {
                    margin-right: .7rem;
                }

                &:nth-child(2) {
                    color: #CF7171;
                    margin-right: .35rem
                }

                &:nth-child(3) {
                    color: #CF7171;
                }
            }
        }
    }

    .aboutShop {
        /*border-top: .01rem solid #D1D1D1;*/
        margin-top: .2rem;
        background-color: #fff;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;
            border-bottom: .01rem solid #D1D1D1;
            height: 1.1rem;

            p {
                float: left;
                font-size: .28rem;
            }

            img {
                float: right;
                width: .45rem;
                height: .45rem;
            }

            span {
                font-size: .28rem;
                margin-left: .25rem;
                color: #686868;
            }
        }
    }

    .aboutShop1 {
        /*border-top: .01rem solid #D1D1D1;*/
        /*margin-top: .2rem;*/
        background-color: #fff;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;
            border-bottom: .01rem solid #D1D1D1;
            height: 1.1rem;

            p {
                float: left;
                font-size: .28rem;
            }

            span {
                font-size: .28rem;
                margin-left: .25rem;
                color: #686868;
            }
        }
    }
</style>
