<script setup lang="ts">
defineProps<{
  label: string;
  count: number;
}>();
</script>

<template>
  <div class="stat-counter">
    <div class="label">{{ label }}</div>
    <div class="count">{{ count }}</div>
  </div>
</template>

<style scoped>
.stat-counter {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  text-align: center;
}

.label {
  font-size: 12px;
  color: black;
}

.count {
  font-size: var(--font-size-16);
  font-weight: bold;
  color: black;
}
</style>
