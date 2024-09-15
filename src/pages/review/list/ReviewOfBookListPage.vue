<script lang="ts" setup>
import SortSelect from "@/components/select/SortSelect.vue";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";
import WarningPage from "@/pages/error/WarningPage.vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";
import { SortType } from "@/types/SortType";
import { ref } from "vue";
import { Book, BookApis, initBook } from "@/api/BookApis";
import { Review, ReviewApis } from "@/api/ReviewApis";
import { emptyPage, Page } from "@/types/Page";
import { useRoute } from "vue-router";

const route = useRoute();

const sortType = ref<SortType>("LATEST");
const book = ref<Book>(initBook());
const reviews = ref<Page<Review>>(emptyPage());

const emptyReviews = (): boolean => {
  return reviews.value.content.length === 0;
};

const selectSortType = (type: SortType): void => {
  sortType.value = type;
  if (book.value?.bookId) {
    fetchReviewsOfBook(book.value.bookId);
  }
};

const fetchReviewsOfBook = async (bookId: number): Promise<void> => {
  await ReviewApis.getReviewsOfBook(
    bookId,
    sortType.value,
    reviews.value.number,
    reviews.value.size
  )
    .then((response) => {
      reviews.value = response as Page<Review>;
    })
    .catch((error) => {
      console.error("ReviewOfBookListPage fetchReviewsOfBook", error);
    });
};

const fetchBook = async (): Promise<void> => {
  const bookId = Number(route.query["book-id"]);
  await BookApis.getBook(bookId)
    .then((response) => {
      book.value = { ...response } as Book;
      if (book.value?.bookId) {
        fetchReviewsOfBook(book.value.bookId);
      }
    })
    .catch((error) => {
      console.error("ReviewOfBookListPage fetchBook", error);
    });
};

fetchBook();
</script>

<template>
  <div class="review-list-page-container">
    <SortSelect @select:SortType="selectSortType" />
    <div class="review-list-container">
      <ReviewPreviewCard
        v-for="(review, index) in reviews.content"
        :key="index"
        :book="book"
        :review="review"
      />
      <WarningPage v-if="emptyReviews()" :is-visible-button="true" />
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
