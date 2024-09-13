<script lang="ts" setup>
import { Book } from "@/api/BookApis";

defineProps<{
  book: Book;
}>();
</script>

<template>
  <div class="book-card-container">
    <div class="book-cover-container">
      <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
    </div>
    <div class="title">{{ book.title }}</div>
    <div class="publisher">{{ book.publisher }}</div>
  </div>
</template>

<style scoped>
.book-card-container {
  border: 1px solid var(--border-primary);
  border-radius: 20px;
  background-color: var(--surface-tertiary);
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px;
  align-items: center;
  transition: background-color 0.6s ease;
}

.book-card-container:hover {
  background-color: var(--surface-fourth);
}

.book-card-container:active {
  background-color: var(--surface-sixth);
}

.book-cover-container {
  width: 155px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-cover {
  width: auto;
  max-width: 155px;
  height: auto;
  max-height: 230px;
  object-fit: fill;
  border-radius: 10px;
}

.title {
  width: 100%;
  font-size: 16px;
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-fourth);
  margin-top: 11px;
}

.publisher {
  width: 100%;
  font-size: 14px;
  color: var(--text-primary);
  margin-top: 7px;
}
</style>
