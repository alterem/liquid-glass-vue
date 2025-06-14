<template>
  <div class="demo-app">
    <div class="background">
      <div class="gradient-background"></div>
    </div>

    <div class="container">
      <h1 class="title">Vue Liquid Glass</h1>

      <!-- 基础用法 -->
      <div class="demo-section">
        <h2>基础用法</h2>
        <LiquidGlass @click="handleClick">
          <div class="card-content">
            <h3>默认液态玻璃效果</h3>
            <p>点击我试试看！</p>
          </div>
        </LiquidGlass>
      </div>

      <!-- 可拖动的液态玻璃卡片 -->
      <div class="demo-section">
        <h2>可拖动的液态玻璃卡片</h2>
        <div class="draggable-area">
          <LiquidGlass variant="primary" custom-class="draggable-card" @mousedown.prevent="startDrag($event, 'card1')"
            @touchstart.prevent="startDrag($event, 'card1')" :style="cardPositions.card1">
            <div class="card-content">
              <h4>🎯 拖动我</h4>
              <p>Primary 变体</p>
            </div>
          </LiquidGlass>

          <LiquidGlass variant="secondary" custom-class="draggable-card" @mousedown.prevent="startDrag($event, 'card2')"
            @touchstart.prevent="startDrag($event, 'card2')" :style="cardPositions.card2">
            <div class="card-content">
              <h4>🚀 我也能拖动</h4>
              <p>Secondary 变体</p>
            </div>
          </LiquidGlass>

          <LiquidGlass variant="dark" custom-class="draggable-card" @mousedown.prevent="startDrag($event, 'card3')"
            @touchstart.prevent="startDrag($event, 'card3')" :style="cardPositions.card3">
            <div class="card-content">
              <h4>🌙 拖拽试试</h4>
              <p>Dark 变体</p>
            </div>
          </LiquidGlass>
        </div>
      </div>

      <!-- 悬浮工具栏 -->
      <div class="demo-section">
        <h2>悬浮工具栏</h2>
        <LiquidGlass custom-class="floating-toolbar" :interactive="false">
          <div class="toolbar-content">
            <LiquidGlass size="small" custom-class="tool-button" @click="handleToolClick('home')">
              🏠
            </LiquidGlass>
            <LiquidGlass size="small" custom-class="tool-button" @click="handleToolClick('search')">
              🔍
            </LiquidGlass>
            <LiquidGlass size="small" custom-class="tool-button" @click="handleToolClick('settings')">
              ⚙️
            </LiquidGlass>
            <LiquidGlass size="small" custom-class="tool-button" @click="handleToolClick('profile')">
              👤
            </LiquidGlass>
          </div>
        </LiquidGlass>
      </div>

      <!-- 交互式表单 -->
      <div class="demo-section">
        <h2>交互式表单</h2>
        <LiquidGlass custom-class="form-container">
          <form @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label>姓名</label>
                <LiquidGlass custom-class="input-wrapper" :interactive="false">
                  <input v-model="formData.name" type="text" placeholder="请输入姓名" class="glass-input"
                    @focus="handleInputFocus" @blur="handleInputBlur" />
                </LiquidGlass>
              </div>

              <div class="form-group">
                <label>邮箱</label>
                <LiquidGlass custom-class="input-wrapper" :interactive="false">
                  <input v-model="formData.email" type="email" placeholder="请输入邮箱" class="glass-input"
                    @focus="handleInputFocus" @blur="handleInputBlur" />
                </LiquidGlass>
              </div>
            </div>

            <div class="form-group">
              <label>消息</label>
              <LiquidGlass custom-class="textarea-wrapper" :interactive="false">
                <textarea v-model="formData.message" placeholder="请输入消息内容" class="glass-textarea" rows="4"
                  @focus="handleInputFocus" @blur="handleInputBlur"></textarea>
              </LiquidGlass>
            </div>

            <div class="button-group">
              <LiquidGlass variant="primary" custom-class="submit-button" @click="handleSubmit">
                提交表单
              </LiquidGlass>

              <LiquidGlass variant="secondary" custom-class="reset-button" @click="resetForm">
                重置
              </LiquidGlass>
            </div>
          </form>
        </LiquidGlass>
      </div>

      <!-- 动态效果展示 -->
      <div class="demo-section">
        <h2>动态效果展示</h2>
        <div class="effects-grid">
          <LiquidGlass :blur="dynamicBlur" :opacity="dynamicOpacity" custom-class="dynamic-card">
            <div class="card-content">
              <h4>动态模糊</h4>
              <p>模糊度: {{ dynamicBlur }}px</p>
              <input type="range" min="1" max="10" v-model="dynamicBlur" class="slider" />
            </div>
          </LiquidGlass>

          <LiquidGlass :opacity="dynamicOpacity" custom-class="dynamic-card">
            <div class="card-content">
              <h4>动态透明度</h4>
              <p>透明度: {{ dynamicOpacity }}</p>
              <input type="range" min="0.1" max="0.5" step="0.05" v-model="dynamicOpacity" class="slider" />
            </div>
          </LiquidGlass>
        </div>
      </div>

      <!-- 卡片网格 -->
      <div class="demo-section">
        <h2>响应式卡片网格</h2>
        <div class="cards-grid">
          <LiquidGlass v-for="(card, index) in cardData" :key="index" :variant="card.variant" custom-class="grid-card"
            @click="handleCardClick(card)">
            <div class="card-content">
              <div class="card-icon">{{ card.icon }}</div>
              <h4>{{ card.title }}</h4>
              <p>{{ card.description }}</p>
              <div class="card-stats">
                <span>{{ card.stats }}</span>
              </div>
            </div>
          </LiquidGlass>
        </div>
      </div>

      <!-- 浮动操作按钮 -->
      <LiquidGlass variant="primary" custom-class="fab" @click="toggleFabMenu" :class="{ 'fab-open': fabMenuOpen }">
        <div class="fab-icon">{{ fabMenuOpen ? '✕' : '+' }}</div>
      </LiquidGlass>

      <!-- FAB菜单 -->
      <Transition name="fab-menu">
        <div v-if="fabMenuOpen" class="fab-menu">
          <LiquidGlass v-for="(item, index) in fabMenuItems" :key="index" size="small" custom-class="fab-menu-item"
            @click="handleFabAction(item.action)" :style="{ '--delay': index * 0.1 + 's' }">
            {{ item.icon }}
          </LiquidGlass>
        </div>
      </Transition>

      <!-- LiquidGlassModal 组件 -->
      <LiquidGlassModal v-model="showModal" :title="modalTitle" :message="modalMessage" />

      <div class="demo-container">
        <!-- 背景图片或渐变 -->
        <div class="background">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" alt="Background" class="bg-image" />
        </div>

        <!-- 名片展示 -->
        <div class="cards-showcase">
          <UserCard title="User Info" name="John Doe" job-title="Software Engineer" email="john.doe@example.com"
            location="San Francisco, CA" join-date="March 2023" />

          <UserCard title="Team Member" name="Jane Smith" job-title="UI/UX Designer" email="jane.smith@example.com"
            location="New York, NY" join-date="January 2024" />

          <UserCard title="Developer" name="Mike Johnson" job-title="Full Stack Developer" email="mike.j@example.com"
            location="Austin, TX" join-date="June 2023" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import LiquidGlass from '../lib/components/LiquidGlass.vue'
