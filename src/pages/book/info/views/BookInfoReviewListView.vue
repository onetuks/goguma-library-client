<script lang="ts" setup>
import { Book } from "@/api/BookApis";
import SortSelect from "@/components/select/SortSelect.vue";
import { SortType } from "@/types/SortType";
import { ref, watch } from "vue";
import { Review, ReviewApis } from "@/api/ReviewApis";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";
import router from "@/router";
import ShowMoreButton from "@/components/button/ShowMoreButton.vue";

const props = defineProps<{
  book: Book;
}>();

const sortType = ref<SortType>("LATEST");
const reviews = ref<Review[]>([]);

watch(
  () => props.book.bookId,
  () => {
    fetchReviewsOfBook();
  }
);

const selectSortType = (sortType: SortType): void => {
  sortType.value = sortType;
  fetchReviewsOfBook();
};

const moveToReviewListPage = (): void => {
  router.push({
    path: "/reviews",
    query: {
      "book-id": String(props.book.bookId),
    },
  });
};

const fetchReviewsOfBook = async () => {
  if (props.book.bookId) {
    ReviewApis.getReviewsOfBook(props.book.bookId, sortType.value).then(
      (response) => {
        reviews.value = response.content;
      }
    );
  }
};

fetchReviewsOfBook();
</script>

<template>
  <div class="book-detail-review-container">
    <SortSelect @select:SortType="selectSortType" />
    <div class="review-preview-list-container">
      <div v-if="reviews.length === 0" style="color: var(--text-tertiary)">
        등록된 서평이 없습니다
      </div>
      <ReviewPreviewCard
        v-for="review in reviews"
        v-else
        :key="review.reviewId"
        :book="book"
        :review="review"
      />
    </div>
    <ShowMoreButton @move:ToShowMorePage="moveToReviewListPage" />
  </div>
</template>

<style scoped>
.book-detail-review-container {
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px 30px 15px;
}

.review-preview-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 15px 0;
  box-sizing: border-box;
}
</style>
