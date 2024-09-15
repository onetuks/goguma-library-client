<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";
import { BookApis, BookPostRequest } from "@/api/BookApis";
import { ApiError } from "@/api/ServerRequest";
import { CategoryType } from "@/types/Category";
import {
  AdminBookApis,
  BookPatchRequest,
  initBookPatchRequest,
} from "@/api/AdminBookApis";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import {
  ImageFileUploadProps,
  initImageFileUploadProps,
} from "@/types/ImageFile";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";
import BookModificationIsbnView from "@/pages/admin/book/modification/component/BookModificationIsbnView.vue";
import BookModificationTitleView from "@/pages/admin/book/modification/component/BookModificationTitleView.vue";
import BookModificationAuthorNameView from "@/pages/admin/book/modification/component/BookModificationAuthorNameView.vue";
import BookModificationPublisherView from "@/pages/admin/book/modification/component/BookModificationPublisherView.vue";
import BookModificationIntroductionView from "@/pages/admin/book/modification/component/BookModificationIntroductionView.vue";

const BOOK_REGISTRATION_SUCCESS_MESSAGE = "도서가 등록됐습니다";

const bookPatchRequest = ref<BookPatchRequest>(initBookPatchRequest());
const hasIsbn = ref<boolean>(true);

const coverImageData = ref<ImageFileUploadProps>(initImageFileUploadProps());

const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

const updateBookPatchRequest = (newRequest: BookPatchRequest): void => {
  bookPatchRequest.value = { ...newRequest };

  if (bookPatchRequest.value.coverImageFilename) {
    coverImageData.value = initImageFileUploadProps();
  }
};

const updateHasIsbn = (): void => {
  hasIsbn.value = !hasIsbn.value;
};

const updateCoverImageData = (newData: ImageFileUploadProps): void => {
  coverImageData.value = { ...newData };
};

const validateBookPatchRequest = (): void => {
  if (bookPatchRequest.value.title.trim().length === 0) {
    throw new Error("도서 제목을 입력해주세요");
  } else if (bookPatchRequest.value.authorName.trim().length === 0) {
    throw new Error("작가 이름을 입력해주세요");
  } else if (!bookPatchRequest.value.isIndie) {
    throw new Error("독립출판물만 등록할 수 있어요");
  } else if (!bookPatchRequest.value.isPermitted) {
    throw new Error("관리자는 허용하지 않을 도서는 수정하면 안 됩니다.");
  } else if (hasIsbn.value && !bookPatchRequest.value.isbn) {
    throw new Error("ISBN을 입력해주세요");
  } else if (!hasIsbn.value && bookPatchRequest.value.isbn) {
    throw new Error("ISBN을 다시 확인해주세요");
  } else if (hasIsbn.value && bookPatchRequest.value.isbn?.length !== 13) {
    throw new Error("ISBN는 13자리에요");
  }
};

const modifyBook = async () => {
  const getCoverImageFilename = (): string | null => {
    return bookPatchRequest.value.coverImageFilename
      ? bookPatchRequest.value.coverImageFilename
      : coverImageData.value.filename;
  };

  const getBookCategories = (): CategoryType[] => {
    return bookPatchRequest.value.categories.length > 0
      ? bookPatchRequest.value.categories
      : ["ETC"];
  };

  try {
    validateBookPatchRequest();

    await BookApis.postNewBook(
      {
        ...bookPatchRequest.value,
        coverImageFilename: getCoverImageFilename(),
        categories: getBookCategories(),
      } as BookPostRequest,
      coverImageData.value.file
    )
      .then(async (response) => {
        const bookId = response.bookId;
        await AdminBookApis.patchBook(
          bookId,
          {
            ...bookPatchRequest.value,
            isPermitted: true,
            coverImageFilename: getCoverImageFilename(),
            categories: getBookCategories(),
          } as BookPatchRequest,
          coverImageData.value.file
        )
          .then(() => {
            confirmModalInfo.value = {
              message: BOOK_REGISTRATION_SUCCESS_MESSAGE,
              buttonText: "확인",
              visible: true,
            };
          })
          .catch((error) => {
            console.error("AdminBookModificationPage.patchBook", error);
            handleBookModificationError(error);
          });
      })
      .catch((error) => {
        console.error("AdminBookModificationPage.postNewBook", error);
        handleBookModificationError(error);
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

const handleBookModificationError = (error: ApiError): void => {
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
  confirmModalInfo.value = initConfirmModalInfo();
  router.back();
};
</script>

<template>
  <div class="book-modification-container">
    <BookModificationIsbnView
      :book-patch-request="bookPatchRequest"
      :hasIsbn="hasIsbn"
      @update:BookPatchRequest="updateBookPatchRequest"
      @update:HasIsbn="updateHasIsbn"
    />
    <BookModificationTitleView
      :book-patch-request="bookPatchRequest"
      @update:BookPatchRequest="updateBookPatchRequest"
    />
    <BookModificationAuthorNameView
      :book-patch-request="bookPatchRequest"
      @update:BookPatchRequest="updateBookPatchRequest"
    />
    <BookModificationPublisherView
      :book-patch-request="bookPatchRequest"
      @update:BookPatchRequest="updateBookPatchRequest"
    />
    <BookModificationIntroductionView
      :book-patch-request="bookPatchRequest"
      @update:BookPatchRequest="updateBookPatchRequest"
    />
    <BookCoverUploadCard
      :book-post-request="bookPatchRequest"
      :cover-image-data="coverImageData"
      @update:CoverImageData="updateCoverImageData"
    />
    <div class="book-modification-button" @click="modifyBook">
      도서 수정하기
    </div>
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
  </div>
</template>

<style scoped>
.book-modification-container {
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

.book-modification-button {
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

.book-modification-button:hover {
  background-color: var(--surface-fourth);
}

.book-modification-button:active {
  background-color: var(--surface-sixth);
}
</style>
