<script setup lang="ts">
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { onBeforeMount, ref } from "vue";
import { AttendanceApis } from "@/api/AttendanceApis";
import CalendarTitleView from "@/components/calendar/CalendarTitleView.vue";
import CalendarView from "@/components/calendar/CalendarView.vue";
import { Day } from "@/types/Calendar";
import CalendarInfoView from "@/components/calendar/CalendarInfoView.vue";

const TODAY = new Date();

defineProps<{
  memberId: number;
}>();

onBeforeMount(() => {
  generateCalendar();
  updateAttendances();
});

const days = ref<Day[]>([]);
const attendanceCounts = ref<number>(0);

const generateCalendar = (): void => {
  const startDay: Date = startOfWeek(
    startOfMonth(new Date(TODAY.getFullYear(), TODAY.getMonth()))
  );
  const endDay: Date = endOfWeek(
    endOfMonth(new Date(TODAY.getFullYear(), TODAY.getMonth()))
  );

  days.value = eachDayOfInterval({ start: startDay, end: endDay }).map(
    (date: Date) => ({
      date,
      attended: false,
    })
  );
};

const updateAttendances = (): void => {
  AttendanceApis.getThisMonthAttendances(TODAY).then((attendances) => {
    if (Array.isArray(attendances)) {
      attendanceCounts.value = attendances.length;
      attendances.forEach((attendance) => {
        const day = days.value.find((day) =>
          isSameDay(day.date, attendance.attendedAt)
        );
        if (day) {
          day.attended = true;
        }
      });
    }
  });
};
</script>

<template>
  <div class="calendar-view-container">
    <CalendarTitleView />
    <CalendarView v-if="days.length > 0" :days="days" :today="TODAY" />
    <div class="attendance-count">누적 출석 횟수: {{ attendanceCounts }}</div>
    <div class="attendance-button">출석하기</div>
    <CalendarInfoView />
  </div>
</template>

<style scoped>
.calendar-view-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px;
}

.attendance-count {
  background-color: var(--surface-sixth);
  border-radius: 5px;
  color: var(--text-fourth);
  font-family: var(--font-family-bold), sans-serif;
  padding: 7px;
  width: fit-content;
}

.attendance-button {
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  border: 2px solid var(--button-secondary);
  border-radius: 15px;
  color: var(--text-fourth);
  font-family: var(--font-family-bold), sans-serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
