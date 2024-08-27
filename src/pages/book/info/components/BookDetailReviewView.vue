<script setup lang="ts">
import { Book } from "@/api/BookApis";
import SortSelect from "@/components/select/SortSelect.vue";
import { SortType } from "@/types/SortType";
import { ref, watch } from "vue";
import { Review, ReviewApis } from "@/api/ReviewApis";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";

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
  // todo : review list page로 이동
  console.log("moveToReviewListPAge");
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
        :review="review"
        :book="book"
        v-for="review in reviews"
        :key="review.reviewId"
        v-else
      />
    </div>
    <button class="review-preview-list-button" @click="moveToReviewListPage">
      더보기
      <svg
        width="11"
        height="18"
        viewBox="0 0 11 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.04529 8.86355L1.21202 2.03027L2.06055 1.18174L9.84842 8.96961L1.99989 16.8181L1.15136 15.9696L8.04529 9.07568L8.15136 8.96961L8.04529 8.86355Z"
          fill="#E1DDCB"
          stroke="#FEFDF6"
          stroke-width="0.3"
        />
      </svg>
    </button>
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

.review-preview-list-button {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface-fifth);
  border: 1px solid var(--border-primary);
  border-radius: 5px;
  color: var(--text-fourth);
  font-size: 14px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.review-preview-list-button:hover {
  box-shadow: none;
}

.review-preview-list-button:active {
  box-shadow: none;
}
</style>
