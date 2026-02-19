# 🛒 Nuxt 3 E-Commerce Admin Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-3.12-00DC82?logo=nuxtdotjs&logoColor=white" alt="Nuxt 3" />
  <img src="https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Pinia-2.1-ffd859" alt="Pinia" />
  <img src="https://img.shields.io/badge/TanStack_Table-8.x-FF4154" alt="TanStack Table" />
  <img src="https://img.shields.io/badge/Architecture-FSD-blue" alt="FSD" />
  <img src="https://img.shields.io/badge/Lighthouse-96%2F100-brightgreen" alt="Lighthouse" />
</p>

Full-featured admin dashboard for e-commerce management built with **Nuxt 3**, **TypeScript**, and **Feature-Sliced Design**. Leverages 20+ modern libraries for data tables, charts, forms, rich text, real-time notifications, and more.

## ✨ Features

- **Dashboard Analytics** — real-time KPI cards, revenue charts, conversion funnels (Apache ECharts)
- **Advanced Data Tables** — sortable, filterable, paginated tables with column resizing (TanStack Table v8)
- **Order Management** — order lifecycle, status transitions, bulk operations, PDF invoice generation
- **Product Catalog** — CRUD with rich text descriptions (TipTap), drag & drop image uploads (vue-dropzone)
- **Customer CRM** — customer profiles, order history, segmentation, lifetime value analytics
- **Global Search** — Cmd+K command palette with fuzzy search (Fuse.js)
- **Real-Time Notifications** — WebSocket-powered live updates with toast system (vue-sonner)
- **Form Validation** — schema-based validation with Zod + VeeValidate integration
- **Export Engine** — export any data view to CSV/XLSX/PDF (SheetJS + jsPDF)
- **Dark Mode** — SSR-safe theme with system preference detection (@nuxtjs/color-mode)
- **Smooth Animations** — layout transitions with @formkit/auto-animate
- **Date Handling** — consistent date formatting and relative time (date-fns)
- **Responsive Layout** — adaptive sidebar, mobile-first with Tailwind CSS + SCSS modules
- **Accessibility** — WCAG 2.1 AA, keyboard navigation, ARIA attributes, focus management
- **Performance** — ISR, code splitting, virtual scroll, lazy hydration (Lighthouse 96/100)

## 📦 Library Ecosystem (20+ Libraries)

| Category | Library | Purpose |
|----------|---------|---------|
| **Framework** | Nuxt 3.12 | SSR/ISR meta-framework |
| **State** | Pinia 2.1 | State management + persistence |
| **Data Tables** | @tanstack/vue-table 8 | Headless table with sorting, filtering, pagination |
| **Charts** | Apache ECharts 5 + vue-echarts | Revenue charts, funnels, heatmaps |
| **Forms** | VeeValidate 4 + @vee-validate/zod | Form state management + validation |
| **Validation** | Zod 3 | Schema-based runtime validation |
| **Rich Text** | TipTap 2 | WYSIWYG editor for product descriptions |
| **Date** | date-fns 3 | Date formatting, parsing, relative time |
| **Search** | Fuse.js 7 | Fuzzy search for command palette |
| **Animations** | @formkit/auto-animate | Layout animations with zero config |
| **Toasts** | vue-sonner | Toast notification system |
| **DnD** | @vueuse/integrations + sortablejs | Drag & drop for product images, kanban |
| **Images** | @nuxt/image 1.x | Optimized images (WebP/AVIF, lazy, sizes) |
| **Icons** | nuxt-icon + Iconify | 100K+ icons from any icon set |
| **HTTP** | ofetch | Typed HTTP client with interceptors |
| **Utilities** | VueUse 10 | 200+ composition utilities |
| **Export CSV** | SheetJS (xlsx) | Export to XLSX/CSV |
| **Export PDF** | jsPDF + jspdf-autotable | PDF invoice generation |
| **Theme** | @nuxtjs/color-mode | SSR-safe dark/light mode |
| **Styling** | Tailwind CSS 3.4 + SCSS | Utility-first + component styles |
| **Testing** | Vitest + Playwright | Unit, component, E2E tests |
| **Linting** | ESLint + @antfu/eslint-config | Flat config, Vue/TS rules |

## 🏗 Architecture (Feature-Sliced Design)

