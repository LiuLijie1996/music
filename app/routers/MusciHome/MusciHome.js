let url = require("url");
let MusicHomeSchema = require("../../modules/MusicHomeSchema");
let MyRequest = require("../../MyRequest/MyRequest");


let api = 'https://u.y.qq.com/cgi-bin/musicu.fcg?cgiKey=GetHomePage&_=1585461382210&data={"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}';

//获取主页的推荐歌单数据
exports.MusciHome = function (req, res) {
    /*let newURL = new url.URL(api);
    let map = newURL.searchParams;
    let data = JSON.parse(map.get('data'));
    console.log(data);*/

    let MusciHomeApi = function (){
        //path, query,  headers, callback, method = 'GET'
        MyRequest(api, req.query, {},function (err, response, body) {
            let v_shelf = JSON.parse(body).MusicHallHomePage.data.v_shelf;
            let newData = [];

            //遍历请求到的数据
            v_shelf.forEach(item=>{
                let category_title = item.title_template;
                let v_card = [];
                //遍历歌单选项卡
                item.v_niche[0].v_card.forEach(cardItem=>{
                    //判断id转换后是真是假
                    if (Boolean(Number(cardItem.id))) {
                        v_card.push({
                            child_id:cardItem.id,
                            child_title:cardItem.title,
                            cover:cardItem.cover,
                        });
                    }
                });


                if (v_card.length) {
                    //将每个分类的歌单添加到数组中
                    newData.push({
                        category_title,
                        v_card
                    });

                    //保存到数据库
                    MusicHomeSchema.create({
                        category_title,
                        v_card
                    }).then(data=>{
                        console.log('数据存储成功');
                    }).catch(err=>{
                        console.log(err.errors);
                    });
                }
            });

            //发送给前端
            res.send({
                status:1,
                msg: "首页歌单获取成功，并保存到数据库",
                data:newData
            });
        });
    };

    //查找数据库中有没有歌单
    MusicHomeSchema.find({}, {_id: false, _v: false}).then(data => {
        if (data.length) {
            res.send({
                status:1,
                msg: "首页歌单获取成功",
                data
            });
        } else {
            //如果数据库没有,则调用MusciHomeApi请求数据并添加到数据库
            MusciHomeApi()
        }
    })
};