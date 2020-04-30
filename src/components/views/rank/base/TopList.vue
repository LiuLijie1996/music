<template>
    <div class="top_list">
        <my-scroll class="scroll" :style="com_state_style">
            <ul v-for="(item,index) in state_rank_group" :key="index">
                <li v-for="(list,index2) in item.top_list" :key="index2" @click="handleClick(list)">
                    <div class="left">
                        <h4 class="title">{{list.title}}</h4>
                        <div v-for="(song,index) in list.song" :key="index">
                            {{index+1}}. {{song.title}}
                        </div>
                    </div>

                    <!--图片-->
                    <div class="pic">
                        <img :src="list.pic_url" alt="">
                    </div>
                </li>
            </ul>
        </my-scroll>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "TopLlist",
        methods:{
            handleClick(list){
                //跳转到排行歌曲列表页
                if (this.$route.params.id !== list.top_id) {
                    this.$router.push({
                        name:"rank-list",
                        params:{
                            id:list.top_id
                        }
                    });
                }
            }
        },
        computed: {
            ...mapState('rank_list_store', ['state_rank_group']),
            ...mapState(['com_state_style']),
        },
    }
</script>

<style scoped lang="stylus">
    .scroll {
        color:#fff;

        ul {
            width: 90%;
            margin: auto;
            list-style none;

            li {
                overflow: hidden;
                padding:10px;

                .left{
                    float: left;
                    width: 50%;
                    div{
                        font-size:16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                }

                .pic {
                    float: right;
                    width: 100px;
                    height: 100px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

</style>