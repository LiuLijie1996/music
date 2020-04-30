import request from "./request";

//获取首页的推荐的歌单中的歌曲列表
export default function (query) {
    return request('get', '/recom-disc', query);
}