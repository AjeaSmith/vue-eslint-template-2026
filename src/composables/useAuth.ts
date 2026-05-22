import { ref, shallowRef, readonly } from 'vue'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import router from '@/router'

const user = ref<User | null>(null)
const session = ref<Session | null>(null)
const loading = shallowRef(false)

const authReady = supabase.auth.getSession().then(({ data }) => {
  session.value = data.session
  user.value = data.session?.user ?? null
})

supabase.auth.onAuthStateChange((_event, newSession) => {
  session.value = newSession
  user.value = newSession?.user ?? null
})

export function useAuth() {
  async function signOut() {
    loading.value = true
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    user: readonly(user),
    session: readonly(session),
    loading: readonly(loading),
    authReady,
    signOut,
  }
}
