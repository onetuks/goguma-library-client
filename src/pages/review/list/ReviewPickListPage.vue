<script setup lang="ts">
import { ref, computed } from "vue";
import SearchResultItem from "@/components/card/BookSearchResultCard.vue";
import SortSelect from "@/components/select/SortSelect.vue";

const reviews = ref<
  {
    book: { title: string; author: string; coverImage: string };
    date: string;
    likes: number;
  }[]
>([]);

// 120개의 더미 데이터 생성
for (let i = 1; i <= 120; i++) {
  reviews.value.push({
    book: {
      title: `어쩌다 우리가 만나서 어쩌다 이런 사랑을 하고 ${i}`,
      author: `저자 ${i}`,
      coverImage: "@/assets/book1.png",
    },
    date: `2024-01-${String(i).padStart(2, "0")}`,
    likes: Math.floor(Math.random() * 100),
  });
}

const sortOption = ref("latest");
const currentPage = ref(1);
const reviewsPerPage = ref(5); // 한 페이지에 표시할 리뷰 수
const totalPages = computed(() =>
  Math.ceil(reviews.value.length / reviewsPerPage.value)
);

// 페이징 관련 설정
const pagesPerGroup = ref(10); // 한 그룹에 표시할 페이지 수
const currentGroup = computed(() =>
  Math.ceil(currentPage.value / pagesPerGroup.value)
);

const groupPages = computed(() => {
  const start = (currentGroup.value - 1) * pagesPerGroup.value + 1;
  const end = Math.min(
    currentGroup.value * pagesPerGroup.value,
    totalPages.value
  );
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const sortedReviews = computed(() => {
  return reviews.value.slice().sort((a, b) => {
    if (sortOption.value === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption.value === "recommended") {
      return b.likes - a.likes;
    }
    return 0;
  });
});

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage.value;
  const end = start + reviewsPerPage.value;
  return sortedReviews.value.slice(start, end);
});

const changePage = (page: number) => {
  currentPage.value = page;
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const setSortOption = (option: string) => {
  sortOption.value = option;
};

const goBack = () => {
  window.history.back();
};
</script>

<template>
  <div class="review-pick-page">
    <div class="sort-bar">
      <SortSelect class="sort-select" />
    </div>

    <div class="review-list-container">
      <SearchResultItem
        v-for="(review, index) in paginatedReviews"
        :key="index"
        :book="review.book"
      />
    </div>

    <div class="pagination">
      <button
        class="nav-button"
        @click="previousPage"
        :disabled="currentPage === 1"
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
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style scoped>
.review-pick-page {
  color: #000000;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  padding-bottom: 100px;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sort-bar {
  width: 100%;
  display: flex;
  justify-content: flex-end; /* SortSelect를 우측으로 정렬 */
  padding: 10px 0; /* 상하 여백 */
}

.sort-select {
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 5px;
}

.review-list-container {
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 390px; /* 페이지네이션 너비 고정 */
  margin: 0 auto;
  flex-shrink: 0; /* 검색 결과와 분리 */
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
