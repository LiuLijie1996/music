let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SingerSongSchema = new Schema({
    //歌手id
    singer_id:{
        type:String,
        required:true
    },
    //歌手mid
    singer_mid:{
        type:String,
        required:true
    },
    //歌手姓名
    singer_name: {
        type:String,
        required:true
    },
    //歌手简介
    singer_desc: {
        type:Object,
        default:{}
    },
    //歌手粉丝
    fans_num:{
        type:Number,
        required:true
    },
    //歌手图片
    singer_pic:{
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
            //歌曲专辑
            song_album:{
                type:Object,
                default:{}
            }
        }
    ]
});


module.exports = mongoose.model("singer_song", SingerSongSchema);