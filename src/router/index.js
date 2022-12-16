import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import {useUserStore} from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home' },
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register' },
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login' },
      component: LoginView
    },
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const protectedRoutes = ['home']

  if (protectedRoutes.includes(to.name) && !userStore.isLoggedIn) {
    return { name: 'login' }
  }

  document.title = to.meta.title ?? 'Note Project'
})

export default router
