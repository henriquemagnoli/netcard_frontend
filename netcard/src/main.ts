import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DashboardLayout from './layout/DashboardLayout.vue';
import EmptyLayout from './layout/EmptyLayout.vue';
import router from './router';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);

app.use(router);
app.mount('#app');