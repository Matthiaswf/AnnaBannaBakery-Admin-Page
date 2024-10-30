import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OrderListView from '../views/OrderListView.vue';
import OrderDetailsView from '@/views/OrderDetailsView.vue';
import ProductListView from '@/views/ProductsView.vue';
import CreateProductView from '@/views/CreateProductView.vue';
import ProductDetailsView from '@/views/ProductDetailsView.vue';

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
  {
    path: '/products',
    name: 'products',
    component: ProductListView,
  },
  {
    path: '/products/create',
    name: 'create-product',
    component: CreateProductView,
  },
  {
    path: '/products/:id',
    name: 'product',
    component: ProductDetailsView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
