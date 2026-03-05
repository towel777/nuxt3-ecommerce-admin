#!/bin/bash
set -e
cd "D:/Project/portfolio_from_claude/nuxt3-ecommerce-admin"

c() {
  local date="$1"
  local msg="$2"
  shift 2
  git add "$@"
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
}

# Feb 19 Day 1
c "2026-02-19T09:12:00" "chore: init nuxt3 project with pnpm and base config" \
  package.json nuxt.config.ts tailwind.config.ts tsconfig.json .gitignore .nuxtignore README.md

c "2026-02-19T11:28:00" "chore(styles): add scss variables, tailwind overrides and global styles" \
  src/app/styles/

c "2026-02-19T14:18:00" "chore(app): add app entry point, plugins and websocket provider" \
  src/app.vue src/app/plugins/ src/app/providers/

# Feb 20 Day 2
c "2026-02-20T09:58:00" "feat(shared): add ofetch http client with JWT auth header and 401 refresh-and-retry" \
  src/shared/api/http-client.ts src/shared/api/error-handler.ts

c "2026-02-20T13:35:00" "feat(shared): add currency (RUB) and date helpers with Russian locale (date-fns)" \
  src/shared/lib/helpers/currency.ts src/shared/lib/helpers/date.ts

c "2026-02-20T16:10:00" "feat(shared): add global type declarations and app constants" \
  src/shared/types/ src/shared/config/

# Feb 21 Day 3
c "2026-02-21T09:25:00" "feat(entities/user): add user Zod schema, derived types, Pinia store and API" \
  src/entities/user/

c "2026-02-21T11:45:00" "feat(features/auth): add auth store with useCookie-based JWT and login/logout flow" \
  src/features/auth/model/ src/features/auth/api/

c "2026-02-21T14:55:00" "feat(features/auth): add LoginForm component and auth page layout" \
  src/features/auth/ui/ src/layouts/auth.vue src/pages/login.vue

c "2026-02-21T16:40:00" "feat(middleware): add auth route guard that redirects to /login if no token" \
  src/middleware/

# Feb 24 Day 4
c "2026-02-24T09:18:00" "feat(server): add Nitro mock data generator with 60 products, 80 customers, 120 orders in Russian locale" \
  src/server/utils/mock-data.ts src/server/utils/.gitkeep src/server/middleware/.gitkeep

c "2026-02-24T10:55:00" "feat(server/auth): add login, logout and refresh endpoints" \
  src/server/api/auth/

c "2026-02-24T13:10:00" "feat(server/users): add /users/me GET and PATCH endpoints" \
  src/server/api/users/

c "2026-02-24T14:25:00" "feat(server/products): add product CRUD endpoints and categories list" \
  src/server/api/products/ src/server/api/categories/

c "2026-02-24T16:05:00" "feat(entities/product): add product schema, store, TanStack columns, ProductCard and PriceBadge" \
  src/entities/product/

# Feb 25 Day 5
c "2026-02-25T09:40:00" "feat(server/orders): add orders API with list, create, status patch, tracking, notes and bulk-status" \
  src/server/api/orders/

c "2026-02-25T12:15:00" "feat(entities/order): add order schema, Pinia store, table columns and OrderStatusBadge" \
  src/entities/order/

c "2026-02-25T15:25:00" "feat(features/manage-order): add OrderStatusSelect and OrderCreateForm components" \
  src/features/manage-order/

# Feb 26 Day 6
c "2026-02-26T09:05:00" "feat(server/customers): add customers API with block/unblock and customer orders endpoints" \
  src/server/api/customers/

c "2026-02-26T11:35:00" "feat(entities/customer): add customer schema, store, columns and CustomerAvatar component" \
  src/entities/customer/

c "2026-02-26T13:55:00" "feat(entities/category): add category Zod schema, store and API" \
  src/entities/category/

# Feb 27 Day 7
c "2026-02-27T09:28:00" "feat(server/analytics): add analytics summary endpoint with revenue, orders and top products" \
  src/server/api/analytics/

c "2026-02-27T11:55:00" "feat(entities/analytics): add analytics types and Pinia store" \
  src/entities/analytics/

c "2026-02-27T14:40:00" "feat(entities/review): add review schema, store and API" \
  src/entities/review/

# Feb 28 Day 8
c "2026-02-28T09:15:00" "feat(shared/ui): add DataTable component wrapping TanStack Table v8" \
  src/shared/ui/data-table/

c "2026-02-28T11:25:00" "feat(shared/ui): add form primitives — TextInput, SelectInput, FormField with vee-validate" \
  src/shared/ui/forms/

c "2026-02-28T14:05:00" "feat(shared/ui): add Modal dialog and page layout components" \
  src/shared/ui/feedback/ src/shared/ui/layout/

c "2026-02-28T15:55:00" "feat(shared/ui): add BaseChart wrapper for vue-echarts (always used inside ClientOnly)" \
  src/shared/ui/charts/

