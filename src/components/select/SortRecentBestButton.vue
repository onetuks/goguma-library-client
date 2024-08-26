<script setup lang="ts">
import { ref } from "vue";

const currentTab = ref("latest");

function setTab(tab: string) {
  currentTab.value = tab;
  // 탭에 따라 정렬 방식을 바꿀 수 있는 로직을 추가할 수 있습니다.
  // 최신 서평 또는 베스트 서평에 따른 데이터 필터링 로직을 여기에 작성하세요.
}
</script>

<template>
  <div class="sort-button">
    <button
      :class="{ active: currentTab === 'latest' }"
      @click="setTab('latest')"
    >
      최신 서평
    </button>
    <button :class="{ active: currentTab === 'best' }" @click="setTab('best')">
      베스트 서평
    </button>
  </div>
</template>

<style scoped>
.sort-button {
  display: flex;
  width: 100%;
  max-width: 390px;
  height: 50px;
}

button {
  flex: 1;
  font-size: 20px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-family: "NanumSquare", sans-serif;
  box-shadow: none;
  color: var(--text-tertiary); /* 기본 글자 색상 */
}

button.active {
  background-color: var(--surface-primary); /* 버튼 활성화 시 배경색 변경 */
  color: #ffffff; /* 버튼 활성화 시 글자색 변경 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Drop shadow */
}

button:first-of-type {
  border-right: 1px solid var(--border-secondary); /* 버튼 사이에 경계선 추가 */
}
</style>
