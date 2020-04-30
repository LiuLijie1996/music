<template>
    <div class="my_swiper">
        <swiper :options="swiperOption">
            <!-- slides -->
            <slot></slot>

            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: "MySwiper",
        data(){
            return {
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...

                    // 参数选项,显示小点
                    pagination: {
                        el: ".swiper-pagination"
                    },
                    //自动播放
                    autoplay:{
                        delay:2000,//每隔2秒自动播放一次
                    },
                    //是否循环播放
                    loop: true,
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    /deep/.pic{
        width: 100%;
        height: 100%;

        img{
            width: 100%;
        }
    }
</style>