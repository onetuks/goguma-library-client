<script setup lang="ts">
import router from "@/router";

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="error-page-wrapper">
    <img
      src="@/assets/icon/error/warning-icon.png"
      alt="warning-icon"
      class="error-image"
    />
    <p>내역이 없습니다</p>
    <div class="error-button" @click="goBack">뒤로가기</div>
  </div>
</template>

<style scoped>
.error-page-wrapper {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-image {
  width: 90px;
  height: 90px;
  margin-top: 22px;
}

.error-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 30px;
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  margin-top: 30px;
  font-family: var(--font-family-bold), sans-serif;
  transition: background-color 0.3s ease;
}

.error-button:hover {
  background-color: var(--surface-fourth);
}

.error-button:active {
  background-color: var(--surface-sixth);
}
</style>
