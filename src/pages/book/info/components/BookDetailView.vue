<script setup lang="ts">
import BookCategoryBar from "@/components/bar/BookCategoryBar.vue";
import { Book } from "@/api/BookApis";
import BookPickButton from "@/components/button/BookPickButton.vue";
import { ref } from "vue";

const props = defineProps<{
  book: Book;
}>();

const isIntroductionExpanded = ref<boolean>(false);

const handleCoverImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/error/error-icon.png");
};

const toggleIntroductionSpread = () => {
  isIntroductionExpanded.value = !isIntroductionExpanded.value;
};
</script>

<template>
  <div class="book-detail-container">
    <div class="book-detail-container-background" />
    <BookCategoryBar :categories="props.book.categories" />
    <img
      :src="props.book.coverImageUrl"
      :alt="props.book.title"
      class="book-detail-cover-image"
      @error="handleCoverImageError"
    />
    <BookPickButton v-if="book.bookId" :book-id="book.bookId" />
    <div class="book-detail-title">{{ props.book.title }}</div>
    <div class="book-detail-author-name">{{ props.book.authorName }}</div>
    <div
      class="book-detail-introduction"
      :class="{ expanded: isIntroductionExpanded }"
    >
      {{ props.book.introduction }}
    </div>
    <button
      class="book-detail-introduction-button"
      @click="toggleIntroductionSpread"
    >
      {{ isIntroductionExpanded ? "접기" : "더보기" }}
    </button>
  </div>
</template>

<style scoped>
.book-detail-container {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 25px;
}

.book-detail-container-background {
  width: 100%;
  height: 150px;
  background-color: var(--border-primary);
  position: absolute;
  top: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.12);
}

.book-detail-cover-image {
  width: auto;
  max-width: 200px;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  margin-top: 38px;
}

.book-detail-title {
  font-size: 24px;
  font-family: var(--font-family-extra-bold), sans-serif;
  color: var(--text-fourth);
  padding: 0 15px;
}

.book-detail-author-name {
  font-size: 16px;
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-fourth);
  padding: 0 15px;
}

.book-detail-introduction {
  font-size: 14px;
  font-family: var(--font-family-regular), sans-serif;
  color: var(--text-fourth);
  padding: 0 15px;
  max-height: 150px;
  overflow: hidden;
  transition: max-height 0.4s ease, background 0.5s ease;
  position: relative;
}

.book-detail-introduction::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.book-detail-introduction.expanded {
  max-height: 5000px;
}

.book-detail-introduction.expanded::after {
  opacity: 0;
  height: 0;
}

.book-detail-introduction-button {
  width: 130px;
  height: 30px;
  background-color: white;
  border: 1px solid var(--button-secondary);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 14px;
  transition: background-color 0.5s ease;
}

.book-detail-introduction-button:active {
  background-color: var(--surface-sixth);
}

.book-detail-introduction-button:hover {
  background-color: var(--surface-sixth);
  cursor: pointer;
}
</style>
