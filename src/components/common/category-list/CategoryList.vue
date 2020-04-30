<template>
    <div class="category_list">
        <slot name="title"></slot>
        <ul>
            <slot name="list"></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        props:{},
    }
</script>

<style scoped lang="stylus">
    .title{
        text-align center;
        line-height 30px;
        font-size:15px;
        margin-top:10px;
    }

    ul>li{
        width: 90%;
        height: 60px;
        margin:5px auto;
        padding:10px 0;
        list-style:none;

        div{
            float:left;
            img{
                width: 60px;
            }
        }

        div.right{
            width: 70%;
            margin-left:10px;

            .category_title{
                font-size:15px;
                color:#fff;
                margin-top:5px;
            }
            p{
                font-size:15px;
                color:#ccc;
                margin-top:8px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>