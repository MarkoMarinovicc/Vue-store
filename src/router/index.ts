
import { createRouter, createWebHistory } from 'vue-router';
import ProductDetails from '@/views/ProductDetails.vue';
import SingleProduct from '@/views/SingleProduct.vue';

const routes = [
  {
    path: '/',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  {
    path: '/product/:id',
    name: 'SingleProduct',
    component: SingleProduct,
  },
  // Example of direct import
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
