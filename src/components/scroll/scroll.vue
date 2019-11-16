<template>
  <div class="slider" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import { addClass } from 'assets/js/dom'
export default{
  name: 'scroll',
  props:{
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      defalut: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  
  data () {
    return {
      
    }
  },
  components: {
    
  },
  created(){
   
  },
  watch: {
    data(){
      // 数据变更，重新定义滚动
      setTimeout(() => {
        this.refresh();
      },20)
    }
  },
  mounted(){
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods:{
    _initScroll(){
      if(!this.$refs.wrapper){
        return 
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if(this.listenScroll){
        let self = this;
        this.scroll.on('scroll', (pos)=>{
          self.$emit('scroll', pos)
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    scrollTo(){
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
 
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables'
 
</style>
