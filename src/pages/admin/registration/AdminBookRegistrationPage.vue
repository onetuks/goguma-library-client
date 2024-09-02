<script setup lang="ts">
import { ref } from "vue";
import BookRegistrationIsbnView from "@/pages/book/registration/components/BookRegistrationIsbnView.vue";
import BookRegistrationTitleView from "@/pages/book/registration/components/BookRegistrationTitleView.vue";
import { BookApis, BookPostRequest, initBookPostRequest } from "@/api/BookApis";
import BookRegistrationAuthorNameView from "@/pages/book/registration/components/BookRegistrationAuthorNameView.vue";
import BookRegistrationPublisherView from "@/pages/book/registration/components/BookRegistrationPublisherView.vue";
import BookRegistrationNoticeView from "@/pages/book/registration/components/BookRegistrationNoticeView.vue";
import router from "@/router";
import { ApiError } from "@/api/ServerRequest";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import {
  ImageFileUploadProps,
  initImageFileUploadProps,
} from "@/types/ImageFile";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";
import { CategoryType } from "@/types/Category";
import AdminBookRegistrationIntroductionView from "@/pages/admin/registration/components/AdminBookRegistrationIntroductionView.vue";
import AdminBookRegistrationCategoryView from "@/pages/admin/registration/components/AdminBookRegistrationCategoryView.vue";

const BOOK_REGISTRATION_SUCCESS_MESSAGE = "도서가 등록되었습니다";

const registeredBookId = ref<number | null>(null);

const bookPostRequest = ref<BookPostRequest>(initBookPostRequest());
const hasIsbn = ref<boolean>(true);

const coverImageData = ref<ImageFileUploadProps>(initImageFileUploadProps());

const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

const updateBookPostRequest = (newRequest: BookPostRequest): void => {
  bookPostRequest.value = { ...newRequest };

  if (bookPostRequest.value.coverImageFilename) {
    coverImageData.value = initImageFileUploadProps();
  }
};

const updateHasIsbn = (): void => {
  hasIsbn.value = !hasIsbn.value;
};

const updateCoverImageData = (newData: ImageFileUploadProps): void => {
  coverImageData.value = { ...newData };
};

const validateBookPostRequest = (): void => {
  if (bookPostRequest.value.title.trim().length === 0) {
    throw new Error("도서 제목을 입력해주세요");
  } else if (bookPostRequest.value.authorName.trim().length === 0) {
    throw new Error("작가 이름을 입력해주세요");
  } else if (!bookPostRequest.value.isIndie) {
    throw new Error("독립출판물만 등록할 수 있어요");
  } else if (hasIsbn.value && !bookPostRequest.value.isbn) {
    throw new Error("ISBN을 입력해주세요");
  } else if (!hasIsbn.value && bookPostRequest.value.isbn) {
    throw new Error("ISBN을 다시 확인해주세요");
  } else if (hasIsbn.value && bookPostRequest.value.isbn?.length !== 13) {
    throw new Error("ISBN는 13자리에요");
  }
};

/* 도서 이미지 등록
  1. 중앙도서관 이미지 -> file : X, url: O
  2. 기본이미지 -> file: X, url: X
  3. 커스텀 이미지 -> file: O, url: O
*/
const registerBook = async () => {
  const getCoverImageFilename = (): string | null => {
    return bookPostRequest.value.coverImageFilename
      ? bookPostRequest.value.coverImageFilename
      : coverImageData.value.filename;
  };

  const getBookCategories = (): CategoryType[] => {
    return bookPostRequest.value.categories.length > 0
      ? bookPostRequest.value.categories
      : ["ETC"];
  };

  try {
    validateBookPostRequest();

    await BookApis.postNewBook(
      {
        ...bookPostRequest.value,
        coverImageFilename: getCoverImageFilename(),
        categories: getBookCategories(),
      },
      coverImageData.value.file
    )
      .then((response) => {
        registeredBookId.value = response.bookId;
        confirmModalInfo.value = {
          message: BOOK_REGISTRATION_SUCCESS_MESSAGE,
          buttonText: "확인",
          visible: true,
        };
      })
      .catch((error) => {
        console.error("BookRegistrationPage.registerBook", error);
        handleBookRegistrationError(error);
      });
  } catch (error) {
    if (error instanceof Error) {
      confirmModalInfo.value = {
        visible: true,
        message: error.message,
        buttonText: "확인",
      };
    }
  }
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

const closeModal = () => {
  if (confirmModalInfo.value.message === BOOK_REGISTRATION_SUCCESS_MESSAGE) {
    router.push(`/books/${registeredBookId.value}/info`);
  }

  confirmModalInfo.value = initConfirmModalInfo();
};
</script>

<template>
  <div class="book-registration-container">
    <BookRegistrationIsbnView
      :book-post-request="bookPostRequest"
      :hasIsbn="hasIsbn"
      @update:BookPostRequest="updateBookPostRequest"
      @update:HasIsbn="updateHasIsbn"
    />
    <BookRegistrationTitleView
      :book-post-request="bookPostRequest"
      @update:BookPostRequest="updateBookPostRequest"
    />
    <BookRegistrationAuthorNameView
      :book-post-request="bookPostRequest"
      @update:BookPostRequest="updateBookPostRequest"
    />
    <BookRegistrationPublisherView
      :book-post-request="bookPostRequest"
      @update:BookPostRequest="updateBookPostRequest"
    />
    <AdminBookRegistrationIntroductionView
      :book-post-request="bookPostRequest"
      @update:BookPostRequest="updateBookPostRequest"
    />
    <AdminBookRegistrationCategoryView
      :initialCategories="bookPostRequest.categories"
      @update:categories="
        (categories) => {
          updateBookPostRequest({
            ...bookPostRequest,
            categories,
          });
        }
      "
    />
    <BookCoverUploadCard
      :book-post-request="bookPostRequest"
      :cover-image-data="coverImageData"
      @update:CoverImageData="updateCoverImageData"
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
  margin: 40px 30px 0 30px;
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
