<script setup lang="ts">
import { ref } from "vue";
import BookRegistrationIsbnView from "@/pages/book/registration/components/BookRegistrationIsbnView.vue";
import BookRegistrationTitleView from "@/pages/book/registration/components/BookRegistrationTitleView.vue";
import {
  Book,
  BookApis,
  initBook,
  mapBookToBookPostRequest,
} from "@/api/BookApis";
import BookRegistrationAuthorNameView from "@/pages/book/registration/components/BookRegistrationAuthorNameView.vue";
import BookRegistrationPublisherView from "@/pages/book/registration/components/BookRegistrationPublisherView.vue";
import BookRegistrationNoticeView from "@/pages/book/registration/components/BookRegistrationNoticeView.vue";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";
import router from "@/router";
import { ApiError } from "@/api/ServerRequest";
import { ConfirmModalInfo, initModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

type BookRegistrationImpossibleType =
  | "NOT_ENOUGH_INFOS"
  | "NOT_INDIE_BOOK"
  | "INVALID_ISBN";

const book = ref<Book>(initBook());
const coverImageFile = ref<File | null>(null);
const coverImageFilename = ref<string | null>(null);

const confirmModalInfo = ref<ConfirmModalInfo>(initModalInfo());

const closeModal = () => {
  confirmModalInfo.value = initModalInfo();
};

const updateBook = (updatedBook: Book): void => {
  book.value = { ...updatedBook };

  if (book.value.coverImageUrl) {
    coverImageFile.value = null;
    coverImageFilename.value = null;
  }
};

const updateCoverImageFile = (file: File | null): void => {
  coverImageFile.value = file;
};

const updateCoverImageFilename = (filename: string | null): void => {
  coverImageFilename.value = filename;
};

const getBookRegistrationImpossibleType =
  (): BookRegistrationImpossibleType | null => {
    const isBlankTitle = book.value.title.trim().length === 0;
    const isBlankAuthorName = book.value.authorName.trim().length === 0;
    const isIndieButNoIsbn = book.value.isIndie && !book.value.isbn;
    const isNotIndieButHasIsbn = !book.value.isIndie && book.value.isbn;

    if (isBlankAuthorName || isBlankTitle) {
      return "NOT_ENOUGH_INFOS";
    }
    if (isIndieButNoIsbn) {
      return "INVALID_ISBN";
    }
    if (isNotIndieButHasIsbn) {
      return "NOT_INDIE_BOOK";
    }
    return null;
  };

const getImpossibleMessage = (type: BookRegistrationImpossibleType): string => {
  switch (type) {
    case "NOT_ENOUGH_INFOS":
      return "필수입력 정보를 입력해주세요";
    case "INVALID_ISBN":
      return "확인되지 않은 ISBN 번호입니다";
    case "NOT_INDIE_BOOK":
      return "고구마서재는 독립출판물만 등록할 수 있어요";
  }
};

const registerBook = async () => {
  const impossibleType = getBookRegistrationImpossibleType();
  if (impossibleType) {
    confirmModalInfo.value = {
      visible: true,
      message: getImpossibleMessage(impossibleType),
      buttonText: "확인",
    };
    return;
  }

  /* 도서 이미지 등록
  1. 중앙도서관 이미지 -> file : X, url: O
  2. 기본이미지 -> file: X, url: X
  3. 커스텀 이미지 -> file: O, url: O
   */

  await BookApis.postNewBook(
    mapBookToBookPostRequest(book.value, coverImageFilename.value),
    coverImageFile.value
  )
    .then((response) => {
      router.push(`/books/${response.bookId}/info`);
    })
    .catch((error) => {
      handleBookRegistrationError(error);
    });
};

const handleBookRegistrationError = (error: ApiError): void => {
  const message =
    error.code === "G010"
      ? "이미 등록된 도서입니다"
      : "도서 등록 중 오류가 발생했습니다";
  confirmModalInfo.value = {
    visible: true,
    message,
    buttonText: "확인",
  };
};

const handleIsbnSearchError = (message: string): void => {
  confirmModalInfo.value = {
    visible: true,
    message,
    buttonText: "확인",
  };
};
</script>

<template>
  <div class="book-registration-container">
    <BookRegistrationIsbnView
      :book="book"
      @update:Book="updateBook"
      @warn:InvalidIsbn="handleIsbnSearchError"
    />
    <BookRegistrationTitleView :book="book" @update:Book="updateBook" />
    <BookRegistrationAuthorNameView :book="book" @update:Book="updateBook" />
    <BookRegistrationPublisherView :book="book" @update:Book="updateBook" />
    <BookCoverUploadCard
      :book="book"
      @update:CoverImageFile="updateCoverImageFile"
      @update:CoverImageFilename="updateCoverImageFilename"
    />
    <BookRegistrationNoticeView />
    <button class="book-registration-button" @click="registerBook">
      도서 등록하기
    </button>
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
  </div>
</template>

<style scoped>
.book-registration-container {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  font-family: var(--font-family-regular), sans-serif;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.book-registration-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px 0px 30px;
  width: auto;
  height: 50px;
  border: 2px solid var(--button-secondary);
  border-radius: 15px;
  font-family: var(--font-family-bold), sans-serif;
  font-size: 14px;
  background-color: transparent;
}

.book-registration-button:active {
  background-color: var(--surface-sixth);
}
</style>
