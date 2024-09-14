<script lang="ts" setup>
import { ref, watch } from "vue";
import { Page, PAGE_LIMIT } from "@/types/Page";

const props = defineProps<{
  pageInfo: Page<object>;
}>();

const page = ref<Page<object>>({ ...props.pageInfo });
const pageNumbers = ref<number[]>([]);

watch(
  () => props.pageInfo,
  (newPage) => {
    page.value = newPage;
    selectPage(page.value.number);
  }
);

const selectPage = (index: number): void => {
  page.value.number = index;
  pageNumbers.value = getPageNumbers(index);
};

const getPageNumbers = (index: number): number[] => {
  const numbers = [];
  const start = Math.max(
    1,
    Math.min(index - 2, page.value.totalPages - PAGE_LIMIT + 1)
  );
  const end = Math.min(
    page.value.totalPages,
    Math.max(index + 2, start + PAGE_LIMIT - 1)
  );
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }
  return numbers;
};

selectPage(page.value.number);
</script>

<template>
  <div v-if="pageNumbers.length > 0" class="pagination-container">
    <img alt="prev-page" src="@/assets/icon/direction/left_icon.png" />
    <div class="pagination-numbers-container">
      <div
        v-for="index in pageNumbers"
        :key="index"
        class="pagination"
        @click="selectPage(index)"
      >
        <span :class="['page', { active: index === page.number + 1 }]">
          {{ index }}
        </span>
      </div>
    </div>
    <img alt="prev-page" src="@/assets/icon/direction/right_icon.png" />
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
  color: var(--text-primary);
}

.pagination-numbers-container {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pagination {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
}

.active {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-fourth);
}
</style>
