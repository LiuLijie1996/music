let MyRequest = require("../../MyRequest/MyRequest");
let {JSDOM} = require("jsdom");
let SingerSongSchema = require("../../modules/SingerSongSchema");

exports.SingerSong = function (req, res) {
    let query = req.query;


    let SingerSongApi = function () {
        let api = "https://i.y.qq.com/n2/m/share/profile_v2/index.html?ADTAG=newyqq.singer&source=ydetail&singermid=" + `${query.singer_mid}`;

        //path, query, callback,  headers, method = 'GET'
        MyRequest(api, {}, {}, function (err, response, body) {
            let dom = new JSDOM(body, {
                runScripts: "dangerously",//允许执行html文本中的js脚本
            });

            let firstPageData = dom.window.firstPageData.data;

            let singer_song_obj = {
                singer_id: firstPageData.singerId,//当前歌手的id
                singer_mid: firstPageData.singerMid,//当前歌手的mid
                singer_name: firstPageData.name,//当前歌手的姓名
                singer_desc: firstPageData.certificateJumpInfoV2,//当前歌手的简介
                fans_num: firstPageData.fansNum,//当前歌手的粉丝数
                singer_pic: firstPageData.backgroundImage,//歌手图片
                song_list: [],//预存歌曲
            };

            firstPageData.tabInfo.list.forEach(item => {
                singer_song_obj.song_list.push({
                    song_id: item.id,//歌曲id
                    song_mid: item.mid,//歌曲mid
                    song_title: item.title,//歌曲标题
                    song_album: {//歌曲专辑
                        album_id: item.album.id,//专辑id
                        album_mid: item.album.mid,//专辑mid
                        album_title: item.album.title,//专辑标题
                    }
                })
            });

            //保存到数据库
            SingerSongSchema.create(singer_song_obj).then(data => {
                res.send({
                    status: 1,
                    msg: "歌手歌曲获取成功，并保存到数据库",
                    data
                });
            }).catch(err => {
                res.send({
                    status: 0,
                    msg: "歌手歌曲获取失败，保存也失败",
                });
            });
        });
    };


    //查找数据库中有没有当前歌手唱的歌
    SingerSongSchema.findOne(
        {
            singer_mid: query.singer_mid,
        },
        {
            _id: false,
            __v: false
        }
    ).then(data => {
        if (data) {
            res.send({
                status: 1,
                msg: "歌手歌曲获取成功",
                data
            });
        } else {
            //调用SingSongApi获取当前歌手唱的歌
            SingerSongApi()
        }
    });
};