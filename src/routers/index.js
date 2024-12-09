import { createRouter, createWebHistory } from 'vue-router';
import Stat from '../components/Stats.vue';
import Pick from '../components/Pick.vue';
import Compare from '../components/Compare.vue';
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import {useSharedStore} from "@/utils/store.js";

const routes = [
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


router.beforeEach((to, from, next) => {
    const store = useSharedStore();

    if(localStorage.getItem('token') === null) {
        store.updateAuthState(false);
    }else{
        let date = JSON.parse(localStorage.getItem('token'))['expiration_date'];
        console.log(date, Date.now());
        store.updateAuthState(true);
    }

    console.log(store.isAuthenticated);
    if (to.path === '/') {
        if (store.isAuthenticated) {
            next('/stats');
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
