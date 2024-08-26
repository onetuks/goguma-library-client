<script setup lang="ts">
import { Book } from "@/api/BookApis";

const props = defineProps<{
  book: Book;
}>();

const handleBookCoverImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/error/error-icon.png");
};
</script>

<template>
  <div ref="containerRef" class="review-book-cover-image-container">
    <img
      :src="props.book.coverImageUrl"
      :alt="props.book.title"
      class="review-book-cover-image"
      @error="handleBookCoverImageError"
    />
  </div>
</template>

<style scoped>
.review-book-cover-image-container {
  width: 100%;
  height: auto;
  border-bottom: 1px solid var(--border-tertiary);
  background: linear-gradient(to top, var(--border-primary), transparent 50%);
}

.review-book-cover-image {
  width: auto;
  max-width: 200px;
  max-height: 300px;
  object-fit: contain;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  margin: 36px 0 54px 0;
}
</style>
