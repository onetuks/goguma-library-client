<script setup lang="ts">
const props = defineProps({
  introduction: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="self-introduction">
    {{ introduction }}
  </div>
</template>

<style scoped>
.self-introduction {
  width: 100%;
  max-width: 360px;
  padding: 10px;
  background-color: var(--surface-tertiary);
  color: var(--text-fourth);
  font-size: 12px; /* 본문 소 */
  border-radius: 10px;
  margin-top: 10px;
  text-align: left;

  /* 추가: 컨텐츠에 따라 크기가 변하도록 height 관련 속성 제거 */
  box-sizing: border-box; /* 패딩이 컨텐츠 크기에 영향을 주지 않도록 설정 */
  white-space: pre-wrap; /* 텍스트 줄바꿈 유지 */
  word-break: break-word; /* 긴 단어가 있으면 줄을 넘겨서 표시 */
}
</style>
