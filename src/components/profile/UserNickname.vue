<script setup lang="ts">
const props = defineProps({
  nickname: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="nickname">{{ nickname }}</div>
</template>

<style scoped>
.nickname {
  font-size: 16px; /* 제목 대 */
  color: var(--text-fourth);
  text-align: left;
  margin-top: 10px;
}
</style>
