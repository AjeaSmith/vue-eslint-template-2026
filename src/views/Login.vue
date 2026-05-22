<script setup lang="ts">
import { supabase } from '@/lib/supabase'
import { shallowRef } from 'vue'
import { toast } from 'vue-sonner'

const email = shallowRef('')
const error = shallowRef('')
const loading = shallowRef(false)

const handleFormSubmit = async () => {
  if (!email.value) return
  error.value = ''
  loading.value = true

  try {
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: '/',
      },
    })
    if (authError) throw authError
    toast.success('Check your email for the login link!')
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <span class="text-3xl tracking-tight text-[#534AB7]">
          <span class="font-normal">Bill</span><span class="font-bold">wise</span>
        </span>
        <p class="mt-2 text-sm text-slate-500">Sign in to your account</p>
      </div>
      <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
      <div class="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <form class="space-y-5" @submit.prevent="handleFormSubmit">
          <div class="space-y-1.5">
            <label for="email" class="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              v-model="email"
              id="email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/20 transition"
            />
          </div>

          <button
            :disabled="loading"
            type="submit"
            class="w-full rounded-lg bg-[#534AB7] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4540a3] disabled:bg-[#37317a] focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 transition"
          >
            <span v-if="loading">Submitting ...</span>
            <span v-else>Submit</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
