import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Login from './view/Login.vue';
import Register from './view/Register.vue';
import NotFound from './view/NotFound.vue';
import ForgotPassword from './view/ForgotPassword.vue';

const routes: RouteRecordRaw[]= [
    {
        path: '/',
        name: 'Home',
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
    },
    {
        path: '/forgotpassword',
        name: 'Esqueceu Senha',
        component: ForgotPassword,
        meta: { layout: 'empty' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Not Fount',
        component: NotFound,
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
