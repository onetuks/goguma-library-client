<script setup lang="ts">
import { Review } from "@/api/ReviewApis";
import { Page } from "@/types/Page";
import { prop } from "vue-class-component";

const props = defineProps<{
  reviews: Page<Review>;
}>();

const emits = defineEmits<{
  (event: "fetch:RecommendedReviews", pageNumber: number): void;
}>();

const fetchRecommendedReviews = (pageNumber: number): void => {
  if (pageNumber > 0 && pageNumber <= props.reviews.totalPages) {
    emits("fetch:RecommendedReviews", pageNumber);
  }
};
</script>

<template>
  <div class="review-recommend-title-container">
    <div class="review-recommend-title">추천 서평</div>
    <div class="review-recommend-page-container">
      <div
        class="review-recommend-page-direction"
        @click="fetchRecommendedReviews(reviews.number - 1)"
      >
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.878906 8.53039L8.87891 16.5304L9.93957 15.4697L3.00023 8.53039L10.0002 1.53039L8.93957 0.469727L0.878906 8.53039Z"
            fill="#E1DDCB"
          />
        </svg>
      </div>
      <div
        class="review-recommend-page-number"
        style="color: var(--text-fourth)"
      >
        {{ reviews.number }}
      </div>
      <div class="review-recommend-page-number">/</div>
      <div class="review-recommend-page-number">{{ reviews.totalPages }}</div>
      <div
        class="review-recommend-page-direction"
        @click="fetchRecommendedReviews(reviews.number + 1)"
      >
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.12109 8.46961L1.1211 0.469613L0.0604357 1.53027L6.99978 8.46961L-0.000225928 15.4696L1.06043 16.5303L9.12109 8.46961Z"
            fill="#E1DDCB"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-recommend-title-container {
  width: 100%;
  border: 1px solid var(--border-primary);
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  background-color: var(--background-primary);
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
}

.review-recommend-title {
  color: var(--text-tertiary);
  font-size: 24px;
  font-family: var(--font-family-bold), sans-serif;
}

.review-recommend-page-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
}

.review-recommend-page-direction {
  width: 20px;
  height: 20px;
}

.review-recommend-page-number {
  color: var(--text-fifth);
}
</style>
