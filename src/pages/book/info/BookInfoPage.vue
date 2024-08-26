<script setup lang="ts">
import { ref } from "vue";
import { Book, BookApis, initBook } from "@/api/BookApis";
import BookDetailView from "@/pages/book/info/components/BookDetailView.vue";
import { useRoute } from "vue-router";
import ReviewRegisterButton from "@/components/button/ReviewRegisterButton.vue";
import BookDetailReviewView from "@/pages/book/info/components/BookDetailReviewView.vue";

const route = useRoute();

const book = ref<Book>(initBook());

const fetchBook = async () => {
  const bookId = Number(route.params.bookId);
  await BookApis.getBook(bookId).then((response) => {
    book.value = response as Book;
  });
};

fetchBook();
</script>

<template>
  <div class="book-info-container">
    <BookDetailView :book="book" />
    <div class="divider" />
    <BookDetailReviewView :book="book" />
    <ReviewRegisterButton :book="book" />
  </div>
</template>

<style scoped>
.book-info-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.divider {
  width: 100%;
  height: 10px;
  background-color: var(--surface-tertiary);
}
</style>
