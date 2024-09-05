<script setup lang="ts">
import ReviewPickButton from "@/components/button/ReviewPickButton.vue";
import { Book, BookApis } from "@/api/BookApis";
import { Review } from "@/api/ReviewApis";
import { ref } from "vue";
import ReviewDetailMemberInfoView from "@/pages/review/detail/views/ReviewDetailMemberInfoView.vue";
import { formatDate } from "@/util/DateUtil";

const props = defineProps<{
  review: Review;
}>();

const book = ref<Book>();

const fetchBook = async (): Promise<void> => {
  await BookApis.getBook(props.review.bookId)
    .then((response) => (book.value = response as Book))
    .catch((error) => console.error("ReviewFeedCard.fetchBook", error));
};

fetchBook();
</script>

<template>
  <div class="review-detail-page-container" v-if="book && review">
    <img
      :src="book.coverImageUrl"
      :alt="book.title"
      class="review-detail-cover-image"
    />
    <div class="review-detail-container">
      <div class="review-detail-sub-info-container">
        <ReviewDetailMemberInfoView :member-id="review.memberId" />
        <ReviewPickButton :review-id="review.reviewId" />
      </div>
      <div class="review-detail-title">{{ book.title }}</div>
      <div class="review-detail-content">{{ review.reviewTitle }}</div>
      <div class="review-detail-update-date">
        {{ formatDate(review.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-detail-page-container {
  width: 360px;
  height: 532px;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.review-detail-cover-image {
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  object-fit: cover;
}

.review-detail-sub-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-detail-container {
  position: absolute;
  width: 100%;
  padding: 5px 15px;
  bottom: 0;
  border-radius: 5px;
  background: linear-gradient(
    to top,
    var(--background-primary) 0%,
    var(--background-primary) 50%,
    transparent 120%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  text-align: left;
  box-sizing: border-box;
}

.review-detail-title {
  font-size: 31px;
  font-family: var(--font-family-extra-bold), sans-serif;
  color: var(--text-tertiary);
  text-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}

.review-detail-update-date {
  font-size: 12px;
  color: var(--text-fifth);
}

.review-detail-content {
  margin-bottom: 80px;
}
</style>
