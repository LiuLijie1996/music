import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

import rank_list_store from "./modules/rank_list_store";
import singer_song_store from "./modules/singer_song_store";
import play_store from "./modules/play_store";


let store = new Vuex.Store({
    //存储基本数据
    state: {
        com_state_song_list: [],
        com_state_style: {}
    },
    mutations: {
        //歌曲列表
        com_mu_state_song_list(state, data) {
            state.com_state_song_list = data;
        },
        //样式
        com_mu_style(state, playHeight) {
            state.com_state_style = {
                bottom: (playHeight / window.innerHeight) * 100 * 2 + 'vw'
            };
        }
    },
    modules: {
        //音乐排行列表
        rank_list_store,
        //获取歌手歌曲
        singer_song_store,
        //获取歌曲播放详情
        play_store,
    }
});


export default store