<template>
    <div class="select-camera" @click.self="close">
        <div class="camera-list">
            <div v-for="(item,index) in list" :key="index" @click="select(index)">
                {{item.camera_location}}
            </div>
            <div class="quxiao" @click="close">
                取消
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "selectCamera",
        data(){
            return{

            }
        },
        props:{
            list:{
                type:Array,
                default:[]
            }
        },
        methods:{
            close(){
                this.$emit('closeSelect')
            },
            select(index){
                this.$emit('trigger',index)
            }
        }
    }
</script>

<style lang="less" scoped>
    .select-camera{
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.4);
        width: 100%;
        height: 100%;
        .camera-list{
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            background: #ffffff;
            >div{
                text-align: center;
                height: .8rem;
                line-height: .8rem;
                border-bottom: 1px solid #f4f4f4;
            }
            >div:last-child{
                border: none;
            }

        }

    }
</style>
