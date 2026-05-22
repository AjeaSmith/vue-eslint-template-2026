<script setup lang="ts">
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { Home, Settings, Plus } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { Button } from '@/components/ui/button'

const { user, signOut, loading } = useAuth()
const route = useRoute()

const navItems = [
  { label: 'Bills', icon: Home, path: '/bills' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

const isActive = (path: string) => route.path === path

const openNewBill = () => {
  console.log('open add bill sheet')
}
</script>

<template>
  <div class="min-h-screen bg-neutral-100 text-slate-900">
    <!-- Header: fixed top bar with logo -->
    <header
      class="fixed inset-x-0 top-0 z-20 h-14 border-b border-slate-200 bg-white/95 backdrop-blur-sm"
    >
      <div class="container mx-auto flex h-full justify-between items-center px-4">
        <span class="text-xl tracking-tight text-[#534AB7]">
          <span class="font-normal">Bill</span><span class="font-bold">wise</span>
        </span>
        <div class="flex items-center justify-center gap-3">
          <span
            class="flex items-center justify-center size-8 rounded-full border-2 border-[#534AB7]"
            >{{ user?.email?.charAt(0).toUpperCase() }}</span
          >
          <Button :disabled="loading" variant="secondary" class="cursor-pointer" @click="signOut">
            <span v-if="loading">logging out ...</span><span v-else>Log out</span></Button
          >
        </div>
      </div>
    </header>

    <!-- Main: scrollable page content area with spacing for header + bottom nav -->
    <main
      class="max-w-5xl relative mx-auto mt-14 min-h-[calc(100vh-112px)] overflow-y-auto px-4 py-4 pb-[calc(56px+env(safe-area-inset-bottom))]"
    >
      <RouterView />
    </main>

    <!-- FAB: floating action button for new bill -->
    <button
      type="button"
      @click="openNewBill"
      class="fixed right-5 bottom-20 z-30 inline-flex h-13 w-13 items-center justify-center rounded-full bg-[#534AB7] text-white shadow-lg shadow-slate-900/10 focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40"
      aria-label="New Bill"
    >
      <Plus class="h-5 w-5" />
    </button>

    <!-- Bottom navigation: fixed bottom bar with safe-area inset support -->
    <nav class="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white pb-safe h-14">
      <div class="mx-auto flex h-full max-w-md items-center justify-between px-6">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="inline-flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-sm transition-colors"
          :class="isActive(item.path) ? 'text-[#534AB7]' : 'text-slate-500'"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
