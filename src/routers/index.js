import { createRouter, createWebHistory } from 'vue-router';
import Stat from '../components/Stats.vue';
import Pick from '../components/Pick.vue';
import Compare from '../components/Compare.vue';
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";

const routes = [
    {path: '/', redirect: '/login', beforeEnter: (to, from, next) => {
        if(JSON.parse(localStorage.getItem('token'))['expiration_date'] > Date.now()) {
            next('/stats');
        }
        }},
    {path: '/login', name: 'Login', component: Login},
    { path: '/signup', name: 'Signup', component: Signup },
{ path: '/stats', name: 'Stat', component: Stat },
{ path: '/pick', name: 'Pick', component: Pick },
{ path: '/compare', name: 'Compare', component: Compare },
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;