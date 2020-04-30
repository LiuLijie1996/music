<template>
    <!--头部组件-->
    <div class="header">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="mid">
            <slot name="mid"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyHeader"
    }
</script>

<style scoped lang="stylus">
    .header {
        position:relative;
        width: 100%;
        height: 50px
        display flex;
        justify-content space-evenly;

        .left, .right {
            display inline-block;
            width: 15%;
            height: 50px;
            vertical-align top;
            line-height:50px;
            text-align center

            .iconfont{
                display inline-block;
                transform:rotate(180deg);
                font-size:25px;
            }
        }

        .mid{
            display inline-block;
            text-align center;
            line-height:50px;
            width: 70%;
            height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            img{
                width: 50px;
                height: 50px;
            }
            span{
                display inline-block;
                vertical-align top;
            }
            span.singerName, span.songTitle{
                color:#fff;
            }
        }
    }
</style>