<script setup lang="ts">
import router from "@/router";

defineProps<{
  pageTitle: string;
}>();

const moveToAlarmListPage = (): void => {
  router.push("/members/my/alarms");
};
</script>

<template>
  <div class="main-page-header-container">
    <div class="main-page-header-title">{{ pageTitle }}</div>
    <img
      src="../../assets/icon/alarm/alarm-icon.png"
      alt="alarm-icon"
      class="main-page-header-alarm"
      @click="moveToAlarmListPage"
    />
  </div>
</template>

<style scoped>
.main-page-header-container {
  width: 100%;
  height: 50px;
  text-align: center;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border-primary);
  align-items: center;
  justify-content: center;
}

.main-page-header-title {
  font-family: var(--font-family-bold), sans-serif;
  font-size: 20px;
}

.main-page-header-alarm {
  position: absolute;
  right: 0;
  width: 50px;
  height: 50px;
  object-fit: fill;
  border-radius: 50% 0 50% 50%;
  transition: background-color 0.3s ease;
}

.main-page-header-alarm:hover {
  background-color: var(--surface-fourth);
}

.main-page-header-alarm:active {
  background-color: var(--surface-sixth);
}
</style>
