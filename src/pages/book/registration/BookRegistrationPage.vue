<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";
import IsbnWarningModal from "@/pages/book/registration/modal/IsbnWarningModal.vue";
import BookRegistrationIsbnView from "@/pages/book/registration/components/BookRegistrationIsbnView.vue";

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
  <div class="book-registration-container">
    <BookRegistrationIsbnView />
    <!--    <BookRegistrationTitleView />-->
    <!--    <BookRegistrationAuthorNameView />-->
    <!--    <BookRegistrationPublisherView />-->
    <!--    <BookRegistrationNoticeView />-->
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
.book-registration-container {
  padding: 15px;
  font-family: var(--font-family-regular), sans-serif;
  color: var(--text-primary);
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
