<script setup lang="ts">
import { CategoryMap, CategoryType } from "@/types/Category";
import { ref, watch } from "vue";
import { Book } from "@/api/BookApis";

const props = defineProps<{
  book: Book;
}>();

const categoryNames = ref<string[]>([]);

watch(
  () => props.book,
  () => {
    fetchBookData();
  }
);

const fetchBookData = () => {
  categoryNames.value = props.book.categories.map(
    (categoryType: CategoryType) => {
      const categoryName = CategoryMap.get(categoryType);
      if (categoryName) {
        return categoryName;
      }
      return "";
    }
  );
};

const getCategoryNameText = (categoryNames: string[]) => {
  return categoryNames.join(", ");
};
</script>

<template>
  <div class="book-detail-categories-container">
    <div class="book-detail-category">독립출판물</div>
    <img
      src="@/assets/icon/direction/right_icon.png"
      alt="right_icon"
      class="book-detail-categories-image"
    />
    <div class="book-detail-category">
      {{ getCategoryNameText(categoryNames) }}
    </div>
    <img
      src="@/assets/icon/direction/right_icon.png"
      alt="right_icon"
      class="book-detail-categories-image"
    />
    <div class="book-detail-category">{{ props.book.title }}</div>
  </div>
</template>

<style scoped>
.book-detail-categories-container {
  width: 100%;
  height: 38px;
  padding: 0 15px;
  font-family: var(--font-family-regular), sans-serif;
  font-size: 12px;
  color: var(--text-primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-primary);
}

.book-detail-categories-image {
  width: 38px;
  height: 38px;
}

.book-detail-category {
  font-family: var(--font-family-regular), sans-serif;
}
</style>
