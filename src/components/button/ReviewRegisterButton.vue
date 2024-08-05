<script lang="ts" setup>
import axios from "axios";

interface Review {
  memberId: number;
  bookId: number;
  reviewTitle: string;
  reviewContent: string;
}

const props = defineProps<{
  review: Review;
}>();

const registerReview = (): void => {
  const response = axios.post(
    "http://localhost:8080/api/reviews",
    props.review
  );
  console.log(response);
};
</script>

<template>
  <div class="registration-wrapper" @click="registerReview">서평쓰기</div>
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
