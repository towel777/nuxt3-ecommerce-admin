/**
 * Global TypeScript declarations for the project.
 * Augments Nuxt auto-imports and extends global types.
 */

// ==================== Generic API types ====================

/** Paginated API response envelope */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
  limit: number
}

/** Generic API success response */
export interface ApiResponse<T> {
  data: T
  message?: string
}

// ==================== UI types ====================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'ghost'
export type ColorScheme = 'light' | 'dark' | 'system'

// ==================== Utility types ====================

/** Make specific keys of T required */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/** Make all keys of T nullable */
export type Nullable<T> = { [K in keyof T]: T[K] | null }

/** Deep partial (all nested keys optional) */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

// ==================== Table ====================

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

export interface FilterConfig {
  key: string
  value: unknown
}
