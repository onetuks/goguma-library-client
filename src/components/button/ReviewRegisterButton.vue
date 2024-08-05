<script lang="ts" setup>
import axios from "axios";

interface Review {
  memberId: number;
  bookId: number;
  reviewTitle: string;
  reviewContent: string;
}

const registerReview = (review: Review): void => {
  const response = axios.post("http://localhost:8080/api/reviews", review);
  console.log(response);
};
</script>

<template>
  <div class="registration-wrapper">
    <button class="registration-button" @click="registerReview">
      서평 쓰기
    </button>
  </div>
</template>

<style scoped>
.registration-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 30px;
}

.registration-button {
  color: var(--black);
  background-color: transparent;
}
</style>
