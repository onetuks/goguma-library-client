<script lang="ts" setup>
import ReviewPickButton from "@/components/button/ReviewPickButton.vue";
import { Book, BookApis } from "@/api/BookApis";
import { Review, ReviewApis } from "@/api/ReviewApis";
import { ref } from "vue";
import { useRoute } from "vue-router";
import ReviewDetailMemberInfoView from "@/pages/review/detail/views/ReviewDetailMemberInfoView.vue";
import { formatDateWithDot } from "@/util/DateUtil";
import { LOGIN_ID } from "@/types/AuthWords";
import router from "@/router";
import {
  ConfirmCancelModalInfo,
  initConfirmCancelModalInfo,
} from "@/types/Modal";
import ConfirmCancelModal from "@/components/modal/ConfirmCancelModal.vue";

const REVIEW_EDIT_MESSAGE = "서평을 수정합니다";

const route = useRoute();

const book = ref<Book>();
const review = ref<Review>();

const confirmCancelModalInfo = ref<ConfirmCancelModalInfo>(
  initConfirmCancelModalInfo()
);

const isMyReview = (): boolean => {
  return review.value?.memberId == Number(localStorage.getItem(LOGIN_ID));
};

const showEditReviewModal = (): void => {
  confirmCancelModalInfo.value = {
    message: REVIEW_EDIT_MESSAGE,
    confirmButtonText: "수정",
    cancelButtonText: "취소",
    visible: true,
  };
};

const showRemoveReviewModal = (): void => {
  confirmCancelModalInfo.value = {
    message: "1포인트가 차감됩니다\n서평을 삭제하시겠어요?",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
    visible: true,
  };
};

const closeModal = (): void => {
  confirmCancelModalInfo.value = initConfirmCancelModalInfo();
};

const confirmModal = (): void => {
  if (confirmCancelModalInfo.value.message === REVIEW_EDIT_MESSAGE) {
    router.push(`/reviews/${review.value?.reviewId}/modification`);
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
  <div v-if="book && review" class="review-detail-page-container">
    <img
      :alt="book.title"
      :src="book.coverImageUrl"
      class="review-detail-cover-image"
    />
    <div class="review-detail-container">
      <div class="review-detail-sub-info-container">
        <ReviewDetailMemberInfoView :member-id="review.memberId" />
        <ReviewPickButton :review-id="review.reviewId" />
      </div>
      <div class="review-detail-title">{{ review.reviewTitle }}</div>
      <div class="review-detail-update-date">
        {{ formatDateWithDot(review.updatedAt) }}
      </div>
      <div class="review-detail-content">{{ review.reviewContent }}</div>

      <div v-if="isMyReview()" class="review-detail-edit-container">
        <div class="review-detail-edit-item" @click="showEditReviewModal">
          수정하기
        </div>
        <div class="review-detail-edit-item" @click="showRemoveReviewModal">
          삭제하기
        </div>
      </div>
    </div>

    <ConfirmCancelModal
      :confirm-cancel-modal-info="confirmCancelModalInfo"
      @modal:Close="closeModal"
      @modal:Confirm="confirmModal"
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
  width: 100%;
  height: auto;
  object-fit: cover;
}

.review-detail-container {
  position: absolute;
  top: 60%;
  width: 100%;
  padding: 5px 15px;
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

.review-detail-sub-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  text-decoration: none;
  appearance: none;
  -webkit-appearance: none;
  color: var(--text-primary);
  justify-content: right;
  margin-bottom: 100px;
}

.review-detail-edit-item {
  padding: 3px 5px;
  font-size: 11px;
  color: var(--text-fifth);
  border: none;
  border-bottom: 1px solid var(--text-fifth);
  margin-left: 4px;
  transition: font-size 0.6s ease, color 0.6s ease, border-bottom 0.6s ease;
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
