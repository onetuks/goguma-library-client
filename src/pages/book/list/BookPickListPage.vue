<script setup lang="ts">
import { ref } from "vue";
import BookPickCard from "@/components/card/BookPickCard.vue";
import { emptyPage, Page } from "@/types/Page";
import PaginationView from "@/components/bar/PaginationView.vue";
import { BookPick, BookPickApis, BookPickResponse } from "@/api/BookPickApis";
import { Book, BookApis } from "@/api/BookApis";

const bookPicks = ref<Page<BookPick>>(emptyPage());
const books = ref<Book[]>([]);

const fetchBooks = async (bookIds: number[]): Promise<void> => {
  bookIds.map(async (bookId) => {
    await BookApis.getBook(bookId)
      .then((response) => books.value.push(response as Book))
      .catch((error) => console.error("BookPickListPage.fetchBooks", error));
  });
};

const fetchBookPicks = async (): Promise<void> => {
  const pageSize = 6;
  await BookPickApis.getMyBookPicks(bookPicks.value.number, pageSize)
    .then((response) => {
      bookPicks.value = response as Page<BookPickResponse>;
      fetchBooks(bookPicks.value.content.map((bookPick) => bookPick.bookId));
    })
    .catch((error) => {
      console.error("BookPickListPage.fetchBookPicks", error);
    });
};

fetchBookPicks();
</script>

<template>
  <div class="book-pick-page">
    <div class="book-grid">
      <BookPickCard v-for="(book, index) in books" :key="index" :book="book" />
    </div>
    <PaginationView :page-info="bookPicks" />
  </div>
</template>

<style scoped>
.book-pick-page {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  max-width: 100%;
  margin-bottom: 42px;
}
</style>
