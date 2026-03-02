<script setup lang="ts">
import { formatCurrency, calculateChange } from '@/shared/lib/helpers/currency'
import type { Kpi } from '@/entities/analytics/model/analytics.types'

interface Props {
  kpis?: {
    revenue: Kpi
    orders: Kpi
    customers: Kpi
    averageOrderValue: Kpi
  }
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})

function formatKpiValue(kpi: Kpi): string {
  if (kpi.unit === 'currency') return formatCurrency(kpi.value)
  if (kpi.unit === 'percent') return `${kpi.value.toFixed(1)}%`
  return kpi.value.toLocaleString('ru-RU')
}

const CARD_CONFIG = [
  { key: 'revenue',          icon: 'ph:currency-rub',  color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { key: 'orders',           icon: 'ph:shopping-bag',  color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { key: 'customers',        icon: 'ph:users',         color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' },
  { key: 'averageOrderValue', icon: 'ph:chart-bar',    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
] as const
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <div
      v-for="card in CARD_CONFIG"
      :key="card.key"
      class="card-padded"
    >
      <!-- Loading skeleton -->
      <template v-if="isLoading || !kpis">
        <div class="animate-pulse space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </template>

      <!-- Content -->
      <template v-else>
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {{ kpis[card.key].label }}
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
              {{ formatKpiValue(kpis[card.key]) }}
            </p>
          </div>
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            :class="card.color"
          >
            <Icon :name="card.icon" size="20" />
          </div>
        </div>

        <!-- Change indicator -->
        <div class="flex items-center gap-1 mt-3">
          <Icon
            :name="kpis[card.key].changePercent >= 0 ? 'ph:trend-up' : 'ph:trend-down'"
            size="14"
            :class="kpis[card.key].changePercent >= 0 ? 'text-emerald-500' : 'text-red-500'"
          />
          <span
            class="text-xs font-medium"
            :class="kpis[card.key].changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'"
          >
            {{ kpis[card.key].changePercent >= 0 ? '+' : '' }}{{ kpis[card.key].changePercent.toFixed(1) }}%
          </span>
          <span class="text-xs text-gray-400">vs предыдущий период</span>
        </div>
      </template>
    </div>
  </div>
</template>
