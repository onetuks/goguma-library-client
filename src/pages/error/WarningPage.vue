<script lang="ts" setup>
import router from "@/router";

defineProps<{
  isVisibleButton: boolean;
}>();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="error-page-wrapper">
    <img
      alt="warning-icon"
      class="error-image"
      src="@/assets/icon/error/warning-icon.png"
    />
    <p>내역이 없습니다</p>
    <div v-if="isVisibleButton" class="error-button" @click="goBack">
      뒤로가기
    </div>
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
