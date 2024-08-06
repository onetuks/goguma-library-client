<script setup lang="ts">
import { Book } from "@/dto/Book";

defineProps<{
  book: Book;
}>();
</script>

<template>
  <div
    class="recommended-book"
    :style="{ backgroundImage: `url(${book.coverImageUrl})` }"
  >
    <div class="title-overlay">
      <h2 class="title">{{ book.title }}</h2>
    </div>
  </div>
</template>

<style scoped>
.recommended-book {
  position: relative;
  width: 100%;
  padding-top: 140%; /* Aspect ratio of 7:5 (height = 7, width = 5) */
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
}

.title-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14.28%; /* 1/7 of the height */
  /* background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%); todo: 그라데이션 효과는 미구현 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: var(--text-fourth);
  margin: 0;
}
</style>
