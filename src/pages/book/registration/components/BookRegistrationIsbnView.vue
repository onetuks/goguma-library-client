<script setup lang="ts">
import { ref } from "vue";
import {
  Book,
  BookApis,
  BookIsbnGetResponse,
  mapBookIsbnGetResponseToBook,
} from "@/api/BookApis";

const NON_DIGIT_REGEX = /[^0-9]/;
const ISBN_LENGTH = 13;

const props = defineProps<{
  book: Book;
}>();

const emits = defineEmits<{
  (event: "update:Book", book: Book): void;
}>();

const localBook = ref<Book>({ ...props.book });

const hasNoIsbn = ref<boolean>(false);
const isbn = ref<string | null>(null);
const isModalVisible = ref<boolean>(false);

const getCheckBoxImage = (): string => {
  return hasNoIsbn.value
    ? require("@/assets/icon/checkbox/checked-icon.png")
    : require("@/assets/icon/checkbox/unchecked-icon.png");
};

const toggleIsIndie = () => {
  hasNoIsbn.value = !hasNoIsbn.value;
  localBook.value.isIndie = hasNoIsbn.value;
};

const isValidIsbn = (isbn: string): boolean => {
  const regulatedIsbn = isbn.replace("-", "");
  if (NON_DIGIT_REGEX.test(regulatedIsbn)) {
    return false;
  }
  return regulatedIsbn.length === ISBN_LENGTH;
};

const searchIsbn = () => {
  if (!isbn.value || !isValidIsbn(isbn.value)) {
    isModalVisible.value = true;
    return;
  }

  BookApis.getBookWithIsbn(isbn.value).then((data: BookIsbnGetResponse) => {
    const book: Book = mapBookIsbnGetResponseToBook(data);
    book.isIndie = true;
    localBook.value = { ...book };
    emits("update:Book", { ...localBook.value });
  });
};
</script>

<template>
  <div class="isbn-container">
    <div class="isbn-title-container">
      <label class="isbn-title">ISBN<span class="required">*</span></label>
      <div class="isbn-checkbox">
        <img
          :src="getCheckBoxImage()"
          alt="checkbox"
          class="isbn-checkbox-image"
          @click="toggleIsIndie"
        />
        <label class="isbn-checkbox-label">ISBN이 없거나 모르는 도서에요</label>
      </div>
    </div>
    <div class="isbn-input-container">
      <input
        type="text"
        v-model="isbn"
        :disabled="hasNoIsbn"
        placeholder="ISBN 번호를 적어주세요"
        class="isbn-input"
      />
      <button
        class="isbn-input-button"
        :disabled="hasNoIsbn"
        @click="searchIsbn"
      >
        조회
      </button>
    </div>
    <div class="isbn-info-container">
      <div class="isbn-info-title">*ISBN이란?</div>
      <div class="isbn-info-content">
        <div class="isbn-info-content-item">
          도서의 유통을 편리하게 하기 위해
        </div>
        <div class="isbn-info-content-item">
          각 도서에 부여된 고유번호입니다
        </div>
        <img
          src="@/assets/isbn/ISBN.png"
          alt="isbn"
          class="isbn-info-content-image"
        />
      </div>
    </div>
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
  width: 236px;
  padding: 8px 10px;
  box-sizing: border-box;
  border: none;
  font-size: 14px;
}

.isbn-input-button {
  background-color: transparent;
  width: auto;
  padding: 7px 30px;
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  font-size: 14px;
}

.isbn-info-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: auto;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 5px;
}

.isbn-info-title {
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-fourth);
  font-size: 16px;
  text-align: left;
  margin-bottom: 7px;
}

.isbn-info-content-item {
  font-size: 14px;
}

.isbn-info-content-image {
  width: auto;
  height: auto;
  margin-top: 10px;
}
</style>
