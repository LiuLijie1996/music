<template>
    <div class="searchBox">
        <div class="search">
            <input type="text" v-model="value">
            <span @click="searchClick">搜索</span>
        </div>

        <div class="list" v-if="song_list.length">
            <my-scroll :style="{top:'38vw', ...com_state_style}">
                <song-list
                        v-for="(item,index) in song_list"
                        :song-item="item"
                        :key="index"
                >
                    <template #name>
                        {{item.singer.name}}
                    </template>
                </song-list>
            </my-scroll>
        </div>
    </div>
</template>

<script>
    import search_list from 'api/search_list';
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "Search",
        data() {
            return {
                value: "",
                song_list:[],
            }
        },
        methods:{
            ...mapMutations(['com_mu_state_song_list']),
            //搜索歌曲
            searchClick(){
                if (this.value.trim()) {
                    search_list({w: this.value}).then(data => {
                        console.log(data);

                        if(data.status){
                            this.song_list = data.data.song_list;
                            //提交到仓库
                            this.com_mu_state_song_list(this.song_list);
                        }
                    });
                }
            }
        },
        computed:{
            ...mapState(['com_state_style']),
        }
    }
</script>

<style scoped lang="stylus">
    .search{
        display flex;
        justify-content center;
        padding:10px;
        input{
            width: 75%;
            border:0;
            border-radius 3px;
        }
        span{
            margin-left:5px;
        }
    }
</style>