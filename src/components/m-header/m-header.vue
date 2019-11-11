<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script>

export default {
  name: 'mHeader',
 
  data() {
    return {
      url: ''
    }
  },
  mounted(){
  }
}
</script>

<style lang="stylus">
  @import '~assets/stylus/variables'
  @import '~assets/stylus/mixin'
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      background: url('./logo@2x.png') no-repeat 
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
</style>
