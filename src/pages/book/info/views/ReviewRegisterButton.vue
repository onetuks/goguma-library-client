<script lang="ts" setup>
import { Book } from "@/api/BookApis";
import router from "@/router";

const props = defineProps<{
  book: Book;
}>();

const moveToReviewRegistrationPage = () => {
  router.push({
    path: "/reviews/registration",
    query: {
      "book-id": props.book.bookId,
    },
  });
};
</script>

<template>
  <div class="registration-wrapper" @click="moveToReviewRegistrationPage">
    서평쓰기
  </div>
</template>

<style scoped>
.registration-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 30px;
  border: 2px solid var(--red-brown-400);
  border-radius: 10px;
  color: var(--black);
  background-color: transparent;
  transition: background-color 0.6s ease;
}

.registration-wrapper:hover {
  background-color: var(--surface-sixth);
}

.registration-wrapper:active {
  background-color: var(--surface-sixth);
}
</style>
