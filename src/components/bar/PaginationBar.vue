<script lang="ts" setup>
import { ref, watch } from "vue";
import { Page, PAGE_LIMIT } from "@/types/Page";

const props = defineProps<{
  pageInfo: Page<object>;
}>();

const emits = defineEmits<{
  (event: "request:Page", pageNumber: number): void;
}>();

watch(
  () => props.pageInfo,
  (newPageInfo) => {
    page.value = { ...newPageInfo };
    pageNumbers.value = getPageNumbers(page.value.number);
  }
);

const page = ref<Page<object>>({ ...props.pageInfo });
const pageNumbers = ref<number[]>([]);

const selectPage = (pageNumber: number): void => {
  if (
    pageNumber < pageNumbers.value[0] ||
    pageNumber > pageNumbers.value[pageNumbers.value.length - 1]
  ) {
    return;
  }

  page.value.number = pageNumber - 1;
  pageNumbers.value = getPageNumbers(pageNumber);
  emits("request:Page", pageNumber);
};

const getPageNumbers = (pageNumber: number): number[] => {
  const numbers = [];
  const start = Math.max(
    1,
    Math.min(pageNumber - 2, page.value.totalPages - PAGE_LIMIT + 1)
  );
  const end = Math.min(
    page.value.totalPages,
    Math.max(pageNumber + 2, start + PAGE_LIMIT - 1)
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
    <img
      alt="prev-page"
      src="@/assets/icon/direction/left_icon.png"
      @click="selectPage(page.number - 1)"
    />
    <div class="pagination-numbers-container">
      <div
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        class="pagination"
        @click="selectPage(pageNumber)"
      >
        <span :class="['page', { active: pageNumber === page.number + 1 }]">
          {{ pageNumber }}
        </span>
      </div>
    </div>
    <img
      alt="prev-page"
      src="@/assets/icon/direction/right_icon.png"
      @click="selectPage(page.number + 1)"
    />
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
