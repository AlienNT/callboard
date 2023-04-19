import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'products',
    component: () => import('../components/pages/VCategoryPage')
  },
  {
    path: '/:id',
    name: 'product',
    component: () => import('../components/pages/VProductPage.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../components/pages/VAuthPage.vue')
  },
]

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
