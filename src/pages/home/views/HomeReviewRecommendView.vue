<script setup lang="ts">
import { ref } from "vue";
import { emptyPage, Page } from "@/types/Page";
import { Review, ReviewApis } from "@/api/ReviewApis";
import HomeReviewRecommendTitleView from "@/pages/home/views/HomeReviewRecommendTitleView.vue";
import HomeReviewRecommendCard from "@/pages/home/views/HomeReviewRecommendCard.vue";

const reviews = ref<Page<Review>>(emptyPage());

const fetchRecommendedReviews = async (pageNumber: number): Promise<void> => {
  await ReviewApis.getRecommendedReviews(pageNumber)
    .then((response) => (reviews.value = response as Page<Review>))
    .catch((error) =>
      console.error("HomeReviewRecommendView.fetchRecommendedReviews", error)
    );
};

fetchRecommendedReviews(reviews.value.number);
</script>

<template>
  <div class="review-recommend-container">
    <HomeReviewRecommendTitleView
      :reviews="reviews"
      @fetch:RecommendedReviews="fetchRecommendedReviews"
    />
    <div class="review-recommend-list-container">
      <HomeReviewRecommendCard
        :review="review"
        v-for="(review, index) in reviews.content"
        :key="index"
      />
    </div>
    <div class="review-recommend-notice">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9 12V4H11V12H9ZM9 14V16H11V14H9Z"
          fill="#756357"
        />
      </svg>
      <div class="review-recommend-notice-text">
        회원님의 관심 카테고리를 기반으로 추천해드리는 서평입니다
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-recommend-container {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
}

.review-recommend-list-container {
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.review-recommend-notice {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 20px;
  border: 1px solid var(--border-primary);
  padding: 11px 15px;
  box-sizing: border-box;
}

.review-recommend-notice-text {
  color: var(--text-primary);
  font-size: 12px;
  margin-left: 10px;
}
</style>
