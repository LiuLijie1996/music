let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RecomDiscSchema = new Schema({
    //歌单标题
    gedan_title:{
        type:String
    },
    //歌单id
    gedan_id:{
        type:Number
    },
    //封面图
    pic_url:{
        type:String,
        required:true
    },
    //歌曲列表
    song_list:[
        {
            //歌曲id
            song_id:{
                type:Number,
            },
            //歌曲mid
            song_mid:{
                type:String,
            },
            //歌曲标题
            song_title:{
                type:String,
            },
            //歌曲专辑
            song_album:{
                //专辑id
                album_id:{
                    type:Number
                },
                //专辑mid
                album_mid:{
                    type:String
                },
                //专辑标题
                album_title:{
                    type:String
                },
            },
            //歌手信息
            singer_info:{
                singer_id:{
                    type:Number
                },
                singer_mid:{
                    type:String
                },
                singer_name:{
                    type:String
                },
            },
        }
    ]
});

module.exports = mongoose.model('recom_disc', RecomDiscSchema);