<script setup lang="ts">
import { Book } from "@/types/Book";

// 더미 데이터로 사용할 이미지 경로를 설정
const book = {
  title: "제목이 들어가는 영역",
  coverImageUrl: require("@/assets/test/picture_test.png"), // 더미 이미지 경로
};

defineProps<{
  book: Book;
}>();
</script>

<template>
  <div class="recommended-book">
    <div class="book-cover">
      <div class="title-overlay">
        <h2 class="title">{{ book.title }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommended-book {
  width: 215px;
  height: 318px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.book-cover {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/test/picture_test.png"); /* 더미 이미지 설정 */
  background-size: cover;
  background-position: center;
  position: relative;
}

.title-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45px; /* 제목이 들어가는 영역의 높이 */
  background: linear-gradient(
    180deg,
    rgba(234, 228, 216, 0.4) 0%,
    #fefdf6 50%,
    var(--background-primary) 100%
  );
  backdrop-filter: blur(2px); /* Background blur 효과 */
  display: flex;
  align-items: center;
  padding-left: 10px; /* 좌측 여백 추가 */
}

.title {
  font-family: var(--font-family-kopub), sans-serif;
  font-size: 21px; /* 헤드라인 소 크기 */
  color: var(--text-fourth);
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Drop shadow */
  margin: 0;
  text-align: left; /* 좌측 정렬 */
}
</style>
