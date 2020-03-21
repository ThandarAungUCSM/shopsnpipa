<template>
    <div>
        <top-header :text="title"></top-header>
        <div class="content-wrap" v-if="!data.length ==0">
            <div class="item-wrap" v-for="item in data" :key="item.id">
                <div class="hd clearfix">
                    <span class="name fl">{{item.title}}</span>
                    <span class="date fr" v-model="start_date = item.start_time" v-if="change_date !== null">
                        {{change_date}}
                    </span>
                </div>
                <div class="con-text text2-hidden">
                    {{item.description}}
                </div>
<!--                <span class="moren" @click="addUserGroup">加入</span>-->
                <span class="moren" @click="addGroup(item.id)">加入</span>
            </div>
        </div>
        <div v-if="data.length == 0" class="text-center status">收货地址为空,赶快添加吧！</div>
    </div>
</template>

<script>
    import qs from 'qs';
    import topHeader from '@/components/page/children/header.vue';
    import { Toast } from 'mint-ui';
    export default {
        name: "userTuan",
        data(){
            return{
                title: '社区团',
                data: [],
                group: [],
                start_date: null,
                change_date: null,
            }
        },
        mounted(){
            this.userTuan();
        },
        created(){
            if (this.start_date !== ''){
                this.change_date = new Date(this.start_date).Format("dd.mm.yyyy hh:MM:ss");
                console.log(this.change_date);
            }
        },
        methods: {
            userTuan(){
                this.axios.post(this.$httpConfig.userTuan)
                    .then(res => {
                        this.data = res.data.data;

            })
                    .catch(e => {console.log(e)})
            },
            addGroup(id){
                this.axios.post(this.$httpConfig.addUserGroup, qs.stringify({
                    id: id,
                }))
                    .then(res => {
                        this.group = res.data.data;
                        Toast({
                            message: res.data.data.message,
                            position: 'bottom',
                            duration: 3000
                        });
                    })
                    .catch(e => {console.log(e)})
            },
            addUserGroup(){
                this.$router.push('userGroup')
            }
        },
        components: {
            topHeader
        }
    }
</script>

<style lang="less" scoped>
    .content-wrap {
        background: #fff;
        .prompt{
            margin: 0 auto;
            font-size: .3rem;
            color: #00C65D;
            padding-top: .2rem;
            span{
                color: #00C65D;
            }
        }
        .item-wrap {
            height: 2.3rem;
            border-bottom: 1px solid #dfdfdf;
            position: relative;
            .icon-link {
                position: absolute;
                right: .2rem;
                top: 50%;
                margin-top: -.15rem;
                width: .18rem;
                height: .3rem;
                background: url(../../assets/icon-right.jpg) no-repeat;
                background-size: 100% 100%;
            }
            .con-text {
                width: 6.65rem;
                font-size: .32rem;
                color: #999;
                line-height: .48rem;
                margin: .2rem;
                height: .85rem;
            }
            .moren {
                color: #00C65D;
                position: absolute;
                top: 78%;
                right: 5%;
                cursor: pointer;
            }
        }
        .hd {
            height: .45rem;
            line-height: .45rem;
            overflow: hidden;
            padding: .43rem .2rem 0;
            width: 6.65rem;
            .name {
                font-size: .36rem;
                color: #282828;
                /*padding-left: .44rem;*/
                position: relative;
                .icon {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: .28rem;
                    height: .41rem;
                    margin-top: -.205rem;
                    background: url(../../assets/userIcon.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
            .date {
                font-size: .3rem;
                color: #282828;
                position: relative;
                .icon {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: .24rem;
                    height: .34rem;
                    margin-top: -.17rem;
                    background: url(../../assets/images/sj.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }

    .btn-wrap {
        width: 7.5rem;
        height: 1rem;
        .btn-main {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 7.1rem;
            height: .9rem;
            padding: 0.05rem .2rem;
            background: #fff;
            button {
                border-radius: 5/100rem;
                color: #fff;
                width: 100%;
                height: 100%;
                border: none;
                background: #00C65D;
                outline: none;
                padding-left: 2.3rem;
                box-sizing: border-box;
                span {
                    font-size: .32rem;
                    margin-left: .2rem;
                }
                .icon {
                    display: inline-block;
                    width: .34rem;
                    height: .34rem;
                    background: url(../../assets/add.png) no-repeat;
                    background-size: 100% 100%;
                    margin-top: .05rem;
                }
            }
            button:active {
                box-shadow: 0 5px 5px #ccc;
            }
        }
    }

    .status {
        color: #666;
        line-height: 1rem;
        font-size: .4rem;
    }
</style>
