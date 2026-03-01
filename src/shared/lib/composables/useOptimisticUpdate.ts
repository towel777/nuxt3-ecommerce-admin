import { ref } from 'vue'

interface OptimisticUpdateOptions<T> {
  /** Apply the optimistic change before the API call */
  optimisticFn: () => void
  /** The actual API call */
  apiFn: () => Promise<T>
  /** Roll back the optimistic change on failure */
  rollbackFn: () => void
  /** Called with the result after success (e.g. to sync server state) */
  onSuccess?: (result: T) => void
  /** Called with the error after failure */
  onError?: (err: unknown) => void
}

/**
 * Generic optimistic update helper.
 * Applies local state change immediately, calls the API,
 * and rolls back on failure.
 *
 * @example
 * ```typescript
 * const { execute, isLoading } = useOptimisticUpdate()
 *
 * await execute({
 *   optimisticFn: () => { order.status = 'shipped' },
 *   apiFn: () => orderApi.updateStatus(order.id, 'shipped'),
 *   rollbackFn: () => { order.status = previousStatus },
 * })
 * ```
 */
export function useOptimisticUpdate() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function execute<T>(options: OptimisticUpdateOptions<T>): Promise<T | null> {
    const { optimisticFn, apiFn, rollbackFn, onSuccess, onError } = options

    isLoading.value = true
    error.value = null

    // Apply optimistic change immediately
    optimisticFn()

    try {
      const result = await apiFn()
      onSuccess?.(result)
      return result
    } catch (err) {
      // Rollback on failure
      rollbackFn()
      const message = err instanceof Error ? err.message : 'Операция не выполнена'
      error.value = message
      onError?.(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    execute,
    isLoading,
    error,
  }
}
