<script setup lang="ts">
import HomePageTitle from "@/pages/home/views/common/HomePageTitle.vue";
import BookRecommendCard from "@/components/card/BookRecommendCard.vue";
import { ref } from "vue";
import { Book, BookApis } from "@/api/BookApis";
import { Page } from "@/types/Page";
import router from "@/router";
import HomeSelectedBookDetailView from "@/pages/home/views/view/HomeHomeSelectedBookDetailView.vue";

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
      title="관심추천"
      :info="'회원님의 관심카테고리를 기반으로\n추천드리는 독립서적입니다'"
    />
    <div class="book-recommend-list-container">
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
