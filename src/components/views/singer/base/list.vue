<template>
    <div class="list" @click="handleClick">
        <img :src="item.singer_pic" alt="" @load="loadImg">
        <span>{{item.singer_name}}</span>
    </div>
</template>

<script>
    export default {
        name: "list",
        props: {
            item: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        methods:{
            //点击歌手
            handleClick() {
                delete this.item.singer_pic;
                //跳转到歌手歌曲页
                this.$router.push({
                    name:"singer_song",
                    params:{
                        id:this.item.singer_mid
                    }
                })
            },
            //图片加载完成后触发
            loadImg(){
                this.$emit('loadImg')
            }
        }
    }
</script>

<style scoped lang="stylus">
    .list {
        padding: 10px 20px;
        overflow: hidden;
        color:#CCC;

        img {
            float: left;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        span {
            display inline-block;
            line-height: 45px;
            margin-left: 10px;
        }
    }
</style>