import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Login from './view/Login.vue';
import Register from './view/Register.vue';

const routes: RouteRecordRaw[]= [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: { layout: 'empty' }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { layout: 'empty' }
    },
    {
        path: '/register',
        name: 'Cadastro',
        component: Register,
        meta: { layout: 'empty' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, _from, next) => {
    document.title = `Netcard - ${String(to.name)}`;
    next();
});

export default router;
