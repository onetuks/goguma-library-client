<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";
import IsbnWarningModal from "@/pages/book/registration/modal/IsbnWarningModal.vue";

const isbn = ref("");
const noIsbn = ref(false);
const title = ref("");
const author = ref("");
const publisher = ref("");
const coverUrl = ref("");
const isModalViewable = ref(false);
const modalMessage = ref("");

// Method to handle ISBN search
const handleIsbnCheck = async () => {
  if ((!isbn.value && !noIsbn.value) || !title.value || !author.value) {
    modalMessage.value = "필수입력정보를 입력해주세요";
    isModalViewable.value = true;
    return;
  }

  try {
    const response = await axios.get(
      `https://api.example.com/books?isbn=${isbn.value}`
    );
    const bookData = response.data;

    if (!bookData) {
      modalMessage.value = "확인되지 않는 ISBN 번호입니다";
      isModalViewable.value = true;
      return;
    }

    title.value = bookData.title;
    author.value = bookData.author;
    publisher.value = bookData.publisher;
    coverUrl.value = bookData.coverImageUrl;
  } catch (error) {
    modalMessage.value = "확인되지 않는 ISBN 번호입니다";
    isModalViewable.value = true;
  }
};

// Close popup
const closePopup = () => {
  isModalViewable.value = false;
};
</script>

<template>
  <div class="book-registration">
    <div class="isbn-section">
      <div class="isbn-row">
        <label class="isbn-label"> ISBN<span class="required">*</span> </label>
        <div class="isbn-checkbox">
          <input type="checkbox" v-model="noIsbn" id="noIsbn" />
          <label for="noIsbn">ISBN이 없거나 모르는 도서에요</label>
        </div>
      </div>
      <div class="isbn-input-container">
        <input
          type="text"
          v-model="isbn"
          :disabled="noIsbn"
          placeholder="ISBN 번호를 적어주세요"
          class="isbn-input"
        />
        <button
          class="isbn-search-button"
          :disabled="noIsbn"
          @click="handleIsbnCheck"
        >
          조회
        </button>
      </div>
    </div>

    <div class="form-section">
      <label class="form-label"> 제목<span class="required">*</span> </label>
      <input
        type="text"
        v-model="title"
        placeholder="도서 제목을 입력해주세요"
        class="text-input title-input"
      />

      <label class="form-label"> 작가<span class="required">*</span> </label>
      <input
        type="text"
        v-model="author"
        placeholder="작가를 입력해주세요"
        class="text-input"
      />

      <label class="form-label"> 출판사 </label>
      <input
        type="text"
        v-model="publisher"
        placeholder="출판사를 입력해주세요"
        class="text-input"
      />
    </div>

    <div class="cover-image-section">
      <label class="form-label">표지이미지</label>
      <BookCoverUploadCard :coverUrl="coverUrl" />
    </div>

    <div class="info-section">
      <strong class="info-title">유의사항</strong>
      <p>
        * 도서 등록 후 누락된 정보나 오기입된 정보, 잘못된 정보는 고구마서재에서
        수정할 수 있습니다
      </p>
      <p>* 허위로 등록된 도서는 통지 없이 삭제될 수 있습니다</p>
    </div>

    <button class="register-button">도서 등록하기</button>

    <IsbnWarningModal
      :isModalViewable="isModalViewable"
      :message="modalMessage"
      @close="closePopup"
    />
  </div>
</template>

<style scoped>
.book-registration {
  max-width: 390px;
  margin: 0 auto;
  padding: 0 15px;
  font-family: var(--font-primary);
  color: var(--text-primary);
}

.isbn-section {
  margin-top: 15px;
}

.isbn-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.isbn-label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.required {
  color: #ff0000;
  margin-left: 2px;
}

.isbn-checkbox {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isbn-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px; /* Ensure a 6px gap */
  margin-bottom: 10px;
  width: 100%; /* Ensure the entire container is 100% of its parent */
  max-width: 360px; /* Ensure the container does not exceed 360px */
}

.isbn-input {
  width: calc(
    100% - 106px
  ); /* Adjust width to fit within the 360px constraint */
  height: 36px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: var(--surface-tertiary);
  font-size: 14px;
}

.isbn-search-button {
  width: 100px; /* Fixed width for the button */
  height: 36px;
  border: 2px solid var(--button-primary);
  border-radius: 10px;
  font-size: 14px;
  color: var(--text-primary);
  background-color: transparent;
  cursor: pointer;
}

.form-section {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 5px;
  text-align: left; /* Ensure labels are left-aligned */
}

.text-input {
  width: 100%;
  max-width: 360px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--surface-tertiary);
  font-size: 14px;
  display: block;
}

.title-input {
  width: 100%;
  max-width: 360px;
}

.cover-image-section {
  margin: 20px 0;
}

.book-cover-upload-card {
  width: 100%;
  max-width: 360px;
  height: 268px;
}

.info-section {
  font-size: 12px;
  color: #777;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: left; /* Ensure info text is left-aligned */
}

.info-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left; /* Ensure info title is left-aligned */
}

.register-button {
  width: 85%;
  max-width: 330px;
  height: 50px;
  padding: 0;
  background-color: transparent;
  border: 2px solid var(--button-secondary);
  color: var(--text-primary);
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.register-button:hover {
  background-color: var(--button-secondary);
  color: #fff;
}

@media (max-width: 768px) {
  .text-input,
  .title-input,
  .isbn-input,
  .isbn-search-button,
  .book-cover-upload-card {
    width: 90%;
  }

  .register-button {
    width: 90%;
  }
}
</style>
