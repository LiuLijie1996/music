let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SongSchema = new Schema({
    //歌单id
    id:{
        type:String,
        required:true
    },
    //歌单标题
    title: {
        type:String,
        required:true
    },
    //歌单封面图
    cover: {
        type:String,
        required:true
    },
    //歌曲列表
    song_list:[
        {
            //歌曲id
            song_id:{
                type:String,
                required:true
            },
            //歌曲mid
            song_mid:{
                type:String,
                required:true
            },
            //歌曲标题
            song_title:{
                type:String,
                required:true
            },
            //歌曲简介
            album_sub_title:{
                type:String,
                required:true
            },
            //当前演唱的歌手
            singer_name: {
                type:String,
                required:true
            },
            //其他歌手信息
            singer_info:[
                {
                    //歌手id
                    id:{
                        type:String,
                        required:true
                    },
                    //歌手mid
                    mid:{
                        type:String,
                        required:true
                    },
                    //歌手名字
                    name:{
                        type:String,
                        required:true
                    }
                }
            ],
        }
    ]
});


module.exports = mongoose.model("song_list", SongSchema);