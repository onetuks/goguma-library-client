<script setup lang="ts">
import { Book } from "@/types/Book";

const book = {
  title: "어쩌다 우리가 만나서 어쩌다 이런 사랑을 하고",
  authorName: "김현경",
  coverImageUrl: require("@/assets/test/picture_test.png"), // 테스트 이미지 경로
};

defineProps<{
  book: Book;
}>();
</script>

<template>
  <div class="search-result-item">
    <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
    <div class="book-info">
      <h2 class="book-title">{{ book.title }}</h2>
      <p class="book-author">{{ book.authorName }}</p>
    </div>
  </div>
</template>

<style scoped>
.search-result-item {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 360px;
  height: 145px; /* 고정된 높이 */
  padding: 10px;
  background-color: transparent; /* 배경색 제거 */
  border-bottom: 5px solid var(--border-secondary); /* 하단에만 stroke */
  margin-bottom: 10px;
  position: relative;
}

.book-cover {
  width: 70px; /* 고정된 너비 */
  height: 105px; /* 고정된 높이 */
  object-fit: cover;
  border-radius: 5px;
  position: absolute;
  left: 0; /* 좌측에 붙임 */
  top: 20px; /* 상단에서 20px 떨어짐 */
}

.book-info {
  position: absolute;
  top: 20px; /* 상단에서 20px 떨어짐 */
  left: 80px; /* 좌측에서 80px 떨어짐 */
  right: 10px; /* 우측에서 10px 떨어짐 */
  bottom: 20px; /* 하단에서 20px 떨어짐 */
}

.book-title {
  font-family: "NanumSquare", sans-serif;
  font-weight: bold; /* 볼드체 적용 */
  color: var(--text-tertiary); /* 글자 색상 */
  margin: 0;
  font-size: 20px; /* 헤드라인 소 크기 */
  line-height: 1.2;
  text-align: left; /* 좌측 정렬 */
}

.book-author {
  font-family: "NanumSquare", sans-serif;
  font-weight: bold; /* 볼드체 적용 */
  color: var(--text-tertiary); /* 글자 색상 */
  margin-top: 12px; /* 제목과의 간격 */
  font-size: 14px; /* 제목 중 크기 */
  line-height: 1.2;
  text-align: left; /* 좌측 정렬 */
}
</style>
