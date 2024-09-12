<script setup lang="ts">
import router from "@/router";

const moveToBookRegistrationPage = () => {
  router.push("/books/registration");
};
</script>

<template>
  <div class="book-registration-button-container">
    <p>
      찾으시는 책이 없으신가요?<br />
      책을 직접 등록하신 후 서평을 작성해보세요!
    </p>
    <div class="book-registration-button" @click="moveToBookRegistrationPage">
      도서등록하기
    </div>
  </div>
</template>

<style scoped>
.book-registration-button-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 21px;
  margin: 27px 0;
}

.book-registration-button {
  padding: 7px 30px;
  border-radius: 10px;
  border: 1px solid var(--button-secondary);
  background-color: var(--border-fourth);
  font-size: 14px;
  font-family: var(--font-family-bold), sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.book-registration-button:hover {
  background-color: var(--surface-fourth);
}

.book-registration-button:active {
  background-color: var(--surface-sixth);
}
</style>
