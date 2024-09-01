<script setup lang="ts">
import ReviewPickButton from "@/components/button/ReviewPickButton.vue";
import { Book, BookApis } from "@/api/BookApis";
import { Review, ReviewApis } from "@/api/ReviewApis";
import { ref } from "vue";
import { useRoute } from "vue-router";
import ReviewDetailMemberInfoView from "@/pages/review/detail/components/ReviewDetailMemberInfoView.vue";
import { formatDate } from "@/util/DateUtil";
import { LOGIN_ID } from "@/types/AuthWords";
import router from "@/router";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ConfirmModalInfo, initModalInfo } from "@/types/Modal";

const REVIEW_EDIT_MESSAGE = "서평을 수정합니다";

const route = useRoute();

const book = ref<Book>();
const review = ref<Review>();

const confirmModalInfo = ref<ConfirmModalInfo>(initModalInfo());

const isMyReview = (): boolean => {
  return review.value?.memberId == Number(localStorage.getItem(LOGIN_ID));
};

const showEditReviewModal = (): void => {
  confirmModalInfo.value = {
    message: REVIEW_EDIT_MESSAGE,
    buttonText: "확인",
    visible: true,
  };
};

const showRemoveReviewModal = (): void => {
  confirmModalInfo.value = {
    message: "1포인트가 차감됩니다\n서평을 삭제하시겠어요?",
    buttonText: "확인",
    visible: true,
  };
};

const closeModal = (): void => {
  if (confirmModalInfo.value.message === REVIEW_EDIT_MESSAGE) {
    router.push(`/reviews/${review.value?.reviewId}/edit`);
  } else {
    removeReview();
  }
};

const removeReview = async (): Promise<void> => {
  if (review.value) {
    await ReviewApis.deleteReview(review.value?.reviewId)
      .then(() => router.push("/reviews/my"))
      .catch((error) => console.error("ReviewDetailPage.removeReview", error));
  }
};

const fetchReview = async (): Promise<Review> => {
  const reviewId = Number(route.params.reviewId);
  return await ReviewApis.getReview(reviewId).then(
    (response) => response as Review
  );
};

const fetchBook = async (bookId: number): Promise<Book> => {
  return await BookApis.getBook(bookId).then((response) => response as Book);
};

const fetchData = async (): Promise<void> => {
  review.value = await fetchReview();
  book.value = await fetchBook(review.value.bookId);
};

fetchData();
</script>

<template>
  <div class="review-detail-page-container" v-if="book && review">
    <img
      :src="book.coverImageUrl"
      :alt="book.title"
      class="review-detail-cover-image"
    />
    <div class="review-detail-container">
      <div class="review-detail-sub-info-container">
        <ReviewDetailMemberInfoView :member-id="review.memberId" />
        <ReviewPickButton :review-id="review.reviewId" />
      </div>
      <div class="review-detail-title">{{ review.reviewTitle }}</div>
      <div class="review-detail-update-date">
        {{ formatDate(review.updatedAt) }}
      </div>
      <div class="review-detail-content">{{ review.reviewContent }}</div>

      <div class="review-detail-edit-container" v-if="isMyReview()">
        <button class="review-detail-edit-item" @click="showEditReviewModal">
          수정하기
        </button>
        <button class="review-detail-edit-item" @click="showRemoveReviewModal">
          삭제하기
        </button>
      </div>
    </div>

    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
  </div>
</template>

<style scoped>
.review-detail-page-container {
  width: 100%;
  height: auto;
  position: relative;
}

.review-detail-cover-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.review-detail-sub-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-detail-container {
  position: relative;
  width: 100%;
  padding: 5px 15px;
  top: 396px;
  border-radius: 10px;
  background: linear-gradient(
    to top,
    var(--background-primary) 0%,
    var(--background-primary) 50%,
    transparent 120%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  text-align: left;
  box-sizing: border-box;
}

.review-detail-title {
  font-size: 31px;
  font-family: var(--font-family-extra-bold), sans-serif;
  color: var(--text-tertiary);
}

.review-detail-update-date {
  font-size: 12px;
  color: var(--text-fifth);
}

.review-detail-content {
  margin-bottom: 80px;
}

.review-detail-edit-container {
  display: flex;
  flex-direction: row;
  text-align: right;
  color: var(--text-primary);
  justify-content: right;
}

.review-detail-edit-item {
  font-size: 11px;
  border: none;
  border-bottom: 1px solid var(--text-primary);
  margin-left: 4px;
  transition: font-size 0.3s ease, color 0.3s ease, border-bottom 0.3s ease;
  background-color: transparent;
}

.review-detail-edit-item:hover {
  font-size: 12px;
  color: var(--text-fourth);
  border-bottom: 1px solid var(--text-fourth);
}

.review-detail-edit-item:active {
  font-size: 12px;
  color: var(--text-tertiary);
  border-bottom: 1px solid var(--text-tertiary);
}
</style>
