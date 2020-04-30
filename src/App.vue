<template>
    <div id="app">
        <!--头部-->
        <my-header v-if="isShow">
            <template #mid>
                <img src="~assets/images/logo.png" alt="">
                <span class="title">仿QQ音乐</span>
            </template>
        </my-header>

        <!--导航-->
        <nav-bar v-if="isShow"></nav-bar>

        <!--路由页面-->
        <slider-transition :name="name">
            <keep-alive exclude="singer_song">
                <router-view class="center"/>
            </keep-alive>
        </slider-transition>


        <!--播放页面-->
        <my-play></my-play>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                name: "right",
            }
        },
        watch: {
            $route(to, from) {
                if (to.meta.index < from.meta.index) {
                    this.name = 'right'
                } else {
                    this.name = 'left'
                }
            }
        },
        computed: {
            isShow() {
                return this.$route.name != 'singer_song' && this.$route.name != 'play';
            }
        },
    }
</script>

<style lang="stylus">

</style>
