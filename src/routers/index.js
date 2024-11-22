import { createRouter, createWebHistory } from 'vue-router';
import Stat from '../components/Stats.vue';
import Pick from '../components/Pick.vue';
import Compare from '../components/Compare.vue';

const routes = [
{ path: '/stats', name: 'Stat', component: Stat },
{ path: '/pick', name: 'Pick', component: Pick },
{ path: '/compare', name: 'Compare', component: Compare },
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;