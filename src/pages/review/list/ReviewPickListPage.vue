<script lang="ts" setup>
import SortSelect from "@/components/select/SortSelect.vue";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";
import { ref } from "vue";
import { Book, BookApis } from "@/api/BookApis";
import { Review, ReviewApis } from "@/api/ReviewApis";
import { emptyPage, Page } from "@/types/Page";
import { ReviewPickApis } from "@/api/ReviewPickApis";
import { SortType } from "@/types/SortType";
import WarningPage from "@/pages/error/WarningPage.vue";

const reviews = ref<Page<Review>>(emptyPage());
const reviewBookMap = ref<Map<Review, Book>>(new Map());
const sortType = ref<SortType>("LATEST");

const emptyReviewPicks = (): boolean => {
  return reviews.value.content.length === 0;
};

const selectSortType = (type: SortType) => {
  sortType.value = type;
  fetchReviewPicks();
};

const fetchBook = async (bookId: number): Promise<Book> => {
  return await BookApis.getBook(bookId)
    .then((response) => response as Book)
    .catch((error) => {
      throw error;
    });
};

const fetchReviews = async (reviewIds: number[]): Promise<void> => {
  for (const reviewId of reviewIds) {
    await ReviewApis.getReview(reviewId)
      .then(async (response) => {
        reviewBookMap.value.clear();
        const review = response as Review;
        const book = fetchBook(review.bookId);
        reviewBookMap.value.set(review, await book.then((data) => data));
      })
      .catch((error) => {
        throw error;
      });
  }
};

const fetchReviewPicks = async (): Promise<void> => {
  await ReviewPickApis.getMyReviewPicks(
    reviews.value.number,
    reviews.value.size
  )
    .then((response) => {
      reviews.value = response as Page<Review>;
      fetchReviews(
        reviews.value.content.map((reviewPick) => reviewPick.reviewId)
      );
    })
    .catch((error) => {
      console.error("PickedReviewListPage fetchReviewPicks error", error);
    });
};

fetchReviewPicks();
</script>

<template>
  <div class="review-list-page-container">
    <SortSelect @select:SortType="selectSortType" />
    <div class="review-list-container">
      <ReviewPreviewCard
        v-for="([review, book], index) in reviewBookMap"
        :key="index"
        :book="book"
        :review="review"
      />
      <WarningPage v-if="emptyReviewPicks()" :is-visible-button="true" />
    </div>
    <PaginationBar :page-info="reviews" />
  </div>
</template>

<style scoped>
.review-list-page-container {
  width: 100%;
}

.review-list-container {
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}
</style>