import UserCard from '../lib/components/UserCard.vue'
import LiquidGlassModal from '../lib/components/LiquidGlassModal.vue'
import type { LiquidGlassProps } from '../lib/types'

const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 模态框状态
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const openModal = (title: string, message: string) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

// 表单数据
const formData = reactive({
  name: 'Alterem',
  email: '',
  message: 'Vue Liquid Glass'
})

// 拖拽相关
const cardPositions = reactive({
  card1: { transform: 'translate(0px, 0px)' },
  card2: { transform: 'translate(150px, 0px)' },
  card3: { transform: 'translate(320px, 0px)' }
})

const dragState = reactive({
  isDragging: false,
  currentCard: '',
  startX: 0,
  startY: 0,
  initialX: 0,
  initialY: 0
})

// 动态效果
const dynamicBlur = ref(2)
const dynamicOpacity = ref(0.15)

// FAB菜单
const fabMenuOpen = ref(false)
const fabMenuItems = [
  { icon: '📝', action: 'edit' },
  { icon: '📷', action: 'camera' },
  { icon: '📁', action: 'folder' },
  { icon: '⚡', action: 'quick' }
]

interface CardItem {
  icon: string
  title: string
  description: string
  stats: string
  variant: LiquidGlassProps['variant']
}

// 卡片数据
const cardData: CardItem[] = [
  {
    icon: '📊',
    title: '数据分析',
    description: '查看详细的数据报告',
    stats: '1.2K 次查看',
    variant: 'primary'
  },
  {
    icon: '🎨',
    title: '设计工具',
    description: '创建精美的设计作品',
    stats: '856 个项目',
    variant: 'secondary'
  },
  {
    icon: '🚀',
    title: '项目管理',
    description: '高效管理你的项目',
    stats: '42 个活跃项目',
    variant: 'default'
  },
  {
    icon: '💡',
    title: '创意灵感',
    description: '发现新的创意想法',
    stats: '2.3K 个想法',
    variant: 'dark'
  }
]

// 事件处理
const handleClick = () => {
  openModal('点击事件', '液态玻璃组件被点击了！')
}

const handleToolClick = (tool: string) => {
  console.log(`工具被点击: ${tool}`)
}

const handleSubmit = () => {
  console.log('表单提交:', formData)
  openModal('表单提交', '表单提交成功！')
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.message = ''
}

const handleInputFocus = (event: FocusEvent) => {
  const target = event.target as HTMLElement
  target.parentElement?.classList.add('focused')
}

