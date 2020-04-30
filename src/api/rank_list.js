import request from "./request";



let rank_group = function () {
    return request("get", "/rank-group");
};

let rank_list = function (query) {
    return request("get", "/rank-list", query);
};

export {
    rank_group,
    rank_list,
}

