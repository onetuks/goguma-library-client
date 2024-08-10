<script setup lang="ts">
export type CalendarIconType =
  | "notChecked"
  | "checked"
  | "todayChecked"
  | "todayNotChecked"
  | "notInMonth"
  | "weekday";

const props = defineProps<{
  day: string;
  type: CalendarIconType;
}>();

const getIconClass = () => {
  return {
    "calendar-icon": true,
    checked: props.type === "checked",
    "not-checked": props.type === "notChecked",
    "not-in-month": props.type === "notInMonth",
    "today-checked": props.type === "todayChecked",
    "today-not-checked": props.type === "todayNotChecked",
    weekday: props.type === "weekday",
  };
};
</script>

<template>
  <div :class="getIconClass()">{{ day }}</div>
</template>

<style scoped>
.calendar-icon {
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Nanum Square", serif;
}

/* 각 상태에 따른 스타일 적용 */
.not-checked {
  background-color: var(--surface-fourth);
  color: var(--text-fourth);
}

.checked {
  background-color: var(--surface-secondary);
  color: var(--text-secondary);
}

.today-not-checked {
  width: 44px;
  height: 44px;
  background-color: var(--surface-fourth);
  border: 1px solid var(--border-tertiary);
  color: var(--text-fourth);
}

.today-checked {
  width: 44px;
  height: 44px;
  background-color: var(--surface-secondary);
  border: 1px solid var(--border-tertiary);
  color: var(--text-secondary);
}

.not-in-month {
  background-color: var(--surface-tertiary);
  color: var(--text-fifth);
}

.weekday {
  width: 44px;
  height: 44px;
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
}
</style>
