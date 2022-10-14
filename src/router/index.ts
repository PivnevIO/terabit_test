import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/users',
    name: 'Create user',
    component: () => import('@/views/UsersCreate.vue')
  },
  {
    path: '/users/:id',
    name: 'User Information',
    component: () => import('@/views/Users.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
