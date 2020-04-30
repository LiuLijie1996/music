import {mapState, mapMutations} from "vuex";

export const mixins = {
    data(){
        return {
            top:{
                top:0
            },
            picTopVw:0,
            picHeight:0,
        }
    },
    mounted() {
        this.$nextTick(()=>{
            //计算出背景图片盒子的实际占地高度
            this.picHeight = this.$refs.pic.clientHeight + this.$refs.pic.offsetTop;
            //计算出背景图片的盒子距离顶部多少vw
            // this.picTopVw = this.picHeight / window.innerHeight * 100 * 2;

            // console.log(this.picTopVw);
            //计算出滚动组件距离顶部多少vw
            this.top = {
                top: '95vw'
            }
        })
    },
    methods:{
        ...mapMutations(['com_mu_state_song_list']),
        //监听滚动
        getScroll(option) {
            //计算出背景图片的盒子应该减少多少vw
            this.picTopVw = (this.picHeight + option.y) / window.innerHeight * 100 * 2;
            this.picTopVw = this.picTopVw <= 19.5 ? 19.5 : this.picTopVw;
            this.picTopVw = this.picTopVw >= 100 ? 100 : this.picTopVw;

            //重置背景图片的盒子高度
            this.$refs.pic.style.height = this.picTopVw + 'vw';

            // console.log(this.picTopVw);
            //计算出滚动组件距离顶部多少vw
            this.top = {
                top: this.picTopVw - 5 + 'vw'
            }
        }
    },
    computed:{
        ...mapState(['com_state_style']),

        disc_bgImg(){
            //将获取到的数据上传到公共仓库中
            this.com_mu_state_song_list(this.recom_gedan_data.song_list);

            //获取图片地址
            let pic =  this.recom_gedan_data.pic_url;
            return `url(${pic})`;
        },
        singer_bgImg() {
            let pic = this.state_singer_info.singer_pic;
            return `url(${pic})`;
        },
        rank_bgImg(){
            let pic = this.state_rank_list.pic_url;
            return `url(${pic})`;
        }
    }
};