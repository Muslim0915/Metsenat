import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalizedGeneric,
    type RouteRecordRaw
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        redirect: '/dashboard',
        component: () => import('@/layouts/Layout.vue'),
        meta: {requiresAuth: true},
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/pages/DashboardPage.vue'),
                meta: {requiresAuth: true}
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/LoginPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to: RouteLocationNormalizedGeneric, _, next: NavigationGuardNext) => {
    const isAuthenticated = !!localStorage.getItem('token');
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({name: 'Login'});
    } else if (to.name === 'Login' && isAuthenticated) {
        next({name: 'Dashboard'});
    } else {
        next();
    }
})

export default router;