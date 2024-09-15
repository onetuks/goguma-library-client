<script lang="ts" setup>
import { ref, watch } from "vue";
import { BookApis } from "@/api/BookApis";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { BookPatchRequest } from "@/api/AdminBookApis";

const ISBN_LENGTH = 13;
const NON_DIGIT_REGEX = /[^0-9]/;

const props = defineProps<{
  bookPatchRequest: BookPatchRequest;
  hasIsbn: boolean;
}>();

const emits = defineEmits<{
  (event: "update:BookPatchRequest", bookPatchRequest: BookPatchRequest): void;
  (event: "update:HasIsbn"): void;
}>();

const localBookPatchRequest = ref<BookPatchRequest>({
  ...props.bookPatchRequest,
});

const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

watch(localBookPatchRequest, (newBookPatchRequest) => {
  emits("update:BookPatchRequest", { ...newBookPatchRequest });
});

watch(
  () => localBookPatchRequest.value.isbn,
  (newIsbn) => {
    console.log(localBookPatchRequest.value);
    emits("update:BookPatchRequest", {
      ...localBookPatchRequest.value,
      isIndie: props.bookPatchRequest.isIndie,
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
  if (!localBookPatchRequest.value.isbn || !props.hasIsbn) {
    return;
  }

  try {
    localBookPatchRequest.value.isbn = regulateIsbn(
      localBookPatchRequest.value.isbn
    );

    await BookApis.getBookWithIsbn(localBookPatchRequest.value.isbn)
      .then((response) => {
        localBookPatchRequest.value = {
          ...response,
          isIndie: true,
          isPermitted: true,
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
    localBookPatchRequest.value.isbn = null;
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
        v-model="localBookPatchRequest.isbn"
        :disabled="!hasIsbn"
        class="isbn-input"
        placeholder="ISBN 번호를 적어주세요"
        type="text"
      />
      <div
        :class="{ forbidden: !hasIsbn }"
        class="isbn-input-button"
        @click="searchBookWithIsbn"
      >
        조회
      </div>
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
          alt="isbn"
          class="form-info-content-image"
          src="@/assets/isbn/ISBN.png"
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
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: transparent;
  width: 30%;
  padding: 7px 30px;
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  font-size: 14px;
  transition: background-color 0.6s ease;
}

.isbn-input-button:hover {
  background-color: var(--surface-fourth);
}

.isbn-input-button:active {
  background-color: var(--surface-sixth);
}

.forbidden {
  background-color: var(--gray-900);
  color: var(--gray-800);
}

.forbidden:hover {
  background-color: var(--gray-900);
  color: var(--gray-800);
}

.forbidden:active {
  background-color: var(--gray-900);
  color: var(--gray-800);
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
