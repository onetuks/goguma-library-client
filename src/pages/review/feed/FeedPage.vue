<script setup lang="ts">
import { Review, ReviewApis } from "@/api/ReviewApis";
import FeedCard from "@/components/card/BookFeedCard.vue";
import SortRecentBestButton from "@/components/select/SortRecentBestButton.vue";
import { ref, onMounted } from "vue";
import { emptyPage, Page } from "@/types/Page";
import { SortType } from "@/types/SortType";
import { buildPageQueryWithSort } from "@/types/Page";
import { get } from "@/api/ServerRequest";

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchReviews();
});

const reviewPage = ref<Page<Review>>(emptyPage());
const reviews = ref<Review[]>([]);
const sortType = ref<SortType>("LATEST");

const fetchReviews = async (): Promise<void> => {
  try {
    let queryString = buildPageQueryWithSort(
      sortType.value,
      reviewPage.value.number !== undefined ? reviewPage.value.number + 1 : 0,
      reviewPage.value.size
    );
    const url = `${ReviewApis.URI_PREFIX}${queryString}`;
    const responses = await get(url);
    if (responses.responses && responses.responses.content) {
      const data = responses.responses as Page<Review>;
      if (Array.isArray(data.content) && data.content.length > 0) {
        reviewPage.value = data;
        reviews.value = [...reviews.value, ...data.content];
      } else {
        console.log("현재 새 서평이 없습니다.");
      }
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error(
      "리뷰 조회 중 오류 발생:",
      error.message || JSON.stringify(error, null, 2)
    );
  }
};

function handleScroll() {
  const bottomOffset = 10;
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - bottomOffset
  ) {
    if (reviewPage.value.number !== undefined) {
      reviewPage.value.number += 1;
      fetchReviews();
    }
  }
}

fetchReviews();
</script>

<template>
  <div class="feed-page">
    <SortRecentBestButton :sortType="sortType" />

    <div class="feed-cards">
      <FeedCard
        v-for="(review, index) in reviews"
        :key="index"
        :username="review.nickname"
        :title="review.reviewTitle"
        :content="review.reviewContent"
        :date="review.updatedAt"
        :initialLikes="review.pickCount"
      />
    </div>
  </div>
</template>

<style scoped>
.feed-page {
  color: var(--text-secondary);
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 60px;
  overflow-y: hidden;
  height: auto;
}

.feed-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}
</style>
