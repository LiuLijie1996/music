<template>
    <div class="slider-transition">
        <transition :name="name" mode="in-out">
            <slot></slot>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SliderTransition",
        props:{
            name:{
                type:String,
                default: "right"
            }
        }
    }
</script>

<style scoped lang="stylus">
    .center {
        position fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #000;
    }

    /* 进入过渡的开始状态 */
    .left-enter {
        transform: translateX(100%); //开始前，元素在屏幕右边100%区域（元素的宽度大小）
    }

    /* 进入过渡生效时的状态 */
    .left-enter-active {
        transform: translateX(100%); //开始时，元素在屏幕右边100%区域（元素的宽度大小）
        transition: 1s; //设置过渡时间
    }

    /* 进入过渡的结束状态 */
    .left-enter-to {
        transform: translateX(0%); //结束后元素回到屏幕左边
    }

    /* 离开过渡的开始状态 */
    .left-leave {
        transform: translateX(0%); //离开前，元素在屏幕左边
    }

    /* 离开过渡生效时的状态 */
    .left-leave-active {
        transform: translateX(-0%); //离开时，元素在屏幕左边
        transition: 1s; //设置过渡时间
    }

    /* 离开过渡的结束状态 */
    .left-leave-to {
        transform: translateX(-100%); //离开后，元素在屏幕左边-100%区域（元素的宽度大小）
    }


    /* 进入过渡的开始状态 */
    .right-enter {
        transform: translateX(-100%); //开始前，元素在屏幕右边100%区域（元素的宽度大小）
    }

    /* 进入过渡生效时的状态 */
    .right-enter-active {
        transform: translateX(-100%); //开始时，元素在屏幕右边100%区域（元素的宽度大小）
        transition: 1s; //设置过渡时间
    }

    /* 进入过渡的结束状态 */
    .right-enter-to {
        transform: translateX(0%); //结束后元素回到屏幕左边
    }

    /* 离开过渡的开始状态 */
    .right-leave {
        transform: translateX(0%); //离开前，元素在屏幕左边
    }

    /* 离开过渡生效时的状态 */
    .right-leave-active {
        transform: translateX(0%); //离开时，元素在屏幕左边
        transition: 1s; //设置过渡时间
    }

    /* 离开过渡的结束状态 */
    .right-leave-to {
        transform: translateX(100%); //离开后，元素在屏幕左边-100%区域（元素的宽度大小）
    }
</style>