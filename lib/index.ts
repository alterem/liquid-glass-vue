import type { App } from 'vue'
import LiquidGlass from './components/LiquidGlass.vue'
import type { LiquidGlassProps } from './types/index'

LiquidGlass.install = (app: App) => {
  app.component('LiquidGlass', LiquidGlass)
}

const install = (app: App) => {
  app.component('LiquidGlass', LiquidGlass)
}

export default {
  install,
  LiquidGlass
}

export {
  LiquidGlass,
  type LiquidGlassProps
}
