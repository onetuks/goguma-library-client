<script setup lang="ts">
import SortSelect from "@/components/select/SortSelect.vue";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";
import WarningPage from "@/pages/error/WarningPage.vue";
import PaginationView from "@/components/bar/PaginationView.vue";
import { SortType } from "@/types/SortType";
import { ref } from "vue";
import { Book, BookApis } from "@/api/BookApis";
import { Review, ReviewApis } from "@/api/ReviewApis";
import { emptyPage, Page } from "@/types/Page";
import { useRoute } from "vue-router";
import { LOGIN_ID } from "@/types/AuthWords";

const route = useRoute();

const sortType = ref<SortType>("LATEST");
const reviews = ref<Page<Review>>(emptyPage());
const reviewBookMap = ref<Map<Review, Book>>(new Map());

const emptyReviews = (): boolean => {
  return reviews.value.content.length === 0;
};

const selectSortType = (type: SortType): void => {
  sortType.value = type;
  fetchReviews();
};

const fetchBook = async (bookId: number): Promise<Book> => {
  return await BookApis.getBook(bookId).then((response) => response as Book);
};

const fetchReviews = async (): Promise<void> => {
  const memberId = Number(localStorage.getItem(LOGIN_ID));
  await ReviewApis.getReviewsOfMember(
    memberId,
    reviews.value.number,
    reviews.value.size
  ).then((response) => {
    reviews.value = response as Page<Review>;
    reviews.value.content.forEach(async (review) => {
      const book = await fetchBook(review.bookId);
      reviewBookMap.value.set(review, book);
    });
  });
};

fetchReviews();
</script>

<template>
  <div class="review-list-page-container">
    <SortSelect @select:SortType="selectSortType" />
    <div class="review-list-container">
      <ReviewPreviewCard
        v-for="([review, book], index) in reviewBookMap"
        :review="review"
        :book="book"
        :key="index"
      />
      <WarningPage v-if="emptyReviews()" />
    </div>
    <PaginationView :page-info="reviews" />
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
