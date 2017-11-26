import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'
import Landing from '@/components/Landing'
import * as conf from '@/config'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: conf.location,
  routes: [{
    path: '/',
    name: 'landing',
    component: Landing
  }, {
    path: '/b/:board',
    name: 'board',
    component: Board
  }]
})
