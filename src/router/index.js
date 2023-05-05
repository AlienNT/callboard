import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'products',
        component: () => import('../components/pages/VCategoryPage')
    },
    {
        path: '/:id',
        name: 'product',
        component: () => import('../components/pages/VProductPage.vue'),
    },
    {
        path: '/:id/edit',
        name: 'edit',
        component: () => import('../components/pages/VAnnouncementPage.vue'),
        beforeEnter: () => {
            const {_id} = store.getters['getAuthUser']
            if (!_id) return '/'
        },
    },
    {
        path: '/new-announcement',
        name: 'newProduct',
        component: () => import('../components/pages/VAnnouncementPage.vue'),
        beforeEnter: () => {
            const {_id} = store.getters['getAuthUser']
            if (!_id) return '/'
        },
    },
    {
        path: '/user-announcements/:authorId',
        name: 'userAnnouncements',
        component: () => import('../components/pages/VUserAnnouncementsPage.vue'),
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
