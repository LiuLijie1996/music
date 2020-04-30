<template>
    <div class="rank">
        <transition mode="in-out">
            <top-list></top-list>
        </transition>

        <transition mode="in-out">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import TopList from './base/TopList';

    export default {
        name: "Rank",
        created() {
            //获取排行分组
            this.ac_rank_group()
        },
        methods:{
            ...mapActions('rank_list_store', ['ac_rank_group']),
        },
        components:{
            TopList
        }
    }
</script>

<style scoped lang="stylus">
    .rank{
        overflow: hidden;
    }
</style>