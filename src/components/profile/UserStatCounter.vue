<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="stat-counter">
    <div class="label">{{ label }}</div>
    <div class="count">{{ count }}</div>
  </div>
</template>

<style scoped>
.stat-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33px;
  text-align: center;
}

.label {
  font-size: 12px; /* 본문 소 */
  color: #000;
}

.count {
  font-size: 16px; /* 제목 중 */
  font-weight: bold;
  color: #000;
}
</style>
