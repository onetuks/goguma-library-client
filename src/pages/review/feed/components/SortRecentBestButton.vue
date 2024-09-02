<script setup lang="ts">
import { SortType } from "@/types/SortType";

const props = defineProps<{
  sortType: SortType;
}>();

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
  height: 50px;
  border-top: 1px solid var(--border-primary);
  border-bottom: 1px solid var(--border-primary);
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
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
