<script setup lang="ts">
import { ref, computed } from "vue";
import FavorableBook from "@/components/card/BookPickedCard.vue";

interface Book {
  title: string;
  author: string;
  coverImage: string;
  date: string;
}

const books = ref<Book[]>([]);

// 더미 데이터 생성
for (let i = 1; i <= 120; i++) {
  books.value.push({
    title: `도서 제목 ${i}`,
    author: `저자 ${i}`,
    coverImage: "@/assets/test/picture_test.png",
    date: `2024-08-${String(121 - i).padStart(2, "0")}`, // 날짜는 최신순으로 설정
  });
}

// 최신순으로 정렬
const sortedBooks = computed(() => {
  return books.value.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
});

const currentPage = ref(1);
const booksPerPage = ref(6);
const totalPages = computed(() =>
  Math.ceil(sortedBooks.value.length / booksPerPage.value)
);

const pagesPerGroup = ref(10);
const currentPageGroup = computed(() =>
  Math.ceil(currentPage.value / pagesPerGroup.value)
);
const totalPageGroups = computed(() =>
  Math.ceil(totalPages.value / pagesPerGroup.value)
);

const groupPages = computed(() => {
  const start = (currentPageGroup.value - 1) * pagesPerGroup.value + 1;
  const end = Math.min(
    currentPageGroup.value * pagesPerGroup.value,
    totalPages.value
  );
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * booksPerPage.value;
  const end = start + booksPerPage.value;
  return sortedBooks.value.slice(start, end);
});

const changePage = (page: number) => {
  currentPage.value = page;
};

const previousGroup = () => {
  if (currentPageGroup.value > 1) {
    currentPage.value = (currentPageGroup.value - 2) * pagesPerGroup.value + 1;
  }
};

const nextGroup = () => {
  if (currentPageGroup.value < totalPageGroups.value) {
    currentPage.value = currentPageGroup.value * pagesPerGroup.value + 1;
  }
};
</script>

<template>
  <div class="book-pick-page">
    <div class="book-grid">
      <FavorableBook
        v-for="(book, index) in paginatedBooks"
        :key="index"
        :book="book"
      />
    </div>

    <div class="pagination">
      <button
        class="nav-button"
        @click="previousGroup"
        :disabled="currentPageGroup === 1"
      >
        &lt;
      </button>

      <button
        v-for="page in groupPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>

      <button
        class="nav-button"
        @click="nextGroup"
        :disabled="currentPageGroup === totalPageGroups"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style scoped>
.book-pick-page {
  color: #000000;
  max-width: 390px;
  margin: 0 auto;
  padding-bottom: 100px; /* NavBar와의 간격을 더 넓게 확보 */
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 0 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  max-width: 390px;
}

.pagination button {
  background: none;
  border: none;
  font-size: 14px;
  margin: 0 2px;
  cursor: pointer;
  color: #000000;
}

.pagination button.nav-button {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}

.pagination button.active {
  font-weight: bold;
  color: var(--text-primary);
  border-bottom: 2px solid var(--text-primary);
}

.pagination button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
