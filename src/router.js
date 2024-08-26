import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('./components/HomePage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/LoginPage',
        name: 'LoginPage',
        component: () => import('./components/LoginPage.vue'),
    },
    {
        path: '/RegisterPage',
        name: 'RegisterPage',
        component: () => import('./components/RegisterPage.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async(to, from, next)=>{
    if (to.matched.some(record => record.meta.requiresAuth)){
        const token = localStorage.getItem('token')
        if (token) {
            return next()
        }
        return next('/LoginPage')
    }
    next()
})
export default router