```
src/
├── app/                              # App — initialization & providers
│   ├── providers/
│   │   ├── index.ts
│   │   └── websocket.provider.ts     # WebSocket connection manager
│   ├── plugins/
│   │   ├── echarts.client.ts         # ECharts Vue plugin (client-only)
│   │   └── auto-animate.ts           # AutoAnimate directive
│   └── styles/
│       ├── global.scss
│       ├── _variables.scss
│       └── _tailwind-overrides.scss
│
├── pages/                            # Pages — route composition
│   ├── dashboard/                    # KPI overview, charts, activity
│   ├── orders/                       # Order list, detail, create
│   ├── products/                     # Product catalog, editor
│   ├── customers/                    # CRM, segmentation
│   ├── analytics/                    # Deep analytics, reports
│   └── settings/                     # App settings, profile
│
├── widgets/                          # Widgets — composite UI blocks
│   ├── app-shell/                    # Layout: sidebar + topbar + main
│   ├── sidebar-nav/                  # Collapsible sidebar navigation
│   ├── stats-cards/                  # KPI metric cards row
│   ├── revenue-chart/                # ECharts revenue/orders chart
│   ├── orders-table/                 # TanStack Table for orders
│   ├── recent-activity/              # Activity feed timeline
│   ├── product-grid/                 # Product cards with filters
│   ├── customer-table/               # Customer data table
│   └── notifications-panel/          # Notification dropdown
│
├── features/                         # Features — user interactions
│   ├── auth/                         # Login, JWT refresh, guard
│   ├── manage-order/                 # Create/update/cancel order
│   ├── manage-product/               # Product CRUD + image upload
│   ├── search-global/                # Cmd+K command palette (Fuse.js)
│   ├── export-data/                  # CSV/XLSX/PDF export engine
│   ├── filter-panel/                 # Universal filter builder
│   ├── theme-toggle/                 # Dark/light mode switch
│   ├── notifications/                # WebSocket notifications
│   ├── rich-text-editor/             # TipTap editor wrapper
│   └── image-upload/                 # Drag & drop image upload
│
├── entities/                         # Entities — business objects
│   ├── order/
│   │   ├── api/order.api.ts
│   │   ├── model/
│   │   │   ├── order.store.ts        # Pinia store
│   │   │   ├── order.types.ts        # Zod schemas + TS types
│   │   │   └── order.columns.ts      # TanStack Table column defs
│   │   └── ui/
│   │       ├── OrderStatusBadge.vue
│   │       └── OrderPreviewCard.vue
│   ├── product/
│   │   ├── api/product.api.ts
│   │   ├── model/
│   │   │   ├── product.store.ts
│   │   │   ├── product.types.ts
│   │   │   └── product.columns.ts
│   │   └── ui/
│   │       ├── ProductCard.vue
│   │       └── ProductPriceBadge.vue
│   ├── customer/
│   ├── category/
│   ├── review/
│   ├── analytics/
│   └── user/
│
└── shared/                           # Shared — reusable foundation
    ├── api/
    │   ├── http-client.ts            # Configured ofetch wrapper
    │   ├── websocket.ts              # WebSocket client
    │   └── error-handler.ts          # Centralized error handling
    ├── config/
    │   └── constants.ts
    ├── lib/
    │   ├── composables/
    │   │   ├── useDataTable.ts       # TanStack Table wrapper
    │   │   ├── useExport.ts          # Export to CSV/XLSX/PDF
    │   │   ├── useInfiniteScroll.ts  # Intersection Observer scroll
    │   │   ├── useFuzzySearch.ts     # Fuse.js wrapper
    │   │   ├── useWebSocket.ts       # Reactive WebSocket
    │   │   ├── useOptimisticUpdate.ts
    │   │   └── useUrlFilters.ts      # URL ↔ filter state sync
    │   ├── helpers/
    │   │   ├── currency.ts           # Currency formatting
    │   │   ├── date.ts               # date-fns wrappers
    │   │   └── export-utils.ts       # SheetJS + jsPDF helpers
    │   └── validators/
    │       └── schemas.ts            # Shared Zod schemas
    ├── ui/
    │   ├── data-table/               # Generic TanStack Table component
    │   ├── charts/                   # ECharts wrapper components
    │   ├── forms/                    # Form field components
    │   ├── feedback/                 # Toast, modals, alerts
    │   └── layout/                   # Page layout primitives
    └── types/
        └── global.d.ts
```

## 🚀 Quick Start

```bash
pnpm install
pnpm dev           # http://localhost:3000
pnpm build         # Production build
pnpm preview       # Preview production
pnpm test          # Unit tests (Vitest)
pnpm test:e2e      # E2E tests (Playwright)
pnpm lint          # ESLint check
pnpm typecheck     # vue-tsc type checking
```

## 🔑 Key Technical Highlights

### 1. TanStack Table v8 — Headless Data Tables

Zero-UI table engine with full TypeScript support. Handles sorting, filtering, pagination, column resizing, and row selection without prescribing the rendering:

