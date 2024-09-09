import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { auth } from './hooks/useAuth';

import Login from './view/Login.vue';
import Register from './view/Register.vue';
import NotFound from './view/NotFound.vue';
import ForgotPassword from './view/ForgotPassword.vue';
import Dashboard from './view/Dashboard.vue';
import Connections from './view/Connections.vue';
import Profile from './view/Profile.vue';

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
        path: '/dashboard',
        name: 'Painel',
        component: Dashboard,
        meta: { layout: 'default' },
        beforeEnter: auth
    },
    {
        path: '/connections',
        name: 'Conexões',
        component: Connections,
        meta: { layout: 'default' },
        beforeEnter: auth
    },
    {
        path: '/profile',
        name: 'Perfil',
        component: Profile,
        meta: { layout: 'default' },
        beforeEnter: auth
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
