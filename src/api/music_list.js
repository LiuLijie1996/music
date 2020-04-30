import request from './request';

//请求歌单列表数据
export default function (query={}) {
    return request('get', '/music-list', query);
}