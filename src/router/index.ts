import { watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/app',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '/bills', name: 'bills', component: () => import('@/views/Bills.vue') },
        { path: '/settings', component: () => import('@/views/Settings.vue') },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

const { session, authReady } = useAuth()

// Magic link: session transitions null → value while user is on the login page
watch(session, (newSession) => {
  console.log('called')
  if (newSession && router.currentRoute.value.name === 'login') {
    router.push({ name: 'bills' })
  }
})

router.beforeEach(async (to) => {
  await authReady
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // Magic link arrives at / with #access_token in the hash.
  // Let the navigation land so Supabase can exchange the token; onAuthStateChange handles the redirect.
  if (to.name === 'login' && window.location.hash.includes('access_token')) {
    return true
  }

  if (requiresAuth && !session.value) {
    return { name: 'login' }
  }

  if (to.name === 'login' && session.value) {
    return { name: 'bills' }
  }
})

export default router
