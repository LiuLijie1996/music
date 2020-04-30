let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//音乐厅首页表规则
let MusicHomeSchema = new Schema({
    //歌单分类标题
    category_title:{
        type:String,
        required:true
    },
    //歌单选项卡
    v_card:[
        {
            //子歌单id
            child_id: {
                type:String,
                required:true
            },
            //子歌单标题
            child_title:{
                type:String,
                required:true
            },
            //子歌单封面
            cover:{
                type:String,
                required:true
            }
        }
    ]
});

module.exports = mongoose.model("music_home", MusicHomeSchema);