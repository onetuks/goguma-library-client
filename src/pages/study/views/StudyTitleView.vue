<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="my-study-review-list-title-container">
    <img alt="clover-icon" src="@/assets/icon/clover/clover-icon.png" />
    <div class="my-study-review-list-title">{{ title }}</div>
    <img alt="clover-icon" src="@/assets/icon/clover/clover-icon.png" />
  </div>
</template>

<style scoped>
.my-study-review-list-title-container {
  display: flex;
  align-items: center;
  justify-items: center;
}

.my-study-review-list-title {
  font-size: 24px;
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-tertiary);
  margin: 0 7px;
}
</style>
