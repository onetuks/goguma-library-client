<script setup lang="ts">
import { CategoryMap, CategoryType } from "@/types/Category";
import { ref, watch } from "vue";

const props = defineProps<{
  categories: CategoryType[];
}>();

const categoryNames = ref<string[]>([]);

watch(
  () => props.categories,
  () => {
    fetchCategoryNames();
  }
);

const fetchCategoryNames = () => {
  categoryNames.value = props.categories.map((categoryType: CategoryType) => {
    const categoryName = CategoryMap.get(categoryType);
    if (categoryName) {
      return categoryName;
    }
    return "";
  });
};

const getCategoryNameText = (categoryNames: string[]) => {
  return categoryNames.join(", ");
};

fetchCategoryNames();
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
  </div>
</template>

<style scoped>
.book-detail-categories-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 38px;
  padding: 0 15px;
  font-family: var(--font-family-regular), sans-serif;
  font-size: 12px;
  color: var(--text-primary);
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  box-sizing: border-box;
}

.book-detail-categories-image {
  width: 38px;
  height: 38px;
}
</style>
