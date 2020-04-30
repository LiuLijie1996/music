<template>
    <div class="lynicScroll">
        <div class="wrapper" ref="wrapper" :style="LyricHeight">
            <ul class="content">
                <slot></slot>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        name: "LyricScroll",
        props: {
            LyricHeight: {
                type:Object,
                default(){
                    return {}
                }
            },
        },
        data() {
            return {
                scroll: null,
                //滚动配置
                options: {
                    click: true,//是否可以点击
                    scrollY: true,//纵向滚动
                    //开启上拉加载功能
                    pullUpLoad: {
                        threshold: 50
                    }
                }
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, this.options);

            //在一次上拉加载的动作后，触发pullingUp事件
            this.scroll.on('pullingUp', () => {
                //这个时机一般用来去后端请求数据
                //请求数据...

                /*
                    当上拉加载数据加载完毕后，
                    需要调用finishPullUp方法告诉 better-scroll 数据已加载。
                */
                this.scroll.finishPullUp();
            });


            //只要滚动就会触发该事件
            this.scroll.on("scroll", (position) => {
                this.$emit('getScroll', position);
            })
        },
        methods:{
            scrollTo(){
                //滚动顶部
                this.scroll.scrollTo(0, 0, 1000);
            },
            scrollToElement(lineEl){
                //滚动到指定的位置
                this.scroll.scrollToElement(lineEl, 1000);
            }
        }
    }
</script>

<style scoped lang="stylus">
    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 100px;
        width: 100%;
        height: 100px;
        overflow: hidden;

        .content {
            width: 50%;
            margin: auto;
            text-align center;

            li {
                list-style none;
                color: #fff;
                font-size:16px;
                padding:5px;
            }

            li.on {
                color: yellow;
            }
        }
    }
</style>