const handleInputBlur = (event: FocusEvent) => {
  const target = event.target as HTMLElement
  target.parentElement?.classList.remove('focused')
}

const handleCardClick = (card: any) => {
  console.log('卡片被点击:', card.title)
}

const toggleFabMenu = () => {
  fabMenuOpen.value = !fabMenuOpen.value
}

const handleFabAction = (action: string) => {
  console.log('FAB操作:', action)
  fabMenuOpen.value = false
}

// 拖拽功能
const startDrag = (event: MouseEvent | TouchEvent, cardId: string) => {
  // if (isMobile.value) return

  dragState.isDragging = true
  dragState.currentCard = cardId

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

  dragState.startX = clientX
  dragState.startY = clientY

  if ('touches' in event) {
    event.preventDefault()
  }

  const currentTransform = cardPositions[cardId as keyof typeof cardPositions].transform
  const matches = currentTransform.match(/translate\((-?\d+)px, (-?\d+)px\)/)
  if (matches) {
    dragState.initialX = parseInt(matches[1])
    dragState.initialY = parseInt(matches[2])
  }

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (event: MouseEvent | TouchEvent) => {
  // if (!dragState.isDragging || isMobile.value) return

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

  const deltaX = clientX - dragState.startX
  const deltaY = clientY - dragState.startY

  const newX = dragState.initialX + deltaX
  const newY = dragState.initialY + deltaY

  cardPositions[dragState.currentCard as keyof typeof cardPositions].transform =
    `translate(${newX}px, ${newY}px)`

  if ('preventDefault' in event) {
    event.preventDefault()
  }
}

const stopDrag = () => {
  dragState.isDragging = false
  dragState.currentCard = ''
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  if (isMobile.value) {
    cardPositions.card1.transform = 'translate(0px, 0px)'
    cardPositions.card2.transform = 'translate(0px, 0px)'
    cardPositions.card3.transform = 'translate(0px, 0px)'
  }
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.demo-app {
  min-height: 100vh;
  position: relative;
  padding: 2rem;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.gradient-background {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
      #667eea 0%,
      #764ba2 25%,
      #f093fb 50%,
      #f5576c 75%,
      #4facfe 100%);
  /* animation: gradient-shift 20s ease infinite; */
  animation: gradient-breathe 8s ease-in-out infinite;
}

@keyframes gradient-shift {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.1) rotate(180deg);
  }
}

@keyframes gradient-breathe {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }

  50% {
    transform: scale(1.02);
    opacity: 1;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.demo-section {
  margin-bottom: 4rem;
}

.demo-section h2 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.card-content {
  text-align: center;
}

.card-content h3,
.card-content h4 {
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.8);
}

.card-content p {
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

/* 可拖动区域 */
.draggable-area {
  position: relative;
  height: 200px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 1rem;
}

.draggable-card {
  position: absolute;
  cursor: move;
  user-select: none;
  transition: transform 0.2s ease;
  touch-action: none;
  /* 阻止浏览器默认的触摸行为 */
}

.draggable-card:hover {
  transform: scale(1.05);
}

/* 工具栏 */
.floating-toolbar {
  display: inline-block;
}

.toolbar-content {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.tool-button {
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.tool-button:hover {
  transform: scale(1.1);
}

/* 表单样式 */
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
}

.input-wrapper,
.textarea-wrapper {
  padding: 0;
  transition: all 0.3s ease;
}

.input-wrapper.focused,
.textarea-wrapper.focused {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(31, 38, 135, 0.3);
}

.glass-input,
.glass-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(0, 0, 0, 0.8);
  font-size: 1rem;
  resize: none;
}

.glass-input::placeholder,
.glass-textarea::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.submit-button,
.reset-button {
  cursor: pointer;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
}

/* 动态效果 */
.effects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.dynamic-card {
  transition: all 0.3s ease;
}

.slider {
  width: 100%;
  margin-top: 1rem;
  accent-color: rgba(59, 130, 246, 0.8);
}

/* 卡片网格 */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.grid-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.grid-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-stats {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.5);
}

/* FAB按钮 */
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s ease;
}

.fab:hover {
  transform: scale(1.1);
}

.fab-icon {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  transition: transform 0.3s ease;
}

.fab-open .fab-icon {
  transform: rotate(45deg);
}

/* FAB菜单 */
.fab-menu {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 999;
}

.fab-menu-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  animation: fab-item-enter 0.3s ease var(--delay, 0s) both;
}

@keyframes fab-item-enter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* FAB菜单过渡 */
.fab-menu-enter-active,
.fab-menu-leave-active {
  transition: all 0.3s ease;
}

.fab-menu-enter-from,
.fab-menu-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7) blur(1px);
}

.cards-showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .demo-app {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }

  .draggable-area {
    height: auto;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .draggable-card {
    position: static;
    width: 90%;
    max-width: 300px;
  }

  .effects-grid {
    grid-template-columns: 1fr;
  }

  .cards-showcase {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
