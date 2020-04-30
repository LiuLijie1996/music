<template>
    <!--播放器-->
    <div class="MyPlay" v-if="state_play_info.play_url">

        <!--大播放器-->
        <transition mode="in-out">
            <div class="bigPlay" v-show="playBool">
                <!--背景-->
                <div class="bgImg" :style="bgImg"></div>
                <!--头部-->
                <my-header>
                    <template #left>
                        <i class="iconfont icon-bofangqizhankai" @click="playBool=false"></i>
                    </template>
                    <template #mid>
                        <span class="songTitle">
                            {{state_play_info.song_title}}
                            <p class="singerName">
                                {{state_play_info.singer_info.singer_name}}
                            </p>
                        </span>
                    </template>
                </my-header>

                <!--cd和歌词的切换-->
                <div class="cdAndGeci">
                    <play-swiper>
                        <!--cd页-->
                        <swiper-slide>
                            <!--cd图片-->
                            <div class="pic">
                                <div class="song_cover" :style="animationRotate">
                                    <img :src="state_play_info.song_cover[0] || ''" alt="">
                                </div>
                            </div>

                            <!--歌词-->
                            <div class="smallLyric">
                                <lyric-scroll ref="SmallLyricScroll">
                                    <li
                                            ref="SmallLyricList"
                                            v-for="item in Lyric.lines"
                                            :key="item.time"
                                            :class="{on:item.txt===currentLyric}"
                                    >
                                        {{item.txt}}
                                    </li>
                                </lyric-scroll>
                            </div>

                            <!--进度-->
                            <div class="jindu">
                                <!--当前进度时间-->
                                <div class="nowTime">{{~~walkTime | filter_Time}}</div>

                                <!--进度线-->
                                <div class="xian" ref="xian" @touchstart.stop="downTime">
                                    <p :style="{width:ratioTime}">
                            <span
                                    :style="{left:ratioTime}"
                                    @touchstart.stop="downTime"
                                    @touchmove.stop="moveTime"
                                    ref="span_yuandian"
                            ></span>
                                    </p>
                                </div>

                                <!--总时间-->
                                <div class="allTime">{{time | filter_Time}}</div>
                            </div>
                        </swiper-slide>
                        <!--歌词页-->
                        <swiper-slide>
                            <lyric-scroll
                                    :lyric-height="{height:'90%', top:0}"
                                    ref="LyricScroll"
                            >
                                <li
                                        ref="lyricList"
                                        v-for="(item,index) in Lyric.lines"
                                        :key="item.time"
                                        :class="{on:currentLineNum===index}"
                                >
                                    {{item.txt}}
                                </li>
                            </lyric-scroll>
                        </swiper-slide>
                    </play-swiper>
                </div>

                <!--图标-->
                <div class="bottomBox">
                    <i class="iconfont icon-xunhuan" @click="icon_xunhuan=2" v-if="icon_xunhuan===1"></i><!--列表循环-->
                    <i class="iconfont icon-danquxunhuan" @click="icon_xunhuan=3" v-else-if="icon_xunhuan===2"></i>
                    <!--单曲循环-->
                    <i class="iconfont icon-liebiaoshunxu" @click="icon_xunhuan=1" v-else></i><!--顺序播放-->

                    <i class="iconfont icon-shangyishou" @click="huange(0)" :style="huiseIcon"></i><!--上一首-->
                    <i class="iconfont icon-bofangqi-bofang" @click="control" v-if="!audioBool"></i>
                    <i class="iconfont icon-bofangqi-zanting" @click="control" v-if="audioBool"></i>
                    <i class="iconfont icon-kuaijin" @click="huange(1)" :style="huiseIcon"></i><!--下一首-->

                    <i class="iconfont icon-shoucang"></i>
                </div>
            </div>
        </transition>

        <!--小播放器-->
        <transition mode="in-out">
            <div class="smallPlay" ref="smallPlay" v-if="!playBool">
                <!--进度线-->
                <div class="jindu">
                    <p :style="{width:ratioTime}"></p>
                </div>


                <!--小头像-->
                <div class="pic">
                    <div class="song_cover" :style="animationRotate" @click="playBool=true">
                        <img :src="state_play_info.song_cover[0]">
                    </div>
                </div>

                <!--歌曲标题-->
                <div class="song_info" @click="playBool=true">
                    <p class="title">{{state_play_info.song_title}}</p>
                    <p class="name">{{state_play_info.singer_info.singer_name}}</p>
                </div>

                <div class="icon">
                    <i class="iconfont icon-bofangqi-bofang" @click="control" v-if="!audioBool"></i><!--播放-->
                    <i class="iconfont icon-bofangqi-zanting" @click="control" v-if="audioBool"></i><!--暂停-->
                    <i class="iconfont icon-kuaijin" @click="huange(1)" :style="huiseIcon"></i><!--下一首-->

                    <i class="iconfont icon-gedan"></i>
                </div>
            </div>
        </transition>

        <!--音频播放标签-->
        <audio
                :src="state_play_info.play_url"
                ref="audioEle"
                @canplay="canplay"
                @error="playError"
                @ended="over"
                @timeupdate="timeupdate"
        ></audio>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';
    import LyricParser from 'lyric-parser';

    export default {
        name: "MyPlay",
        data() {
            return {
                Lyric: [],//歌词
                audioBool: true,//控制播放
                playBool: true,//控制大小播放器页面
                icon_xunhuan: 1,//控制循环图标
                canplayBool: false,//当前选中的歌曲是否已经开始播放了
                time: 0,//总播放时间
                walkTime: 0,//进度时间
                ratioTime: 0,//时间比例
                lengthJinduTiao: 0,//进度条的总长度
                PianYiLiange: 0,//当前偏移量
                prePianYiLiange: 0,//上一次偏移量
                currentLineNum: 0,//当前高亮的行数
                currentLyric: null,//存储当前的歌曲的歌词信息
            }
        },
        filters: {
            //优化时间
            filter_Time(time) {
                let fen = ~~(time / 60);
                let miao = ~~(time % 60);

                fen = fen >= 10 ? fen : '0' + fen;
                miao = miao >= 10 ? miao : '0' + miao;

                return `${fen}:${miao}`;
            },
        },
        watch: {
            //歌曲信息改变后进行重新播放
            state_play_info() {
                //判断有没有歌词,如果有说明之前放过歌
                if (this.currentLyric) {
                    //歌曲信息改变后停止lynic的回调
                    this.Lyric.stop();
                }

                this.$nextTick(() => {
                    //播放
                    this.audioBool = true;
                    //页面加载完成后自动播放
                    this.$refs.audioEle.play();

                    //获取歌词,整理歌词
                    let content = this.state_play_info.song_value;
                    this.Lyric = new LyricParser(content, this.LyricCallback);

                    //开启歌词切换
                    this.Lyric.play();
                });
            },
            walkTime() {
                // 获取时间比例
                this.ratioTime = ~~((this.walkTime / this.time) * 100) + '%';
            },
            playBool() {
                if (!this.playBool) {
                    this.$nextTick(() => {
                        let height = this.$refs.smallPlay.clientHeight;
                        this.com_mu_style(height);
                    })
                }
            },
            /*歌曲暂停时同时暂停歌词*/
            audioBool() {
                if (!this.audioBool) {
                    this.Lyric.togglePlay();
                } else {
                    this.Lyric.seek(this.$refs.audioEle.currentTime * 1000);
                }

            },
            /*偏移量发生改变后改变歌词位置*/
            PianYiLiange() {
                if (this.currentLyric) {
                    this.Lyric.seek(this.$refs.audioEle.currentTime * 1000);
                }
            }
        },
        computed: {
            //获取公共仓库中的歌曲列表
            ...mapState(['com_state_song_list']),
            ...mapState('play_store', ['state_play_info']),
            bgImg() {
                return {
                    backgroundImage: `url(${this.state_play_info.song_cover[0]})`,
                    backgroundSize: "100% 100%",
                };
            },
            //图片旋转样式
            animationRotate() {
                console.log(this.audioBool);
                if (this.audioBool) {
                    //开启动画
                    return {
                        animationPlayState: "running"
                    }
                } else {
                    //关闭动画
                    return {
                        animationPlayState: "paused"
                    }
                }
            },
            //灰色字体
            huiseIcon() {
                return {
                    color: this.canplayBool ? '' : '#ccc'
                };
            }
        },
        methods: {
            ...mapMutations(['com_mu_style']),
            ...mapActions('play_store', ['ac_play_info']),

            //控制播放暂停
            control() {
                //播放/暂停
                this.audioBool ? this.$refs.audioEle.pause() : this.$refs.audioEle.play();

                this.audioBool = !this.audioBool;
            },

            //浏览器能够开始播放指定的音频或视频
            canplay() {
                //已经开始播放了
                this.canplayBool = true;

                if (!this.time) {
                    //计算出总的时间
                    this.state_play_info.song_time.split(":").forEach((item, index) => {
                        if (index === 0) {
                            this.time += Number(item) * 60;
                        } else {
                            this.time += Number(item);
                        }
                    });
                }
            },
            //歌曲播放完成后触发
            over() {
                //请求其他歌曲数据
                /*
                * this.icon_xunhuan
                *   1  列表循环播放
                *   2  单曲循环
                *   3  顺序播放
                * */
                if (this.icon_xunhuan === 1) {
                    this.huange(1)
                } else if (this.icon_xunhuan === 2) {
                    this.$refs.audioEle.load();
                    this.$refs.audioEle.play();

                    //判断有没有歌词,如果有说明之前放过歌
                    if (this.currentLyric) {
                        //单曲循环,音乐结束后停止lynic的回调
                        this.Lyric.stop();

                        //开启歌词切换
                        this.Lyric.play();
                    }
                } else {
                    this.huange(2);
                }

            },
            //播放出现错误时触发
            playError() {
                console.log('出错了');

                //出错了,自动切换下一首
                this.canplayBool = true;
                this.huange(1);
            },

            //切换歌曲
            huange(num) {
                //num:0 上一首;  1下一首;  2下一首(列表顺序播放到最后停止播放)

                let length = this.com_state_song_list.length;
                console.log(length);

                if (length) {
                    if (this.canplayBool) {

                        let arr = [];

                        this.com_state_song_list.forEach((item, index) => {
                            if (item.song_mid === this.state_play_info.song_mid) {
                                //上一首
                                let pre = index ? this.com_state_song_list[index - 1] : this.com_state_song_list[length - 1];
                                //下一首
                                let next = index === length - 1 ? this.com_state_song_list[0] : this.com_state_song_list[index + 1];
                                //下一首
                                let nextTow = index === length - 1 ? undefined : this.com_state_song_list[index + 1];

                                arr = [pre, next, nextTow];
                            }
                        });

                        console.log(arr[num]);
                        if (arr[num]) {
                            //歌曲时间归零
                            this.time = 0;
                            //请求歌曲后将播放的状态还原成初始值
                            this.canplayBool = false;

                            //请求新的歌曲
                            this.ac_play_info(arr[num]);
                        } else {
                            //停止播放
                            this.audioBool = false;
                            //进度时间归零
                            this.walkTime = 0;
                        }
                    } else {
                        //如果之前的歌曲还没有播放,就不请求数据了
                        return;
                    }
                }

            },

            //播放时间更新时触发
            timeupdate(e) {
                //获取进度时间
                this.walkTime = e.target.currentTime;
            },

            //按下事件
            downTime(e) {
                //获取进度条的总长度
                this.lengthJinduTiao = this.$refs.xian.clientWidth;
                //获取当前偏移量;  手指距离屏幕左边的位置-进度条距离屏幕左边的位置
                this.PianYiLiange = e.touches[0].pageX - this.$refs.xian.offsetLeft - 5;

                //更新进度条比例
                this.ratioTime = (this.PianYiLiange / this.lengthJinduTiao) * 100 + '%';

                //更新播放时间
                this.walkTime = this.time * this.PianYiLiange / this.lengthJinduTiao;
                this.$refs.audioEle.currentTime = this.walkTime;
            },
            //移动事件
            moveTime(e) {
                //获取当前偏移量;  手指距离屏幕左边的位置-进度条距离屏幕左边的位置
                this.PianYiLiange = e.touches[0].pageX - this.$refs.xian.offsetLeft;

                //当前偏移量大于上次偏移量,取进度条和偏移量的最小值
                if (this.PianYiLiange >= this.prePianYiLiange) {
                    let min = Math.min(this.lengthJinduTiao, this.PianYiLiange);
                    this.$refs.span_yuandian.style.left = min + 'px';

                    //更新比例
                    this.ratioTime = (min / this.$refs.xian.clientWidth) * 100 + '%';

                    //更新播放时间
                    this.walkTime = this.time * min / this.lengthJinduTiao;
                    this.$refs.audioEle.currentTime = this.walkTime;

                } else {
                    //当前偏移量小于上次偏移量,取0和偏移量的最大值
                    let max = Math.max(0, this.PianYiLiange);
                    this.$refs.span_yuandian.style.left = max + 'px';

                    //更新比例
                    this.ratioTime = (max / this.$refs.xian.clientWidth) * 100 + '%';

                    //更新播放时间
                    this.walkTime = this.time * max / this.lengthJinduTiao;
                    this.$refs.audioEle.currentTime = this.walkTime;
                }
                //保存当前偏移量
                this.prePianYiLiange = this.PianYiLiange;
            },

            //lyric的回调
            LyricCallback({lineNum, txt}) {
                //获取歌词行数
                this.currentLineNum = lineNum;
                //获取当前歌词
                this.currentLyric = txt;
                console.log(this.currentLyric);

                /*cd页的小歌词组件*/
                if (lineNum > 0) {
                    let lineEl = this.$refs.SmallLyricList[lineNum - 1];
                    this.$refs.SmallLyricScroll.scrollToElement(lineEl, 1000)// 滚动到元素
                } else {
                    this.$refs.SmallLyricScroll.scrollTo(0, 0, 1000)// 滚动到顶部
                }

                /*大歌词页*/
                if (lineNum > 5) {
                    let lineEl = this.$refs.lyricList[lineNum - 5];
                    this.$refs.LyricScroll.scrollToElement(lineEl, 1000)// 滚动到元素
                } else {
                    this.$refs.LyricScroll.scrollTo(0, 0, 1000)// 滚动到顶部
                }

            }
        }
    }
