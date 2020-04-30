import request from './request';

//请求歌曲分类数据
export default function (query={}) {
    return request('get', '/singer-list', query);
}
