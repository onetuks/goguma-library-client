<script setup lang="ts">
import { Book, BookApis, initBook } from "@/api/BookApis";
import { ref } from "vue";
import { initReviewRequest, ReviewApis, ReviewRequest } from "@/api/ReviewApis";
import ReviewRegistrationBookCoverImageView from "@/pages/review/registration/components/ReviewRegistrationBookCoverImageView.vue";
import { useRoute } from "vue-router";
import ReviewBookInfoBar from "@/pages/review/registration/components/ReviewBookCategoryBar.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ConfirmModalInfo, initModalInfo } from "@/types/Modal";
import router from "@/router";

const route = useRoute();

const book = ref<Book>(initBook());
const reviewRequest = ref<ReviewRequest>(initReviewRequest());
const confirmModalInfo = ref<ConfirmModalInfo>(initModalInfo());

const textArea = ref<HTMLTextAreaElement | null>(null);

const fetchBook = async () => {
  const bookId = Number(route.query["book-id"]);
  await BookApis.getBook(bookId).then((response) => {
    book.value = { ...response } as Book;
  });
};

const autoResize = (): void => {
  if (textArea.value) {
    textArea.value.style.height = "auto";
    textArea.value.style.height = `${textArea.value.scrollHeight}px`;
  }
};

const showInvalidReviewTitleModal = (): void => {
  const invalidReviewTitle =
    reviewRequest.value.reviewTitle === null ||
    reviewRequest.value.reviewTitle?.length === 0;

  if (invalidReviewTitle) {
    throw new Error("서평 제목을 입력해주세요");
  }
};

const showInvalidReviewContentModal = (): void => {
  const invalidReviewContent =
    reviewRequest.value.reviewContent === null ||
    reviewRequest.value.reviewContent?.length === 0;

  if (invalidReviewContent) {
    throw new Error("서평 내용을 입력해주세요");
  }
};

const registerReview = async (): Promise<void> => {
  try {
    showInvalidReviewTitleModal();
    showInvalidReviewContentModal();

    if (book.value.bookId) {
      await ReviewApis.postNewReview(book.value.bookId, reviewRequest.value)
        .then(() => {
          confirmModalInfo.value = {
            message: "서평이 등록되었습니다",
            buttonText: "확인",
            visible: true,
          };
        })
        .catch((error) => {
          console.error("ReviewRegistrationPage registerReview", error);
          confirmModalInfo.value = {
            message: "서평 등록에 실패했습니다",
            buttonText: "확인",
            visible: true,
          };
        });
    }
  } catch (error) {
    if (error instanceof Error) {
      confirmModalInfo.value = {
        message: error.message,
        buttonText: "확인",
        visible: true,
      };
    }
  }
};

const moveToMyReviewPage = (): void => {
  const isError: boolean = confirmModalInfo.value.visible;
  confirmModalInfo.value = initModalInfo();

  if (!isError) {
    router.push("/reviews/my");
  }
};

fetchBook();
</script>

<template>
  <div class="review-registration-container">
    <ReviewRegistrationBookCoverImageView :book="book" />
    <ReviewBookInfoBar :book="book" />
    <div class="review-registration-form-wrapper">
      <div class="review-registration-form-container">
        <div class="review-registration-form-title">서평 제목</div>
        <input
          class="review-registration-form-input"
          v-model="reviewRequest.reviewTitle"
          placeholder="제목 작성시 25자 이하로 작성해주세요"
          maxlength="25"
        />
      </div>
      <div class="review-registration-form-container">
        <div class="review-registration-form-title">서평 내용</div>
        <textarea
          ref="textArea"
          class="review-registration-form-input"
          v-model="reviewRequest.reviewContent"
          placeholder="본문 작성시 1000자 이하로 작성해주세요"
          @input="autoResize"
          maxlength="1000"
        />
      </div>
    </div>
    <button class="review-registration-button" @click="registerReview">
      등록하기
    </button>
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="moveToMyReviewPage"
    />
  </div>
</template>

<style scoped>
.review-registration-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.review-registration-form-wrapper {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
}

.review-registration-form-container {
  width: 100%;
}

.review-registration-form-title {
  padding: 10px 0;
  text-align: left;
  font-size: 14px;
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-primary);
}

.review-registration-form-input {
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  border: none;
  border-radius: 20px;
  background-color: var(--surface-tertiary);
}

.review-registration-button {
  width: 330px;
  margin: 17px 30px;
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 2px solid var(--button-secondary);
  border-radius: 15px;
  background-color: transparent;
  transition: background-color 0.3s ease, margin 0.3s ease;
}

.review-registration-button:hover {
  background-color: var(--surface-fourth);
}

.review-registration-button:active {
  background-color: var(--button-fourth);
  margin: 18px 32px;
}
</style>
