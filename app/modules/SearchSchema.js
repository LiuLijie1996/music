let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SearchSchema = new Schema({
    //搜索的歌曲名
    keyword:{
        type:String,
        required:true
    },
    //搜索到的歌曲
    song_list:[
        {
            //歌曲标题
            song_title:{
                type:String,
                required:true
            },
            //歌曲id
            song_id:{
                type:Number,
                required:true
            },
            //歌曲mid
            song_mid:{
                type:String,
                required:true
            },
            //歌手
            singer:{
                type:Object,
                required:true
            },
            //歌曲专辑
            song_album:{
                //专辑id
                album_id:{
                    type:Number,
                    required:true
                },
                //专辑mid
                album_mid:{
                    type:String,
                    required:true
                },
                //专辑名称
                album_name:{
                    type:String,
                    required:true
                },
            },
        }
    ]
});

module.exports = mongoose.model('search', SearchSchema);
