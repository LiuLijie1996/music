let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SongDetailsSchema = new Schema({
    //歌曲id
    song_id:{
        type:String,
        required:true,
    },
    //歌曲mid
    song_mid:{
        type:String,
        required:true,
    },
    //歌曲标题
    song_title:{
        type:String,
        required:true,
    },
    //歌曲歌词
    song_value:{
        type:String,
        required:true,
    },
    //歌曲时间
    song_time:{
        type:String,
        required:true,
    },
    //歌曲封面
    song_cover:{
        type:Array,
        required:true,
    },
    //歌曲播放接口
    play_url:{
        type:String,
        required:true,
    },

    //歌曲专辑
    song_album:{
        //专辑id
        album_id:{
            type:String,
        },
        //专辑mid
        album_mid:{
            type:String,
        },
        //专辑名称
        album_name:{
            type:String,
        },
    },

    //歌手信息
    singer_info:{
        //歌手id
        singer_id:{
            type:String,
        },
        //歌手mid
        singer_mid:{
            type:String,
        },
        //歌手名称
        singer_name:{
            type:String,
        },
    }
});

module.exports = mongoose.model('song_details', SongDetailsSchema);