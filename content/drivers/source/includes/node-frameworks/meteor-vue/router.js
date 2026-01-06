import { createRouter, createWebHistory } from 'vue-router';
import RestaurantList from './views/RestaurantList.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RestaurantList,
      meta: { filter: false }
    },
    {
      path: '/browse',
      name: 'browse', 
      component: RestaurantList,
      meta: { filter: true }
    }
  ],
});
