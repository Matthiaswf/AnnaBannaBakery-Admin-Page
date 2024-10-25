import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OrderListView from '../views/OrderListView.vue';
import OrderDetailsView from '@/views/OrderDetailsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderListView,
  },
  {
    path: '/orders/:id',
    name: 'order',
    component: OrderDetailsView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
