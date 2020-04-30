<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    //直接在需要使用的组件中引入
    import BScroll from "better-scroll";

    export default {
        name: "MyScroll",
        data() {
            return {
                scroll: null,
                //滚动配置
                options: {
                    click: true,//是否可以点击
                    scrollY: true,//纵向滚动
                    //上拉加载功能
                    pullUpLoad: {
                        threshold: 50
                    }
                },
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, this.options);

            // console.log(this.scroll);
            //在一次上拉加载的动作后，触发pullingUp事件
            this.scroll.on('pullingUp', () => {
                //这个时机一般用来去后端请求数据
                //请求下一页数据...
                this.$emit("getPageData");
            });
            //初始化时得到可以滚动的高度,没有计算图片的高度,因为此时图片还没有加载
            // console.log(this.scroll.scrollerHeight);

            //只要滚动就会触发该事件
            this.scroll.on("scroll", (position)=>{
                this.$emit('getScroll', position);
            })
        },
        methods: {
            finishPullUp() {
                // 当上拉加载数据加载完毕后，
                // 需要调用finishPullUp方法告诉 better-scroll 数据已加载。
                this.scroll.finishPullUp();
            },
            //重新计算滚动高度
            refresh() {
                this.scroll.refresh();
            }
        }
    }
</script>

<style scoped lang="stylus">
    //让最外成的元素和屏幕同高
    .wrapper {
        position: fixed;
        top:100px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }
</style>