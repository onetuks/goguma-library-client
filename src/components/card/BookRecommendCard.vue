<script lang="ts" setup>
import { Book } from "@/api/BookApis";

const props = defineProps<{
  book: Book;
}>();
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${props.book.coverImageUrl})` }"
    class="book-recommend-card-container"
  >
    <div class="book-recommend-card-title">
      {{ book.title }}
    </div>
  </div>
</template>

<style scoped>
.book-recommend-card-container {
  width: 215px;
  height: 318px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: contain;
  background-position: center;
  opacity: 0.9;
  transition: opacity 0.6s ease, width 0.6s ease, height 0.6s ease;
}

.book-recommend-card-container:hover {
  opacity: 0.95;
  width: 220px;
  height: 320px;
}

.book-recommend-card-container:active {
  opacity: 1.5;
  width: 225px;
  height: 325px;
}

.book-recommend-card-container:hover .book-recommend-card-title {
  width: 220px;
  transition: width 0.6s ease;
}

.book-recommend-card-container:active .book-recommend-card-title {
  width: 225px;
  transition: width 0.6s ease;
}

.book-recommend-card-title {
  width: 215px;
  color: var(--text-fourth);
  font-size: 20px;
  font-family: var(--font-family-bold), sans-serif;
  padding: 11px 9px;
  background: linear-gradient(
    to top,
    var(--background-primary),
    rgba(255, 255, 255, 0.7)
  );
  border-radius: 5px;
  display: flex;
  align-items: center;
  word-break: break-word;
  word-wrap: break-word;
  white-space: normal;
  box-sizing: border-box;
}
</style>