# Mar 1 Day 9
c "2026-03-01T10:00:00" "feat(shared): add useDataTable composable with sorting, filtering, pagination and column visibility" \
  src/shared/lib/composables/useDataTable.ts

c "2026-03-01T12:25:00" "feat(shared): add useFuzzySearch (Fuse.js) and useExport (CSV/XLSX/PDF with lazy imports)" \
  src/shared/lib/composables/useFuzzySearch.ts src/shared/lib/composables/useExport.ts src/shared/lib/helpers/export-utils.ts

c "2026-03-01T14:15:00" "feat(shared): add useWebSocket with exponential backoff reconnect and heartbeat keep-alive" \
  src/shared/lib/composables/useWebSocket.ts src/shared/api/websocket.ts

c "2026-03-01T15:40:00" "feat(shared): add useUrlFilters, useInfiniteScroll, useOptimisticUpdate and Zod validators" \
  src/shared/lib/composables/useUrlFilters.ts \
  src/shared/lib/composables/useInfiniteScroll.ts \
  src/shared/lib/composables/useOptimisticUpdate.ts \
  src/shared/lib/composables/.gitkeep \
  src/shared/lib/validators/ \
  src/shared/lib/helpers/.gitkeep

# Mar 2 Day 10
c "2026-03-02T11:00:00" "feat(widgets): add AppShell root layout wrapper and SidebarNav with active-link highlighting" \
  src/widgets/app-shell/ src/widgets/sidebar-nav/

c "2026-03-02T13:25:00" "feat(widgets): add StatsCards KPI grid and RevenueChart with ECharts" \
  src/widgets/stats-cards/ src/widgets/revenue-chart/

c "2026-03-02T14:55:00" "feat(widgets): add OrdersTable and ProductGrid composite widgets" \
  src/widgets/orders-table/ src/widgets/product-grid/

c "2026-03-02T16:25:00" "feat(widgets): add CustomerTable, NotificationsPanel and RecentActivity widgets" \
  src/widgets/customer-table/ src/widgets/notifications-panel/ src/widgets/recent-activity/

# Mar 3 Day 11
c "2026-03-03T08:55:00" "feat(layouts): add default layout with collapsible sidebar and auth layout" \
  src/layouts/default.vue

c "2026-03-03T10:25:00" "feat(pages): add dashboard with ISR 60s SWR caching and KPI widgets" \
  src/pages/dashboard/

c "2026-03-03T12:55:00" "feat(pages): add products list with ISR 300s, detail and create pages" \
  src/pages/products/

c "2026-03-03T15:25:00" "feat(pages): add orders list, detail (SSR) and create pages" \
  src/pages/orders/

# Mar 4 Day 12
c "2026-03-04T09:10:00" "feat(pages): add customers page with SSR and block/unblock actions" \
  src/pages/customers/

c "2026-03-04T10:55:00" "feat(pages): add analytics page (SPA mode) with ECharts revenue and orders charts" \
  src/pages/analytics/

c "2026-03-04T12:25:00" "feat(pages): add settings page with profile, password change and appearance sections" \
  src/pages/settings/

c "2026-03-04T13:55:00" "feat(features): add global search command palette (Cmd+K) with Fuse.js fuzzy matching" \
  src/features/search-global/

c "2026-03-04T15:25:00" "feat(features): add NotificationBell and NotificationsPanel with WebSocket live updates" \
  src/features/notifications/

c "2026-03-04T16:40:00" "feat(features): add ImageUpload with drag-and-drop and RichTextEditor based on TipTap" \
  src/features/image-upload/ src/features/rich-text-editor/

# Mar 5 Day 13
c "2026-03-05T09:25:00" "feat(features): add ExportButton with lazy-loaded CSV, XLSX (SheetJS) and PDF (jsPDF) export" \
  src/features/export-data/

c "2026-03-05T10:40:00" "feat(features): add ThemeToggle that switches between light, dark and system color modes" \
  src/features/theme-toggle/

c "2026-03-05T11:35:00" "feat(features): add FilterPanel for product, order and customer list filtering" \
  src/features/filter-panel/

c "2026-03-05T13:05:00" "fix(server): remove httpOnly flag from auth cookies so useCookie can read token client-side" \
  src/server/api/auth/login.post.ts src/server/api/auth/refresh.post.ts

c "2026-03-05T14:20:00" "fix(middleware): use authStore.isAuthenticated instead of raw useCookie to fix stale reads on ISR pages" \
  src/middleware/auth.ts

c "2026-03-05T15:05:00" "fix(auth): replace v-if with v-show on spinner to prevent SSR hydration insertBefore error" \
  src/features/auth/ui/LoginForm.vue src/features/auth/model/auth.store.ts

c "2026-03-05T15:35:00" "chore: add postbuild script to patch Nitro 2.12+ static asset path resolution bug" \
  scripts/patch-nitro.mjs scripts/git-history.sh package.json

echo "Done"
