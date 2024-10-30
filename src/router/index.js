import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OrderListView from '../views/OrderListView.vue';
import OrderDetailsView from '@/views/OrderDetailsView.vue';
import ProductListView from '@/views/ProductsView.vue';
import CreateProductView from '@/views/CreateProductView.vue';
import ProductDetailsView from '@/views/ProductDetailsView.vue';
import LoginView from '@/views/Auth/LoginView.vue';
import SignupView from '@/views/Auth/SignupView.vue';

// route guard
import { projectAuth } from '@/firebase/config';
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requireAuth,
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderListView,
    beforeEnter: requireAuth,
  },
  {
    path: '/orders/:id',
    name: 'order',
    component: OrderDetailsView,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/products',
    name: 'products',
    component: ProductListView,
    beforeEnter: requireAuth,
  },
  {
    path: '/products/create',
    name: 'create-product',
    component: CreateProductView,
    beforeEnter: requireAuth,
  },
  {
    path: '/products/:id',
    name: 'product',
    component: ProductDetailsView,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
