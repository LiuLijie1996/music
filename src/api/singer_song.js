import request from "./request";

//获取歌手的歌曲
export default function (query) {
    return request('get', '/singer-song', query);
}