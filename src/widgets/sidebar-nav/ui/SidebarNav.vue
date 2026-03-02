<script setup lang="ts">
import { NAV_ITEMS } from '@/shared/config/constants'

interface Props {
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const emit = defineEmits<{ 'toggle': [] }>()
const route = useRoute()

function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <aside
    class="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300"
    :style="{ width: collapsed ? '72px' : '260px' }"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 py-5 border-b border-gray-200 dark:border-gray-800">
      <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
        <Icon name="ph:shopping-cart" size="18" class="text-white" />
      </div>
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-100"
        leave-to-class="opacity-0"
      >
        <span
          v-if="!collapsed"
          class="font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap"
        >
          ShopAdmin
        </span>
      </Transition>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
      <NuxtLink
        v-for="item in NAV_ITEMS"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
        :class="{
          'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300': isActive(item.path),
          'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100': !isActive(item.path),
        }"
        :title="collapsed ? item.label : undefined"
      >
        <Icon
          :name="item.icon"
          size="20"
          class="shrink-0"
          :class="isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : ''"
        />
        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-100"
          leave-to-class="opacity-0"
        >
          <span
            v-if="!collapsed"
            class="whitespace-nowrap"
          >
            {{ item.label }}
          </span>
        </Transition>
      </NuxtLink>
    </nav>

    <!-- Collapse toggle -->
    <div class="px-2 py-3 border-t border-gray-200 dark:border-gray-800">
      <button
        class="w-full flex items-center justify-center p-2.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        :title="collapsed ? 'Развернуть меню' : 'Свернуть меню'"
        @click="emit('toggle')"
      >
        <Icon
          :name="collapsed ? 'ph:arrow-right' : 'ph:arrow-left'"
          size="18"
        />
      </button>
    </div>
  </aside>
</template>
