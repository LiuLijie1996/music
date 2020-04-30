<template>
    <!--推荐歌单下的歌曲列表-->
    <div class="recom-disc">
        <my-header clss="header">
            <template #left>
                <span @click="$router.go(-1)">《 </span>
            </template>
            <template #mid>
                <h4 class="title">
                    {{recom_gedan_data.gedan_title}}
                </h4>
            </template>
        </my-header>

        <div class="pic" :style="{backgroundImage:disc_bgImg}" ref="pic"></div>

        <my-scroll :style="{...top, ...com_state_style}" @getScroll="getScroll">
            <song-list v-for="(item,index) in recom_gedan_data.song_list" :song-item="item" :key="index">
                <template #name>{{item.singer_info.singer_name}}</template>
            </song-list>
        </my-scroll>
    </div>
</template>

<script>
    import recom_disc from "../../../api/recom_disc";
    import {mixins} from 'utils/mixin';

    export default {
        name: "RecomDisc",
        mixins: [mixins],
        data() {
            return {
                recom_gedan_data:{}
            }
        },
        watch: {
            $route() {
                this.getDisc(this.$route.params);
            }
        },
        created() {
            this.getDisc(this.$route.params);
        },
        methods: {
            getDisc(query) {
                //获取歌曲列表
                recom_disc(query).then(data => {
                    if(data.status){
                        this.recom_gedan_data = data.data;
                    }
                })
            }
        },
    }
</script>

<style scoped lang="stylus">
    .header{
        z-index 1
        background-color: rgba(0,0,0,0.5);
    }
    .recom-disc {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index 3
        background-color: #000;
    }

    .pic {
        position: absolute;
        top: -30px;
        width: 100%;
        height: 410px;
        overflow: hidden;
        filter: blur(1.5px);
        background-color: #000;
        background-size: 100%;
    }
</style>