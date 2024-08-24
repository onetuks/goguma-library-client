<script setup lang="ts">
import { PointHistory } from "@/api/PointApis";

const props = defineProps<{
  pointHistory: PointHistory[];
}>();

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const formatPoints = (points: number): string => {
  return `${points > 0 ? "+" : "-"}${points}P`;
};

const isEmpty = (pointHistory: PointHistory[]): boolean => {
  return pointHistory.length === 0;
};
</script>

<template>
  <div class="history-table">
    <div v-if="isEmpty(pointHistory)">내역이 없습니다</div>
    <table v-else>
      <thead>
        <tr>
          <th>일자</th>
          <th>내용</th>
          <th>적립내역</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in props.pointHistory" :key="index">
          <td>{{ formatDate(entry.createdAt) }}</td>
          <td>{{ entry.activity }}</td>
          <td>{{ formatPoints(entry.points) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.history-table {
  margin-top: 20px;
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
}

.history-table table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 10px;
  border-bottom: 1px solid var(--border-primary);
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
}

.history-table th {
  font-weight: normal;
}
</style>
