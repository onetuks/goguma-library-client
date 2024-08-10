<script setup lang="ts">
defineProps<{
  headerTitle: string;
}>();
</script>

<template>
  <div class="top-bar">
    <button class="button header-button">{{ headerTitle }}</button>
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.button {
  padding: 10px 20px;
  border: 1px solid var(--border-primary);
  border-radius: 5px;
  background-color: var(--background-primary);
  color: #000000;
  cursor: pointer;
  margin: 0 10px;
}

.button:hover {
  background-color: var(--surface-fourth);
}

.header-button {
  /* 추가적인 스타일이 필요하면 여기에 추가 */
}
</style>
