<template>
    <div>
        <top-header :text="title"></top-header>
        <div class="group">
            <span class="name">{{add.group_name}}</span>
            <span class="time">{{add.create_time}}</span>
            <div class="add-btn" @click="quitGroup(add.id)">退出</div>
        </div>

<!--        <div class="show-user">-->
<!--            <div class="image">-->
<!--                <img src="../../assets/news_active.png">-->
<!--            </div>-->
<!--            <div class="message">操作成功</div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import topHeader from '@/components/page/children/header.vue';
    import { MessageBox } from 'mint-ui';
    import qs from 'qs';
    export default {
        name: 'myaddTuan',
        data(){
            return{
                title: '社区团',
                add: [],
                data:[],
                message:'',
            }
        },
        components: {
            topHeader
        },
        mounted(){
            this.myAddTuan();
        },
        methods: {
            myAddTuan(){
                this.axios.post(this.$httpConfig.myAddTuan)
                    .then(res => {
                        this.add = res.data.data;
                    })
                    .catch(e => {console.log(e)})
            },
            quitGroup(id){
                MessageBox.confirm('Are you sure?')
                    .then(action => {
                        this.axios.post(this.$httpConfig.quitGroup, qs.stringify({
                            id:id
                        }))
                            .then(res => {
                                this.data = res.data.data;
                            })
                            .catch(e => {console.log(e)})
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    .show-user{
        margin-top: 3rem;
        text-align: center;
        img{
            width:3rem;
        }
        .message{
            font-size: .3rem;
            padding: .2rem;
        }
    }
    .group{
        background: #ffffff;
        padding: .3rem;
        .name{
            font-size: .36rem;
            color: #3d4245;
        }
        .time{
            font-size: .36rem;
            color: #3d4245;
            float: right;
        }
        .add-btn{
            font-size: .3rem;
            color: green;
            padding: .3rem 0 .1rem 6rem;
        }
    }
</style>