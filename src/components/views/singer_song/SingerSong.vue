<template>
    <!--歌手歌曲-->
    <div class="singer_song">
        <!--头部-->
        <my-header :style="{backgroundColor:'rgba(0,0,0,.5)', zIndex: 1}">
            <template #left>
                <p @click="$router.go(-1)">《</p>
            </template>
            <template #mid>
                <span class="singerName">
                    {{state_singer_info.singer_name}}
                </span>
            </template>
        </my-header>

        <!--歌手图片-->
        <div class="pic" :style="{backgroundImage:singer_bgImg}" ref="pic"></div>

        <my-scroll :style="{...top, ...com_state_style}" @getScroll="getScroll">
            <!--歌曲列表-->
            <song-list
                    v-for="item in state_song_list"
                    :song-item="item"
                    :key="item.song_id"
            >
                <span slot="name">{{state_singer_info.singer_name}}</span>
            </song-list>
        </my-scroll>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex';
    import {mixins} from '../../../utils/mixin';

    export default {
        name: "SingerSong",
        mixins: [mixins],
        data() {
            return {
                top: {top: 0},
                picHeight: 0,//背景图片的盒子实际高度
                picTopVw: 0,//背景图片的盒子距离顶部的vw
            }
        },
        watch: {
            $route() {
                //获取歌手的歌曲
                this.ac_singer_song_list({singer_mid: this.$route.params.id});
            },
            state_song_list() {
                //将获取到的歌手音乐列表上传到公共仓库中去
                this.com_mu_state_song_list(this.state_song_list);
            }
        },
        created() {
            //获取歌手的歌曲
            this.ac_singer_song_list({singer_mid: this.$route.params.id});
        },
        methods: {
            ...mapActions('singer_song_store', ['ac_singer_song_list']),
            ...mapMutations(['com_mu_state_song_list']),
        },
        computed: {
            ...mapState('singer_song_store', [
                'state_singer_song_list',
                'state_singer_info',
                'state_song_list'
            ]),
        },
    }
</script>

<style scoped lang="stylus">
    .singer_song {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background-color: #000;

        .pic {
            position: absolute;
            top: -30px;
            width: 100%;
            height: 410px;
            overflow: hidden;
            filter: blur(1.5px);
            background-color: #000;
            background-size: 100%;
            z-index 0;
        }
    }
</style>