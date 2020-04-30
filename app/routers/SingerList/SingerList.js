let url = require("url");
let MyRequest = require("../../MyRequest/MyRequest");
let SingerListSchema = require("../../modules/SingerListSchema");

//获取歌手
exports.SingerList = function (req, res) {
    //获取歌手分页
    let query = req.query;

    let SingerListApi = function(){
        let api = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
        let qs = {
            '_': 'getUCGI13777262007254665',
            'g_tk': '5381',
            'loginUin': '0',
            'hostUin': '0',
            'format': 'json',
            'inCharset': 'utf8',
            'notice': '0',
            'platform': 'yqq.json',
            'needNewCode': '0',
            'data': JSON.stringify({
                'comm': {'ct': 24, 'cv': 0},
                'singerList': {
                    'module': 'Music.SingerListServer',
                    'method': 'get_singer_list',
                    'param': {
                        'area': -100,
                        'sex': -100,
                        'genre': -100,
                        'index': -100,
                        'sin': query.page * 80,
                        'cur_page': 1
                    }
                }
            })
        };
        //path, query,  headers, callback, method = 'GET'
        MyRequest(api, qs, {},function (err, response, body) {
            //获取歌手列表
            let singer_list = JSON.parse(body).singerList.data.singerlist;

            //遍历歌手保存到数据库
            singer_list.forEach(item => {
                //查找是否有这个歌手
                SingerListSchema.findOne({singer_id: item.singer_id}).then(data => {
                    if (!data) {
                        //没有这个歌手时就进行保存
                        SingerListSchema.create(item).then(data => {
                            console.log('歌手数据获取成功，并保存到数据库中');
                        }).catch((err) => {
                            console.log('歌手数据保存失败');
                        })
                    }
                });
            });

            res.send({
                status:1,
                msg:"歌手列表数据获取成功，并保存到数据库中",
                data:singer_list
            });
        });
    };

    //查询歌手列表
    SingerListSchema.find(
        {},
        {
            _id: false,
            __v: false
        },
        {
            skip: 80 * query.page,
            limit: 80
        }
    ).then(data => {
        //判断数据库中有没有数据
        if (data.length) {
            //如果有,则直接返回数据
            res.send({
                status:1,
                msg:"歌手列表数据获取成功",
                data
            });
        } else {
            //如果没有,调用 SingerListApi 获取歌手数据
            SingerListApi()
        }
    }).catch(() => {
        res.send({
            status: 0,
            msg: "数据获取失败,请稍后再试"
        })
    })
};
