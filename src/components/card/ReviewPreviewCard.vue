<script setup lang="ts">
import { Review } from "@/api/ReviewApis";
import { Book } from "@/api/BookApis";

defineProps<{
  review: Review;
  book: Book;
}>();
</script>

<template>
  <div class="review-preview">
    <div class="image-container">
      <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
    </div>
    <div class="info-container">
      <div class="title-author-container">
        <div class="title">{{ book.title }}</div>
        <div class="author">|&nbsp;&nbsp;&nbsp;&nbsp;{{ book.authorName }}</div>
      </div>
      <div class="review-title">{{ review.reviewTitle }}</div>
      <div class="review-content">{{ review.reviewContent }}</div>
    </div>
  </div>
</template>

<style scoped>
.review-preview {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  background-color: var(--surface-tertiary);
  border: 2px solid var(--border-primary);
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.image-container {
  width: 80px;
  border-radius: 5px;
}

.book-cover {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.info-container {
  padding: 0 10px;
  width: calc(100% - 90px);
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: flex-start;
  gap: 10px;
}

.title-author-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.title {
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-fourth);
  font-family: var(--font-family-bold), sans-serif;
  font-size: 14px;
  font-weight: bold;
}

.author {
  margin-left: 5px;
  color: var(--text-fourth);
  text-align: right;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
}

.review-title {
  width: 100%;
  color: var(--text-primary);
  font-family: var(--font-family-bold), sans-serif;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.review-content {
  width: 100%;
  color: var(--text-primary);
  overflow: hidden;
  font-size: 12px;
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
}
</style>