</script>

<style scoped lang="stylus">
    /*大播放器*/
    .bigPlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index 5
        background-color: #000;

        .singerName {
            font-size: 16px;
            margin-top: -15px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .bgImg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(50px);
        }

        .cdAndGeci {
            position absolute;
            top: 100px;
            left: 0;
            right: 0;
            height 70%;

            .pic {
                .song_cover {
                    width: 300px;
                    height: 300px;
                    margin: auto;

                    img {
                        width: 300px;
                        height: 300px;
                        border-radius 50%;
                    }
                }

            }

            //进度

            .jindu {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                display flex;
                justify-content space-evenly;

                .xian {
                    position relative;
                    width: 60%;
                    height: 2px;
                    margin-top: 12px;
                    background-color: #fff;

                    p {
                        width: 100%;
                        padding: 1px;
                        background-color: yellow;

                        span {
                            position: absolute;
                            top: -4px;
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            background-color: #fff;
                        }
                    }
                }
            }

        }


        .bottomBox {
            position fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display flex;
            justify-content space-around;
            height: 60px;

            i {
                font-size: 30px;
                font-weight bold;
            }
        }
    }

    /*小播放器*/
    .smallPlay {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 5px;
        z-index 5
        background-color: #373335;

        /*进度线*/

        .jindu {
            position absolute;
            bottom: 90px;
            width: 100%;
            z-index 1
            background-color: #fff;

            p {
                padding: 1px;
                background-color: yellow;
            }
        }

        div.pic {
            float: left;
            width: 80px;
            height: 80px;
            margin-left: 10px;

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }

        .song_info {
            float: left;
            width: 35%;
            margin-top: 10px;
            margin-left: 10px;
            font-size: 16px;

            p {
                display inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                margin-top: 5px;
            }
        }

        div.icon {
            float: right;
            display flex;
            justify-content space-around;
            width: 35%;
            line-height: 80px;

            i {
                font-size: 30px;
            }
        }
    }


    /*旋转图片*/
    .pic {
        .song_cover {
            animation: myfirst 10s linear infinite;
        }

        @keyframes myfirst {
            0% {
                transform rotate(0deg)
            }

            100% {
                transform rotate(360deg)
            }
        }
    }

    .v-enter {
        transform: translateY(100%);
    }

    .v-enter-active {
        transform: translateY(100%);
        transition: 1s; //设置过渡时间
    }

    .v-enter-to {
        transform: translateY(0);
    }


    .v-leave {
        transform: translateY(0%);
    }

    .v-leave-active {
        transform: translateY(0%);
        transition: 1s; //设置过渡时间
    }

    .v-leave-to {
        transform: translateY(100%);
    }

</style>