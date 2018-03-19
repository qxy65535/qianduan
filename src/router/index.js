import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Posts from '@/views/Posts'
import Editor from '@/components/MdEditor'
import Detail from '@/views/Detail'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Editor
    },
    {
      path: '/article/detail/*',
      name: 'Detail',
      component: Detail
    },
    { 
      path: '*', 
      component: NotFound
    }
  ]
})
