<template>
  <scroll class="listview"
    ref="listview"
    :listenScroll="listenScroll"
    :data="data"
    :probeType='probeType'
    @scroll="scroll">
    <ul>
      <li class="list-group"
        v-for="(groups, index) in data"
        ref="listGroup"
        :key="index">
        <h2 class="list-group-title">{{groups.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, itemIndex) in groups.items" :key="itemIndex">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item"
          :class="{'current': currentIndex == index}"
          v-for="(item, index) in  shortcutList"
          :data-index="index"
          :key="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/scroll/scroll';
import Loading from 'components/loading/loading';
import { getData } from 'assets/js/dom';
const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
  name: 'listview',
  components: {
    Scroll,
    Loading
  },
  props:{
    data: {
      type: Array,
      default: [],
    }
  },
  data(){
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  computed: {
    shortcutList(){
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle(){
      if(this.scrollY > 0){
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    }
  },
 
  created(){
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3;
  },
  methods: {
    onShortcutTouchStart(e){
      let anchorIndex = getData(e.target, 'index');
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e){
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
      let anchorIndex = Number(this.touch.anchorIndex) + delta;
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index){
      if(!index && index !== 0){
        return
      }
      if(index < 0){
        index = 0
      } else if(index > this.listHeight.length -2 ){
        index = this.listHeight.length;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    scroll(pos){
      this.scrollY = pos.y
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0; i< list.length; i++){
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data(){
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    diff(newVal){
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
      if(this.fixedTop === fixedTop){
        return
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px, 0)`
    },
    scrollY(newY){
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY > 0
      if(newY > 0){
        this.currentIndex = 0;
        return 
      }
      for(let i=0; i<listHeight.length; i++){
        let height1 = listHeight[i];
        let height2 = listHeight[i+1];
        if( -newY >= height1 && -newY < height2){
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部 且-newY大于最后一个元素的上限      
      this.currentIndex = listHeight.length - 2;
    },
    
  },
  mounted(){

  }
}
</script>

<style lang="stylus">
  @import '~assets/stylus/variables'
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background  
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
