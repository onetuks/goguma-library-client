<script setup lang="ts">
import { Review } from "@/types/Review";
import { Book } from "@/types/Book";

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
        <div class="author">{{ book.authorName }}</div>
      </div>
      <div class="review-title">{{ review.reviewTitle }}</div>
      <div class="review-content">{{ review.reviewContent }}</div>
    </div>
  </div>
</template>

<style scoped>
.review-preview {
  width: 360px;
  height: 140px;
  display: flex;
  align-items: center;
  font-family: "NanumSquare", sans-serif;
  background-color: var(--surface-tertiary);
  border: 2px solid var(--border-primary);
  border-radius: 5px;
  padding: 10px;
}

.image-container {
  width: 80px;
}

.book-cover {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.info-container {
  margin-left: 10px;
  flex: 1;
}

.title-author-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 20px;
  margin-bottom: 5px;
}

.title {
  color: var(--text-fourth);
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: bold;
}

.author {
  color: var(--text-fourth);
  text-align: right;
  width: 80px;
  font-size: 14px;
}

.review-title {
  display: flex;
  width: 250px;
  height: 16px;
  color: var(--text-fourth);
  margin-bottom: 5px;
  font-size: 14px;
}

.review-content {
  display: flex;
  width: 250px;
  height: 64px;
  color: var(--text-fourth);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}
</style>
