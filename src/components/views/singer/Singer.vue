<template>
    <div class="singer">
        <transition mode="in-out">
            <my-scroll
                    ref="scroll"
                    :style="{...com_state_style}"
                    @getPageData="getPageData"
            >
                <!--歌手列表-->
                <list
                        v-for="(item,index) in singerList"
                        :key="index"
                        :item="item"
                        @loadImg="loadImg"
                ></list>
            </my-scroll>
        </transition>

        <transition mode="in-out">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import singer_list from "../../../api/singer_list";
    import list from "./base/list";
    import {mapState} from "vuex";
    export default {
        name: "Singer",
        data(){
            return {
                page:0,
                singerList:[],
                debounce:null
            }
        },
        created() {
            singer_list({page:this.page}).then(data=>{
                if(data.status){
                    this.singerList = data.data;
                }
            });
        },
        mounted() {
            //函数防抖,短时间内阻止多次触发同一个事件
            let debounce = function (fn, time) {
                let setTimer = null;
                return function () {
                    //清除定时器
                    clearTimeout(setTimer);
                    //重新赋值定时器
                    setTimer = setTimeout(fn, time);
                }
            };

            //获取scroll组件refresh方法
            let refresh = this.$refs.scroll.refresh;
            this.debounce = debounce(refresh, 500);
        },
        methods:{
            //请求下一页数据
            getPageData(){
                singer_list({page:++this.page}).then(data=>{
                    if(data.status){
                        this.singerList.push(...data.data);
                        //数据获取成功后告诉scroll组件,数据已经获取成功了,可以再次监听滚动了
                        this.$refs.scroll.finishPullUp();
                    }
                })
            },
            //图片加载完成时触发
            loadImg(){
                this.debounce();
            }
        },
        computed:{
            ...mapState(['com_state_style']),
        },
        components:{
            list
        }
    }
</script>

<style scoped lang="stylus">
    /* 进入过渡的开始状态 */
    .v-enter {
        transform: translateX(100%);//开始前，元素在屏幕右边100%区域（元素的宽度大小）
    }

    /* 进入过渡生效时的状态 */
    .v-enter-active {
        transform: translateX(100%);//开始时，元素在屏幕右边100%区域（元素的宽度大小）
        transition: 1s;//设置过渡时间
    }

    /* 进入过渡的结束状态 */
    .v-enter-to {
        transform: translateX(0);//结束后元素回到屏幕左边
    }


    /* 离开过渡的开始状态 */
    .v-leave {
        transform: translateX(0);//离开前，元素在屏幕左边
    }

    /* 离开过渡生效时的状态 */
    .v-leave-active {
        transform: translateX(0);//离开时，元素在屏幕左边
        transition: 1s;//设置过渡时间
    }

    /* 离开过渡的结束状态 */
    .v-leave-to {
        transform: translateX(100%);//离开后，元素在屏幕左边-100%区域（元素的宽度大小）
    }
</style>