<script lang="ts" setup>
import { ref } from "vue";
import { Book, BookApis } from "@/api/BookApis";
import { Page } from "@/types/Page";
import router from "@/router";
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

const fetchRecommendedBooks = async (): Promise<void> => {
  await BookApis.getBooksWithInterestedCategories()
    .then((response) => (books.value = (response as Page<Book>).content))
    .catch((error) =>
      console.error("HomeBookRecommendView.fetchRecommendedBooks", error)
    );
};

fetchRecommendedBooks();
</script>

<template>
  <div class="book-recommend-container">
    <HomePageTitle
      :info="'회원님의 관심카테고리를 기반으로\n추천드리는 독립서적입니다'"
      title="관심추천"
    />
    <div class="book-recommend-list-container">
      <BookRecommendCard
        v-for="(book, index) in books"
        :key="index"
        :book="book"
        @click="moveToBookInfoPage(book)"
        @mouseover="selectBook(book)"
      />
    </div>
    <HomeSelectedBookDetailView v-if="selectedBook" :book="selectedBook" />
  </div>
</template>

<style scoped>
.book-recommend-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 0;
  background-color: var(--surface-primary);
  margin-top: 10px;
  border-top: 5px solid var(--text-fourth);
  border-bottom: 5px solid var(--text-fourth);
}

.book-recommend-list-container {
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
