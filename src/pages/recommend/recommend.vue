<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImg" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import Loading from 'components/loading/loading';
import Slider from 'components/slider/slider';
import Scroll from 'components/scroll/scroll';
import { getRecommend, getDiscList } from 'api/recommend';
import { ERR_OK } from 'api/config';

export default{
  name: 'recommend',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
     recommends : [],
     discList: [],
     checkLoaded: false
    }
  },
  created(){
    this._getRecommend()
    this._getDiscList();
  },
  methods: {
    _getRecommend(){
      getRecommend().then((res) => {
        if(res.code === ERR_OK) {
          this.recommends =  res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) =>{
        this.discList = res.data.list;
        console.log(res.data.list)
      })
    },
    loadImg(){
      if(!this.checkLoaded){
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables'
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
