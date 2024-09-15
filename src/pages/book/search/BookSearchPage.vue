<script lang="ts" setup>
import { ref } from "vue";
import { sleep } from "@/util/SleeperUtil";
import { Book, BookApis } from "@/api/BookApis";
import { emptyPage, Page } from "@/types/Page";
import SearchBar from "@/components/bar/SearchBar.vue";
import BookRegistrationButton from "@/pages/book/search/views/BookRegistrationButton.vue";
import BookSearchResultCard from "@/pages/book/search/views/BookSearchResultCard.vue";
import WarningPage from "@/pages/error/WarningPage.vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";

const currentSearchKeyword = ref<string | null>(null);
const books = ref<Page<Book>>(emptyPage());

const loading = ref<boolean>(false);

const requestBookSearch = (page: number): void => {
  searchBooks(currentSearchKeyword.value, page);
};

const searchBooks = async (
  searchKeyword: string | null,
  page: number
): Promise<void> => {
  currentSearchKeyword.value = searchKeyword;
  loading.value = true;
  await sleep(200);
  await BookApis.getBooksWithKeyword(searchKeyword, page)
    .then((response) => {
      books.value = response as Page<Book>;
    })
    .catch((error) => {
      console.error("BookSearchPage.searchBooks", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

searchBooks(null, books.value.number);
</script>

<template>
  <div class="search-page">
    <SearchBar
      :search-keyword="currentSearchKeyword"
      @search:Books="searchBooks"
    />
    <div v-if="loading" class="loading-wrapper">
      <div class="loading-spinner" />
    </div>
    <div v-else class="search-results-wrapper">
      <div v-if="books.totalElements > 0" class="search-results">
        <BookSearchResultCard
          v-for="(book, index) in books.content"
          :key="index"
          :book="book"
        />
      </div>
      <WarningPage v-else :is-visible-button="false" />
      <BookRegistrationButton />
      <PaginationBar :page-info="books" @request:Page="requestBookSearch" />
    </div>
  </div>
</template>

<style scoped>
.search-page {
  width: 100%;
}

.search-results {
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--surface-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-sizing: border-box;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.search-results-wrapper {
  width: 100%;
}
</style>
