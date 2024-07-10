import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostItemView from '@/views/PostItemView.vue'
import SearchResults from '@/views/SearchResults.vue';
import { useUserStore } from '@/stores/user';

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
      path: '/editor',
      name: 'editor',
      component: () => import('../views/EditorView.vue'),
      meta: { title: 'Editor - Brad Malgas Blog' }
    },
    {
      path: '/post/:category/:id', component: PostItemView, props: true
    },
    {
      path: '/search/:query', component: SearchResults, props: true,
      meta: { title: 'Search - Brad Malgas Blog' }
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Not Found - Brad Malgas Blog' }
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
});

router.beforeEach((to, from, next) => {
  if (from.path === '/login') {
    const store = useUserStore();
    store.getUserInfo();
  }
  
  document.title = (to.meta.title as string) || "Loading... | Brad Malgas Blog";
  next();
});

export default router
