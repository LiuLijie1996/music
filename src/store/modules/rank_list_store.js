import {rank_group, rank_list} from 'api/rank_list';

export default {
    namespaced: true,//允许使用命名空间

    //存储基本数据
    state: {
        state_rank_group: [],
        state_rank_list: {},
    },

    //存放修改state中数据的方法
    mutations: {
        //保存排行分组
        mu_rank_group(state, data){
            state.state_rank_group = data;
        },

        //保存排行歌曲
        mu_rank_list(state, data) {
            state.state_rank_list = data;
        }
    },

    //放置异步请求数据的方法
    actions: {
        //请求排行分组
        ac_rank_group(cxt) {
            rank_group().then(data => {
                console.log('请求排行分组',data);
                
                cxt.commit("mu_rank_group", data.data);
            })
        },

        //请求排行歌曲
        ac_rank_list(cxt, query) {
            rank_list(query).then(data => {
                console.log('请求排行歌曲', data);
                
                cxt.commit("mu_rank_list", data.data);
            })
        },
    },
}