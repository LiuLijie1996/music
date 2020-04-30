<template>
    <!--歌曲列表-->
    <div class="song_list" @click="getSongDetails">
        <div class="singer_song">
            <h4 class="title">
                {{songItem.song_title}}
            </h4>
            <p>
                <slot name="name"></slot>
                -- {{songItem.song_album.album_title||songItem.song_album.title||songItem.song_album.album_name}}
            </p>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "SongList",
        props: {
            songItem: {
                type: Object,
                default() {
                    return {};
                }
            },
        },
        methods: {
            ...mapActions('play_store', ['ac_play_info']),

            //获取歌曲信息
            getSongDetails() {
                let query = {
                    song_mid: this.songItem.song_mid,
                    song_id: this.songItem.song_id
                };

                //请求歌曲信息
                this.ac_play_info(query);
            },
        }
    }
</script>

<style scoped lang="stylus">
    .singer_song {
        padding: 10px;

        .title {
            color: #fff;
            font-size: 16px;
        }

        p {
            color: #ccc;
            margin-top: 5px;
            font-size: 13px;

            span {
                font-size: 13px;
            }
        }
    }
</style>