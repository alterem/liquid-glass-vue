export interface LiquidGlassProps {
  variant?: 'default' | 'primary' | 'secondary' | 'dark'
  size?: 'small' | 'medium' | 'large'
  interactive?: boolean
  elevated?: boolean
  ripple?: boolean
  blur?: number
  opacity?: number
  borderRadius?: string
  customClass?: string
}

export interface LiquidGlassEmits {
  click: [event: MouseEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}
