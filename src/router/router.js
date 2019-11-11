
export default [
    {
      path: '/recommend',
      name: '推荐',
      component: () => import('@/pages/recommend/recommend')
    },
    
    {
      path: '/singer',
      name: '歌手',
      component: () => import('@/pages/singer/singer')
    },
    {
      path: '/rank',
      name: '排行',
      component: () => import('@/pages/rank/rank')
    },
    {
      path: '/search',
      name: '搜索',
      component: () => import('@/pages/search/search')
    }

  ]
