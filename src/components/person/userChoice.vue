<template>
    <div>
        <top-header :text="title"></top-header>
        <dl class="content-wrap">
            <dd @click="toRouter('userTuan')">
                可加入社区团
                <div class="icon-btn"></div>
            </dd>
            <dd @click="toRouter('myaddTuan')">
                我的社区团
                <div class="icon-btn"></div>
            </dd>
        </dl>
    </div>
</template>

<script>
    import topHeader from '@/components/page/children/header.vue';
    export default {
        name: "userChoice",
        data(){
            return{
                title: '社区团',
            }
        },
        components: {
            topHeader
        },
        methods:{
            toRouter(name){
                this.$router.push({
                    name:name
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .content-wrap{
        background:#fff;
        dt {
            padding: .2rem;
            height: 1.14rem;
            position: relative;
            border-bottom: 1px solid #e7e7e7;
        }
        dd{
            height:.9rem;
            border-bottom:1px solid #e7e7e7;
            position:relative;
            font-size:.32rem;
            color:#3d4245;
            line-height:.9rem;
            padding:0 .2rem;
            .icon-btn{
                position:absolute;
                top:50%;
                right:.2rem;
                margin-top:-.12rem;
                width:.14rem;
                height:.24rem;
                background:url(../../assets/btn-right.png) no-repeat;
                background-size:100% 100%;
            }
        }
    }
</style>