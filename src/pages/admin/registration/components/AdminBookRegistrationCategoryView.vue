<script lang="ts" setup>
import { ref, watch } from "vue";
import { CategoryMap, CategoryType } from "@/types/Category";
import CheckBoxButton from "@/components/button/CheckBoxButton.vue";

const props = defineProps<{
  initialCategories: CategoryType[];
}>();

const emits = defineEmits<{
  (event: "update:categories", value: CategoryType[]): void;
}>();

const selectedCategories = ref<CategoryType[]>([...props.initialCategories]);

watch(selectedCategories, (newCategories) => {
  emits("update:categories", newCategories);
});

const isSelectable = (category: CategoryType): boolean => {
  const isUnderLimit = selectedCategories.value.length < 3;
  const isSelected = selectedCategories.value.includes(category);
  return isUnderLimit || isSelected;
};

const toggleCategorySelection = (category: CategoryType, checked: boolean) => {
  if (checked) {
    pushCategory(category);
  } else {
    popCategory(category);
  }
};

function pushCategory(category: CategoryType) {
  if (category === "ALL") {
    selectedCategories.value = ["ALL"];
  } else {
    if (selectedCategories.value.length < 3) {
      selectedCategories.value.push(category);
      selectedCategories.value = selectedCategories.value.filter(
        (selectedCategory) => selectedCategory !== "ALL"
      );
    }
  }
}

function popCategory(category: CategoryType) {
  selectedCategories.value = selectedCategories.value.filter(
    (selectedCategory) => selectedCategory !== category
  );

  if (selectedCategories.value.length === 0) {
    selectedCategories.value.push("ALL");
  }
}
</script>

<template>
  <div class="category-header">
    <div class="form-title">도서 카테고리</div>
    <div class="form-notice">*최대 3개까지 선택 가능</div>
  </div>

  <div class="category-container">
    <div class="category-checkboxes">
      <CheckBoxButton
        v-for="([categoryType, categoryName], index) in CategoryMap.entries()"
        :key="index"
        :id="`category-${index}`"
        :checked="selectedCategories.includes(categoryType)"
        :disabled="!isSelectable(categoryType)"
        @update:checked="
          (checked) => toggleCategorySelection(categoryType, checked)
        "
      >
        {{ categoryName }}
      </CheckBoxButton>
    </div>
  </div>
</template>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.form-title {
  font-family: var(--font-family-regular), sans-serif;
  font-size: 16px;
  font-weight: bold;
}

.form-notice {
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
}

.category-container {
  padding: 10px;
  border: 1px solid var(--border-primary);
  border-radius: 10px;
}

.category-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
}
</style>
