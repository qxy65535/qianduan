import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'
// import Posts from '@/views/Posts'
// import Editor from '@/components/MdEditor'
// import Detail from '@/views/Detail'
// import NotFound from '@/components/NotFound'
// import { resolve } from 'url';

Vue.use(Router)
const Home = resolve => {
  require.ensure(['@/views/Home'], () => {
      resolve(require('@/views/Home'))
  })
}
const Posts = resolve => {
  require.ensure(['@/views/Posts'], () => {
      resolve(require('@/views/Posts'))
  })
}
const Editor = resolve => {
  require.ensure(['@/components/MdEditor'], () => {
      resolve(require('@/components/MdEditor'))
  })
}
const Detail = resolve => {
  require.ensure(['@/views/Detail'], () => {
      resolve(require('@/views/Detail'))
  })
}
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/posts',
      name: 'Posts',
      component: resolve => require(['@/views/Posts'], resolve)
    },
    {
      path: '/edit',
      name: 'Edit',
      component: resolve => require(['@/components/MdEditor'], resolve)
    },
    {
      path: '/article/detail',
      name: 'Detail',
      component: resolve => require(['@/views/Detail'], resolve)
    },
    { 
      path: '*', 
      component: resolve => require(['@/views/NotFound'], resolve)
    }
  ]
})
