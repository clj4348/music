<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>  
    </div>
    <div class="dots">
      <span class="dot"
        v-for="(item, index) in dots"
        :class="{'active': currentPageIndex === index}"
        :key="index"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import { addClass } from 'assets/js/dom'
export default{
  name: 'slider',
  props:{
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  components: {
    
  },
  data () {
    return {
      children: [],
      dots: [],
      currentPageIndex: 0,
    }
  },
  created(){
   
  },
  mounted(){
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if(this.autoPlay){
        this._play()
      }
    }, 20)
    // 视图变化监听
    window.addEventListener('resize', ()=> {
      if(!this.slider){
        return 
      }
      this._setSliderWidth(true)
      this.slider.refresh();
    })
  },
  methods: {
    // 记录宽度
    _setSliderWidth(isResize){
      // 获取总的宽度
      this.children = this.$refs.sliderGroup.children
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth
      for(let i=0 ; i<this.children.length; i++){
        let child = this.children[i];
        addClass(child, 'slider-item'); // 添加类名
        child.style.width = sliderWidth + 'px'; // 设置宽度
        width += sliderWidth;
      }

      if(this.loop && !isResize){
        width += 2*sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px';
      
    },
    _initSlider(){
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        if(this.loop){
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if(this.autoPlay){
          clearTimeout(this.timer)
          this._play();
        }
      })
    },
    _initDots(){
      this.dots = new Array(this.children.length)
    },
    _play(){
      let pageIndex = this.currentPageIndex + 1;
      if(this.loop){
        pageIndex += 1
      }
      this.timer = setTimeout(()=> {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed(){
    clearTimeout(this.timer);
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables'
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left 
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
