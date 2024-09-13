<script lang="ts" setup>
import MyStudyTitleView from "@/pages/study/views/StudyTitleView.vue";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";
import ShowMoreButton from "@/components/button/ShowMoreButton.vue";
import router from "@/router";
import { ref } from "vue";
import { Book, BookApis } from "@/api/BookApis";
import { Review } from "@/api/ReviewApis";
import { ReviewPickApis } from "@/api/ReviewPickApis";
import { Page } from "@/types/Page";
import AddMoreButton from "@/components/button/AddMoreButton.vue";
import WarningPage from "@/pages/error/WarningPage.vue";

const reviewBookMap = ref<Map<Review, Book>>(new Map<Review, Book>());

const moveToReviewPickListPage = (): void => {
  router.push("/reviews/picks");
};

const moveToReviewListPage = (): void => {
  router.push("/reviews/");
};

const fetchPickedReviewBookMap = async (): Promise<void> => {
  await ReviewPickApis.getMyReviewPicks()
    .then((response) => {
      const reviews: Review[] = (response as Page<Review>).content;
      reviews.map(async (review) => {
        await BookApis.getBook(review.bookId)
          .then((response) => {
            reviewBookMap.value.set(review, response as Book);
          })
          .catch((error) =>
            console.error(
              "MyStudyReviewPickListView.fetchPickedReviewBookMap",
              error
            )
          );
      });
    })
    .catch((error) =>
      console.error("MyStudyReviewPickListView.fetchPickedReviewBookMap", error)
    );
};

fetchPickedReviewBookMap();
</script>

<template>
  <div class="my-study-review-pick-list-container">
    <MyStudyTitleView title="서평 Pick" />
    <div class="review-preview-list-container">
      <WarningPage v-if="reviewBookMap.size === 0" :is-visible-button="false" />
      <ReviewPreviewCard
        v-for="([review, book], index) in reviewBookMap.entries()"
        v-else
        :key="index"
        :book="book"
        :review="review"
      />
    </div>
    <ShowMoreButton
      v-if="reviewBookMap.size > 0"
      @move:ToShowMorePage="moveToReviewPickListPage"
    />
    <AddMoreButton
      v-else
      action="픽할 서평 찾기"
      @move:ToAddMorePage="moveToReviewListPage"
    />
  </div>
</template>

<style scoped>
.my-study-review-pick-list-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 15px;
  background-color: var(--background-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.review-preview-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-sizing: border-box;
}
</style>
