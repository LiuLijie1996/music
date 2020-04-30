<template>
    <div class="rank_list">
        <my-header clss="header">
            <template #left>
                <span @click="$router.go(-1)">《 </span>
            </template>
            <template #mid>
                <h4 class="title">
                    {{state_rank_list.title}}
                </h4>
            </template>
        </my-header>

        <div class="pic" :style="{backgroundImage:rank_bgImg}" ref="pic"></div>

        <my-scroll :style="{...top, ...com_state_style}" @getScroll="getScroll">
            <song-list v-for="(item,index) in state_rank_list.song_list" :song-item="item" :key="index">
                <template #name>{{item.singer_name}}</template>
            </song-list>
        </my-scroll>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from 'vuex';
    import {mixins} from 'utils/mixin';

    export default {
        name: "RankList",
        mixins: [mixins],
        watch:{
            $route(){
                //请求分类排行的歌曲
                this.ac_rank_list(this.$route.params)
            },
            state_rank_list(){
                //将获取到的数据上传到公共仓库中
                this.com_mu_state_song_list(this.state_rank_list.song_list);
            }
        },
        created() {
            //请求分类排行的歌曲
            this.ac_rank_list(this.$route.params)
        },
        methods:{
            ...mapActions('rank_list_store',['ac_rank_list']),
            ...mapMutations(['com_mu_state_song_list']),
        },
        computed:{
            ...mapState('rank_list_store', ['state_rank_list']),
        }
    }
</script>

<style scoped lang="stylus">
    .header{
        z-index 1
        background-color: rgba(0,0,0,0.5);
    }
    .rank_list{
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