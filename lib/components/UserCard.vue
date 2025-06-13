<template>
  <div class="user-card-container">
    <LiquidGlass custom-class="user-card" :blur="8" :opacity="0.2" border-radius="2rem" :interactive="true">
      <div class="card-header">
        <h3 class="card-title">{{ title || 'User Info' }}</h3>
      </div>

      <div class="card-body">
        <div class="avatar-section">
          <div class="avatar">
            {{ getInitials(name) }}
          </div>
          <div class="user-info">
            <h2 class="user-name">{{ name }}</h2>
            <p class="user-title">{{ jobTitle }}</p>
          </div>
        </div>

        <div class="details-section">
          <div class="detail-item">
            <span class="detail-label">Email:</span>
            <span class="detail-value">{{ email }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">{{ location }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Joined:</span>
            <span class="detail-value">{{ joinDate }}</span>
          </div>
        </div>
      </div>
    </LiquidGlass>
  </div>
</template>

<script setup lang="ts">
import LiquidGlass from './LiquidGlass.vue'

interface Props {
  title?: string
  name: string
  jobTitle: string
  email: string
  location: string
  joinDate: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'User Info'
})

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
.user-card-container {
  display: inline-block;
  max-width: 400px;
  width: 100%;
}

.user-card {
  padding: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(12px) saturate(180%) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 2px 20px rgba(255, 255, 255, 0.2) !important;
}

.card-header {
  padding: 1.5rem 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
}

.card-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 0 1.5rem 1.5rem;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow:
    0 4px 16px rgba(31, 38, 135, 0.2),
    inset 0 2px 8px rgba(255, 255, 255, 0.2);
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.user-title {
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.detail-value {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 12px 40px rgba(31, 38, 135, 0.4),
    inset 0 2px 20px rgba(255, 255, 255, 0.25) !important;
}

@media (max-width: 480px) {
  .user-card-container {
    max-width: 100%;
  }

  .avatar-section {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .detail-item {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }

  .detail-value {
    max-width: 100%;
  }
}
</style>
