<script lang="ts" setup>
import router from "@/router";

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="error-page-wrapper">
    <img
      alt="error-icon"
      class="error-image"
      src="@/assets/icon/error/error-icon.png"
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
  transition: background-color 0.6s ease;
}

.error-button:hover {
  background-color: var(--surface-fourth);
}

.error-button:active {
  background-color: var(--surface-sixth);
}
</style>
