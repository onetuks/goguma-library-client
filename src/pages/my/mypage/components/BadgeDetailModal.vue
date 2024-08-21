<script setup lang="ts">
import { Badge } from "@/pages/my/mypage/components/ProfileBadgeView.vue";

const props = defineProps<{
  badge: Badge;
}>();

const emits = defineEmits<{
  (event: "modal:Close"): void;
}>();

const handleError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/profile/default-badge.png");
};
</script>

<template>
  <div class="badge-detail-modal-overlay" @click="emits('modal:Close')">
    <div class="badge-detail-modal-container">
      <img
        class="badge-detail-image"
        :src="props.badge.badgeImageUrl"
        :alt="badge.name"
        @error="handleError"
      />
      <div class="badge-detail-name">{{ props.badge.name }}</div>
      <div class="badge-detail-detail">{{ props.badge.detail }}</div>
    </div>
  </div>
</template>

<style scoped>
.badge-detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.badge-detail-modal-container {
  width: 330px;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-tertiary);
  border-radius: 20px;
}

.badge-detail-image {
  width: 152px;
  height: 152px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  border: 1px solid var(--gray-900);
  border-radius: 27px;
}

.badge-detail-name {
  margin-top: 25px;
  color: var(--text-fourth);
  font-size: 20px;
  font-family: var(--font-family-bold), sans-serif;
}

.badge-detail-detail {
  margin-top: 15px;
  color: var(--text-fourth);
  font-size: 14px;
  font-family: var(--font-family-regular), sans-serif;
}
</style>
