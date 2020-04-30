let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//分类分组
let RankGroupSchema = new Schema({
    //排行分类id
    group_id: {
        type:Number,
        required:true
    },
    //排行分类名称
    group_name:{
        type:String,
        required:true
    },
    //分类下的子分类
    top_list:[
        {
            //子分类id
            top_id:{
                type:Number,
                required:true
            },
            // 子分类标题
            title:{
                type:String,
                required:true
            },
            //子分类的封面图
            pic_url: {
                type:String,
                required:true
            },
            //分类歌曲中前三名
            song:{
                type:Array,
                required:true
            }
        }
    ]
});

//分类歌曲
let RankListSchema = new Schema({
    //分类id
    top_id: {
        type:Number,
        required:true
    },
    //分类标题
    title: {
        type:String,
        required:true
    },
    //分类封面图
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
            },
            //歌曲歌手
            singer_name:{
                type:String,
                required:true
            },
        }
    ]
});

exports.RankGroupSchema = mongoose.model('rank_group', RankGroupSchema);
exports.RankListSchema = mongoose.model('rank_list', RankListSchema);