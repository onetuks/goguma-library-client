<script lang="ts" setup>
import { ref } from "vue";

const emits = defineEmits<{
  (event: "search:Books", searchKeyword: string | null): void;
}>();

const searchKeyword = ref<string | null>(null);

const searchWithKeyword = (): void => {
  emits("search:Books", searchKeyword.value);
};
</script>

<template>
  <div class="search-container">
    <input
      v-model="searchKeyword"
      class="search-input"
      placeholder="도서제목/작가명/출판사"
      type="text"
    />
    <img
      alt="Search Icon"
      class="search-icon"
      src="../../assets/icon/search/search_icon.png"
      @click="searchWithKeyword"
    />
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
}

.search-input {
  width: 100%;
  height: 37px;
  border: 1px solid var(--border-primary);
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
}

.search-icon {
  width: 42px;
  height: 36px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.6s ease;
}

.search-icon:hover {
  background-color: var(--surface-fourth);
}

.search-icon:active {
  background-color: var(--surface-sixth);
}
</style>
