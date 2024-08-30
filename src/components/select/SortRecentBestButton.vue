<script setup lang="ts">
import { SortType } from "@/types/SortType";

const props = defineProps<{
  sortType: SortType;
}>();

// prop: 부모 -> 자식 컴포넌트로 전달되는 데이터
// emit: 자식 -> 부모 컴포넌트로 이벤트를 전달하는 함수
const emits = defineEmits<{
  (event: "update:SortType", sortType: SortType): void;
}>();

const isLatestSortType = (): boolean => {
  return props.sortType === "LATEST";
};

const changeSortType = (): void => {
  emits("update:SortType", isLatestSortType() ? "PICK" : "LATEST");
};
</script>

<template>
  <div class="sort-button">
    <button
      class="sort-button__btn"
      :class="{ active: isLatestSortType() }"
      @click="changeSortType"
    >
      최신 서평
    </button>
    <button
      class="sort-button__btn"
      :class="{ active: !isLatestSortType() }"
      @click="changeSortType"
    >
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

.sort-button__btn {
  flex: 1;
  font-size: 20px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  box-shadow: none;
  color: var(--text-tertiary);
}

.sort-button__btn.active {
  background-color: var(--surface-primary);
  color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.sort-button__btn:first-of-type {
  border-right: 1px solid var(--border-secondary);
}
</style>
