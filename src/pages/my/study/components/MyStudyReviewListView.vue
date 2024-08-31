<script setup lang="ts">
import { ref } from "vue";
import { Review, ReviewApis } from "@/api/ReviewApis";
import { Page } from "@/types/Page";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";
import router from "@/router";
import { Book, BookApis } from "@/api/BookApis";
import MyStudyTitleView from "@/pages/my/study/components/MyStudyTitleView.vue";
import ShowMoreButton from "@/components/button/ShowMoreButton.vue";
import AddMoreButton from "@/components/button/AddMoreButton.vue";
import WarningPage from "@/pages/error/WarningPage.vue";

const props = defineProps<{
  memberId: number;
}>();

const reviewBookMap = ref<Map<Review, Book>>(new Map());

const moveToReviewListPage = (): void => {
  router.push("/reviews/my");
};

const moveToBookSearchPage = (): void => {
  router.push("/books/search");
};

const fetchMyReviews = async (): Promise<void> => {
  await ReviewApis.getReviewsOfMember(props.memberId, "LATEST")
    .then((response) => {
      const reviews: Review[] = (response as Page<Review>).content;
      reviews.forEach(async (review) => {
        await BookApis.getBook(review.bookId)
          .then((response) => reviewBookMap.value.set(review, response as Book))
          .catch((error) =>
            console.error("MyStudyReviewListView.fetchMyReviews", error)
          );
      });
    })
    .catch((error) =>
      console.error("MyStudyReviewListView.fetchMyReviews", error)
    );
};

fetchMyReviews();
</script>

<template>
  <div class="my-study-review-list-container">
    <MyStudyTitleView title="작성한 서평" />
    <div class="review-preview-list-container">
      <WarningPage v-if="reviewBookMap.size === 0" :is-visible-button="false" />
      <ReviewPreviewCard
        :review="review"
        :book="book"
        v-for="([review, book], index) in reviewBookMap.entries()"
        :key="index"
        v-else
      />
    </div>
    <ShowMoreButton
      v-if="reviewBookMap.size > 0"
      @move:ToShowMorePage="moveToReviewListPage"
    />
    <AddMoreButton
      v-else
      action="서평 남길 도서 찾기"
      @move:ToAddMorePage="moveToBookSearchPage"
    />
  </div>
</template>

<style scoped>
.my-study-review-list-container {
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
