<template>
  <div class="index">
   这是首页
  </div>
</template>
<script>


export default{
  name: 'Index',
  components: {
    
  },
  data () {
    return {
      categoryList: [], // 分类导航
      floorList: [], // 商品楼层
      bannerList: [], // banner图
      arr:[]
    }
  },
  created(){
   
  }
}
</script>
<style lang="stylus" scoped>
  .index
    color #ccc
</style>
