<script lang="ts" setup>
import { Book } from "@/api/BookApis";
import router from "@/router";
import { onMounted, ref } from "vue";
import { sleep } from "@/util/SleeperUtil";

const props = defineProps<{
  book: Book;
}>();

const visible = ref<boolean>(false);

onMounted(async () => {
  await sleep(100);
  visible.value = true;
});

const moveToBookInfoPage = (): void => {
  router.push(`/books/${props.book.bookId}/info`);
};

const handleError = (event: Event): void => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/book/default-cover.png");
};
</script>

<template>
  <div
    :class="{ visible: visible }"
    class="search-result-item"
    @click="moveToBookInfoPage"
  >
    <img
      :src="book.coverImageUrl"
      alt="Book Cover"
      class="book-cover"
      @error="handleError"
    />
    <div class="book-info">
      <div class="book-title">{{ book.title }}</div>
      <div class="book-author">{{ book.authorName }}</div>
    </div>
  </div>
</template>

<style scoped>
.search-result-item {
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 5px solid var(--border-secondary);
  opacity: 0;
  transition: background-color 0.6s ease, opacity 1s ease;
}

.visible {
  opacity: 1;
}

.search-result-item:hover {
  background-color: var(--surface-fourth);
}

.search-result-item:active {
  background-color: var(--surface-sixth);
}

.book-cover {
  width: 70px;
  object-fit: fill;
  border-radius: 5px;
}

.book-info {
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  text-align: left;
}

.book-title {
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-tertiary);
  font-size: 20px;
}

.book-author {
  font-family: var(--font-family-regular), sans-serif;
  color: var(--text-tertiary);
  font-size: 14px;
  margin-top: 12px;
}
</style>
