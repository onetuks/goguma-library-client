<script lang="ts" setup>
import { Book } from "@/api/BookApis";

const props = defineProps<{
  book: Book;
}>();

const moveToReviewRegistrationPage = () => {
  console.log("moveToReviewRegistrationPage");
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
}
</style>
