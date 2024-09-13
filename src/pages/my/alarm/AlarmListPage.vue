<script lang="ts" setup>
import { ref } from "vue";
import { Alarm, AlarmApis } from "@/api/AlarmApis";
import { emptyPage, Page } from "@/types/Page";
import WarningPage from "@/pages/error/WarningPage.vue";
import { formatDateWithDot } from "@/util/DateUtil";

const alarms = ref<Page<Alarm>>(emptyPage());

const fetchAlarms = async (): Promise<void> => {
  await AlarmApis.getAlarms(alarms.value.number)
    .then((response) => response as Page<Alarm>)
    .catch((error) => console.error("AlarmListPage.fetchAlarms", error));
};

fetchAlarms();
</script>

<template>
  <div class="alarm-page-container">
    <WarningPage v-if="alarms.totalElements === 0" :is-visible-button="true" />
    <div
      v-for="(alarm, index) in alarms.content"
      v-else
      :key="index"
      class="alarm-item"
    >
      <div class="alarm-message">{{ alarm.message }}</div>
      <div class="alarm-date">{{ formatDateWithDot(alarm.createdAt) }}</div>
    </div>
  </div>
</template>

<style scoped>
.alarm-page-container {
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.alarm-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  gap: 10px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-primary);
}

.alarm-message {
  font-size: 14px;
  font-family: var(--font-family-bold), sans-serif;
}

.alarm-date {
  font-size: 11px;
}
</style>
