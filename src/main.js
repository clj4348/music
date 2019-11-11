import 'assets/stylus/index.styl'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'


import fastclick from 'fastclick';
fastclick.attach(document.body); // 移动端的300毫秒的延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
