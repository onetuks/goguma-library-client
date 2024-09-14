<script lang="ts" setup>
import { Review, ReviewApis } from "@/api/ReviewApis";
import ReviewFeedCard from "@/pages/review/feed/views/ReviewFeedCard.vue";
import ReviewFeedSortButton from "@/pages/review/feed/views/ReviewFeedSortButton.vue";
import { onMounted, ref } from "vue";
import { emptyPage } from "@/types/Page";
import { SortType } from "@/types/SortType";
import { Slice } from "@/types/Slice";
import WarningPage from "@/pages/error/WarningPage.vue";

onMounted(() => {
  fetchReviews();

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && isLoadableMore()) {
      fetchReviews();
    }
  });

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

const isFetching = ref<boolean>(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);
const reviewPage = ref<Slice<Review>>(emptyPage());
const reviews = ref<Review[]>([]);
const sortType = ref<SortType>("LATEST");

const isLoadableMore = (): boolean => {
  return reviewPage.value.number < reviewPage.value.totalPages;
};

const changeSortType = (newSortType: SortType): void => {
  sortType.value = newSortType;
  fetchReviews();
};

const fetchReviews = async (): Promise<void> => {
  if (isFetching.value) {
    return;
  }
  isFetching.value = true;

  await ReviewApis.getReviews(sortType.value)
    .then((response) => {
      reviewPage.value = response as Slice<Review>;
      reviewPage.value.content.forEach((review) => reviews.value.push(review));
    })
    .catch((error) => console.error("FeedPage.fetchReviews", error))
    .finally(() => {
      if (isLoadableMore()) {
        isFetching.value = false;
      }
    });
};

fetchReviews();
</script>

<template>
  <div class="feed-page">
    <ReviewFeedSortButton
      :sortType="sortType"
      @update:SortType="changeSortType"
    />
    <div class="feed-cards">
      <WarningPage
        v-if="reviewPage.totalElements < 1"
        :is-visible-button="false"
      />
      <ReviewFeedCard
        v-for="(review, index) in reviewPage.content"
        v-else
        :key="index"
        :review="review"
      />
    </div>
    <div ref="loadMoreTrigger" class="loading-indicator" />
  </div>
</template>

<style scoped>
.feed-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.feed-cards {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 20px;
}

.loading-indicator {
  padding: 20px;
}
</style>
