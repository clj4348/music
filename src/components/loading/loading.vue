<template>
  <div class="loading">
    <img width="24" src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>

export default {
  name: 'loading',
  props:{
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus">
  @import '~assets/stylus/variables'
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
