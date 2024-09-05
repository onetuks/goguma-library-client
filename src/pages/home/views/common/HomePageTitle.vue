<script setup lang="ts">
defineProps<{
  title: string;
  info: string;
}>();
</script>

<template>
  <div class="main-page-title-container">
    <div class="main-section-title-container">
      <img
        src="@/assets/icon/clover/white-clover-icon.png"
        alt="white-clover-icon"
        class="white-clover-icon"
      />
      <div class="main-section-title">{{ title }}</div>
      <img
        src="@/assets/icon/clover/white-clover-icon.png"
        alt="white-clover-icon"
        class="white-clover-icon"
      />
    </div>
    <div class="main-section-info">{{ info }}</div>
  </div>
</template>

<style scoped>
.main-page-title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  gap: 20px;
}

.main-section-title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.white-clover-icon {
  width: 21px;
  height: 21px;
}

.main-section-title {
  font-size: 24px;
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-secondary);
  margin: 0 7px;
}

.main-section-info {
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-family-regular), sans-serif;
  white-space: pre-line;
}
</style>
