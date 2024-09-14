<script lang="ts" setup>
import { isSameMonth, isToday } from "date-fns";
import CalendarIcon, {
  CalendarIconType,
} from "@/components/calendar/CalendarIcon.vue";

export interface Day {
  date: Date;
  attended: boolean;
}

const WEEKDAYS: string[] = ["일", "월", "화", "수", "목", "금", "토"];

const props = defineProps<{
  days: Day[];
  today: Date;
}>();

const getDayType = (day: Day): CalendarIconType => {
  const isThisMonthDay = isSameMonth(day.date, props.today);

  if (!isThisMonthDay) {
    return "NOT_THIS_MONTH";
  }

  if (isToday(day.date)) {
    return day.attended ? "TODAY_ATTENDED" : "TODAY_NOT_ATTENDED";
  }

  return day.attended ? "ATTENDED" : "DEFAULT";
};

function getGridRows() {
  return props.days.length / 7;
}
</script>

<template>
  <div
    :style="{ gridTemplateRows: `46px repeat(${getGridRows}, 46px)` }"
    class="calendar"
  >
    <!-- 요일 헤더 -->
    <div class="weekdays">
      <CalendarIcon
        v-for="(day, index) in WEEKDAYS"
        :key="index"
        :day="day"
        type="DATE"
      />
    </div>
    <!--  날짜 카드  -->
    <div class="days">
      <CalendarIcon
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
  width: 100%;
  justify-content: center;
  height: auto;
  display: grid;
  grid-template-columns: repeat(7, 46px);
  gap: 6px;
}

.weekdays {
  display: contents;
}

.days {
  display: contents;
}
</style>
