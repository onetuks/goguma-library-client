<script setup lang="ts">
import { Book } from "@/types/Book";

defineProps<{
  book: Book;
}>();
</script>

<template>
  <div class="search-result-item">
    <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
    <div class="book-info">
      <h2 class="book-title">{{ book.title }}</h2>
      <p class="book-author">{{ book.authorName }}</p>
    </div>
  </div>
</template>

<style scoped>
.search-result-item {
  display: flex;
  align-items: center;
  width: 360px;
  padding: 10px;
  background-color: var(--surface-secondary);
  border-radius: 5px;
  margin-bottom: 10px;
}

.book-cover {
  width: 70px;
  height: 105px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}

.book-info {
  flex: 1;
}

.book-title {
  font-family: "NanumSquare", sans-serif;
  font-weight: bold;
  color: var(--text-secondary);
  margin: 0;
  font-size: 16px;
}

.book-author {
  font-family: "NanumSquare", sans-serif;
  color: var(--text-secondary);
  margin: 5px 0 0;
  font-size: 14px;
}
</style>
