<script setup lang="ts">
import { Book } from "@/api/BookApis";
import router from "@/router";

const props = defineProps<{
  book: Book;
}>();

const moveToBookInfoPage = (): void => {
  router.push(`/books/${props.book.bookId}/info`);
};

const handleError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/book/default-cover.png");
};
</script>

<template>
  <div class="book-pick-preview-card-container" @click="moveToBookInfoPage">
    <div class="book-pick-preview-image-container">
      <img
        :src="book.coverImageUrl"
        :alt="book.title"
        class="book-pick-preview-image"
        @error="handleError"
      />
    </div>
    <div class="book-pick-preview-title">{{ book.title }}</div>
    <div class="book-pick-preview-author">{{ book.authorName }}</div>
  </div>
</template>

<style scoped>
.book-pick-preview-card-container {
  width: 200px;
  height: 254px;
  display: inline-flex;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-between;
  gap: 7px;
  text-align: left;
  color: var(--text-fourth);
  transition: background-color 0.3s ease;
  padding-bottom: 8px;
}

.book-pick-preview-card-container:hover {
  background-color: var(--surface-fourth);
}

.book-pick-preview-card-container:active {
  background-color: var(--surface-sixth);
}

.book-pick-preview-image-container {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface-fifth);
  border-radius: 20px;
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.2);
}

.book-pick-preview-image {
  height: 170px;
  object-fit: fill;
  border-radius: 8px;
}

.book-pick-preview-title {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
  font-size: 14px;
}

.book-pick-preview-author {
  padding: 0 10px;
  font-size: 12px;
}
</style>
