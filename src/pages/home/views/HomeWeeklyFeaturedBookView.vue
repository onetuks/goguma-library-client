<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { Page } from "@/types/Page";
import { Book, BookApis } from "@/api/BookApis";
import HomePageTitle from "@/pages/home/views/HomePageTitle.vue";
import BookRecommendCard from "@/components/card/BookRecommendCard.vue";
import HomeSelectedBookDetailView from "@/pages/home/views/HomeSelectedBookDetailView.vue";

const books = ref<Book[]>();
const selectedBook = ref<Book>();

const selectBook = (book: Book): void => {
  selectedBook.value = { ...book };
};

const moveToBookInfoPage = (book: Book): void => {
  router.push(`/books/${book.bookId}/info`);
};

const fetchWeeklyFeaturedBooks = async (): Promise<void> => {
  await BookApis.getWeeklyFeaturedBooks()
    .then((response) => {
      books.value = (response as Page<Book>).content;
      selectedBook.value = books.value[0];
    })
    .catch((error) =>
      console.error(
        "HomeWeeklyFeaturedBookView.fetchWeeklyFeaturedBooks",
        error
      )
    );
};

fetchWeeklyFeaturedBooks();
</script>

<template>
  <div class="weekly-featured-books-container">
    <HomePageTitle
      title="금주추천"
      :info="'이번주 추천 도서로 서평을 작성하면\n30 포인트를 더 받을 수 있어요'"
    />
    <div class="weekly-featured-books-list-container">
      <BookRecommendCard
        :book="book"
        v-for="(book, index) in books"
        :key="index"
        @mouseover="selectBook(book)"
        @click="moveToBookInfoPage(book)"
      />
    </div>
    <HomeSelectedBookDetailView :book="selectedBook" v-if="selectedBook" />
  </div>
</template>

<style scoped>
.weekly-featured-books-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 0;
  background-color: var(--surface-secondary);
  margin-top: 10px;
  border-top: 5px solid var(--text-fourth);
  border-bottom: 5px solid var(--text-fourth);
}

.weekly-featured-books-list-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>
