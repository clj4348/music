import Vue from 'vue'
import Router from 'vue-router'
import routes from './router' 

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes
})

// 登陆拦截
router.beforeEach((to, from, next)=> {
  next()
})
export default router