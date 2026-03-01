import { ref, watch, computed, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type FilterType = 'string' | 'number' | 'boolean' | 'array'

interface FilterConfig {
  type: FilterType
  default: unknown
  debounce?: number
}

type FilterValue<T extends FilterType> =
  T extends 'string' ? string :
  T extends 'number' ? number :
  T extends 'boolean' ? boolean :
  T extends 'array' ? string[] :
  never

/**
 * Syncs filter state with URL query parameters.
 * Enables shareable filtered views and browser back/forward support.
 *
 * Features:
 * - Bidirectional sync (URL → state, state → URL)
 * - Type coercion (string ↔ number/boolean/array)
 * - Debounce for search inputs
 * - Default values (not persisted in URL)
 * - Clean URLs (removes default values from query)
 *
 * @example
 * ```vue
 * <script setup>
 * const filters = useUrlFilters({
 *   status: { type: 'array', default: [] },
 *   search: { type: 'string', default: '', debounce: 300 },
 *   page: { type: 'number', default: 1 },
 *   isPaid: { type: 'boolean', default: false },
 * })
 *
 * // filters.status.value → string[]
 * // filters.search.value → string
 * // filters.page.value → number
 * // URL: ?status=pending,shipped&search=test&page=2&isPaid=true
 * </script>
 * ```
 */
export function useUrlFilters<T extends Record<string, FilterConfig>>(config: T) {
  const route = useRoute()
  const router = useRouter()

  type FiltersResult = {
    [K in keyof T]: Ref<FilterValue<T[K]['type']>>
  }

  const filters = {} as FiltersResult
  const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {}

  // Initialize refs from URL or defaults
  for (const [key, cfg] of Object.entries(config) as [keyof T & string, FilterConfig][]) {
    const urlValue = route.query[key]
    const initialValue = urlValue !== undefined
      ? parseQueryValue(urlValue as string | string[], cfg.type)
      : cfg.default

    ;(filters as any)[key] = ref(initialValue)
  }

  // Watch each filter and sync to URL
  for (const [key, cfg] of Object.entries(config) as [keyof T & string, FilterConfig][]) {
    watch(
      () => (filters as any)[key].value,
      (newValue) => {
        if (cfg.debounce) {
          clearTimeout(debounceTimers[key])
          debounceTimers[key] = setTimeout(() => {
            syncToUrl(key, newValue, cfg)
          }, cfg.debounce)
        } else {
          syncToUrl(key, newValue, cfg)
        }
      },
    )
  }

  // Watch URL changes (browser back/forward) and sync to state
  watch(
    () => route.query,
    (query) => {
      for (const [key, cfg] of Object.entries(config) as [keyof T & string, FilterConfig][]) {
        const urlValue = query[key]
        const newValue = urlValue !== undefined
          ? parseQueryValue(urlValue as string | string[], cfg.type)
          : cfg.default

        const currentRef = (filters as any)[key] as Ref
        if (JSON.stringify(currentRef.value) !== JSON.stringify(newValue)) {
          currentRef.value = newValue
        }
      }
    },
  )

  function syncToUrl(key: string, value: unknown, cfg: FilterConfig): void {
    const query = { ...route.query }

    // Don't put defaults in URL (keeps it clean)
    if (JSON.stringify(value) === JSON.stringify(cfg.default)) {
      delete query[key]
    } else {
      query[key] = serializeQueryValue(value, cfg.type) as any
    }

    router.replace({ query })
  }

  // Reset all filters to defaults
  function resetAll(): void {
    for (const [key, cfg] of Object.entries(config) as [keyof T & string, FilterConfig][]) {
      ;(filters as any)[key].value = cfg.default
    }
    router.replace({ query: {} })
  }

  // Check if any filter differs from default
  const hasActiveFilters = computed(() =>
    Object.entries(config).some(([key, cfg]) => {
      const current = (filters as any)[key].value
      return JSON.stringify(current) !== JSON.stringify(cfg.default)
    }),
  )

  return {
    ...filters,
    resetAll,
    hasActiveFilters,
  }
}

// ==================== Helpers ====================

function parseQueryValue(raw: string | string[], type: FilterType): unknown {
  const value = Array.isArray(raw) ? raw[0] : raw

  switch (type) {
    case 'string':
      return value ?? ''
    case 'number':
      return value ? Number(value) : 0
    case 'boolean':
      return value === 'true'
    case 'array':
      return value ? value.split(',').filter(Boolean) : []
    default:
      return value
  }
}

function serializeQueryValue(value: unknown, type: FilterType): string {
  switch (type) {
    case 'array':
      return (value as string[]).join(',')
    default:
      return String(value)
  }
}
