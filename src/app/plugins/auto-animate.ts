import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

/**
 * Registers the v-auto-animate directive globally.
 * Use on any element to animate its children on add/remove/move.
 *
 * @example
 * <ul v-auto-animate>
 *   <li v-for="item in items" :key="item.id">...</li>
 * </ul>
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(autoAnimatePlugin)
})
