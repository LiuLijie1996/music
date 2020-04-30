//path, query, headers, callback, method = 'GET'
let MyRequest = require("../../MyRequest/MyRequest");
let url = require("url");

let SearchSchema = require("../../modules/SearchSchema");

exports.Search = function (req, res) {
    let query = req.query;

    let SearchApi = function(){
        let api = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?_=1585904022655&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&g_tk_new_20200303=5381&w=下山&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all";
        let headers = {
            referer: "https://y.qq.com/m/index.html?tab=recommend"
        };
        let newUrl = new url.URL(api);
        let map = newUrl.searchParams;
        //设置map的属性值
        map.set('w', query.w);//歌名
        api = url.format(newUrl);

        //path, query, headers, callback, method = 'GET'
        MyRequest(api, {}, headers, function (err, response, body) {
            let search_list = {
                keyword: query.w,//歌名
                song_list: []
            };

            JSON.parse(body).data.song.list.forEach(item => {
                let song = {
                    song_title: item.songname,//歌曲标题
                    song_id: item.songid,//歌曲id
                    song_mid: item.songmid,//歌曲mid
                    singer: {//歌手
                        id: item.singer[0].id,
                        mid: item.singer[0].mid,
                        name: item.singer[0].name,
                    },
                    song_album: {//歌曲专辑
                        album_id: item.albumid,
                        album_mid: item.albummid || '暂无',
                        album_name: item.albumname || '暂无',
                    }
                };

                search_list.song_list.push(song);
            });

            //保存到数据库
            SearchSchema.create(search_list).then((data)=>{
                res.send({
                    status:1,
                    msg:"歌曲搜索成功，并保存到数据库中",
                    data
                });
            }).catch(err=>{
                res.send({
                    status:0,
                    msg:"歌曲搜索失败，保存也失败",
                });
            });
        });
    };

    SearchSchema.findOne({keyword: query.w}).then(data => {
        if (data) {
            res.send({
                status:1,
                msg:"歌曲搜索成功",
                data
            });
        } else {
            //如果自己数据库没有,就实时获取
            SearchApi();
        }
    });
};