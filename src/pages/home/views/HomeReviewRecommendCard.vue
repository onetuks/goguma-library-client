<script setup lang="ts">
import { Book, BookApis } from "@/api/BookApis";
import { Review } from "@/api/ReviewApis";
import { ref } from "vue";

const props = defineProps<{
  review: Review;
}>();

const reviewedBook = ref<Book>();

const fetchReviewedBook = async (): Promise<void> => {
  await BookApis.getBook(props.review.bookId)
    .then((response) => (reviewedBook.value = response as Book))
    .catch((error) =>
      console.error("HomeReviewRecommendCard.fetchReviewedBook", error)
    );
};

fetchReviewedBook();
</script>

<template>
  <div
    class="recommended-review-card-container"
    :style="{ backgroundImage: `url(${reviewedBook?.coverImageUrl})` }"
  >
    <div class="recommended-review-info-container">
      <div class="recommended-review-book-info-container" v-if="reviewedBook">
        <div class="recommended-review-book-title">
          {{ reviewedBook.title }}
        </div>
        <div class="recommended-review-book-author">
          |&nbsp;&nbsp;{{ reviewedBook.authorName }}
        </div>
      </div>
      <div class="recommended-review-book-review-title">
        {{ review.reviewTitle }}
      </div>
      <div class="recommended-review-book-review-content">
        {{ review.reviewContent }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommended-review-card-container {
  width: 100%;
  height: 140px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  gap: 10px;
  background-color: var(--background-primary);
  border-radius: 5px;
}

.recommended-review-info-container {
  box-sizing: border-box;
  width: 100%;
  height: inherit;
  padding: 10px 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: rgba(150, 150, 150, 0.4);
}

.recommended-review-book-info-container {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.recommended-review-book-title {
  flex-grow: 5;
  flex-basis: 0;
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font-family-bold), sans-serif;
  font-size: 16px;
}

.recommended-review-book-author {
  margin-left: 5px;
  text-align: right;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
}

.recommended-review-book-review-title {
  margin: 10px 0;
  font-size: 14px;
  font-family: var(--font-family-bold), sans-serif;
}

.recommended-review-book-review-content {
  font-size: 12px;
}
</style>
