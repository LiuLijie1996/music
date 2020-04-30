<template>
    <!-- 头部导航 -->
    <div class="navbar">
        <ul>
            <router-link :to="{path:'/recommend'}" tag="li">
                <span :class="{on:$route.name==='recommend'}">推荐</span>
            </router-link>
            <router-link :to="{path:'/singer'}" tag="li">
                <span :class="{on:$route.name==='singer'}">歌手</span>
            </router-link>
            <router-link :to="{path:'/rank'}" tag="li">
                <span :class="{on:$route.name==='rank'}">排行</span>
            </router-link>
            <router-link :to="{path:'/search'}" tag="li">
                <span :class="{on:$route.name==='search'}">搜索</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
    }
</script>

<style scoped lang="stylus">
    .navbar{
        ul{
            display flex;
            justify-content space-around;
            li{
                list-style:none;
                line-height 50px;
                span{
                    font-size:16px;
                    padding:5px 0;
                    color:#ccc;
                }
                span.on{
                    color:#e1e301;
                    border-bottom:3px solid #e1e301;
                }
            }
        }
    }
</style>