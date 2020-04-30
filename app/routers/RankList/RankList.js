//path, query, headers, callback, method = 'GET'
let MyRequest = require("../../MyRequest/MyRequest");
let {JSDOM} = require("jsdom");
let {RankGroupSchema, RankListSchema} = require("../../modules/RankListSchema");

//分组排行
exports.RankGroup = function (req, res) {

    let RankGroupApi = function(){
        let api = `https://u.y.qq.com/cgi-bin/musicu.fcg?_=1585977176625&data={"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`;

        //path, query, headers, callback, method = 'GET'
        MyRequest(api, {}, {}, function (err, response, body) {
            let group_list = [];

            JSON.parse(body).topList.data.group.forEach(item => {
                let group = {
                    group_id: item.groupId,
                    group_name: item.groupName,
                    top_list: [],
                };

                item.toplist.forEach(list => {
                    let top_list = {
                        top_id: list.topId,
                        title: list.title,
                        pic_url: list.headPicUrl,
                        song: list.song,
                    };

                    group.top_list.push(top_list)
                });

                group_list.push(group);

                //保存到数据库
                RankGroupSchema.create(group).then((data) => {
                    console.log("分类排行获取成功,并保存到数据库");
                }).catch(err => {
                    res.send({
                        status:0,
                        msg:"分组排行获取失败,保存也失败",
                    })
                })
            });

            //返回整理好的数据给前端
            res.send({
                status:1,
                msg:"分组排行获取成功,并保存到数据库中",
                data:group_list
            })
        });
    };


    //查询数据库中有没有推荐歌曲
    RankGroupSchema.find().then(data => {
        if (data.length) {
            res.send({
                status:1,
                msg:"分组排行获取成功",
                data
            });
        } else {
            //如果数据库中没有推荐歌曲,调用RankListApi进行保存
            RankGroupApi();
        }
    })
};

//排行下的歌曲列表
exports.RankList = function (req, res) {
    let query = req.query;


    let RankListApi = function(){
        let api = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${query.id}`;

        MyRequest(api, {}, {}, function (err, req, body) {
            let dom = new JSDOM(body, {
                runScripts: "dangerously",//允许执行html文本中的js脚本
            });

            let firstPageData = dom.window.firstPageData;

            let ran_list = {
                top_id: firstPageData.toplistData.topId,
                title: firstPageData.toplistData.title,
                pic_url: firstPageData.toplistData.headPicUrl,
                song_list: [],
            };

            firstPageData.songInfoList.forEach(item=>{
                let song = {
                    song_id: item.id,
                    song_mid: item.mid,
                    song_title: item.title,
                    song_album: item.album,
                    singer_name: item.singername,
                };

                ran_list.song_list.push(song)
            });

            //保存到数据库
            RankListSchema.create(ran_list).then((data)=>{
                res.send({
                    status:1,
                    msg:"排行歌曲获取成功,并保存到数据库",
                    data
                })
            }).catch(err=>{
                res.send({
                    status:1,
                    msg:"排行歌曲获取失败,保存也失败"
                })
            });
        });
    };

    //查询数据库中有没有推荐歌曲
    RankListSchema.findOne({top_id: query.id}).then(data => {
        if (data) {
            res.send({
                status:1,
                msg:"排行歌曲获取成功",
                data
            });
        } else {
            //如果数据库中没有推荐歌曲,调用RankListApi进行保存
            RankListApi();
        }
    })
};