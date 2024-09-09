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
import { AttendanceApis, AttendanceResponse } from "@/api/AttendanceApis";
import CalendarTitleView from "@/components/calendar/CalendarTitleView.vue";
import CalendarView, { Day } from "@/components/calendar/CalendarView.vue";
import CalendarInfoView from "@/components/calendar/CalendarInfoView.vue";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

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
const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

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

const closeModal = (): void => {
  confirmModalInfo.value = initConfirmModalInfo();
};

const updateAttendances = (): void => {
  AttendanceApis.getThisMonthAttendances(TODAY).then((attendances) => {
    if (Array.isArray(attendances)) {
      attendanceCounts.value = attendances.length;
      attendances.forEach((attendance) => {
        const targetDay = getTargetDay(attendance);
        if (targetDay) {
          targetDay.attended = true;
        }
      });
    }
  });
};

const attendToday = async (): Promise<void> => {
  await AttendanceApis.postNewAttendance(TODAY)
    .then((data: AttendanceResponse) => {
      const targetDay = getTargetDay(data);
      if (targetDay) {
        targetDay.attended = true;
        attendanceCounts.value += 1;
        confirmModalInfo.value = {
          visible: true,
          message: "출석완료!\n1P 적립",
          buttonText: "확인",
        };
      }
    })
    .catch((error) => {
      if (error.code == "G010") {
        confirmModalInfo.value = {
          visible: true,
          message: "출석체크는 매일 1회 참여할 수 있습니다",
          buttonText: "확인",
        };
      }
    });
};

const getTargetDay = (attendance: AttendanceResponse): Day | undefined => {
  return days.value.find((day) => isSameDay(day.date, attendance.attendedAt));
};
</script>

<template>
  <div class="calendar-view-container">
    <CalendarTitleView />
    <CalendarView v-if="days.length > 0" :days="days" :today="TODAY" />
    <div class="attendance-count">누적 출석 횟수: {{ attendanceCounts }}</div>
    <div class="attendance-button" @click="attendToday">출석하기</div>
    <CalendarInfoView />
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
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
  transition: background-color 0.3s ease;
}

.attendance-button:hover {
  background-color: var(--surface-fourth);
}

.attendance-button:active {
  background-color: var(--surface-sixth);
}
</style>
