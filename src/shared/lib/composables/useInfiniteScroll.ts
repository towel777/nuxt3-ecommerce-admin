import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface UseInfiniteScrollOptions {
  /** Root margin for the IntersectionObserver (e.g. '0px 0px 200px 0px') */
  rootMargin?: string
  /** Threshold for triggering the callback */
  threshold?: number
  /** Disable the observer (e.g. when all data is loaded) */
  disabled?: Ref<boolean>
}

/**
 * Infinite scroll composable using IntersectionObserver.
 * Attach the sentinel ref to a bottom element — when it enters
 * the viewport, the onLoadMore callback fires.
 *
 * @example
 * ```vue
 * <script setup>
 * const { sentinel, isLoading } = useInfiniteScroll({
 *   disabled: computed(() => !hasMore.value),
 *   async onLoadMore() {
 *     await productStore.fetchNextPage()
 *   }
 * })
 * </script>
 *
 * <template>
 *   <div v-for="item in items" :key="item.id">...</div>
 *   <div ref="sentinel" class="h-4" />
 * </template>
 * ```
 */
export function useInfiniteScroll(
  onLoadMore: () => Promise<void> | void,
  options: UseInfiniteScrollOptions = {},
) {
  const { rootMargin = '0px 0px 200px 0px', threshold = 0.1, disabled } = options

  const sentinel = ref<HTMLElement | null>(null)
  const isLoading = ref(false)

  let observer: IntersectionObserver | null = null

  async function handleIntersect(entries: IntersectionObserverEntry[]) {
    const entry = entries[0]
    if (!entry.isIntersecting) return
    if (disabled?.value) return
    if (isLoading.value) return

    isLoading.value = true
    try {
      await onLoadMore()
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold,
    })

    if (sentinel.value) {
      observer.observe(sentinel.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    sentinel,
    isLoading,
  }
}
