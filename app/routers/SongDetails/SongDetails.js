//path, query, headers, callback, method = 'GET'
let MyRequest = require("../../MyRequest/MyRequest");
let {JSDOM} = require("jsdom");
let SongDetailsSchema = require("../../modules/SongDetailsSchema");

//歌曲详情
exports.SongDetails = function (req, res) {
    let query = req.query;
    console.log("SongDetails", query);


    let SongDetailsApi = function(){
        //歌曲详情api
        let api = "https://i.y.qq.com/v8/playsong.html?ADTAG=newyqq.song&songmid=";
        let headers = {
            "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        };

        //歌词api
        let geciApi = "https://u.y.qq.com/cgi-bin/musicu.fcg?_=1585592698277";

        //歌词的query
        let geciQuery = JSON.stringify({
            "comm": {
                "g_tk": 5381,
                "uin": 0,
                "format": "json",
                "inCharset": "utf-8",
                "outCharset": "utf-8",
                "notice": 0,
                "platform": "h5",
                "needNewCode": 1
            },
            "detail": {
                "module": "music.pf_song_detail_svr",
                "method": "get_song_detail",
                "param": {
                    "song_id": Number(query.song_id)
                }
            },
            "simsongs": {
                "module": "rcmusic.similarSongRadioServer",
                "method": "get_simsongs",
                "param": {
                    "songid": Number(query.song_id)
                }
            },
            "gedan": {
                "module": "music.mb_gedan_recommend_svr",
                "method": "get_related_gedan",
                "param": {
                    "sin": 0,
                    "last_id": 0,
                    "song_type": 1,
                    "song_id": Number(query.song_id)
                }
            },
            "video": {
                "module": "MvService.MvInfoProServer",
                "method": "GetSongRelatedMv",
                "param": {
                    "songid": Number(query.song_id),
                    "songtype": 1,
                    "lastmvid": 0,
                    "num": 5
                }
            }
        });


        //path, query, headers, callback, method = 'GET'
        //先获取歌曲信息
        MyRequest(api + `${query.song_mid}`, {}, headers, function (err, response, body) {
            let dom = new JSDOM(body, {
                runScripts: "dangerously",//允许执行html文本中的js脚本
            });

            if (dom.window.songlist) {
                let songInfo = dom.window.songlist[0];
                //歌曲详情
                let song_details = {
                    //歌曲id
                    song_id: songInfo.songid,
                    //歌曲mid
                    song_mid: songInfo.songmid,
                    //歌曲标题
                    song_title: songInfo.songtitle,

                    //歌曲歌词
                    // song_value:songInfo.,

                    //歌曲时间
                    song_time: songInfo.playTime,
                    //歌曲封面
                    song_cover: [songInfo.pic, songInfo.singerpic],
                    //歌曲播放接口
                    play_url: songInfo.m4aUrl,
                    //歌曲专辑
                    song_album: {
                        album_id: songInfo.albumid,
                        album_mid: songInfo.albummid,
                        album_name: songInfo.albumname
                    },
                    //歌手信息
                    singer_info: {
                        singer_id: songInfo.singer[0].id,
                        singer_mid: songInfo.singer[0].mid,
                        singer_name: songInfo.singername,

                    },
                };

                //获取歌曲歌词
                MyRequest(geciApi, geciQuery, {}, function (err, response, body) {
                    let info = JSON.parse(body).detail.data.info;
                    let song_value = info[info.length - 1].content[0].value;

                    song_details.song_value = song_value || "没有检索到歌词";

                    //将数据保存到数据库
                    SongDetailsSchema.create(song_details).then(data => {
                        res.send({
                            status:1,
                            msg:"歌曲详情获取成功，并保存到数据库",
                            data
                        });
                    }).catch(err => {
                        res.send({
                            status:1,
                            msg:"歌曲详情获取失败，并保存失败",
                        });
                    });
                }, "POST");
            }
        });
    };


    //查看自己的数据库中是否有该歌曲详情
    SongDetailsSchema.findOne({
        song_mid: query.song_mid
    }).then(data => {
        if (data) {
            res.send({
                status:1,
                msg:"歌曲详情获取成功",
                data
            });
        } else {
            //如果数据库中没有该歌曲，则调用SongDetailsApi进行实时获取
            SongDetailsApi()
        }
    })

};