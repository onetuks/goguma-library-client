<script setup lang="ts">
import { ref, watch } from "vue";
import { BookApis, BookPostRequest } from "@/api/BookApis";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

const ISBN_LENGTH = 13;
const NON_DIGIT_REGEX = /[^0-9]/;

const props = defineProps<{
  bookPostRequest: BookPostRequest;
  hasIsbn: boolean;
}>();

const emits = defineEmits<{
  (event: "update:BookPostRequest", bookPostRequest: BookPostRequest): void;
  (event: "update:HasIsbn"): void;
}>();

const localBookPostRequest = ref<BookPostRequest>({ ...props.bookPostRequest });

const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

watch(localBookPostRequest, (newBookPostRequest) => {
  emits("update:BookPostRequest", { ...newBookPostRequest });
});

watch(
  () => localBookPostRequest.value.isbn,
  (newIsbn) => {
    console.log(localBookPostRequest.value);
    emits("update:BookPostRequest", {
      ...localBookPostRequest.value,
      isIndie: props.bookPostRequest.isIndie,
      isbn: newIsbn,
    });
  }
);

const regulateIsbn = (isbn: string): string => {
  const regulatedIsbn = isbn.replaceAll("-", "").trim();

  const isInvalidIsbn =
    !regulatedIsbn ||
    NON_DIGIT_REGEX.test(regulatedIsbn) ||
    regulatedIsbn.length !== ISBN_LENGTH;
  if (isInvalidIsbn) {
    throw new Error("올바른 ISBN 번호를 입력해주세요");
  }

  return regulatedIsbn;
};

const searchBookWithIsbn = async (): Promise<void> => {
  if (!localBookPostRequest.value.isbn) {
    return;
  }

  try {
    localBookPostRequest.value.isbn = regulateIsbn(
      localBookPostRequest.value.isbn
    );

    await BookApis.getBookWithIsbn(localBookPostRequest.value.isbn)
      .then((response) => {
        localBookPostRequest.value = {
          ...response,
          isIndie: true,
          coverImageFilename: response.coverImageUrl,
        };
      })
      .catch((error) => {
        console.error("BookRegistrationIsbnView.searchBookWithIsbn", error);
        handleIsbnSearchError("확인되지 않는 ISBN 번호입니다");
      });
  } catch (error) {
    if (error instanceof Error) {
      handleIsbnSearchError(error.message);
    }
    return;
  }
};

const toggleHasIsbn = (): void => {
  if (!props.hasIsbn) {
    localBookPostRequest.value.isbn = null;
  }

  emits("update:HasIsbn");
};

const getCheckBoxImage = (): string => {
  return props.hasIsbn
    ? require("@/assets/icon/checkbox/unchecked-icon.png")
    : require("@/assets/icon/checkbox/checked-icon.png");
};

const handleIsbnSearchError = (message: string): void => {
  confirmModalInfo.value = {
    visible: true,
    message,
    buttonText: "확인",
  };
};

const closeModal = (): void => {
  confirmModalInfo.value = initConfirmModalInfo();
};
</script>

<template>
  <div class="isbn-container">
    <div class="isbn-title-container">
      <label class="isbn-title">ISBN<span class="required">*</span></label>
      <div class="isbn-checkbox" @click="toggleHasIsbn">
        <img
          :src="getCheckBoxImage()"
          alt="checkbox"
          class="isbn-checkbox-image"
        />
        <label class="isbn-checkbox-label">ISBN이 없거나 모르는 도서에요</label>
      </div>
    </div>
    <div class="isbn-input-container">
      <input
        type="text"
        v-model="localBookPostRequest.isbn"
        :disabled="!hasIsbn"
        placeholder="ISBN 번호를 적어주세요"
        class="isbn-input"
      />
      <button
        class="isbn-input-button"
        :disabled="!hasIsbn"
        @click="searchBookWithIsbn"
      >
        조회
      </button>
    </div>
    <div class="form-info-container">
      <div class="form-info-title">*ISBN이란?</div>
      <div class="form-info-content">
        <div class="form-info-content-item">
          도서의 유통을 편리하게 하기 위해
        </div>
        <div class="form-info-content-item">
          각 도서에 부여된 고유번호입니다
        </div>
        <img
          src="@/assets/isbn/ISBN.png"
          alt="isbn"
          class="form-info-content-image"
        />
      </div>
    </div>
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
  </div>
</template>

<style scoped>
.isbn-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.required {
  color: #ff0000;
  margin-left: 2px;
}

.isbn-title-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.isbn-title {
  font-family: var(--font-family-bold), sans-serif;
  font-size: 16px;
}

.isbn-checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.isbn-checkbox-image {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.isbn-checkbox-label {
  font-size: 14px;
}

.isbn-input-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 6px;
}

.isbn-input {
  background-color: var(--surface-tertiary);
  height: 36px;
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  border: none;
  font-size: 14px;
}

.isbn-input-button {
  background-color: transparent;
  width: 30%;
  padding: 7px 30px;
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  font-size: 14px;
}

.form-info-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: auto;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 5px;
}

.form-info-title {
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-fourth);
  font-size: 16px;
  text-align: left;
  margin-bottom: 7px;
}

.form-info-content-item {
  font-size: 14px;
}

.form-info-content-image {
  width: auto;
  height: auto;
  margin-top: 10px;
}
</style>
