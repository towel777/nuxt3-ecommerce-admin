<script setup lang="ts">
import SidebarNav from '@/widgets/sidebar-nav/ui/SidebarNav.vue'
import ThemeToggle from '@/features/theme-toggle/ui/ThemeToggle.vue'
import NotificationBell from '@/features/notifications/ui/NotificationBell.vue'
import CommandPalette from '@/features/search-global/ui/CommandPalette.vue'
import { useSearchStore } from '@/features/search-global/model/search.store'
import { useUserStore } from '@/entities/user/model/user.store'
import { useWebSocketProvider } from '@/app/providers'

const sidebarCollapsed = ref(false)
const searchStore = useSearchStore()
const userStore = useUserStore()
const route = useRoute()

// Connect WebSocket at app level
useWebSocketProvider()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard': 'Дашборд',
    '/orders': 'Заказы',
    '/products': 'Товары',
    '/customers': 'Клиенты',
    '/analytics': 'Аналитика',
    '/settings': 'Настройки',
  }
  const key = Object.keys(titles).find((k) => route.path.startsWith(k))
  return key ? titles[key] : 'ShopAdmin'
})
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <SidebarNav
      :collapsed="sidebarCollapsed"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
    />

    <!-- Main area -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <!-- Topbar -->
      <header class="flex items-center justify-between gap-4 px-6 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ pageTitle }}
        </h1>

        <div class="flex items-center gap-2">
          <!-- Search trigger -->
          <button
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            @click="searchStore.open"
          >
            <Icon name="ph:magnifying-glass" size="16" />
            <span class="hidden sm:inline">Поиск</span>
            <kbd class="hidden sm:flex items-center gap-0.5 text-xs bg-white dark:bg-gray-700 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />
          <NotificationBell />

          <!-- User avatar -->
          <div class="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm font-medium text-white">
              {{ userStore.fullName.charAt(0) || 'A' }}
            </div>
            <span class="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ userStore.fullName || 'Администратор' }}
            </span>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>

    <!-- Command Palette -->
    <CommandPalette />
  </div>
</template>
