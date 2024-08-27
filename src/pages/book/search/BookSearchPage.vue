<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SearchResultItem from "@/components/card/BookSearchResultCard.vue";

const query = ref("");

const books = ref([
  {
    title: "어쩌다 우리가 만나서 어쩌다 이런 사랑을 하고",
    author: "김현경",
    coverImage: "@/assets/test/picture_test.png",
  },
  {
    title: "안녕, 둔촌주공아파트 vol.2",
    author: "이인규",
    coverImage: "@/assets/test/picture_test.png",
  },
  {
    title: "이제야, 그렇지만 또 이제라도",
    author: "김예랑",
    coverImage: "@/assets/test/picture_test.png",
  },
]);

const filteredBooks = computed(() => {
  return books.value.filter((book) => book.title.includes(query.value));
});

function searchBooks() {
  // 검색 기능을 구현합니다.
}

onMounted(() => {
  // 초기화 시 search-results가 올바르게 렌더링되도록 설정
  if (!query.value) {
    query.value = " "; // 임시 공백 설정
    query.value = ""; // 다시 초기화
  }
});
</script>

<template>
  <div class="search-page">
    <div class="search-container">
      <input
        type="text"
        placeholder="플레이스홀더"
        class="search-input"
        v-model="query"
        @input="searchBooks"
      />
      <img
        src="../../../assets/icon/search/search_icon.png"
        alt="Search Icon"
        class="search-icon"
      />
    </div>

    <div class="search-results">
      <SearchResultItem
        v-for="(book, index) in filteredBooks"
        :key="index"
        :book="book"
      />
    </div>

    <div v-if="filteredBooks.length === 0" class="no-results">
      <p>
        찾으시는 책이 없으신가요?<br />
        책을 직접 등록하신 후 서평을 작성해보세요!
      </p>
      <button class="register-book-button">도서등록하기</button>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  padding-bottom: 60px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 390px;
}

.search-input {
  flex-grow: 1;
  width: 328.11px;
  height: 37px;
  padding: 10px;
  border: 1px solid var(--border-primary);
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.search-icon {
  width: 41.89px;
  height: 36.31px;
  margin-left: 10px;
  cursor: pointer;
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 좌측 정렬 */
  gap: 20px;
  padding: 0 0px 20px 0px; /* 좌우 padding 제거 */
  max-height: 100%;
  width: 100%;
}

.no-results {
  text-align: center;
  margin-top: 20px;
}

.register-book-button {
  width: 130px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid var(--button-secondary);
  background-color: var(--border-fourth);
  color: #000000;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
