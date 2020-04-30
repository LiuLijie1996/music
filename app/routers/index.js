let express = require("express");
let router = express.Router();
let {MusciHome} = require("./MusciHome/MusciHome");
let {MusicList, RecomDisc} = require("./MusicList/MusicList");
let {SingerList} = require("./SingerList/SingerList");
let {SingerSong} = require("./SingerSong/SingerSong");
let {SongDetails} = require("./SongDetails/SongDetails");
let {RankGroup, RankList} = require("./RankList/RankList");
let {Search} = require("./Search/Search");

//音乐厅首页
router.get("/music-home", MusciHome);
//推荐歌单列表
router.get("/music-list", MusicList);
//歌单的歌曲列表
router.get("/recom-disc", RecomDisc);
//歌手列表
router.get("/singer-list", SingerList);
//歌手歌曲
router.get("/singer-song", SingerSong);
//歌曲详情
router.get("/song-details", SongDetails);
//歌曲搜索
router.get("/search", Search);
//排行榜
router.get("/rank-group", RankGroup);
router.get("/rank-list", RankList);



module.exports = router;