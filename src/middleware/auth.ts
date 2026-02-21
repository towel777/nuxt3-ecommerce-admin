/**
 * Auth middleware — redirects to /login if user has no token.
 * Applied via definePageMeta({ middleware: ['auth'] }) on protected pages.
 *
 * Uses the auth store (which owns the useCookie ref) instead of creating
 * a separate useCookie instance to avoid stale reads on ISR/SSR pages.
 */
import { useAuthStore } from '@/features/auth/model/auth.store'

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return navigateTo('/login')
  }
})
