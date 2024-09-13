<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Book, BookApis, initBook } from "@/api/BookApis";
import BookInfoView from "@/pages/book/info/views/BookInfoView.vue";
import ReviewRegisterButton from "@/pages/book/info/views/ReviewRegisterButton.vue";
import BookInfoReviewListView from "@/pages/book/info/views/BookInfoReviewListView.vue";
import ErrorPage from "@/pages/error/ErrorPage.vue";

const route = useRoute();

const book = ref<Book>(initBook());

const fetchBook = async () => {
  const bookId = Number(route.params.bookId);
  await BookApis.getBook(bookId)
    .then((response) => {
      book.value = response as Book;
    })
    .catch((error) => console.error("BookInfoPage.fetchBook", error));
};

fetchBook();
</script>

<template>
  <div class="book-info-container">
    <div v-if="book.bookId" class="book-info-wrapper">
      <BookInfoView :book="book" />
      <div class="divider" />
      <BookInfoReviewListView :book="book" />
      <ReviewRegisterButton :book="book" />
    </div>
    <ErrorPage v-else />
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

.book-info-wrapper {
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
