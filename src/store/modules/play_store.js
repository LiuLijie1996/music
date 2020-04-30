import song_details from "../../api/song_details";

export default {
    namespaced: true,//允许使用命名空间

    //存储基本数据
    state: {
        state_play_info: {},
    },

    //存放修改state中数据的方法
    mutations: {
        mu_play_info(state, data){
            state.state_play_info = data;
        }
    },

    //放置异步请求数据的方法
    actions: {
        //请求歌曲详情
        ac_play_info(cxt, query){
            //获取歌曲信息
            song_details(query).then(data => {
                cxt.commit("mu_play_info", data.data);
            })
        }
    },
};