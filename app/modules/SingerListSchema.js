let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//歌手列表
let SingerSchema = new Schema({
    //歌手id
    singer_id:{
        type:Number,
        required:true
    },
    //歌手mid
    singer_mid:{
        type:String,
        required:true
    },
    //歌手名字
    singer_name:{
        type:String,
        required:true
    },
    //歌手图片
    singer_pic:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("singer_list", SingerSchema);