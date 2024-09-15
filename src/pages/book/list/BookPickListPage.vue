<script lang="ts" setup>
import { ref } from "vue";
import { emptyPage, Page } from "@/types/Page";
import { Book } from "@/api/BookApis";
import { BookPickApis } from "@/api/BookPickApis";
import BookPickCard from "@/pages/book/list/views/BookPickCard.vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";

const books = ref<Page<Book>>(emptyPage());

const fetchMyPickedBooks = async (page: number): Promise<void> => {
  const pageSize = 6;
  await BookPickApis.getMyBookPicks(page, pageSize)
    .then((response) => (books.value = response as Page<Book>))
    .catch((error) => {
      console.error("BookPickListPage.fetchMyPickedBooks", error);
    });
};

fetchMyPickedBooks(books.value.number);
</script>

<template>
  <div class="book-pick-page">
    <div class="book-grid">
      <BookPickCard
        v-for="(book, index) in books.content"
        :key="index"
        :book="book"
      />
    </div>
    <PaginationBar :page-info="books" @request:Page="fetchMyPickedBooks" />
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
