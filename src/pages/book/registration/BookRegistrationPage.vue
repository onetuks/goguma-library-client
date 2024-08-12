<script setup lang="ts">
import { ref } from "vue";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";
import IsbnWarningModal from "@/pages/book/registration/modal/IsbnWarningModal.vue";

// Ref to handle ISBN input and checkbox state
const isbn = ref("");
const noIsbn = ref(false);
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

    <div class="isbn-info">
      <strong class="isbn-title">*ISBN이란?</strong>
      <p class="isbn-description">
        도서의 유통을 편리하게 하기 위해 각 도서에 부여된 고유번호입니다
      </p>
      <div class="isbn-example-container">
        <span class="isbn-example-label">예시)</span>
        <img
          src="@/assets/isbn/ISBN.png"
          alt="ISBN 예시"
          class="isbn-example"
        />
      </div>
    </div>

    <div class="form-section">
      <label class="form-label"> 제목<span class="required">*</span> </label>
      <input
        type="text"
        placeholder="도서 제목을 입력해주세요"
        class="text-input"
      />

      <label class="form-label"> 작가<span class="required">*</span> </label>
      <input type="text" placeholder="작가를 입력해주세요" class="text-input" />

      <label class="form-label"> 출판사 </label>
      <input
        type="text"
        placeholder="출판사를 입력해주세요"
        class="text-input"
      />
    </div>

    <div class="cover-image-section">
      <label class="form-label">표지이미지</label>
      <BookCoverUploadCard />
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

    <IsbnWarningModal is-modal-viewable="showPopup" message="암튼 모달" />
  </div>
</template>

<style scoped>
.book-registration {
  max-width: 390px;
  margin: 0 auto;
  padding: 0 15px;
  font-family: "NanumSquare", sans-serif;
  color: #000;
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
  font-size: 16px; /* 제목 대 폰트 크기 */
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
  gap: 10px;
  margin-bottom: 10px;
}

.isbn-input {
  width: 239px;
  height: 36px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: var(--surface-tertiary); /* 입력 영역 색상 */
  font-size: 14px;
}

.isbn-search-button {
  width: 115px;
  height: 36px;
  border: 2px solid var(--button-primary); /* 버튼의 외곽선 색상 */
  border-radius: 10px;
  font-size: 14px; /* 버튼 중 폰트 크기 */
  color: var(--text-primary);
  background-color: transparent;
  cursor: pointer;
}

.isbn-info {
  margin: 20px 0;
  padding: 15px;
  background-color: var(--surface-tertiary); /* ISBN 설명 영역의 배경색상 */
  border: 1px solid var(--border-primary);
  border-radius: 5px;
}

.isbn-title {
  font-size: 16px; /* 버튼 대 폰트 크기 */
  font-weight: bold;
  color: var(--text-fourth); /* ISBN이란? 제목의 색상 */
  margin-bottom: 10px;
  display: block;
}

.isbn-description {
  font-size: 14px; /* 본문 중 폰트 크기 */
  margin-bottom: 10px;
}

.isbn-example-container {
  display: flex;
  align-items: center;
  justify-content: center; /* 가운데 정렬 */
}

.isbn-example-label {
  font-size: 14px; /* 본문 중 폰트 크기 */
  color: var(--text-primary);
  margin-right: 5px;
}

.isbn-example {
  display: block;
}

.form-section {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 16px; /* 제목 대 폰트 크기 */
  font-weight: bold;
  text-align: left;
  margin: 10px 0 5px;
}

.text-input {
  width: 360px;
  height: 40px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--surface-tertiary); /* 입력 영역 색상 */
  font-size: 14px;
  margin: 0 auto;
  display: block;
}

.cover-image-section {
  margin: 20px 0;
}

.info-section {
  font-size: 12px; /* 본문 소 */
  color: #777;
  line-height: 1.5;
  margin-bottom: 20px;
}

.info-title {
  font-size: 14px; /* 제목 중 폰트 크기 */
  font-weight: bold;
  margin-bottom: 5px;
}

.register-button {
  width: 330px;
  height: 50px;
  padding: 15px;
  background-color: transparent;
  border: 2px solid var(--button-secondary); /* 버튼 외곽선 색상 */
  color: var(--text-primary); /* 버튼 텍스트 색상 */
  font-size: 16px; /* 버튼 대 폰트 크기 */
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  text-align: center;
}

.register-button:hover {
  background-color: var(--button-secondary);
  color: #fff;
}

</style>
