<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  },
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
  
</style>
