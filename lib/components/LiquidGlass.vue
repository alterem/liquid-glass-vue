<template>
  <div :class="computedClasses" :style="computedStyles" @click="handleClick" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div class="liquid-glass__content">
      <slot></slot>
    </div>
    <div v-if="ripple" class="liquid-glass__ripple" ref="rippleRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { LiquidGlassProps, LiquidGlassEmits } from '../types/index'

const props = withDefaults(defineProps<LiquidGlassProps>(), {
  variant: 'default',
  size: 'medium',
  interactive: true,
  elevated: false,
  ripple: true,
  blur: 2,
  opacity: 0.15,
  borderRadius: '2rem',
  customClass: ''
})

const emit = defineEmits<LiquidGlassEmits>()

const rippleRef = ref<HTMLElement>()

const computedClasses = computed(() => [
  'liquid-glass',
  `liquid-glass--${props.variant}`,
  `liquid-glass--${props.size}`,
  {
    'liquid-glass--interactive': props.interactive,
    'liquid-glass--elevated': props.elevated
  },
  props.customClass
])

const computedStyles: ComputedRef<Record<string, string>> = computed(() => ({
  '--blur-amount': `${props.blur}px`,
  '--bg-opacity': props.opacity.toString(),
  '--border-radius': props.borderRadius
}))

const handleClick = (event: MouseEvent) => {
  if (props.ripple && rippleRef.value) {
    createRipple(event)
  }
  emit('click', event)
}

const handleMouseEnter = (event: MouseEvent) => {
  emit('mouseenter', event)
}

const handleMouseLeave = (event: MouseEvent) => {
  emit('mouseleave', event)
}

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const ripple = document.createElement('span')
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
  `

  rippleRef.value?.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

defineExpose({
  computedClasses,
  computedStyles,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
  rippleRef
})
</script>

<style scoped>
.liquid-glass {
  position: relative;
  background: rgba(255, 255, 255, var(--bg-opacity));
  backdrop-filter: blur(var(--blur-amount)) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: var(--border-radius);
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.2),
    inset 0 4px 20px rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.liquid-glass::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  backdrop-filter: blur(1px);
  box-shadow:
    inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
    inset 0px -9px 0px -8px rgba(255, 255, 255, 1);
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px) drop-shadow(10px 4px 6px rgba(0, 0, 0, 0.1)) brightness(115%);
}

.liquid-glass__content {
  position: relative;
  z-index: 1;
}

.liquid-glass__ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.liquid-glass--primary {
  background: rgba(59, 130, 246, var(--bg-opacity));
  border-color: rgba(59, 130, 246, 0.3);
}

.liquid-glass--secondary {
  background: rgba(139, 92, 246, var(--bg-opacity));
  border-color: rgba(139, 92, 246, 0.3);
}

.liquid-glass--dark {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.liquid-glass--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.liquid-glass--medium {
  padding: 1rem 1.5rem;
  font-size: 1rem;
}

.liquid-glass--large {
  padding: 1.5rem 2rem;
  font-size: 1.125rem;
}

.liquid-glass--interactive:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow:
    0 12px 40px rgba(31, 38, 135, 0.3),
    inset 0 4px 20px rgba(255, 255, 255, 0.4);
}

.liquid-glass--elevated {
  box-shadow:
    0 20px 60px rgba(31, 38, 135, 0.3),
    inset 0 4px 20px rgba(255, 255, 255, 0.4);
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
