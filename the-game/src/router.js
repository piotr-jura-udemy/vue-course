import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Game.vue')
  },
  {
    path: '/hall-of-fame',
    name: 'hall-of-fame',
    component: () => import('./views/HallOfFame.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
  // domain.local/#/hall-of-fame
})

export default router