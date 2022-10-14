import { createRouter, createWebHistory } from 'vue-router'

import Game from './views/Game.vue'
import Home from './views/Home.vue'

const routes = [
  {
    props: true,
    path: '/game/:id',
    name: 'game',
    component: Game
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router