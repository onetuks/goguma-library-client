<script setup lang="ts">
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import CalendarDayCard, {
  CalendarDayType,
} from "@/components/calendar/CalendarDayCard.vue";
import { onBeforeMount } from "vue";

interface Day {
  date: Date;
  checked: boolean;
}

const WEEKDAYS: string[] = ["일", "월", "화", "수", "목", "금", "토"];

const props = defineProps<{
  year: number;
  month: number;
}>();

onBeforeMount(() => (days = generateCalendar()));

let days: Day[] = [];

const generateCalendar = (): Day[] => {
  const startDay: Date = startOfWeek(
    startOfMonth(new Date(props.year, props.month - 1))
  );
  const endDay: Date = endOfWeek(
    endOfMonth(new Date(props.year, props.month - 1))
  );
  return eachDayOfInterval({ start: startDay, end: endDay }).map(
    (date: Date) => ({
      date,
      checked: false,
    })
  );
};

const getDayType = (day: Day): CalendarDayType => {
  const isThisMonthDay = isSameMonth(
    day.date,
    new Date(props.year, props.month - 1)
  );

  if (!isThisMonthDay) {
    return "notInMonth";
  }
  if (isToday(day.date)) {
    return day.checked ? "todayChecked" : "todayNotChecked";
  }
  return day.checked ? "checked" : "notChecked";
};
</script>

<template>
  <div class="calendar">
    <!-- 요일 헤더 -->
    <div class="weekdays">
      <CalendarDayCard
        v-for="(day, index) in WEEKDAYS"
        :key="index"
        :day="day"
        type="weekday"
      />
    </div>
    <!--  날짜 카드  -->
    <div class="days">
      <CalendarDayCard
        v-for="(day, index) in days"
        :key="index"
        :day="day.date.getDate().toString()"
        :type="getDayType(day)"
      />
    </div>
  </div>
</template>

<style scoped>
.calendar {
  width: 358px;
  height: 358px;
  display: grid;
  grid-template-columns: repeat(7, 46px);
  grid-template-rows: 46px repeat(6, 46px);
  gap: 1px;
}

.weekdays,
.days {
  display: contents;
}
</style>
