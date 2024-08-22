<script lang="ts" setup>
import { ref } from "vue";
import PointInfoView from "@/pages/my/point/components/PointInfoView.vue";

interface PointHistoryEntry {
  date: string;
  content: string;
  points: string;
}

const pointHistory = ref<PointHistoryEntry[]>([
  { date: "YYYY.MM.DD", content: "서평 작성", points: "+15P" },
  { date: "YYYY.MM.DD", content: "서평 작성", points: "+15P" },
  // 나머지 데이터 추가
]);

const currentPage = ref(1);
const totalPages = 6;

const goBack = () => {
  window.history.back();
};

const setPage = (page: number) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
</script>

<template>
  <div class="point-history-container">
    <PointInfoView />
    <div class="history-table">
      <table>
        <thead>
          <tr>
            <th>일자</th>
            <th>내용</th>
            <th>적립내역</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in pointHistory" :key="index">
            <td>{{ entry.date }}</td>
            <td>{{ entry.content }}</td>
            <td>{{ entry.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.point-history-container {
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
  font-family: var(--font-family-regular), sans-serif;
}

.history-table {
  margin-top: 20px;
}

.history-table table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.pagination button,
.pagination span {
  margin: 0 4px;
  cursor: pointer;
}

.pagination .active {
  font-weight: bold;
  text-decoration: underline;
}

.navigation-bar {
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.nav-item {
  font-size: 24px;
}
</style>
