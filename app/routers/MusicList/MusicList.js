let url = require("url");
let {JSDOM} = require("jsdom");
let MyRequest = require("../../MyRequest/MyRequest");
let SongListSchema = require("../../modules/SongListSchema");
let RecomDiscSchema = require("../../modules/RecomDiscSchema");

//获取推荐歌单列表
exports.MusicList = function (req, res) {
    //获取前端发来的歌单id
    let query = req.query;

    let MusicListApi = function () {
        let api = "https://y.qq.com/n/m/detail/taoge/index.html?ADTAG=myqq&from=myqq&channel=10007100&id=7256912512";

        //解析链接
        let newUrl = new url.URL(api);
        //获取查询对象,返回的是map对象
        let map = newUrl.searchParams;
        //设置id
        map.set("id", query.id);
        api = url.format(newUrl);

        //path, query,  headers, callback, method = 'GET'
        MyRequest(api, req.query, {},function (err, response, body) {
            let dom = new JSDOM(body, {
                runScripts: "dangerously"
            });
            let qqTaogeInfo = dom.window.taogeInfo;
            let qqSongList = dom.window.songList;

            let songList = {
                id: qqTaogeInfo.id,//歌单id
                title: qqTaogeInfo.dissname,//歌单标题
                cover: qqTaogeInfo.logo,//歌单封面
                song_list: [],//歌曲列表
            };

            qqSongList.forEach(item => {
                //其他歌手信息
                let singer_info = [];
                item.singer.forEach(singer => {
                    singer_info.push({
                        id: singer.id,
                        mid: singer.mid,
                        name: singer.name,
                    })
                });

                //填充歌曲
                songList.song_list.push({
                    song_id: item.songid,//歌曲id
                    song_mid: item.songmid,//歌曲mid
                    song_title: item.songtitle,//歌曲标题
                    album_sub_title: item.albumsubtitle || "undefind",//歌曲简介
                    singer_name: item.singername,//当前歌曲的歌手
                    singer_info
                });
            });

            //推荐歌单列表 保存到数据库
            SongListSchema.create(songList).then(() => {
                console.log('推荐歌单列表获取成功，并保存到数据库');
            }).catch(err => {
                console.log(err.errors);
            });

            res.send({
                status: 1,
                msg: "推荐歌单列表获取成功，并保存到数据库",
                data: songList
            });
        });
    };


    //查看数据库是否有数据
    SongListSchema.findOne({id: query.id}, {_id: false, _v: false}).then(data => {
        if (data) {
            res.send({
                status: 1,
                msg: "推荐歌单列表获取成功",
                data
            });
        } else {
            //数据库没有数据,调用MusicListApi请求数据,并保存到数据库
            MusicListApi();
        }
    })
};

//获取歌单音乐列表
exports.RecomDisc = function (req, res) {
    //获取前端发来的歌单id
    let query = req.query;

    let RecomDiscApi = function(){
        let api = `https://i.y.qq.com/n2/m/share/details/taoge.html?ADTAG=newyqq.taoge&id=${query.id}`;

        //path, query,  headers, callback, method = 'GET'
        MyRequest(api, {}, {},function (err, response, body) {
            let dom = new JSDOM(body, {
                runScripts: "dangerously"
            });
            let taogeData = dom.window.firstPageData.taogeData;
            let songlist = dom.window.firstPageData.taogeData.songlist;

            let gedan = {
                gedan_title: taogeData.title,
                gedan_id: taogeData.id,
                pic_url: taogeData.picurl,
                song_list: [],
            };

            songlist.forEach(item => {
                let song_info = {
                    song_id: item.id,
                    song_mid: item.mid,
                    song_title: item.title,
                    song_album: {
                        album_id: item.album.id,
                        album_mid: item.album.mid,
                        album_title: item.album.name,
                    },
                    singer_info: {
                        singer_id: item.singer[0].id,
                        singer_mid: item.singer[0].mid,
                        singer_name: item.singer[0].name,
                    },
                };

                gedan.song_list.push(song_info)
            });

            //保存到数据库
            RecomDiscSchema.create(gedan).then(() => {
                console.log('歌单音乐列表获取成功，并保存到数据库');
            }).catch(err => {
                console.log(err.errors);
            });

            res.send({
                status:1,
                msg:"歌单音乐列表获取成功，并保存到数据库",
                data:gedan
            });
        });
    };


    //查看数据库是否有数据
    RecomDiscSchema.findOne({gedan_id: query.id}, {_id: false, _v: false}).then(data => {
        if (data) {
            res.send({
                status:1,
                msg:"歌单音乐列表获取成功",
                data
            });
        } else {
            //数据库没有数据,调用RecomDiscSchema请求数据,并保存到数据库
            RecomDiscApi();
        }
    })
};
