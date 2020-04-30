import singer_song from "../../api/singer_song";

export default {
    namespaced: true,//允许使用命名空间

    //存储基本数据
    state: {
        state_singer_info:{},
        state_song_list:[],
    },

    //存放修改state中数据的方法
    mutations: {
        mu_singer_song_list(state, data){
            //歌手信息
            state.state_singer_info = {
                singer_id:data.singer_id,
                singer_mid:data.singer_mid,
                singer_pic:data.singer_pic,
                singer_name:data.singer_name,
            };

            //歌曲列表
            state.state_song_list = data.song_list;
        }
    },

    //放置异步请求数据的方法
    actions: {
        ac_singer_song_list(cxt, query){
            //获取歌手歌曲
            singer_song(query).then(data => {
                console.log(data);
                
                cxt.commit("mu_singer_song_list", data.data);
            })
        }
    },
}