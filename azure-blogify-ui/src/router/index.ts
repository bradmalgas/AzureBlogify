import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostItemView from '@/views/PostItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home - Brad Malgas Blog' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About - Brad Malgas Blog' }
    },
    {
      path: '/post/:category/:id', component: PostItemView, props: true
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || "Loading... | Brad Malgas Blog";
  next();
});

export default router
