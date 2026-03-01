import { ref, computed, watch, type Ref } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
  type PaginationState,
  type VisibilityState,
  type TableOptions,
} from '@tanstack/vue-table'

interface UseDataTableOptions<TData> {
  /** Column definitions from TanStack Table */
  columns: ColumnDef<TData, any>[]
  /** Reactive data array */
  data: Ref<TData[]>
  /** Initial page size */
  pageSize?: number
  /** Enable row selection */
  enableRowSelection?: boolean
  /** Enable multi-sort */
  enableMultiSort?: boolean
  /** Server-side pagination (disable client-side) */
  manualPagination?: boolean
  /** Server-side sorting */
  manualSorting?: boolean
  /** Total row count (for server-side pagination) */
  pageCount?: Ref<number>
  /** Callback when sorting changes (for server-side) */
  onSortingChange?: (sorting: SortingState) => void
  /** Callback when pagination changes (for server-side) */
  onPaginationChange?: (pagination: PaginationState) => void
}

/**
 * Wrapper composable for TanStack Table v8.
 * Provides reactive state management for sorting, filtering, pagination,
 * row selection, and column visibility.
 *
 * @example
 * ```vue
 * <script setup>
 * import { orderColumns } from '@/entities/order/model/order.columns'
 *
 * const orderStore = useOrderStore()
 * const {
 *   table, sorting, rowSelection, selectedRows,
 *   pageIndex, pageSize, pageCount,
 * } = useDataTable({
 *   columns: orderColumns,
 *   data: computed(() => orderStore.orders),
 *   pageSize: 20,
 *   enableRowSelection: true,
 *   manualPagination: true,
 *   pageCount: computed(() => orderStore.totalPages),
 *   onPaginationChange: (p) => orderStore.fetchOrders({ page: p.pageIndex + 1, limit: p.pageSize }),
 *   onSortingChange: (s) => orderStore.fetchOrders({ sortBy: s[0]?.id, sortOrder: s[0]?.desc ? 'desc' : 'asc' }),
 * })
 * </script>
 * ```
 */
export function useDataTable<TData>(options: UseDataTableOptions<TData>) {
  const {
    columns,
    data,
    pageSize = 20,
    enableRowSelection = false,
    enableMultiSort = false,
    manualPagination = false,
    manualSorting = false,
    pageCount,
    onSortingChange,
    onPaginationChange,
  } = options

  // Reactive table state
  const sorting = ref<SortingState>([])
  const columnFilters = ref<ColumnFiltersState>([])
  const rowSelection = ref<RowSelectionState>({})
  const columnVisibility = ref<VisibilityState>({})
  const globalFilter = ref('')
  const pagination = ref<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  // Notify parent on state changes (for server-side operations)
  watch(sorting, (newSorting) => {
    onSortingChange?.(newSorting)
  }, { deep: true })

  watch(pagination, (newPagination) => {
    onPaginationChange?.(newPagination)
  }, { deep: true })

  // Build table options
  const tableOptions = computed<TableOptions<TData>>(() => ({
    data: data.value,
    columns,
    state: {
      sorting: sorting.value,
      columnFilters: columnFilters.value,
      rowSelection: rowSelection.value,
      columnVisibility: columnVisibility.value,
      globalFilter: globalFilter.value,
      pagination: pagination.value,
    },

    // State setters
    onSortingChange: (updater) => {
      sorting.value = typeof updater === 'function'
        ? updater(sorting.value)
        : updater
    },
    onColumnFiltersChange: (updater) => {
      columnFilters.value = typeof updater === 'function'
        ? updater(columnFilters.value)
        : updater
    },
    onRowSelectionChange: (updater) => {
      rowSelection.value = typeof updater === 'function'
        ? updater(rowSelection.value)
        : updater
    },
    onColumnVisibilityChange: (updater) => {
      columnVisibility.value = typeof updater === 'function'
        ? updater(columnVisibility.value)
        : updater
    },
    onPaginationChange: (updater) => {
      pagination.value = typeof updater === 'function'
        ? updater(pagination.value)
        : updater
    },
    onGlobalFilterChange: (updater) => {
      globalFilter.value = typeof updater === 'function'
        ? updater(globalFilter.value)
        : updater
    },

    // Features
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),

    // Config
    enableRowSelection,
    enableMultiSort,
    manualPagination,
    manualSorting,
    pageCount: pageCount?.value,
  }))

  const table = useVueTable(tableOptions)

  // Computed helpers
  const selectedRows = computed(() =>
    table.getSelectedRowModel().rows.map((row) => row.original),
  )

  const selectedCount = computed(() =>
    Object.keys(rowSelection.value).length,
  )

  const hasSelection = computed(() => selectedCount.value > 0)

  const pageIndex = computed({
    get: () => pagination.value.pageIndex,
    set: (value: number) => {
      pagination.value = { ...pagination.value, pageIndex: value }
    },
  })

  // Methods
  function clearSelection(): void {
    rowSelection.value = {}
  }

  function selectAll(): void {
    const allSelected: RowSelectionState = {}
    data.value.forEach((_, index) => {
      allSelected[index] = true
    })
    rowSelection.value = allSelected
  }

  function setGlobalFilter(value: string): void {
    globalFilter.value = value
  }

  function toggleColumnVisibility(columnId: string): void {
    columnVisibility.value = {
      ...columnVisibility.value,
      [columnId]: !columnVisibility.value[columnId],
    }
  }

  function resetFilters(): void {
    columnFilters.value = []
    globalFilter.value = ''
    sorting.value = []
    pagination.value = { pageIndex: 0, pageSize }
  }

  return {
    table,

    // State
    sorting,
    columnFilters,
    rowSelection,
    columnVisibility,
    globalFilter,
    pagination,

    // Computed
    selectedRows,
    selectedCount,
    hasSelection,
    pageIndex,

    // Methods
    clearSelection,
    selectAll,
    setGlobalFilter,
    toggleColumnVisibility,
    resetFilters,
  }
}
