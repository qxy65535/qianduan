import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'
// import Posts from '@/views/Posts'
// import Editor from '@/components/MdEditor'
// import Detail from '@/views/Detail'
// import NotFound from '@/components/NotFound'
// import { resolve } from 'url';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/Login'], resolve)
    },
    {
      path: '/logout',
      name: 'Logout',
      component: resolve => require(['@/views/Logout'], resolve)
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
      path: '/aboutme',
      name: 'AboutMe',
      component: resolve => require(['@/views/AboutMe'], resolve)
    },
    {
      path: '/handwtreco',
      name: 'HandwtReco',
      component: resolve => require(['@/views/HandwtReco'], resolve)
    },
    { 
      path: '*', 
      component: resolve => require(['@/views/NotFound'], resolve)
    }
  ]
})
