<script setup lang="ts">
import router from "@/router";

const goHome = () => {
  router.push("/home");
};
</script>

<template>
  <div class="error-page-wrapper">
    <img
      src="@/assets/icon/error/error-icon.png"
      alt="error-icon"
      class="error-image"
    />
    <p>불러오기에 실패했습니다</p>
    <div class="error-button" @click="goHome">홈으로</div>
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
}
</style>
