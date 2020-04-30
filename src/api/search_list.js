import request from "./request";

export default function (query) {
    return request('get', '/search', query);
}