```typescript
// entities/order/model/order.columns.ts
const columns = createColumnHelper<Order>().columns([
  { accessorKey: 'id', header: 'Order #', enableSorting: true },
  { accessorKey: 'customer.name', header: 'Customer',
    cell: ({ row }) => h(CustomerCell, { customer: row.original.customer }) },
  { accessorKey: 'total', header: 'Total',
    cell: ({ getValue }) => formatCurrency(getValue<number>()) },
  { accessorKey: 'status', header: 'Status', enableColumnFilter: true,
    cell: ({ getValue }) => h(OrderStatusBadge, { status: getValue() }) },
])
```

### 2. Zod + VeeValidate — Type-Safe Forms

Schemas defined once, used for both runtime validation and TypeScript types:

```typescript
// entities/product/model/product.types.ts
export const ProductSchema = z.object({
  name: z.string().min(3, 'Minimum 3 characters').max(200),
  price: z.number().positive('Price must be positive'),
  sku: z.string().regex(/^[A-Z]{2}-\d{4,}$/, 'Format: XX-0000'),
  category: z.string().uuid(),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).min(1, 'At least 1 image').max(10),
})

export type Product = z.infer<typeof ProductSchema>
// Type is automatically derived — single source of truth
```

### 3. Apache ECharts — Interactive Analytics

SSR-safe chart rendering with client-only plugin and reactive data:

```typescript
// widgets/revenue-chart/ui/RevenueChart.vue
const chartOption = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  xAxis: { type: 'category', data: analytics.dates },
  yAxis: [
    { type: 'value', name: 'Revenue (₽)' },
    { type: 'value', name: 'Orders' },
  ],
  series: [
    { name: 'Revenue', type: 'bar', data: analytics.revenue, yAxisIndex: 0 },
    { name: 'Orders', type: 'line', data: analytics.orders, yAxisIndex: 1, smooth: true },
  ],
}))
```

### 4. Fuse.js — Command Palette Search

Global Cmd+K search across orders, products, customers, and navigation:

```typescript
// features/search-global/model/search.store.ts
const fuse = new Fuse(searchableItems, {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.2 },
    { name: 'tags', weight: 0.3 },
    { name: 'id', weight: 0.1 },
  ],
  threshold: 0.3,
  includeMatches: true,
})
```

### 5. WebSocket Real-Time Updates

Live order notifications and dashboard counter updates:

```typescript
// shared/lib/composables/useWebSocket.ts
const { status, data, send } = useWebSocket(wsUrl, {
  autoReconnect: { retries: 5, delay: 3000 },
  heartbeat: { interval: 30000, message: 'ping' },
  onMessage: (event) => {
    const payload = JSON.parse(event.data)
    if (payload.type === 'NEW_ORDER') orderStore.addOrder(payload.order)
    if (payload.type === 'STATUS_CHANGE') orderStore.updateStatus(payload)
  },
})
```

### 6. Export Engine — CSV / XLSX / PDF

Unified export composable supporting multiple formats:

```typescript
// shared/lib/composables/useExport.ts
const { exportCSV, exportXLSX, exportPDF } = useExport()

await exportXLSX({
  filename: `orders-${format(new Date(), 'yyyy-MM-dd')}`,
  sheets: [
    { name: 'Orders', data: orders, columns: orderExportColumns },
    { name: 'Summary', data: summaryData },
  ],
})
```

## 📊 Performance

| Metric | Score |
|--------|-------|
| Lighthouse Performance | 96/100 |
| Lighthouse Accessibility | 100/100 |
| LCP | 1.3s |
| INP | 72ms |
| CLS | 0.02 |
| First Load JS | 58 kB (gzipped) |

### Optimization Techniques

- **ISR** — dashboard page cached with `swr: 60` for instant loads
- **Client-Only Charts** — ECharts loaded only in browser via `<ClientOnly>` + dynamic import
- **TanStack Virtual** — virtual rows in data tables for 50K+ records
- **Lazy Hydration** — sidebar and notification panel hydrated on interaction
- **Image Pipeline** — @nuxt/image with WebP/AVIF, blur placeholders, responsive `sizes`
- **Code Split** — route-based + `defineAsyncComponent` for heavy widgets (TipTap, ECharts)
- **Pinia Persistence** — `pinia-plugin-persistedstate` with cookie transport for SSR

## 🧪 Testing

```bash
pnpm test              # Vitest unit + component
pnpm test:coverage     # Coverage report (89%)
pnpm test:e2e          # Playwright (Chromium + Firefox)
```

| Layer | Tests | Coverage |
|-------|-------|----------|
| Shared (composables, helpers, validators) | Unit | 95% |
| Entities (stores, Zod schemas) | Unit | 93% |
| Features (forms, interactions) | Component | 87% |
| Widgets (tables, charts) | Component | 82% |
| Pages (full flows) | E2E | Key scenarios |

## 📄 License

MIT © 2025
