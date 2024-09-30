<script lang="ts" setup>
import ReviewPickButton from "@/components/button/ReviewPickButton.vue";
import { Book, BookApis } from "@/api/BookApis";
import { Review } from "@/api/ReviewApis";
import { ref } from "vue";
import ReviewDetailMemberInfoView from "@/pages/review/detail/views/ReviewDetailMemberInfoView.vue";
import { formatDateWithDot } from "@/util/DateUtil";
import router from "@/router";

const props = defineProps<{
  review: Review;
}>();

const book = ref<Book>();

const moveToReviewDetailPage = (): void => {
  router.push(`/reviews/${props.review.reviewId}`);
};

const fetchBook = async (): Promise<void> => {
  await BookApis.getBook(props.review.bookId)
    .then((response) => (book.value = response as Book))
    .catch((error) => console.error("ReviewFeedCard.fetchBook", error));
};

fetchBook();
</script>

<template>
  <div
    v-if="book && review"
    class="review-detail-page-container"
    @click="moveToReviewDetailPage"
  >
    <img
      :alt="book.title"
      :src="book.coverImageUrl"
      class="review-detail-cover-image"
    />
    <div class="review-detail-container">
      <div class="review-detail-sub-info-container" @click.stop>
        <ReviewDetailMemberInfoView :member-id="review.memberId" />
        <ReviewPickButton :review-id="review.reviewId" />
      </div>
      <div class="review-detail-title">{{ book.title }}</div>
      <div class="review-detail-content">{{ review.reviewTitle }}</div>
      <div class="review-detail-update-date">
        {{ formatDateWithDot(review.updatedAt) }}
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
  transition: width 0.6s ease, height 0.6s ease;
}

.review-detail-page-container:hover {
  width: 365px;
  height: 536px;
}

.review-detail-page-container:active {
  width: 370px;
  height: 540px;
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
  white-space: pre-wrap;
}
</style>
