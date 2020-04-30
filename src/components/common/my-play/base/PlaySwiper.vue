<template>
    <div class="playSweiper">
        <swiper :options="swiperOption">
            <!-- slides -->
            <!--<swiper-slide>I'm Slide 1</swiper-slide>-->
            <slot></slot>

            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: "PlaySwiper",
        data() {
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
                    // autoplay: {
                    //     delay: 2000,//每隔2秒自动播放一次
                    // },
                    //是否循环播放
                    // loop: true,
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .playSweiper{
        width: 100%;
        height: 100%;
        .swiper-container{
            width: 100%;
            height: 100%;
        }
        .swiper-pagination{
            bottom:30px;
        }
    }
</style>