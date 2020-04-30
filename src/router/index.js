import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


import Recommend from "../components/views/recommend/Recommend";
import Singer from "../components/views/singer/Singer";
import Rank from "../components/views/rank/Rank";
import Search from "../components/views/search/Search";
import SingerSong from "../components/views/singer_song/SingerSong";
import RecomDisc from "../components/views/recom_disc/RecomDisc";
import RankList from "../components/views/rank-list/RankList";


let routes = [
    {
        path:'/',
        redirect:'/recommend'
    },
    {
        path:'/recommend',
        name:"recommend",
        component:Recommend,
        meta:{
            index:1,
            title:"推荐"
        },
        children: [
            {
                path:":id",
                name:"disc",
                component:RecomDisc,
                meta:{
                    index:2,
                    title:"推荐歌单列表"
                }
            }
        ],
    },
    {
        path:'/singer',
        name:"singer",
        component:Singer,
        meta:{
            index:2,
            title:"歌手"
        },
        children:[
            {
                path:':id',
                name:"singer_song",
                component:SingerSong,
                meta:{
                    index:3,
                    title:"歌手的歌曲"
                }
            },
        ]
    },
    {
        path:'/rank',
        name:"rank",
        component:Rank,
        meta:{
            index:3,
            title:"排行"
        },
        children:[
            {
                path:":id",
                name:"rank-list",
                component:RankList,
                meta:{
                    index:4,
                    title:"歌曲排行列表"
                }
            }
        ]
    },
    {
        path:'/search',
        name:"search",
        component:Search,
        meta:{
            index:4,
            title:"搜索"
        }
    },
];

export default new VueRouter({
    routes
})