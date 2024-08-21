<script setup lang="ts">
export type CalendarIconType =
  | "DEFAULT"
  | "ATTENDED"
  | "TODAY_ATTENDED"
  | "TODAY_NOT_ATTENDED"
  | "NOT_THIS_MONTH"
  | "DATE";

const props = defineProps<{
  day: string;
  type: CalendarIconType;
}>();

const getIconClass = () => {
  return props.type.toLowerCase().replaceAll("_", "-");
};
</script>

<template>
  <div :class="['calendar-icon', getIconClass()]">{{ day }}</div>
</template>

<style scoped>
.calendar-icon {
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-family-bold), serif;
  border-radius: 5px;
}

.date {
  border: 1px solid var(--border-primary);
}

.not-this-month {
  background-color: var(--surface-tertiary);
  color: var(--text-fifth);
}

.default {
  background-color: var(--surface-fourth);
  color: var(--text-primary);
}

.attended {
  background-color: var(--surface-secondary);
  color: var(--text-secondary);
}

.today-not-attended {
  width: 44px;
  height: 44px;
  background-color: var(--surface-fourth);
  border: 2px solid var(--border-tertiary);
  color: var(--text-fourth);
}

.today-attended {
  width: 44px;
  height: 44px;
  background-color: var(--surface-secondary);
  border: 2px solid var(--border-tertiary);
  color: var(--text-secondary);
}
</style>
