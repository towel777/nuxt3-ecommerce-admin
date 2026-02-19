import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  FunnelChart,
  HeatmapChart,
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  VisualMapComponent,
  CalendarComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

/**
 * ECharts plugin — client-only.
 * Registers components once and provides VChart globally.
 * Charts must be wrapped in <ClientOnly> to avoid SSR mismatch.
 */
export default defineNuxtPlugin((nuxtApp) => {
  use([
    CanvasRenderer,
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    FunnelChart,
    HeatmapChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    DataZoomComponent,
    ToolboxComponent,
    MarkLineComponent,
    MarkPointComponent,
    VisualMapComponent,
    CalendarComponent,
  ])

  nuxtApp.vueApp.component('VChart', VChart)
})
